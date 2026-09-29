import type { MarketStatus } from "@/types/market";

export function StatusBadge({ status }: { status: MarketStatus }) {
  return (
    <span className="inline-flex rounded-full border border-[var(--border)] px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-[var(--muted)]">
      {status}
    </span>
  );
}