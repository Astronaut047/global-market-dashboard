"use client";

import { MockBadge } from "@/components/ui/mock-badge";
import {
  DASHBOARD_REGIONS,
  TIME_HORIZONS,
  TIME_HORIZON_CONFIG,
  type DashboardRegion,
  type TimeHorizon,
} from "@/data/mock-dashboard-data";
import { downloadDashboardCsv } from "@/lib/dashboard-export";

interface MacroHeaderProps {
  selectedRegion: DashboardRegion;
  selectedHorizon: TimeHorizon;
  onRegionChange: (region: DashboardRegion) => void;
  onHorizonChange: (horizon: TimeHorizon) => void;
}

export function MacroHeader({
  selectedRegion,
  selectedHorizon,
  onRegionChange,
  onHorizonChange,
}: MacroHeaderProps) {
  const horizonConfig = TIME_HORIZON_CONFIG[selectedHorizon];

  const handleExport = () => {
    downloadDashboardCsv(selectedRegion, selectedHorizon);
  };

  return (
    <section className="border-b border-border bg-surface-low px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <MockBadge />
              <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                Sync status: mock
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-tertiary" />
              <span className="font-mono text-xs text-tertiary">
                120ms simulated
              </span>
            </div>

            <h1 className="mt-4 font-headline text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              ภาพรวมตลาดและการเงินโลก
            </h1>
            <p className="mt-1 text-sm text-muted">
              Global Macro Intelligence · Read-only academic dashboard
            </p>
          </div>

          <button
            type="button"
            onClick={handleExport}
            className="rounded-lg border border-border bg-surface-container px-4 py-2.5 text-xs font-bold text-foreground transition hover:border-outline hover:bg-surface-high"
          >
            ⇩ Data Export
          </button>
        </div>

        <div className="mt-7 flex flex-col gap-4 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div
            className="flex flex-wrap gap-1"
            role="tablist"
            aria-label="Dashboard regions"
          >
            {DASHBOARD_REGIONS.map((region) => {
              const isSelected = selectedRegion === region.key;

              return (
                <button
                  key={region.key}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => onRegionChange(region.key)}
                  className={[
                    "rounded-md px-3 py-2 text-xs font-bold transition",
                    isSelected
                      ? "bg-primary text-surface-lowest"
                      : "text-muted hover:bg-surface-container hover:text-foreground",
                  ].join(" ")}
                >
                  {region.label}
                </button>
              );
            })}
          </div>

          <div
            className="flex flex-wrap gap-1 rounded-lg border border-border bg-surface-lowest p-1"
            role="group"
            aria-label="Time horizon"
          >
            {TIME_HORIZONS.map((horizon) => {
              const isSelected = selectedHorizon === horizon;

              return (
                <button
                  key={horizon}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => onHorizonChange(horizon)}
                  className={[
                    "rounded-md px-3 py-1.5 text-[11px] font-bold transition",
                    isSelected
                      ? "bg-surface-highest text-foreground"
                      : "text-muted hover:bg-surface-container hover:text-foreground",
                  ].join(" ")}
                >
                  {horizon}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-[10px] text-muted">
          <span className="rounded bg-surface-high px-2 py-1 font-bold uppercase tracking-wider">
            Region: {selectedRegion}
          </span>
          <span className="rounded bg-surface-high px-2 py-1 font-bold uppercase tracking-wider">
            Horizon: {selectedHorizon}
          </span>
          <span>{horizonConfig.description}</span>
        </div>

        <div className="mt-3 rounded-lg border border-border bg-surface-container/60 px-3 py-2.5">
          <p className="text-[10px] leading-relaxed text-muted">
            <span className="font-bold uppercase tracking-wider text-secondary">
              {horizonConfig.label} view:
            </span>{" "}
            {horizonConfig.mockNote}. Values remain fixed local fixtures and
            are not recalculated from a live market feed.
          </p>
        </div>
      </div>
    </section>
  );
}
