"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MOCK_MARKET_DATA } from "@/data/mock-market-data";

export function MarketSearch() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return [];
    }

    return MOCK_MARKET_DATA.filter((market) =>
      [market.symbol, market.name, market.assetType, market.currency].some((value) =>
        value.toLowerCase().includes(normalizedQuery),
      ),
    ).slice(0, 6);
  }, [query]);

  const clearSearch = () => setQuery("");

  return (
    <div className="relative hidden md:block">
      <div className="flex items-center gap-2 rounded-lg border border-border bg-surface-low px-3 py-2">
        <span className="text-muted" aria-hidden="true">
          ⌕
        </span>
        <input
          aria-label="Search markets"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              clearSearch();
            }
          }}
          placeholder="Search markets..."
          className="w-44 bg-transparent text-xs text-foreground outline-none placeholder:text-muted"
        />
        {query ? (
          <button
            type="button"
            onClick={clearSearch}
            aria-label="Clear market search"
            className="text-muted hover:text-foreground"
          >
            ×
          </button>
        ) : (
          <kbd className="rounded border border-border px-1.5 py-0.5 text-[10px] text-muted">
            /
          </kbd>
        )}
      </div>

      {query && (
        <div className="absolute right-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-xl border border-border bg-surface-container shadow-2xl">
          {results.length > 0 ? (
            <div className="max-h-80 overflow-y-auto p-1.5">
              {results.map((market) => (
                <Link
                  key={market.symbol}
                  href={`/markets/${encodeURIComponent(market.symbol)}`}
                  onClick={clearSearch}
                  className="block rounded-lg px-3 py-3 transition hover:bg-surface-high"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-xs font-bold text-primary">
                      {market.symbol}
                    </span>
                    <span className="rounded bg-surface-high px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-muted">
                      {market.assetType}
                    </span>
                  </div>
                  <p className="mt-1 text-xs font-semibold text-foreground">{market.name}</p>
                  <p className="mt-1 text-[10px] text-muted">
                    {market.currency} · Mock Market Data
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-4">
              <p className="text-xs font-semibold text-foreground">No markets found</p>
              <p className="mt-1 text-[10px] text-muted">
                Try a symbol such as SPX, NDX, EUR/USD, or BTC/USD.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
