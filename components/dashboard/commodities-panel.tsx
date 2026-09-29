import {
  MOCK_COMMODITIES,
  TIME_HORIZON_CONFIG,
  type DashboardRegion,
  type TimeHorizon,
} from "@/data/mock-dashboard-data";

interface CommoditiesPanelProps {
  selectedRegion?: DashboardRegion;
  selectedHorizon?: TimeHorizon;
}

const REGION_COMMODITY_SYMBOLS: Record<DashboardRegion, string[]> = {
  GLOBAL: ["XAU/USD", "XAG/USD", "WTI", "HG"],
  US: ["XAU/USD", "XAG/USD", "WTI", "HG"],
  EU: ["XAU/USD", "XAG/USD", "WTI"],
  APAC: ["XAU/USD", "XAG/USD", "HG"],
  EM: ["XAU/USD", "WTI", "HG"],
};

export function CommoditiesPanel({
  selectedRegion = "GLOBAL",
  selectedHorizon = "24H",
}: CommoditiesPanelProps) {
  const horizonConfig = TIME_HORIZON_CONFIG[selectedHorizon];
  const allowedSymbols = REGION_COMMODITY_SYMBOLS[selectedRegion];
  const commodities = MOCK_COMMODITIES.filter((commodity) =>
    allowedSymbols.includes(commodity.symbol),
  );

  const gauge = 72;

  return (
    <section className="rounded-xl border border-border bg-surface-container p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
            Global Resources
          </p>
          <h2 className="mt-1 font-headline text-lg font-bold text-foreground">
            Commodities & Resource Gauge
          </h2>
          <p className="mt-1 text-[10px] text-muted">
            {selectedRegion} · {horizonConfig.description}
          </p>
        </div>
        <span className="rounded bg-surface-high px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-secondary">
          {selectedHorizon} · Mock
        </span>
      </div>

      <div className="mt-5 space-y-2">
        {commodities.map((commodity) => (
          <div
            key={commodity.symbol}
            className="flex items-center justify-between gap-4 rounded-lg border border-border/70 bg-surface-low px-3 py-3"
          >
            <div className="min-w-0">
              <p className="text-xs font-bold text-foreground">
                {commodity.name}
              </p>
              <p className="mt-0.5 text-[10px] text-muted">
                {commodity.symbol} · {commodity.unit}
              </p>
            </div>

            <div className="text-right">
              <p className="font-mono text-xs font-bold text-foreground">
                {commodity.value}
              </p>
              <p
                className={
                  commodity.positive
                    ? "mt-0.5 text-[10px] font-bold text-tertiary"
                    : "mt-0.5 text-[10px] font-bold text-error"
                }
              >
                {commodity.change}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-lg border border-border bg-surface-low p-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
              Resource Gauge
            </p>
            <p className="mt-1 text-xs text-muted">
              Illustrative composite pressure indicator
            </p>
          </div>
          <p className="font-mono text-xl font-bold text-tertiary">
            {gauge}
            <span className="text-xs text-muted"> / 100</span>
          </p>
        </div>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-surface-high">
          <div
            className="h-full rounded-full bg-tertiary"
            style={{ width: `${gauge}%` }}
          />
        </div>

        <div className="mt-2 flex justify-between text-[9px] uppercase tracking-wider text-muted">
          <span>Low pressure</span>
          <span>High pressure</span>
        </div>
      </div>

      <p className="mt-4 text-[10px] leading-relaxed text-muted">
        Commodity values and the resource gauge are mock fixtures. The selected
        horizon changes the dashboard view label only; values are not
        recalculated from live market data.
      </p>
    </section>
  );
}
