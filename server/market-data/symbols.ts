import type { MarketInstrument } from "@/types/market";
import { getMarketBySymbol } from "@/data/mock-market-data";

export function getCanonicalMarket(symbol: string): MarketInstrument | undefined {
  let normalized: string;

  try {
    normalized = decodeURIComponent(symbol).trim().toUpperCase();
  } catch {
    return undefined;
  }

  if (!normalized || normalized.length > 32) return undefined;

  return getMarketBySymbol(normalized);
}
