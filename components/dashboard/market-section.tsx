import type { AssetType, MarketInstrument } from "@/types/market";
import { EmptyState } from "@/components/ui/ui-state";
import { MarketCard } from "@/components/market/market-card";

export function MarketSection({ title, assetType, markets }: { title: string; assetType: AssetType; markets: MarketInstrument[] }) {
  const items = markets.filter((market) => market.assetType === assetType);
  return (
    <section aria-labelledby={`${assetType}-heading`}>
      <div className="mb-4">
        <h2 id={`${assetType}-heading`} className="text-xl font-bold">{title}</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">{items.length} instruments · read-only</p>
      </div>
      {items.length ? <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{items.map((market) => <MarketCard key={market.symbol} market={market} />)}</div> : <EmptyState />}
    </section>
  );
}