import Link from 'next/link';

import { Logo } from '@/components/common/Logo';
import { workspaceNav } from '@/config/navigation';

export function Sidebar() {
  return (
    <aside className="workspace__sidebar">
      <Logo />
      <nav aria-label="Workspace" className="mt-8 flex flex-col gap-1">
        {workspaceNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="hover:bg-surface-muted rounded-md px-3 py-2 text-sm no-underline"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
