'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { refreshAccessToken } from '@/lib/api/client';
import { apiEvents } from '@/lib/api/events';
import { session } from '@/lib/auth/session';
import { authService } from '@/services/auth';
import type { MeResponse } from '@/types/auth';

type Status = 'loading' | 'authenticated' | 'anonymous';

interface AuthContextValue {
  status: Status;
  me: MeResponse | null;
  /** Throws ApiError (wrong password, locked ...): the login form shows it. */
  login: (email: string, password: string) => Promise<MeResponse>;
  /** Never throws: the user is signed out locally even when the server cannot be reached. */
  logout: () => Promise<void>;
  /** Reload who is signed in (after a profile or password change). Never throws; null when it failed. */
  reload: () => Promise<MeResponse | null>;
  can: (permission: string) => boolean;
  hasModule: (moduleKey: string) => boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<Status>('loading');
  const [me, setMe] = useState<MeResponse | null>(null);

  const signOutLocally = useCallback(() => {
    session.setToken(null);
    setMe(null);
    setStatus('anonymous');
  }, []);

  const loadMe = useCallback(async () => {
    const response = await authService.me();
    setMe(response.data);
    setStatus('authenticated');
    return response.data;
  }, []);

  const reload = useCallback(async () => {
    try {
      return await loadMe();
    } catch {
      return null;
    }
  }, [loadMe]);

  // first load: the refresh cookie (if any) gives a new access token
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const token = session.getToken() ?? (await refreshAccessToken());
        if (!active) return;
        if (!token) {
          signOutLocally();
          return;
        }
        await loadMe();
      } catch {
        if (active) signOutLocally();
      }
    })();
    return () => {
      active = false;
    };
  }, [loadMe, signOutLocally]);

  // states announced by the API interceptors
  useEffect(
    () =>
      apiEvents.on((event) => {
        if (event.type === 'sessionExpired') signOutLocally();
        // the RoleGate shows the "paused" screen or the change-password page from the fresh data
        if (event.type === 'subscriptionInactive' || event.type === 'passwordChangeRequired')
          void reload();
      }),
    [signOutLocally, reload],
  );

  const login = useCallback(
    async (email: string, password: string) => {
      const response = await authService.login(email, password);
      session.setToken(response.data.accessToken);
      try {
        return await loadMe();
      } catch (error) {
        session.setToken(null);
        throw error;
      }
    },
    [loadMe],
  );

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch {
      // the server could not end the session (offline): forget it here anyway
    } finally {
      signOutLocally();
    }
  }, [signOutLocally]);

  const value = useMemo<AuthContextValue>(
    () => ({
      status,
      me,
      login,
      logout,
      reload,
      can: (permission) => Boolean(me?.permissions.includes(permission)),
      hasModule: (moduleKey) => Boolean(me?.modules.includes(moduleKey)),
    }),
    [status, me, login, logout, reload],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside <AuthProvider>.');
  return context;
}
