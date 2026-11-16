/**
 * The access token lives ONLY in memory (never localStorage). The refresh token is an httpOnly cookie set by the API
 * on /api/v1/user/auth, so a page reload gets a new access token from POST /user/auth/refresh.
 * "Session expired" is announced through apiEvents (lib/api/events.ts).
 */
let accessToken: string | null = null;

export const session = {
  getToken: () => accessToken,
  setToken(token: string | null) {
    accessToken = token;
  },
};
