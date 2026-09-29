import {
  MOCK_RATE_WATCH,
  TIME_HORIZON_CONFIG,
  type DashboardRegion,
  type TimeHorizon,
} from "@/data/mock-dashboard-data";

interface RateWatchProps {
  selectedRegion?: DashboardRegion;
  selectedHorizon?: TimeHorizon;
}

const BANK_REGION_MAP: Record<string, DashboardRegion> = {
  "Federal Reserve": "US",
  ECB: "EU",
  BOJ: "APAC",
  "Bank of England": "EU",
};

export function RateWatch({
  selectedRegion = "GLOBAL",
  selectedHorizon = "24H",
}: RateWatchProps) {
  const horizonConfig = TIME_HORIZON_CONFIG[selectedHorizon];

  const items =
    selectedRegion === "GLOBAL"
      ? MOCK_RATE_WATCH
      : MOCK_RATE_WATCH.filter(
          (item) => BANK_REGION_MAP[item.bank] === selectedRegion,
        );

  return (
    <section className="rounded-xl border border-border bg-surface-container p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
            Monetary Policy
          </p>
          <h2 className="mt-1 font-headline text-lg font-bold text-foreground">
            Central Bank Rate Watch
          </h2>
          <p className="mt-1 text-[10px] text-muted">
            {selectedRegion} · {horizonConfig.description}
          </p>
        </div>
        <span className="rounded bg-surface-high px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-secondary">
          {selectedHorizon} · Mock
        </span>
      </div>

      {items.length > 0 ? (
        <div className="mt-5 space-y-2">
          {items.map((item) => (
            <div
              key={item.bank}
              className="grid grid-cols-[minmax(0,1fr)_auto_auto_auto] items-center gap-3 rounded-lg border border-border/70 bg-surface-low px-3 py-3"
            >
              <div className="min-w-0">
                <p className="truncate text-xs font-bold text-foreground">
                  {item.bank}
                </p>
                <p className="mt-0.5 text-[10px] text-muted">
                  Next: {item.next}
                </p>
              </div>

              <span className="font-mono text-xs font-bold text-primary">
                {item.rate}
              </span>
              <span className="font-mono text-[10px] text-muted">
                {item.move}
              </span>
              <span
                className={[
                  "rounded-full px-2 py-1 text-[9px] font-bold uppercase tracking-wider",
                  item.status === "WATCH"
                    ? "bg-primary/10 text-primary"
                    : "bg-surface-high text-muted",
                ].join(" ")}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-lg border border-dashed border-border bg-surface-low p-6 text-center">
          <p className="text-xs font-semibold text-foreground">
            No mock rate-watch entries mapped to {selectedRegion}
          </p>
          <p className="mt-1 text-[10px] text-muted">
            This region is reserved for future mock data expansion.
          </p>
        </div>
      )}

      <p className="mt-4 text-[10px] leading-relaxed text-muted">
        Policy-rate observations are mock fixtures. The selected horizon changes
        the dashboard view label only; these values are not a forecast or a
        current central-bank release.
      </p>
    </section>
  );
}
