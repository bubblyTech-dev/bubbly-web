import type { ReactNode } from 'react';
import { WorkspaceHeader } from '@/components/layout/WorkspaceHeader';
import { BottomNav } from '@/components/layout/BottomNav';

export default function WorkspaceLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-gray-900 antialiased selection:bg-orange-100 selection:text-orange-900">
      <WorkspaceHeader />
      <main id="main" className="flex-1 pt-4 pb-28 sm:pt-6 sm:pb-24">
        <div className="mx-auto max-w-6xl px-3.5 sm:px-6 lg:px-8">{children}</div>
      </main>
      <BottomNav />
    </div>
  );
}
