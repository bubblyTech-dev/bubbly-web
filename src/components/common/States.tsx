import type { ReactNode } from 'react';

/** Loading, error and empty states used by the workspace lists. */

export function LoadingBlock({
  label = 'Loading…',
  className = 'py-16',
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`} role="status">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-200 border-t-black" />
      <span className="text-xs text-gray-500">{label}</span>
    </div>
  );
}

export function ErrorBlock({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-rose-100 bg-rose-50/60 py-10 text-center">
      <p className="max-w-sm text-sm font-medium text-rose-700">{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="rounded-full bg-black px-4 py-1.5 text-xs font-semibold text-white hover:bg-gray-800"
        >
          Try again
        </button>
      ) : null}
    </div>
  );
}

export function EmptyBlock({ children }: { children: ReactNode }) {
  return (
    <div className="py-16 text-center">
      <p className="text-sm font-medium text-gray-500">{children}</p>
    </div>
  );
}
