import type { FieldErrors } from '@/types/api';

export class ApiError extends Error {
  readonly status: number;
  readonly code?: string;
  readonly fieldErrors: FieldErrors;
  readonly details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;

    const payload = (details && typeof details === 'object' ? details : {}) as {
      code?: unknown;
      errors?: unknown;
    };
    this.code = typeof payload.code === 'string' ? payload.code : undefined;
    this.fieldErrors =
      payload.errors && typeof payload.errors === 'object' ? (payload.errors as FieldErrors) : {};
  }

  /** The first message for a field, if the API sent one. */
  field(name: string): string | undefined {
    return this.fieldErrors[name]?.[0];
  }
}

/** A message that is always safe to show to the user. */
export function errorMessage(error: unknown, fallback = 'Something went wrong. Please try again.') {
  if (error instanceof ApiError) {
    if (error.status === 0) return 'Cannot reach the server. Check your connection and try again.';
    return error.message || fallback;
  }
  return fallback;
}
