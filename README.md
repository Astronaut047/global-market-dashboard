# Global Market Dashboard

A read-only web dashboard for viewing global market conditions across indices, foreign exchange, commodities, and cryptoassets. It is an **academic prototype** and does not provide trading, orders, deposits, withdrawals, portfolio management, or execution features.

## Current status

**Phase 0 — COMPLETE** — project planning.  
**Phase 1 — COMPLETE** — development environment.  
**Phase 2 — COMPLETE** — project architecture.  
**Phase 3 — COMPLETE** — frontend implementation using local mock market data.  
**Phase 4 — IN PROGRESS** — server-side market-data foundation using a Mock Market Data Provider.

## Current data mode

The project currently uses **Mock Market Data only**.

- No external market-data API
- No API key
- No paid data service
- No live market-data claim
- No trading or order execution
- No database required for market data

The mock data exists for development, demonstration, and academic evaluation. It must not be interpreted as real-time financial information.

## Phase 4 architecture

The current server-side data flow is:

\`\`\`
Browser
   ↓
Next.js API Route
   ↓
Market Data Service
   ↓
Mock Market Data Provider
   ↓
Local Mock Fixtures
\`\`\`

The provider abstraction keeps the application architecture independent from a specific external market-data vendor.

If real market data becomes a requirement in a future version, a new provider can implement the existing \`MarketDataProvider\` interface. Any future provider would need separate verification of coverage, freshness, licensing, exchange entitlements, rate limits, reliability, and cost.

## Current next step

Complete Phase 4 verification:

1. Run \`npm run lint\`
2. Run \`npm run build\`
3. Test a valid market symbol through \`/api/markets\`
4. Test an invalid market symbol and confirm HTTP \`400\`
5. Confirm the API response reports \`status: "MOCK"\` and \`source: "Mock Provider"\`
6. Update the Phase 4 documentation and changelog after verification
7. Create and push the Phase 4 Git commit

See [\`docs/04-backend-foundation.md\`](docs/04-backend-foundation.md) for the detailed Phase 4 documentation.
