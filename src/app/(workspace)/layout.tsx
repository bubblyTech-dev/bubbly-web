import type { ReactNode } from 'react';

import { Sidebar } from '@/components/layout/Sidebar';

export default function WorkspaceLayout({ children }: { children: ReactNode }) {
  return (
    <div className="workspace">
      <Sidebar />
      <main id="main" className="workspace__main">
        {children}
      </main>
    </div>
  );
}
