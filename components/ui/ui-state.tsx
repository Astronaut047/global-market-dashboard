export function LoadingState({ label = "Loading market data..." }: { label?: string }) {
  return <div role="status" className="rounded-xl border border-[var(--border)] bg-[var(--panel)] p-6 text-sm text-[var(--muted)]">{label}</div>;
}

export function EmptyState({ label = "No market data available." }: { label?: string }) {
  return <div className="rounded-xl border border-dashed border-[var(--border)] p-6 text-sm text-[var(--muted)]">{label}</div>;
}

export function ErrorState({ label = "Unable to load market data." }: { label?: string }) {
  return <div role="alert" className="rounded-xl border border-red-400/30 bg-red-400/10 p-6 text-sm text-red-200">{label}</div>;
}