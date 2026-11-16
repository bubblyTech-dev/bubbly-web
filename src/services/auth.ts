import { api } from '@/lib/api/client';
import type { LoginResponse, MeResponse, SchoolUser } from '@/types/auth';

const base = '/user/auth';

export const authService = {
  login: (email: string, password: string) =>
    api.post<LoginResponse>(`${base}/login`, { email, password }, { auth: false }),
  logout: () => api.post<null>(`${base}/logout`, undefined, { auth: false }),
  me: () => api.get<MeResponse>(`${base}/me`),
  changePassword: (body: {
    currentPassword: string;
    newPassword: string;
    newPasswordConfirmation: string;
  }) => api.post<{ user: SchoolUser }>(`${base}/change-password`, body),
  forgotPassword: (email: string) =>
    api.post<null>(`${base}/forgot-password`, { email }, { auth: false }),
  resetPassword: (body: { token: string; password: string; passwordConfirmation: string }) =>
    api.post<null>(`${base}/reset-password`, body, { auth: false }),
};
