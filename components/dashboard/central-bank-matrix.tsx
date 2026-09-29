"use client";

import {
  MOCK_CENTRAL_BANKS,
  type DashboardRegion,
} from "@/data/mock-dashboard-data";

interface CentralBankMatrixProps {
  selectedRegion?: DashboardRegion;
}

const REGION_LABELS: Record<DashboardRegion, string> = {
  GLOBAL: "Global",
  US: "US",
  EU: "EU",
  APAC: "APAC",
  EM: "EM",
};

export function CentralBankMatrix({
  selectedRegion = "GLOBAL",
}: CentralBankMatrixProps) {
  const banks =
    selectedRegion === "GLOBAL"
      ? MOCK_CENTRAL_BANKS
      : MOCK_CENTRAL_BANKS.filter((bank) => bank.region === selectedRegion);

  return (
    <section className="overflow-hidden rounded-xl border border-border bg-surface-container">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
            Central Bank Matrix
          </p>
          <h2 className="mt-1 font-headline text-base font-bold text-foreground">
            Policy Rates vs Inflation
          </h2>
        </div>
        <span className="rounded bg-surface-high px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-primary">
          {REGION_LABELS[selectedRegion]} · Mock
        </span>
      </div>

      {banks.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left">
            <thead className="bg-surface-low text-[10px] uppercase tracking-wider text-muted">
              <tr>
                <th className="px-5 py-3 font-bold">Central Bank</th>
                <th className="px-4 py-3 font-bold">Policy Rate</th>
                <th className="px-4 py-3 font-bold">Inflation</th>
                <th className="px-4 py-3 font-bold">Next Meeting</th>
                <th className="px-4 py-3 font-bold">Bias</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {banks.map((bank) => (
                <tr key={bank.bank} className="transition hover:bg-surface-high/40">
                  <td className="px-5 py-3">
                    <div className="text-xs font-semibold text-foreground">
                      {bank.bank}
                    </div>
                    <div className="mt-0.5 text-[10px] text-muted">
                      {bank.region}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs font-semibold tabular-nums text-primary">
                    {bank.policyRate}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs tabular-nums text-foreground">
                    {bank.inflation}
                  </td>
                  <td className="px-4 py-3 text-[11px] text-muted">
                    {bank.nextMeeting}
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded bg-surface-high px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-muted">
                      {bank.bias}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="px-5 py-10 text-center">
          <p className="text-sm font-semibold text-foreground">
            No mock central-bank fixtures for {REGION_LABELS[selectedRegion]}
          </p>
          <p className="mt-2 text-xs text-muted">
            This academic prototype currently has no central-bank sample for
            the selected region.
          </p>
        </div>
      )}
    </section>
  );
}
