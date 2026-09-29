import type { MarketQuote } from "@/types/market";

export interface MarketDataProvider {
  getQuote(symbol: string): Promise<MarketQuote>;
}

export class MarketDataError extends Error {
  constructor(
    message: string,
    public readonly code: "CONFIGURATION" | "INVALID_SYMBOL" | "UPSTREAM" | "TIMEOUT",
    public readonly statusCode = 503,
  ) {
    super(message);
    this.name = "MarketDataError";
  }
}
