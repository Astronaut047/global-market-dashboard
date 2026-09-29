export function LoadingState({
  label = "Loading market data...",
}: {
  label?: string;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="rounded-xl border border-border bg-surface-container p-6 text-sm text-muted"
    >
      {label}
    </div>
  );
}

export function EmptyState({
  label = "No market data available.",
}: {
  label?: string;
}) {
  return (
    <div
      className="rounded-xl border border-dashed border-border bg-surface-low p-6 text-sm text-muted"
      role="status"
    >
      {label}
    </div>
  );
}

export function ErrorState({
  label = "Unable to load market data.",
}: {
  label?: string;
}) {
  return (
    <div
      role="alert"
      className="rounded-xl border border-error/30 bg-error/10 p-6 text-sm text-error"
    >
      {label}
    </div>
  );
}
