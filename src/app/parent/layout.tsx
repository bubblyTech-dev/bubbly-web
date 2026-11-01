import type { ReactNode } from 'react';
import { ParentHeader } from '@/components/layout/ParentHeader';
import { ParentBottomNav } from '@/components/layout/ParentBottomNav';

export default function ParentLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-gray-900 antialiased selection:bg-orange-100 selection:text-orange-900">
      <ParentHeader />
      <main id="main" className="flex-1 pt-4 pb-28 sm:pt-6 sm:pb-24">
        <div className="mx-auto max-w-6xl px-3.5 sm:px-6 lg:px-8">{children}</div>
      </main>
      <ParentBottomNav />
    </div>
  );
}
