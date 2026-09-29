import { NextRequest, NextResponse } from "next/server";
import { getCanonicalMarket } from "@/server/market-data/symbols";
import { getMarketQuote } from "@/server/market-data/service";
import { MarketDataError } from "@/server/market-data/types";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const symbol = request.nextUrl.searchParams.get("symbol");

  if (!symbol || !getCanonicalMarket(symbol)) {
    return NextResponse.json(
      { error: "Invalid or unsupported market symbol." },
      { status: 400 },
    );
  }

  try {
    const quote = await getMarketQuote(symbol);
    return NextResponse.json({ data: quote });
  } catch (error) {
    if (error instanceof MarketDataError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode },
      );
    }

    return NextResponse.json(
      {
        error: "Market data is temporarily unavailable.",
        status: "UNAVAILABLE",
      },
      { status: 503 },
    );
  }
}
