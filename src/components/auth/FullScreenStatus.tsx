import type { ReactNode } from 'react';

import { Logo } from '@/components/common/Logo';

/** A centred message used while the session loads or when the workspace cannot be opened. */
export function FullScreenStatus({ title, children }: { title?: string; children?: ReactNode }) {
  return (
    <div
      className="grid min-h-dvh place-items-center bg-white px-4"
      role="status"
      aria-live="polite"
    >
      <div className="flex max-w-sm flex-col items-center text-center">
        <Logo size="md" href="/" />
        {title ? <h1 className="mt-6 text-lg font-bold text-gray-900">{title}</h1> : null}
        {children ?? (
          <div className="mt-6 h-6 w-6 animate-spin rounded-full border-2 border-gray-200 border-t-black" />
        )}
      </div>
    </div>
  );
}
