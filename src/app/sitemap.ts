import type { MetadataRoute } from 'next';

import { paths } from '@/config/paths';
import { siteConfig } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return [paths.home, paths.pricing, paths.contact].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
  }));
}
