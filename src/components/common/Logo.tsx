import Image from 'next/image';
import Link from 'next/link';

import { paths } from '@/config/paths';
import { siteConfig } from '@/config/site';

interface LogoProps {
  href?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ href = paths.workspace.dashboard, className = '', size = 'md' }: LogoProps) {
  const dimensions = {
    sm: { width: 100, height: 28, maxH: 'h-7' },
    md: { width: 130, height: 36, maxH: 'h-9' },
    lg: { width: 160, height: 44, maxH: 'h-11' },
  }[size];

  return (
    <Link
      href={href}
      className={`inline-flex items-center no-underline transition-transform hover:scale-105 active:scale-95 ${className}`}
      aria-label={siteConfig.name}
    >
      <Image
        src="/assets/images/logo.svg"
        alt={siteConfig.name}
        width={dimensions.width}
        height={dimensions.height}
        priority
        className={`w-auto object-contain ${dimensions.maxH}`}
      />
    </Link>
  );
}
