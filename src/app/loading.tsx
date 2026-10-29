export default function Loading() {
  return (
    <div className="grid min-h-[50dvh] place-items-center" role="status" aria-live="polite">
      <span className="text-sm text-muted">Loading…</span>
    </div>
  );
}
