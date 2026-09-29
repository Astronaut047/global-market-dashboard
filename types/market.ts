export const MARKET_STATUSES = [
  "LIVE",
  "DELAYED",
  "CLOSED",
  "UNAVAILABLE",
  "MOCK",
] as const;

export type MarketStatus = (typeof MARKET_STATUSES)[number];

export const ASSET_TYPES = ["INDEX", "FX", "COMMODITY", "CRYPTO"] as const;

export type AssetType = (typeof ASSET_TYPES)[number];

export interface MarketAsset {
  symbol: string;
  name: string;
  assetType: AssetType;
  currency: string;
}

export interface MarketQuote extends MarketAsset {
  price: number;
  change: number | null;
  changePercent: number | null;
  status: MarketStatus;
  timestamp: string;
  source: string;
}

export interface MarketHistoryPoint {
  timestamp: string;
  price: number;
}

export interface MarketInstrument extends MarketQuote {
  history: MarketHistoryPoint[];
}