import type { FieldErrors } from '@/types/api';

/** Every failed API call is turned into this one error by the axios interceptor. */
export class ApiError extends Error {
  /** HTTP status, or 0 when the server could not be reached (offline, timeout, CORS) */
  readonly status: number;
  /** machine code from the API (VALIDATION_FAILED, PLAN_LIMIT_REACHED, ...) or a client one (NETWORK, TIMEOUT) */
  readonly code?: string;
  readonly fieldErrors: FieldErrors;
  readonly details?: unknown;

  constructor(message: string, status: number, details?: unknown, code?: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;

    const payload = (details && typeof details === 'object' ? details : {}) as {
      code?: unknown;
      errors?: unknown;
    };
    this.code = code ?? (typeof payload.code === 'string' ? payload.code : undefined);
    this.fieldErrors =
      payload.errors && typeof payload.errors === 'object' ? (payload.errors as FieldErrors) : {};
  }

  get isValidation() {
    return this.status === 422;
  }

  /** The first message for a field, if the API sent one. */
  field(name: string): string | undefined {
    return this.fieldErrors[name]?.[0];
  }

  /** { field: 'first message' } for forms */
  firstErrors(): Record<string, string | undefined> {
    return Object.fromEntries(
      Object.entries(this.fieldErrors).map(([key, messages]) => [key, messages[0]]),
    );
  }
}

/** The request was cancelled on purpose (page left, newer search): never show it to the user. */
export function isCancelled(error: unknown) {
  return error instanceof ApiError && error.code === 'CANCELLED';
}

/** A message that is always safe to show to the user. */
export function errorMessage(error: unknown, fallback = 'Something went wrong. Please try again.') {
  if (error instanceof ApiError) {
    if (error.code === 'TIMEOUT') return 'The server is taking too long. Please try again.';
    if (error.status === 0) return 'Cannot reach the server. Check your connection and try again.';
    if (error.status >= 500) return fallback;
    return error.message || fallback;
  }
  return fallback;
}
