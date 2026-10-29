import Link from 'next/link';
import { paths } from '@/config/paths';

interface BreadcrumbsProps {
  items: Array<{
    label: string;
    href?: string;
  }>;
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 flex items-center text-xs text-gray-500">
      <Link
        href={paths.workspace.dashboard}
        className="transition-colors hover:text-black hover:underline"
      >
        Home
      </Link>
      {items.map((item, idx) => (
        <span key={idx} className="flex items-center">
          <span className="mx-2 text-gray-400">/</span>
          {item.href ? (
            <Link href={item.href} className="transition-colors hover:text-black hover:underline">
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-gray-800">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
