import { env } from '@/config/env';
import { ApiError } from '@/lib/api/errors';

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface RequestOptions extends Omit<RequestInit, 'method' | 'body'> {
  body?: unknown;
  timeoutMs?: number;
}

async function request<T>(method: Method, path: string, options: RequestOptions = {}): Promise<T> {
  const { body, timeoutMs = 15_000, headers, ...rest } = options;

  const response = await fetch(`${env.apiBaseUrl}${path}`, {
    ...rest,
    method,
    credentials: 'include',
    signal: rest.signal ?? AbortSignal.timeout(timeoutMs),
    headers: {
      Accept: 'application/json',
      ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const payload: unknown = response.status === 204 ? null : await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      payload && typeof payload === 'object' && 'message' in payload
        ? String((payload as { message: unknown }).message)
        : response.statusText;
    throw new ApiError(message, response.status, payload);
  }

  return payload as T;
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
