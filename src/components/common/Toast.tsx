'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

type Tone = 'success' | 'error';

/** A short message in the bottom corner. const { toast, show } = useToast(); ... {toast} */
export function useToast(durationMs = 3000) {
  const [message, setMessage] = useState<{ text: string; tone: Tone } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback(
    (text: string, tone: Tone = 'success') => {
      if (timer.current) clearTimeout(timer.current);
      setMessage({ text, tone });
      timer.current = setTimeout(() => setMessage(null), durationMs);
    },
    [durationMs],
  );

  useEffect(() => () => void (timer.current && clearTimeout(timer.current)), []);

  const toast = message ? (
    <div
      role="status"
      className="animate-in fade-in slide-in-from-bottom-2 fixed right-6 bottom-24 z-[60] flex max-w-sm items-center gap-2 rounded-xl bg-black px-4 py-2.5 text-xs text-white shadow-xl"
    >
      {message.tone === 'success' ? (
        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
      ) : (
        <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
      )}
      <span>{message.text}</span>
    </div>
  ) : null;

  return { toast, show };
}
