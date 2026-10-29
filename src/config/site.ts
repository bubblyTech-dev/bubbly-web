export const siteConfig = {
  name: 'Bubbly',
  description: 'School management software built for preschools.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3001',
} as const;
