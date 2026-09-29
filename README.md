# Global Market Dashboard

A read-only web dashboard for viewing global market conditions across indices, foreign exchange, commodities, and cryptoassets. It is an **academic prototype** and does not provide trading, orders, deposits, withdrawals, portfolio management, or execution features.

## Current status

**Phase 0 — COMPLETE** — project planning.  
**Phase 1 — COMPLETE** — development environment.  
**Phase 2 — COMPLETE** — project architecture.  
**Phase 3 — COMPLETE** — frontend implementation using local mock market data.  
**Phase 4 — COMPLETE** — server-side market-data foundation using a Mock Market Data Provider.  
**Phase 5 — COMPLETE** — interactive macro dashboard, mock logistics panel, and CSV export.  
**Phase 6 — COMPLETE** — quality and UX hardening with verified lint/build.

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

```text
Browser
   ↓
Next.js API Route
   ↓
Market Data Service
   ↓
Mock Market Data Provider
   ↓
Local Mock Fixtures
```

The provider abstraction keeps the application architecture independent from a specific external market-data vendor.

If real market data becomes a requirement in a future version, a new provider can implement the existing `MarketDataProvider` interface. Any future provider would need separate verification of coverage, freshness, licensing, exchange entitlements, rate limits, reliability, and cost.

## Phase 5 dashboard capabilities

The dashboard now provides:

- Region selection: Global, US, EU, APAC, EM
- Time-horizon context: 24H, 7D, 1M, YTD
- Macro KPI cards
- Central bank matrix
- Forex matrix
- Yield curve panel
- Commodities and resource panel
- Central bank rate watch
- Mock Supply Chain & Logistics monitor
- Mock Intelligence Wire
- Functional CSV export for the selected Region and Horizon
- Sticky sidebar navigation with active-section tracking
- Read-only market search for local mock instruments
- Clear Mock Data indicators throughout the UI

The selected Horizon is intentionally a **view context**, not a generated historical series. The project does not fabricate historical observations or live market updates.

## Phase 6 quality improvements

The project now includes:

- Updated System Status page matching the current Phase 6 runtime
- Consistent Mock Provider and no-live-feed messaging
- Accessible loading, empty, and error state semantics
- Current design-token usage across reusable UI state components
- Removal of obsolete `--panel` references from the reusable UI state components

## Verification status

The project contains the following verification commands:

```bash
npm run lint
npm run build
```

Phase 5 was verified successfully with both commands and the production build generated 18 static pages.

Phase 6 was verified successfully with both commands. The production build completed successfully and the verified Phase 6 commit was pushed to the private GitHub repository.

## Documentation

See the `docs/` directory for phase-specific documentation and the changelog.
