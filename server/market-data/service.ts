import type { MarketQuote } from "@/types/market";
import { MockMarketDataProvider } from "@/server/providers/mock";
import { MarketDataError, type MarketDataProvider } from "@/server/market-data/types";

const provider: MarketDataProvider = new MockMarketDataProvider();

export async function getMarketQuote(symbol: string): Promise<MarketQuote> {
  try {
    return await provider.getQuote(symbol);
  } catch (error) {
    if (error instanceof MarketDataError) throw error;
    throw new MarketDataError("Unable to retrieve market data.", "UPSTREAM");
  }
}
