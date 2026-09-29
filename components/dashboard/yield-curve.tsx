"use client";

import {
  MOCK_YIELD_CURVES,
  type DashboardRegion,
} from "@/data/mock-dashboard-data";

interface YieldCurveProps {
  selectedRegion?: DashboardRegion;
}

const REGION_LABELS: Record<DashboardRegion, string> = {
  GLOBAL: "Global",
  US: "US",
  EU: "EU",
  APAC: "APAC",
  EM: "EM",
};

const REGION_CURVE_MAP: Record<DashboardRegion, string[]> = {
  GLOBAL: ["US Treasury", "Germany", "Japan"],
  US: ["US Treasury"],
  EU: ["Germany"],
  APAC: ["Japan"],
  EM: [],
};

export function YieldCurve({ selectedRegion = "GLOBAL" }: YieldCurveProps) {
  const allowedCurves = REGION_CURVE_MAP[selectedRegion];
  const curves = MOCK_YIELD_CURVES.filter((curve) =>
    allowedCurves.includes(curve.region),
  );

  return (
    <section className="overflow-hidden rounded-xl border border-border bg-surface-container">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
            Sovereign Yield Curves
          </p>
          <h2 className="mt-1 font-headline text-base font-bold text-foreground">
            Mock Yield Structure
          </h2>
        </div>
        <span className="rounded bg-surface-high px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-primary">
          {REGION_LABELS[selectedRegion]} · Mock
        </span>
      </div>

      {curves.length > 0 ? (
        <div className="space-y-5 p-5">
          {curves.map((curve) => {
            const maxValue = Math.max(...curve.values);

            return (
              <div key={curve.region}>
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-semibold text-foreground">
                    {curve.region}
                  </span>
                  <span className="text-[10px] text-muted">
                    2Y → 30Y · Mock
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {curve.tenors.map((tenor, index) => {
                    const value = curve.values[index];
                    const width = Math.max((value / maxValue) * 100, 8);

                    return (
                      <div key={tenor} className="min-w-0">
                        <div className="mb-1 flex items-end justify-between gap-1">
                          <span className="text-[9px] font-bold uppercase text-muted">
                            {tenor}
                          </span>
                          <span className="font-mono text-[10px] tabular-nums text-primary">
                            {value.toFixed(2)}%
                          </span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-surface-high">
                          <div
                            className="h-full rounded-full bg-secondary"
                            style={{ width: `${width}%` }}
                            aria-label={`${curve.region} ${tenor} ${value.toFixed(2)} percent`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="px-5 py-10 text-center">
          <p className="text-sm font-semibold text-foreground">
            No mock yield-curve fixtures for {REGION_LABELS[selectedRegion]}
          </p>
          <p className="mt-2 text-xs text-muted">
            This academic prototype currently has no sovereign-yield sample
            for the selected region.
          </p>
        </div>
      )}
    </section>
  );
}