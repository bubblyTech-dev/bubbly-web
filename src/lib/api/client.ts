import axios, {
  AxiosError,
  AxiosHeaders,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from 'axios';

import { env } from '@/config/env';
import { ApiError } from '@/lib/api/errors';
import { apiEvents } from '@/lib/api/events';
import { session } from '@/lib/auth/session';
import type { ApiEnvelope } from '@/types/api';

declare module 'axios' {
  interface AxiosRequestConfig {
    /** true = do not send the access token and never try a refresh (login, forgot password ...) */
    skipAuth?: boolean;
    /** set by the response interceptor so a request is retried only once after a refresh */
    _retried?: boolean;
  }
}

type Query = Record<string, string | number | boolean | null | undefined>;

export interface RequestOptions extends Omit<
  AxiosRequestConfig,
  'url' | 'method' | 'data' | 'params'
> {
  query?: Query;
  timeoutMs?: number;
}

// public auth calls (login, logout, forgot / reset password) pass `skipAuth: true`; the refresh call uses `bare`
const AUTH_PATH = '/user/auth/';

const baseConfig: AxiosRequestConfig = {
  baseURL: env.apiBaseUrl,
  withCredentials: true, // the refresh token is an httpOnly cookie on /api/v1/user/auth
  timeout: 15_000,
  headers: { Accept: 'application/json' },
};

/** The client every service uses. Interceptors below add the token, refresh it and normalise errors. */
export const http = axios.create(baseConfig);

/** A bare client for the refresh call itself, so it can never loop through the interceptors. */
const bare = axios.create(baseConfig);

// ---------------------------------------------------------------------------------------------------------------------
// errors: whatever goes wrong becomes an ApiError with a message that is safe to show

function toApiError(error: unknown): ApiError {
  if (error instanceof ApiError) return error;
  if (axios.isCancel(error)) return new ApiError('Request cancelled.', 0, undefined, 'CANCELLED');

  if (error instanceof AxiosError) {
    if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
      return new ApiError('The server is taking too long.', 0, undefined, 'TIMEOUT');
    }
    if (!error.response) return new ApiError('Cannot reach the server.', 0, undefined, 'NETWORK');

    const payload = error.response.data as unknown;
    const message =
      payload && typeof payload === 'object' && 'message' in payload
        ? String((payload as { message: unknown }).message)
        : error.response.statusText || 'Request failed.';
    return new ApiError(message, error.response.status, payload);
  }

  return new ApiError('Something went wrong.', 0, undefined, 'UNKNOWN');
}

// ---------------------------------------------------------------------------------------------------------------------
// refresh: one call at a time, shared by every request that got a 401 together

let refreshing: Promise<string | null> | null = null;

export function refreshAccessToken(): Promise<string | null> {
  refreshing ??= bare
    .post<ApiEnvelope<{ accessToken: string }>>(`${AUTH_PATH}refresh`)
    .then((response) => {
      session.setToken(response.data.data.accessToken);
      return response.data.data.accessToken;
    })
    .catch(() => null)
    .finally(() => {
      refreshing = null;
    });
  return refreshing;
}

// ---------------------------------------------------------------------------------------------------------------------
// interceptors

http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = config.skipAuth ? null : session.getToken();
  if (token) {
    config.headers = AxiosHeaders.from(config.headers);
    config.headers.set('Authorization', `Bearer ${token}`);
  }
  return config;
});

http.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    const config = error instanceof AxiosError ? error.config : undefined;
    const status = error instanceof AxiosError ? error.response?.status : undefined;

    // the access token expired: get a new one with the refresh cookie and try the request once more
    if (status === 401 && config && !config.skipAuth && !config._retried) {
      config._retried = true;
      const token = await refreshAccessToken();
      if (token) {
        try {
          return await http.request(config);
        } catch (retryError) {
          return Promise.reject(toApiError(retryError));
        }
      }
      session.setToken(null);
      apiEvents.emit({ type: 'sessionExpired' });
      return Promise.reject(
        new ApiError(
          'Your session has expired. Please log in again.',
          401,
          undefined,
          'SESSION_EXPIRED',
        ),
      );
    }

    const apiError = toApiError(error);

    // app-wide states: the providers react, the page only sees the error
    if (apiError.status === 402)
      apiEvents.emit({ type: 'subscriptionInactive', message: apiError.message });
    if (apiError.status === 403 && apiError.code === 'PASSWORD_CHANGE_REQUIRED')
      apiEvents.emit({ type: 'passwordChangeRequired' });
    if (apiError.status === 401 && config && !config.skipAuth) {
      session.setToken(null);
      apiEvents.emit({ type: 'sessionExpired' });
    }

    return Promise.reject(apiError);
  },
);

// ---------------------------------------------------------------------------------------------------------------------
// the small API the services use: every call resolves to the API envelope { success, message, data, meta }

const cleanQuery = (query?: Query) =>
  query
    ? Object.fromEntries(
        Object.entries(query).filter(
          ([, value]) => value !== undefined && value !== null && value !== '',
        ),
      )
    : undefined;

async function request<T>(
  config: AxiosRequestConfig & { query?: Query; timeoutMs?: number },
): Promise<ApiEnvelope<T>> {
  const { query, timeoutMs, ...rest } = config;
  try {
    const response = await http.request<ApiEnvelope<T>>({
      ...rest,
      params: cleanQuery(query),
      ...(timeoutMs ? { timeout: timeoutMs } : {}),
    });
    return response.data;
  } catch (error) {
    throw toApiError(error);
  }
}

export const api = {
  get: <T>(url: string, options: RequestOptions = {}) =>
    request<T>({ ...options, url, method: 'GET' }),
  post: <T>(url: string, body?: unknown, options: RequestOptions = {}) =>
    request<T>({ ...options, url, method: 'POST', data: body }),
  put: <T>(url: string, body?: unknown, options: RequestOptions = {}) =>
    request<T>({ ...options, url, method: 'PUT', data: body }),
  patch: <T>(url: string, body?: unknown, options: RequestOptions = {}) =>
    request<T>({ ...options, url, method: 'PATCH', data: body }),
  delete: <T>(url: string, options: RequestOptions = {}) =>
    request<T>({ ...options, url, method: 'DELETE' }),
};
