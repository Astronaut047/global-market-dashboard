import { MockBadge } from "@/components/ui/mock-badge";
import { MarketSection } from "@/components/dashboard/market-section";
import { MARKET_GROUPS, MOCK_MARKET_DATA } from "@/data/mock-market-data";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[#10243a] to-[var(--panel)] p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <MockBadge />
          <span className="text-sm text-[var(--muted)]">Read-only market information</span>
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Global markets at a glance</h1>
        <p className="mt-3 max-w-3xl text-[var(--muted)]">A responsive overview of indices, foreign exchange, commodities, and cryptoassets. All values in this Phase 3 build are development fixtures, not live market prices.</p>
      </section>
      <div className="mt-10 space-y-10">
        {MARKET_GROUPS.map((group) => <MarketSection key={group.key} title={group.title} assetType={group.key} markets={MOCK_MARKET_DATA} />)}
      </div>
    </div>
  );
}