'use client';

import { useState } from 'react';
import { Check, Copy, KeyRound } from 'lucide-react';

/**
 * Shows a set-password link ONCE after it is created (new teacher, parent login, resend). The email may not be set up
 * yet, so the Principal can copy it and share it (for example on WhatsApp). It works once and expires.
 */
export function LoginLinkBox({ url, who }: { url: string; who: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
      <div className="flex items-center gap-1.5 font-bold">
        <KeyRound className="h-3.5 w-3.5" />
        <span>Login link for {who}</span>
      </div>
      <p className="mt-1 text-amber-800">
        We emailed this link. You can also share it yourself: it lets them set a password once and
        expires in 7 days. It is shown only now.
      </p>
      <div className="mt-2 flex items-center gap-2">
        <input
          readOnly
          value={url}
          onFocus={(e) => e.currentTarget.select()}
          className="min-w-0 flex-1 rounded-lg border border-amber-200 bg-white px-2 py-1.5 font-mono text-[11px] text-gray-800"
        />
        <button
          type="button"
          onClick={() => void copy()}
          className="flex shrink-0 items-center gap-1 rounded-full bg-black px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-gray-800"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </div>
  );
}
