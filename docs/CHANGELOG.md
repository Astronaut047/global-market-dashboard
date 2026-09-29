# Changelog

All notable project changes are documented here. Dates use ISO 8601.

## [0.6.0] - 2026-09-29

### Added

- Interactive Region and Time Horizon controls across the macro dashboard.
- Mock Supply Chain & Logistics data fixtures.
- Mock Supply Chain & Logistics dashboard panel.
- Mock Intelligence Wire horizon context.
- Browser-side CSV export for the selected dashboard Region and Horizon.
- Dedicated dashboard export utility.

### Changed

- Connected Supply Chain & Logistics navigation to a functional dashboard panel.
- Connected Intelligence Wire to the selected Time Horizon context.
- Data Export now downloads a clearly labelled Mock Dashboard CSV.
- Dashboard interactions continue to use local fixtures only.
- Horizon controls do not generate fabricated historical or live observations.

### Files

- Added `data/mock-supply-chain-data.ts`.
- Added `components/dashboard/supply-chain-panel.tsx`.
- Added `lib/dashboard-export.ts`.
- Updated `app/page.tsx`.
- Updated `components/dashboard/macro-header.tsx`.
- Updated `components/dashboard/intelligence-wire.tsx`.
- Updated `README.md`.

### Verification

- Phase 5 implementation is complete.
- Final Phase 5 `npm run lint` execution has not been performed in the current workspace tool session because no shell/npm runner is available.
- Final Phase 5 `npm run build` execution has not been performed in the current workspace tool session for the same reason.
- Run both commands from the project terminal before treating the Phase 5 commit as build-verified.

### Status

- Phase 5 is **IMPLEMENTATION COMPLETE / VERIFICATION PENDING**.
- No external market-data API is used.
- No live market-data claim is made.
- No trading, orders, accounts, portfolio, database, or Redis functionality has been added.

## [0.5.0] - 2026-09-29

### Added

- Phase 4 documentation for the server-side market-data boundary.
- Mock Market Data Provider for the academic prototype.
- Server-side market-data service using the provider abstraction.
- API route for retrieving normalized mock market quotes.

### Changed

- Replaced the planned Twelve Data integration with a local Mock Provider.
- Removed provider-specific Twelve Data symbol mapping.
- Removed the external market-data API key requirement.
- Updated the Phase 4 architecture to use local mock fixtures.
- Updated README and Phase 4 documentation to describe the project as a mock-only academic prototype.

### Implementation

- Added `server/providers/mock.ts`.
- Updated `server/market-data/service.ts` to use `MockMarketDataProvider`.
- Updated `server/market-data/symbols.ts` to validate against local mock instruments.
- Added `GET /api/markets?symbol=<canonical-symbol>` application route.
- Updated `.env.example` to document that no external market-data API is required.
- Removed the Twelve Data provider adapter.
- Kept the Phase 3 dashboard mock-only.

### Verification

- `npm run lint` passed successfully after the Mock Provider conversion.
- `npm run build` passed successfully after the Mock Provider conversion.
- `GET /api/markets?symbol=SPX` returned HTTP `200` with `status: "MOCK"` and `source: "Mock Provider"`.
- `GET /api/markets?symbol=BTC%2FUSD` returned HTTP `200` with `status: "MOCK"` and `source: "Mock Provider"`.
- `GET /api/markets?symbol=INVALID` returned HTTP `400` with the expected validation error.
- Phase 4 implementation and verification are complete.
- Git commit and GitHub push remain as the final release step for this phase.

### Status

- Phase 4 is **COMPLETE**.
- No provider API key is required or committed.
- No external market-data service is used.
- No real-time market-data claim is made.
- No trading, orders, accounts, portfolio, database, or Redis functionality has been added.

## [0.4.0] - 2026-09-29

### Added

- Phase 3 frontend scaffold using Next.js App Router, React, TypeScript, and Tailwind CSS.
- Responsive read-only dashboard with mock global indices, FX, commodities, and crypto data.
- Reusable market cards, status badges, UI state components, and Lightweight Charts historical mock chart.
- Routes for `/`, `/markets/[symbol]`, and `/status`.
- Phase 3 frontend documentation.

### Verification

- Workspace structure and source files inspected.
- No `.env` files found.
- `npm run build` passed without errors from the project terminal.
- `npm run lint` passed without errors from the project terminal.
- The application was opened successfully in the browser and the Phase 3 routes were available.
- Phase 3 is **COMPLETE**. No Phase 4 work had been started at that checkpoint.
