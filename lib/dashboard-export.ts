import {
  MOCK_COMMODITIES,
  MOCK_CENTRAL_BANKS,
  MOCK_FOREX_MATRIX,
  MOCK_MACRO_KPIS,
  MOCK_RATE_WATCH,
  MOCK_YIELD_CURVES,
  TIME_HORIZON_CONFIG,
  type DashboardRegion,
  type TimeHorizon,
} from "@/data/mock-dashboard-data";

const csvEscape = (value: string | number) => {
  const text = String(value);

  if (text.includes(",") || text.includes('"') || text.includes("\n")) {
    return `"${text.replace(/"/g, '""')}"`;
  }

  return text;
};

const REGION_BANKS: Record<DashboardRegion, string[]> = {
  GLOBAL: MOCK_CENTRAL_BANKS.map((item) => item.bank),
  US: ["Federal Reserve"],
  EU: ["European Central Bank", "Bank of England"],
  APAC: ["Bank of Japan"],
  EM: [],
};

const REGION_RATE_WATCH: Record<DashboardRegion, string[]> = {
  GLOBAL: MOCK_RATE_WATCH.map((item) => item.bank),
  US: ["Federal Reserve"],
  EU: ["ECB", "Bank of England"],
  APAC: ["BOJ"],
  EM: [],
};

const REGION_FOREX: Record<DashboardRegion, string[]> = {
  GLOBAL: MOCK_FOREX_MATRIX.map((item) => item.pair),
  US: ["EUR/USD", "GBP/USD", "USD/JPY"],
  EU: ["EUR/USD", "GBP/USD", "EUR/GBP"],
  APAC: ["USD/JPY"],
  EM: [],
};

const REGION_COMMODITIES: Record<DashboardRegion, string[]> = {
  GLOBAL: MOCK_COMMODITIES.map((item) => item.symbol),
  US: MOCK_COMMODITIES.map((item) => item.symbol),
  EU: ["XAU/USD", "XAG/USD", "WTI"],
  APAC: ["XAU/USD", "XAG/USD", "HG"],
  EM: ["XAU/USD", "WTI", "HG"],
};

const REGION_YIELDS: Record<DashboardRegion, string[]> = {
  GLOBAL: MOCK_YIELD_CURVES.map((item) => item.region),
  US: ["US Treasury"],
  EU: ["Germany"],
  APAC: ["Japan"],
  EM: [],
};

export function createDashboardCsv(
  selectedRegion: DashboardRegion,
  selectedHorizon: TimeHorizon,
) {
  const horizon = TIME_HORIZON_CONFIG[selectedHorizon];

  const rows: Array<Array<string | number>> = [
    ["Global Pulse Dashboard Export"],
    ["Data Mode", "MOCK"],
    ["Region", selectedRegion],
    ["Time Horizon", selectedHorizon],
    ["Horizon Description", horizon.description],
    [],
    ["KPI", "Value", "Change", "Note"],
    ...MOCK_MACRO_KPIS.map((item) => [
      item.label,
      item.value,
      item.change,
      item.note,
    ]),
    [],
    ["Central Bank", "Region", "Policy Rate", "Inflation", "Next Meeting", "Bias"],
    ...MOCK_CENTRAL_BANKS
      .filter(
        (item) =>
          selectedRegion === "GLOBAL" ||
          REGION_BANKS[selectedRegion].includes(item.bank),
      )
      .map((item) => [
        item.bank,
        item.region,
        item.policyRate,
        item.inflation,
        item.nextMeeting,
        item.bias,
      ]),
    [],
    ["Forex Pair", "USD", "EUR", "GBP", "JPY", "Change"],
    ...MOCK_FOREX_MATRIX
      .filter((item) => REGION_FOREX[selectedRegion].includes(item.pair))
      .map((item) => [
        item.pair,
        item.usd,
        item.eur,
        item.gbp,
        item.jpy,
        item.change,
      ]),
    [],
    ["Commodity", "Symbol", "Value", "Unit", "Change"],
    ...MOCK_COMMODITIES
      .filter((item) => REGION_COMMODITIES[selectedRegion].includes(item.symbol))
      .map((item) => [
        item.name,
        item.symbol,
        item.value,
        item.unit,
        item.change,
      ]),
    [],
    ["Yield Curve", "Tenors", "Values"],
    ...MOCK_YIELD_CURVES
      .filter((item) => REGION_YIELDS[selectedRegion].includes(item.region))
      .map((item) => [
        item.region,
        item.tenors.join(" | "),
        item.values.join(" | "),
      ]),
    [],
    ["Rate Watch", "Rate", "Move", "Next", "Status"],
    ...MOCK_RATE_WATCH
      .filter((item) => REGION_RATE_WATCH[selectedRegion].includes(item.bank))
      .map((item) => [
        item.bank,
        item.rate,
        item.move,
        item.next,
        item.status,
      ]),
  ];

  return rows.map((row) => row.map(csvEscape).join(",")).join("\n");
}

export function downloadDashboardCsv(
  selectedRegion: DashboardRegion,
  selectedHorizon: TimeHorizon,
) {
  const csv = createDashboardCsv(selectedRegion, selectedHorizon);
  const blob = new Blob(["\uFEFF", csv], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `global-pulse-${selectedRegion.toLowerCase()}-${selectedHorizon.toLowerCase()}-mock.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
