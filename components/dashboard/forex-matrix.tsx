import {
  MOCK_FOREX_MATRIX,
  TIME_HORIZON_CONFIG,
  type DashboardRegion,
  type TimeHorizon,
} from "@/data/mock-dashboard-data";

interface ForexMatrixProps {
  selectedRegion?: DashboardRegion;
  selectedHorizon?: TimeHorizon;
}

const REGION_FOREX_PAIRS: Record<DashboardRegion, string[]> = {
  GLOBAL: ["EUR/USD", "GBP/USD", "USD/JPY", "EUR/GBP"],
  US: ["EUR/USD", "GBP/USD", "USD/JPY"],
  EU: ["EUR/USD", "GBP/USD", "EUR/GBP"],
  APAC: ["USD/JPY"],
  EM: [],
};

export function ForexMatrix({
  selectedRegion = "GLOBAL",
  selectedHorizon = "24H",
}: ForexMatrixProps) {
  const horizonConfig = TIME_HORIZON_CONFIG[selectedHorizon];
  const allowedPairs = REGION_FOREX_PAIRS[selectedRegion];

  const rows = MOCK_FOREX_MATRIX.filter((row) =>
    allowedPairs.includes(row.pair),
  );

  return (
    <section className="rounded-xl border border-border bg-surface-container p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
            Foreign Exchange
          </p>
          <h2 className="mt-1 font-headline text-lg font-bold text-foreground">
            Forex Matrix
          </h2>
          <p className="mt-1 text-[10px] text-muted">
            {selectedRegion} · {horizonConfig.description}
          </p>
        </div>
        <span className="rounded bg-surface-high px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-secondary">
          {selectedHorizon} · Mock
        </span>
      </div>

      {rows.length > 0 ? (
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[620px] border-collapse text-left">
            <thead>
              <tr className="border-b border-border text-[10px] uppercase tracking-wider text-muted">
                <th className="pb-3 pr-4 font-bold">Pair</th>
                <th className="px-4 pb-3 text-right font-bold">USD</th>
                <th className="px-4 pb-3 text-right font-bold">EUR</th>
                <th className="px-4 pb-3 text-right font-bold">GBP</th>
                <th className="px-4 pb-3 text-right font-bold">JPY</th>
                <th className="pb-3 pl-4 text-right font-bold">
                  {selectedHorizon}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const positive = row.change.startsWith("+");

                return (
                  <tr
                    key={row.pair}
                    className="border-b border-border/70 last:border-0"
                  >
                    <td className="py-4 pr-4">
                      <span className="text-xs font-bold text-foreground">
                        {row.pair}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right font-mono text-xs text-foreground">
                      {row.usd}
                    </td>
                    <td className="px-4 py-4 text-right font-mono text-xs text-foreground">
                      {row.eur}
                    </td>
                    <td className="px-4 py-4 text-right font-mono text-xs text-foreground">
                      {row.gbp}
                    </td>
                    <td className="px-4 py-4 text-right font-mono text-xs text-foreground">
                      {row.jpy}
                    </td>
                    <td
                      className={[
                        "py-4 pl-4 text-right font-mono text-xs font-bold",
                        positive ? "text-tertiary" : "text-error",
                      ].join(" ")}
                    >
                      {row.change}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-5 rounded-lg border border-dashed border-border bg-surface-low p-6 text-center">
          <p className="text-xs font-semibold text-foreground">
            No mock FX pairs mapped to {selectedRegion}
          </p>
          <p className="mt-1 text-[10px] text-muted">
            This region is reserved for future mock data expansion.
          </p>
        </div>
      )}

      <p className="mt-4 text-[10px] leading-relaxed text-muted">
        Cross-rate values are local mock fixtures. The selected horizon changes
        the dashboard view label only; values are not recalculated from live
        market data.
      </p>
    </section>
  );
}
