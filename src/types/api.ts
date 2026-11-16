/** The one response shape of the Bubbly API: success -> { success, message, data, meta }. */
export interface ApiEnvelope<T> {
  success: true;
  message: string;
  data: T;
  meta?: PageMeta & Record<string, unknown>;
}

export interface PageMeta {
  page: number;
  perPage: number;
  total: number;
  lastPage: number;
}

/** A paginated list as returned by the API: data is the rows, meta the page numbers (plus extras). */
export interface Paginated<T, Extra = Record<string, never>> {
  data: T[];
  meta: PageMeta & Extra;
}

/** Field errors of a 422 answer: { email: ['This email is already used.'] } */
export type FieldErrors = Record<string, string[]>;
