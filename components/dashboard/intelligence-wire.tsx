"use client";

import {
  MOCK_INTELLIGENCE_WIRE,
  TIME_HORIZON_CONFIG,
  type DashboardRegion,
  type TimeHorizon,
} from "@/data/mock-dashboard-data";

interface IntelligenceWireProps {
  selectedRegion?: DashboardRegion;
  selectedHorizon?: TimeHorizon;
}

const REGION_LABELS: Record<DashboardRegion, string> = {
  GLOBAL: "Global",
  US: "US",
  EU: "EU",
  APAC: "APAC",
  EM: "EM",
};

export function IntelligenceWire({
  selectedRegion = "GLOBAL",
  selectedHorizon = "24H",
}: IntelligenceWireProps) {
  const horizonConfig = TIME_HORIZON_CONFIG[selectedHorizon];

  const items =
    selectedRegion === "GLOBAL"
      ? MOCK_INTELLIGENCE_WIRE
      : MOCK_INTELLIGENCE_WIRE.filter(
          (item) => item.region === selectedRegion,
        );

  return (
    <section className="overflow-hidden rounded-xl border border-border bg-surface-container">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
            Intelligence Wire
          </p>
          <h2 className="mt-1 font-headline text-base font-bold text-foreground">
            Regional Macro Signals
          </h2>
          <p className="mt-1 text-[10px] text-muted">
            {REGION_LABELS[selectedRegion]} · {horizonConfig.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="rounded bg-surface-high px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-primary">
            {selectedHorizon}
          </span>
          <span className="rounded bg-surface-high px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-primary">
            {REGION_LABELS[selectedRegion]} · Mock
          </span>
        </div>
      </div>

      {items.length > 0 ? (
        <>
          <div className="divide-y divide-border">
            {items.map((item) => (
              <article
                key={item.time + "-" + item.headline}
                className="grid gap-3 px-5 py-4 transition hover:bg-surface-high/30 sm:grid-cols-[64px_64px_1fr_auto] sm:items-start"
              >
                <span className="font-mono text-[11px] tabular-nums text-muted">
                  {item.time}
                </span>

                <span className="w-fit rounded bg-surface-high px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-secondary">
                  {item.region}
                </span>

                <div>
                  <h3 className="text-xs font-semibold text-foreground">
                    {item.headline}
                  </h3>
                  <p className="mt-1 text-[11px] leading-relaxed text-muted">
                    {item.detail}
                  </p>
                </div>

                <span
                  className={[
                    "w-fit rounded px-2 py-1 text-[9px] font-bold uppercase tracking-wider",
                    item.impact === "HIGH"
                      ? "bg-error/10 text-error"
                      : item.impact === "MEDIUM"
                        ? "bg-primary/10 text-primary"
                        : "bg-tertiary/10 text-tertiary",
                  ].join(" ")}
                >
                  {item.impact}
                </span>
              </article>
            ))}
          </div>

          <div className="border-t border-border bg-surface-lowest/40 px-5 py-3">
            <p className="text-[10px] leading-relaxed text-muted">
              <span className="font-bold uppercase tracking-wider text-secondary">
                {selectedHorizon} view:
              </span>{" "}
              {horizonConfig.mockNote}. Wire entries are fixed local mock
              fixtures; changing the horizon changes the dashboard context and
              does not create historical or live news.
            </p>
          </div>
        </>
      ) : (
        <div className="px-5 py-10 text-center">
          <p className="text-sm font-semibold text-foreground">
            No mock intelligence items for {REGION_LABELS[selectedRegion]}
          </p>
          <p className="mt-2 text-xs text-muted">
            This academic prototype currently has no intelligence-wire sample
            for the selected region.
          </p>
        </div>
      )}
    </section>
  );
}
