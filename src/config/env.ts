/**
 * Central place for environment access. Only NEXT_PUBLIC_* values may be used in client code.
 */
export const env = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3001',
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3000/api/v1',
} as const;
