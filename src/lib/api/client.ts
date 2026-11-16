import { env } from '@/config/env';
import { ApiError } from '@/lib/api/errors';
import { session } from '@/lib/auth/session';
import type { ApiEnvelope } from '@/types/api';

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
type Query = Record<string, string | number | boolean | null | undefined>;

export interface RequestOptions extends Omit<RequestInit, 'method' | 'body'> {
  body?: unknown;
  query?: Query;
  timeoutMs?: number;
  /** Send the access token and refresh it on a 401 (default true). */
  auth?: boolean;
}

const AUTH_PATHS = '/user/auth/';

function buildUrl(path: string, query?: Query) {
  const url = `${env.apiBaseUrl}${path}`;
  if (!query) return url;
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== null && value !== '') params.set(key, String(value));
  }
  const text = params.toString();
  return text ? `${url}?${text}` : url;
}

async function send(method: Method, path: string, options: RequestOptions, token: string | null) {
  const { body, query, timeoutMs = 15_000, headers, auth: _auth, ...rest } = options;
  try {
    return await fetch(buildUrl(path, query), {
      ...rest,
      method,
      credentials: 'include',
      signal: rest.signal ?? AbortSignal.timeout(timeoutMs),
      headers: {
        Accept: 'application/json',
        ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') throw error;
    throw new ApiError('Cannot reach the server.', 0);
  }
}

// one refresh at a time, shared by every request that hit a 401 together
let refreshing: Promise<string | null> | null = null;

export function refreshAccessToken(): Promise<string | null> {
  if (!refreshing) {
    refreshing = (async () => {
      try {
        const response = await send('POST', `${AUTH_PATHS}refresh`, {}, null);
        if (!response.ok) return null;
        const payload = (await response.json()) as ApiEnvelope<{ accessToken: string }>;
        session.setToken(payload.data.accessToken);
        return payload.data.accessToken;
      } catch {
        return null;
      } finally {
        setTimeout(() => {
          refreshing = null;
        }, 0);
      }
    })();
  }
  return refreshing;
}

async function request<T>(
  method: Method,
  path: string,
  options: RequestOptions = {},
): Promise<ApiEnvelope<T>> {
  const useAuth = options.auth !== false;
  let response = await send(method, path, options, useAuth ? session.getToken() : null);

  // the access token expired: get a new one with the refresh cookie and try once more
  if (response.status === 401 && useAuth && !path.startsWith(AUTH_PATHS)) {
    const token = await refreshAccessToken();
    if (token) response = await send(method, path, options, token);
    if (!token || response.status === 401) session.expire();
  }

  const payload: unknown = response.status === 204 ? null : await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      payload && typeof payload === 'object' && 'message' in payload
        ? String((payload as { message: unknown }).message)
        : response.statusText;
    throw new ApiError(message, response.status, payload);
  }

  return payload as ApiEnvelope<T>;
}

export const api = {
  get: <T>(path: string, options?: RequestOptions) => request<T>('GET', path, options),
  post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>('POST', path, { ...options, body }),
  put: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>('PUT', path, { ...options, body }),
  patch: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>('PATCH', path, { ...options, body }),
  delete: <T>(path: string, options?: RequestOptions) => request<T>('DELETE', path, options),
};
