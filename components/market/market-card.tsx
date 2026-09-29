import Link from "next/link";
import type { MarketInstrument } from "@/types/market";
import { StatusBadge } from "./status-badge";

const numberFormat = new Intl.NumberFormat("en-US", { maximumFractionDigits: 4 });

export function MarketCard({ market }: { market: MarketInstrument }) {
  const positive = (market.change ?? 0) >= 0;
  return (
    <Link href={`/markets/${encodeURIComponent(market.symbol)}`} className="block rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-4 transition hover:-translate-y-0.5 hover:border-slate-500" aria-label={`View details for ${market.name}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">{market.symbol}</p>
          <h3 className="mt-1 font-semibold">{market.name}</h3>
        </div>
        <StatusBadge status={market.status} />
      </div>
      <div className="mt-5">
        <p className="text-2xl font-bold">{numberFormat.format(market.price)} <span className="text-sm font-normal text-[var(--muted)]">{market.currency}</span></p>
        <p className={`mt-1 text-sm ${positive ? "text-emerald-300" : "text-rose-300"}`}>
          {positive ? "+" : ""}{market.change?.toFixed(4)} ({positive ? "+" : ""}{market.changePercent?.toFixed(2)}%)
        </p>
      </div>
      <dl className="mt-5 grid grid-cols-2 gap-2 border-t border-[var(--border)] pt-3 text-xs">
        <div><dt className="text-[var(--muted)]">Updated</dt><dd className="mt-1">{new Date(market.timestamp).toLocaleTimeString()}</dd></div>
        <div><dt className="text-[var(--muted)]">Source</dt><dd className="mt-1">{market.source}</dd></div>
      </dl>
    </Link>
  );
}