"use client";

import {
  MOCK_LOGISTICS_METRICS,
  MOCK_MODE_BREAKDOWN,
  MOCK_SUPPLY_CHAIN_SNAPSHOTS,
  SUPPLY_CHAIN_REGION_LABELS,
} from "@/data/mock-supply-chain-data";
import {
  TIME_HORIZON_CONFIG,
  type DashboardRegion,
  type TimeHorizon,
} from "@/data/mock-dashboard-data";

interface SupplyChainPanelProps {
  selectedRegion?: DashboardRegion;
  selectedHorizon?: TimeHorizon;
}

const STATUS_STYLES = {
  NORMAL: "bg-tertiary/10 text-tertiary",
  WATCH: "bg-primary/10 text-primary",
  DELAYED: "bg-error/10 text-error",
} as const;

const MODE_LABELS = {
  SEA: "Sea",
  AIR: "Air",
  RAIL: "Rail",
  ROAD: "Road",
} as const;

export function SupplyChainPanel({
  selectedRegion = "GLOBAL",
  selectedHorizon = "24H",
}: SupplyChainPanelProps) {
  const horizonConfig = TIME_HORIZON_CONFIG[selectedHorizon];

  const routes =
    selectedRegion === "GLOBAL"
      ? MOCK_SUPPLY_CHAIN_SNAPSHOTS
      : MOCK_SUPPLY_CHAIN_SNAPSHOTS.filter(
          (item) => item.region === selectedRegion,
        );

  return (
    <section className="overflow-hidden rounded-xl border border-border bg-surface-container">
      <div className="border-b border-border px-5 py-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
              Supply Chain & Logistics
            </p>
            <h2 className="mt-1 font-headline text-base font-bold text-foreground">
              Global Logistics Monitor
            </h2>
            <p className="mt-1 text-[10px] text-muted">
              {SUPPLY_CHAIN_REGION_LABELS[selectedRegion]} ·{" "}
              {horizonConfig.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="rounded bg-surface-high px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-primary">
              {selectedHorizon}
            </span>
            <span className="rounded bg-surface-high px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-secondary">
              Mock Logistics
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-3 border-b border-border p-4 sm:grid-cols-2 xl:grid-cols-4">
        {MOCK_LOGISTICS_METRICS.map((metric) => (
          <div
            key={metric.label}
            className="rounded-lg border border-border bg-surface-low p-3"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-[10px] font-semibold text-muted">
                {metric.label}
              </p>
              <span
                className={[
                  "rounded px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider",
                  STATUS_STYLES[metric.status],
                ].join(" ")}
              >
                {metric.status}
              </span>
            </div>
            <div className="mt-3 flex items-end justify-between gap-2">
              <span className="font-mono text-xl font-bold tabular-nums text-foreground">
                {metric.value}
              </span>
              <span className="text-[10px] font-semibold text-muted">
                {metric.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 p-4 xl:grid-cols-[1fr_280px]">
        <div>
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <h3 className="text-xs font-bold text-foreground">
                Route Monitor
              </h3>
              <p className="mt-0.5 text-[10px] text-muted">
                Mock route conditions for the selected region
              </p>
            </div>
            <span className="rounded bg-surface-high px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-muted">
              {routes.length} route{routes.length === 1 ? "" : "s"}
            </span>
          </div>

          {routes.length > 0 ? (
            <div className="space-y-2">
              {routes.map((route) => (
                <article
                  key={route.route}
                  className="rounded-lg border border-border bg-surface-low p-3 transition hover:bg-surface-high/30"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h4 className="text-xs font-semibold text-foreground">
                        {route.route}
                      </h4>
                      <p className="mt-1 text-[10px] text-muted">
                        {MODE_LABELS[route.mode]} transport · {route.note}
                      </p>
                    </div>

                    <span
                      className={[
                        "rounded px-2 py-1 text-[8px] font-bold uppercase tracking-wider",
                        STATUS_STYLES[route.status],
                      ].join(" ")}
                    >
                      {route.status}
                    </span>
                  </div>

                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <div>
                      <div className="flex items-center justify-between text-[9px]">
                        <span className="text-muted">Transit Index</span>
                        <span className="font-mono font-bold text-foreground">
                          {route.transitIndex}
                        </span>
                      </div>
                      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-surface-highest">
                        <div
                          className="h-full rounded-full bg-secondary"
                          style={{ width: route.transitIndex + "%" }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-[9px]">
                        <span className="text-muted">Capacity</span>
                        <span className="font-mono font-bold text-foreground">
                          {route.capacity}%
                        </span>
                      </div>
                      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-surface-highest">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: route.capacity + "%" }}
                        />
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-border px-5 py-10 text-center">
              <p className="text-sm font-semibold text-foreground">
                No mock route data for{" "}
                {SUPPLY_CHAIN_REGION_LABELS[selectedRegion]}
              </p>
              <p className="mt-2 text-xs text-muted">
                This prototype currently has no logistics fixture for the
                selected region.
              </p>
            </div>
          )}
        </div>

        <aside className="rounded-lg border border-border bg-surface-low p-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
              Transport Mix
            </p>
            <h3 className="mt-1 text-xs font-bold text-foreground">
              Mock Mode Breakdown
            </h3>
          </div>

          <div className="mt-4 space-y-3">
            {MOCK_MODE_BREAKDOWN.map((item) => (
              <div key={item.mode}>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-muted">{item.label}</span>
                  <span className="font-mono font-bold text-foreground">
                    {item.share}%
                  </span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-surface-highest">
                  <div
                    className="h-full rounded-full bg-tertiary"
                    style={{ width: item.share + "%" }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 border-t border-border pt-3">
            <p className="text-[10px] leading-relaxed text-muted">
              <span className="font-bold uppercase tracking-wider text-secondary">
                {selectedHorizon} view:
              </span>{" "}
              {horizonConfig.mockNote}. All logistics values are fixed local
              mock fixtures and do not represent live shipping conditions.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
