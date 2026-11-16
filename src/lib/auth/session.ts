/**
 * The access token lives ONLY in memory (never localStorage). The refresh token is an httpOnly cookie set by the API
 * on /api/v1/user/auth, so a page reload gets a new access token from POST /user/auth/refresh.
 */
let accessToken: string | null = null;
const listeners = new Set<() => void>();

export const session = {
  getToken: () => accessToken,
  setToken(token: string | null) {
    accessToken = token;
  },
  /** Called when the session is gone for good (refresh failed): the AuthProvider signs the user out. */
  onExpired(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  expire() {
    accessToken = null;
    listeners.forEach((listener) => listener());
  },
};
