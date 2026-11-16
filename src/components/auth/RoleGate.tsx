'use client';

import { useEffect, type ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { paths } from '@/config/paths';
import { homeFor } from '@/lib/auth/roles';
import { useAuth } from '@/providers/AuthProvider';
import type { Role } from '@/types/auth';
import { FullScreenStatus } from './FullScreenStatus';

/**
 * Lets only a signed-in user of `role` see the children. Anyone else is sent to the login page or to their own home.
 * This only shapes the UI: the API checks every permission again on the server.
 */
export function RoleGate({ role, children }: { role: Role; children: ReactNode }) {
  const { status, me, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const userRole = me?.user.role;
  const mustChange = me?.user.mustChangePassword;

  useEffect(() => {
    if (status === 'anonymous') {
      router.replace(`${paths.auth.login}?next=${encodeURIComponent(pathname)}`);
    } else if (status === 'authenticated' && mustChange) {
      router.replace(paths.auth.changePassword);
    } else if (status === 'authenticated' && userRole !== role) {
      router.replace(homeFor(userRole));
    }
  }, [status, userRole, mustChange, role, router, pathname]);

  if (status !== 'authenticated' || !me || mustChange || userRole !== role)
    return <FullScreenStatus />;

  if (!me.subscription.allowed) {
    return (
      <FullScreenStatus title="Your school workspace is paused">
        <p className="mt-2 text-sm text-gray-500">
          {me.subscription.message ?? 'The school subscription is not active.'}
        </p>
        <p className="mt-1 text-xs text-gray-400">
          {role === 1
            ? 'Please renew the subscription or contact Bubbly support.'
            : 'Please contact your school.'}
        </p>
        <button
          type="button"
          onClick={() => void logout()}
          className="mt-6 rounded-full bg-black px-6 py-2 text-xs font-semibold text-white transition hover:bg-gray-800"
        >
          Log out
        </button>
      </FullScreenStatus>
    );
  }

  return <>{children}</>;
}
