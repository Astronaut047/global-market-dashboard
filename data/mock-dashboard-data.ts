export type DashboardRegion = "GLOBAL" | "US" | "EU" | "APAC" | "EM";
export type TimeHorizon = "24H" | "7D" | "1M" | "YTD";

export interface TimeHorizonConfig {
  key: TimeHorizon;
  label: string;
  description: string;
  mockNote: string;
}

export interface MacroKpi {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  note: string;
}

export interface CentralBankSnapshot {
  bank: string;
  region: string;
  policyRate: string;
  inflation: string;
  nextMeeting: string;
  bias: string;
}

export interface ForexMatrixRow {
  pair: string;
  usd: string;
  eur: string;
  gbp: string;
  jpy: string;
  change: string;
}

export interface YieldCurve {
  region: string;
  tenors: string[];
  values: number[];
}

export interface CommoditySnapshot {
  name: string;
  symbol: string;
  value: string;
  unit: string;
  change: string;
  positive: boolean;
}

export interface RateWatchItem {
  bank: string;
  rate: string;
  move: string;
  next: string;
  status: "WATCH" | "STABLE" | "MOCK";
}

export interface IntelligenceItem {
  time: string;
  region: string;
  headline: string;
  detail: string;
  impact: "HIGH" | "MEDIUM" | "LOW";
}

export const DASHBOARD_REGIONS: { key: DashboardRegion; label: string }[] = [
  { key: "GLOBAL", label: "Global" },
  { key: "US", label: "US" },
  { key: "EU", label: "EU" },
  { key: "APAC", label: "APAC" },
  { key: "EM", label: "EM" },
];

export const TIME_HORIZONS: TimeHorizon[] = ["24H", "7D", "1M", "YTD"];

export const TIME_HORIZON_CONFIG: Record<TimeHorizon, TimeHorizonConfig> = {
  "24H": {
    key: "24H",
    label: "24H",
    description: "Short-term market snapshot",
    mockNote: "Mock snapshot for the last 24 hours",
  },
  "7D": {
    key: "7D",
    label: "7D",
    description: "Short-term weekly view",
    mockNote: "Mock weekly view for academic demonstration",
  },
  "1M": {
    key: "1M",
    label: "1M",
    description: "Monthly market view",
    mockNote: "Mock monthly view for academic demonstration",
  },
  YTD: {
    key: "YTD",
    label: "YTD",
    description: "Year-to-date view",
    mockNote: "Mock year-to-date view for academic demonstration",
  },
};

export const MOCK_MACRO_KPIS: MacroKpi[] = [
  {
    label: "Global CPI Avg",
    value: "3.20%",
    change: "-0.10%",
    positive: true,
    note: "Mock composite",
  },
  {
    label: "US Dollar Index",
    value: "104.28",
    change: "+0.42%",
    positive: true,
    note: "Mock index",
  },
  {
    label: "WTI Crude",
    value: "$78.32",
    change: "-0.79%",
    positive: false,
    note: "Mock market quote",
  },
  {
    label: "Global 10Y Yield",
    value: "3.84%",
    change: "+0.03%",
    positive: false,
    note: "Mock composite",
  },
];

export const MOCK_CENTRAL_BANKS: CentralBankSnapshot[] = [
  {
    bank: "Federal Reserve",
    region: "US",
    policyRate: "5.25%",
    inflation: "3.20%",
    nextMeeting: "Mock · 12 Nov",
    bias: "Restrictive",
  },
  {
    bank: "European Central Bank",
    region: "EU",
    policyRate: "3.75%",
    inflation: "2.60%",
    nextMeeting: "Mock · 17 Oct",
    bias: "Neutral",
  },
  {
    bank: "Bank of Japan",
    region: "APAC",
    policyRate: "0.25%",
    inflation: "2.80%",
    nextMeeting: "Mock · 31 Oct",
    bias: "Normalizing",
  },
  {
    bank: "Bank of England",
    region: "EU",
    policyRate: "5.00%",
    inflation: "2.90%",
    nextMeeting: "Mock · 07 Nov",
    bias: "Restrictive",
  },
];

export const MOCK_FOREX_MATRIX: ForexMatrixRow[] = [
  { pair: "EUR/USD", usd: "1.0842", eur: "1.0000", gbp: "0.8531", jpy: "170.42", change: "+0.19%" },
  { pair: "GBP/USD", usd: "1.2718", eur: "1.1718", gbp: "1.0000", jpy: "199.92", change: "-0.11%" },
  { pair: "USD/JPY", usd: "157.21", eur: "169.88", gbp: "123.61", jpy: "1.0000", change: "+0.22%" },
  { pair: "EUR/GBP", usd: "0.8531", eur: "1.0000", gbp: "0.8531", jpy: "134.04", change: "+0.07%" },
];

export const MOCK_YIELD_CURVES: YieldCurve[] = [
  { region: "US Treasury", tenors: ["2Y", "5Y", "10Y", "30Y"], values: [4.42, 4.18, 4.24, 4.48] },
  { region: "Germany", tenors: ["2Y", "5Y", "10Y", "30Y"], values: [2.71, 2.55, 2.68, 2.91] },
  { region: "Japan", tenors: ["2Y", "5Y", "10Y", "30Y"], values: [0.48, 0.72, 1.02, 2.12] },
];

export const MOCK_COMMODITIES: CommoditySnapshot[] = [
  { name: "Gold", symbol: "XAU/USD", value: "$2,356.70", unit: "USD / oz", change: "+0.53%", positive: true },
  { name: "Silver", symbol: "XAG/USD", value: "$30.41", unit: "USD / oz", change: "+0.93%", positive: true },
  { name: "WTI Crude", symbol: "WTI", value: "$78.32", unit: "USD / bbl", change: "-0.79%", positive: false },
  { name: "Copper", symbol: "HG", value: "$4.31", unit: "USD / lb", change: "+0.34%", positive: true },
];

export const MOCK_RATE_WATCH: RateWatchItem[] = [
  { bank: "Federal Reserve", rate: "5.25%", move: "0 bp", next: "12 Nov", status: "STABLE" },
  { bank: "ECB", rate: "3.75%", move: "-25 bp", next: "17 Oct", status: "WATCH" },
  { bank: "BOJ", rate: "0.25%", move: "+10 bp", next: "31 Oct", status: "WATCH" },
  { bank: "Bank of England", rate: "5.00%", move: "0 bp", next: "07 Nov", status: "STABLE" },
];

export const MOCK_INTELLIGENCE_WIRE: IntelligenceItem[] = [
  {
    time: "14:24",
    region: "GLOBAL",
    headline: "Macro dashboard snapshot refreshed",
    detail: "Mock composite indicators have been synchronized for academic demonstration.",
    impact: "LOW",
  },
  {
    time: "14:18",
    region: "US",
    headline: "US rate path remains a monitored scenario",
    detail: "Mock policy-rate and inflation values are shown for interface testing only.",
    impact: "MEDIUM",
  },
  {
    time: "14:07",
    region: "APAC",
    headline: "Asia-Pacific yield curve snapshot updated",
    detail: "Yield values are local fixtures and do not represent live sovereign pricing.",
    impact: "LOW",
  },
  {
    time: "13:52",
    region: "EU",
    headline: "European FX matrix recalculated",
    detail: "Cross-rate values are derived mock figures used to demonstrate the matrix UI.",
    impact: "LOW",
  },
];
