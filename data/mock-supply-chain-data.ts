import type { DashboardRegion } from "@/data/mock-dashboard-data";

export interface SupplyChainSnapshot {
  region: DashboardRegion;
  route: string;
  mode: "SEA" | "AIR" | "RAIL" | "ROAD";
  status: "NORMAL" | "WATCH" | "DELAYED";
  transitIndex: number;
  capacity: number;
  note: string;
}

export interface LogisticsMetric {
  label: string;
  value: string;
  change: string;
  status: "NORMAL" | "WATCH" | "DELAYED";
}

export const MOCK_LOGISTICS_METRICS: LogisticsMetric[] = [
  {
    label: "Global Transit Index",
    value: "82",
    change: "+2.4%",
    status: "NORMAL",
  },
  {
    label: "Port Capacity",
    value: "76%",
    change: "-1.8%",
    status: "WATCH",
  },
  {
    label: "Air Cargo Capacity",
    value: "69%",
    change: "+3.1%",
    status: "NORMAL",
  },
  {
    label: "Route Disruption",
    value: "14",
    change: "+2",
    status: "WATCH",
  },
];

export const MOCK_SUPPLY_CHAIN_SNAPSHOTS: SupplyChainSnapshot[] = [
  {
    region: "GLOBAL",
    route: "Asia → Europe",
    mode: "SEA",
    status: "WATCH",
    transitIndex: 78,
    capacity: 72,
    note: "Mock container-flow scenario",
  },
  {
    region: "US",
    route: "Asia → US West",
    mode: "SEA",
    status: "NORMAL",
    transitIndex: 84,
    capacity: 81,
    note: "Mock port-capacity scenario",
  },
  {
    region: "EU",
    route: "North Sea Corridor",
    mode: "SEA",
    status: "WATCH",
    transitIndex: 75,
    capacity: 68,
    note: "Mock congestion scenario",
  },
  {
    region: "APAC",
    route: "East Asia Regional",
    mode: "SEA",
    status: "NORMAL",
    transitIndex: 88,
    capacity: 83,
    note: "Mock regional-flow scenario",
  },
  {
    region: "EM",
    route: "Emerging Market Corridor",
    mode: "ROAD",
    status: "DELAYED",
    transitIndex: 61,
    capacity: 54,
    note: "Mock disruption scenario",
  },
];

export const MOCK_MODE_BREAKDOWN = [
  { mode: "SEA", label: "Sea", share: 58 },
  { mode: "AIR", label: "Air", share: 17 },
  { mode: "RAIL", label: "Rail", share: 11 },
  { mode: "ROAD", label: "Road", share: 14 },
] as const;

export const SUPPLY_CHAIN_REGION_LABELS: Record<DashboardRegion, string> = {
  GLOBAL: "Global",
  US: "US",
  EU: "EU",
  APAC: "APAC",
  EM: "EM",
};
