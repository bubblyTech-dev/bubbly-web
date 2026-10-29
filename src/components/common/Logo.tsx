import Link from 'next/link';

import { paths } from '@/config/paths';
import { siteConfig } from '@/config/site';

/** Placeholder wordmark. Replace with the real SVG logo from Figma. */
export function Logo() {
  return (
    <Link href={paths.home} className="text-xl font-extrabold tracking-tight no-underline">
      {siteConfig.name}
    </Link>
  );
}
