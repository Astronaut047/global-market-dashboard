import { notFound } from "next/navigation";
import { getMarketBySymbol, MOCK_MARKET_DATA } from "@/data/mock-market-data";
import { MockBadge } from "@/components/ui/mock-badge";
import { StatusBadge } from "@/components/market/status-badge";
import { MarketChart } from "@/components/charts/market-chart";

export function generateStaticParams() {
  return MOCK_MARKET_DATA.map((market) => ({ symbol: market.symbol }));
}

export default async function MarketDetailPage({ params }: { params: Promise<{ symbol: string }> }) {
  const { symbol } = await params;
  const market = getMarketBySymbol(symbol);
  if (!market) notFound();

  const positive = (market.change ?? 0) >= 0;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center gap-3"><MockBadge /><StatusBadge status={market.status} /></div>
      <div className="mt-5 flex flex-wrap items-end justify-between gap-5">
        <div><p className="text-sm uppercase tracking-widest text-[var(--muted)]">{market.symbol}</p><h1 className="mt-1 text-3xl font-bold">{market.name}</h1></div>
        <div className="text-left sm:text-right">
          <p className="text-3xl font-bold">{market.price.toLocaleString("en-US", { maximumFractionDigits: 4 })} {market.currency}</p>
          <p className={`mt-1 text-sm ${positive ? "text-emerald-300" : "text-rose-300"}`}>{positive ? "+" : ""}{market.change?.toFixed(4)} ({positive ? "+" : ""}{market.changePercent?.toFixed(2)}%)</p>
        </div>
      </div>
      <section className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-4 sm:p-6" aria-labelledby="chart-heading">
        <div className="mb-4 flex items-center justify-between"><h2 id="chart-heading" className="font-semibold">Mock historical price</h2><span className="text-xs text-[var(--muted)]">Development fixture</span></div>
        <MarketChart data={market.history} />
      </section>
      <dl className="mt-5 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-[var(--border)] p-4"><dt className="text-xs text-[var(--muted)]">Data source</dt><dd className="mt-1 font-medium">{market.source}</dd></div>
        <div className="rounded-xl border border-[var(--border)] p-4"><dt className="text-xs text-[var(--muted)]">Last update</dt><dd className="mt-1 font-medium">{new Date(market.timestamp).toLocaleString()}</dd></div>
        <div className="rounded-xl border border-[var(--border)] p-4"><dt className="text-xs text-[var(--muted)]">Asset type</dt><dd className="mt-1 font-medium">{market.assetType}</dd></div>
      </dl>
    </div>
  );
}