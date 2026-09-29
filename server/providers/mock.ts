import { getMarketBySymbol } from "@/data/mock-market-data";
import type { MarketQuote } from "@/types/market";
import { MarketDataError, type MarketDataProvider } from "@/server/market-data/types";

export class MockMarketDataProvider implements MarketDataProvider {
  async getQuote(symbol: string): Promise<MarketQuote> {
    const market = getMarketBySymbol(symbol);

    if (!market) {
      throw new MarketDataError(
        "Unsupported market symbol.",
        "INVALID_SYMBOL",
        400,
      );
    }

    return {
      symbol: market.symbol,
      name: market.name,
      assetType: market.assetType,
      currency: market.currency,
      price: market.price,
      change: market.change,
      changePercent: market.changePercent,
      status: "MOCK",
      timestamp: market.timestamp,
      source: "Mock Provider",
    };
  }
}
