import {
  MOCK_MACRO_KPIS,
  TIME_HORIZON_CONFIG,
  type TimeHorizon,
} from "@/data/mock-dashboard-data";

interface KpiGridProps {
  selectedHorizon?: TimeHorizon;
}

export function KpiGrid({ selectedHorizon = "24H" }: KpiGridProps) {
  const horizonConfig = TIME_HORIZON_CONFIG[selectedHorizon];

  return (
    <section aria-label="Macro key performance indicators">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="font-headline text-sm font-bold text-foreground">
            Macro Key Indicators
          </h2>
          <p className="mt-0.5 text-[10px] text-muted">
            {horizonConfig.description}
          </p>
        </div>

        <span className="rounded bg-surface-high px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-secondary">
          {selectedHorizon} · Mock
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {MOCK_MACRO_KPIS.map((kpi) => (
          <article
            key={kpi.label}
            className="rounded-xl border border-border bg-surface-container p-5 transition hover:border-outline"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
                {kpi.label}
              </p>
              <span className="rounded bg-surface-high px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-muted">
                Mock
              </span>
            </div>

            <div className="mt-5 flex items-end justify-between gap-3">
              <p className="font-mono text-2xl font-bold tracking-tight text-foreground">
                {kpi.value}
              </p>
              <span
                className={[
                  "text-xs font-bold",
                  kpi.positive ? "text-tertiary" : "text-error",
                ].join(" ")}
              >
                {kpi.change}
              </span>
            </div>

            <p className="mt-3 text-[10px] text-muted">{kpi.note}</p>

            <div className="mt-4 h-1 overflow-hidden rounded-full bg-surface-high">
              <div
                className={
                  kpi.positive
                    ? "h-full w-2/3 rounded-full bg-tertiary/60"
                    : "h-full w-1/2 rounded-full bg-error/60"
                }
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
