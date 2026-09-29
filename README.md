# Global Market Dashboard

A read-only web dashboard for following global market conditions across indices, foreign exchange, commodities, and cryptoassets. It is not a trading platform: the MVP will not provide orders, deposits, withdrawals, portfolios, or execution features.

## Current status

**Phase 0 — COMPLETE** — project planning.
**Phase 1 — COMPLETE** — development environment.
**Phase 2 — COMPLETE** — project architecture (documentation only).
**Phase 3 — COMPLETE** — frontend implementation uses mock market data only.

No backend, database, Market API integration, production deployment, or trading/order-execution functionality has been implemented.

## Proposed product principles

- Present market data clearly, with a source, timestamp, and an honest live/delayed/unavailable state.
- Keep provider credentials on the server; never expose them to browsers.
- Build the first usable dashboard with mock data before connecting a commercial market-data source.
- Treat licensing, exchange entitlement, and delay status as product requirements, not implementation details.
- Design desktop-first while keeping the dashboard responsive and accessible on mobile.

## Proposed architecture at a glance

```text
Browser UI (Next.js / React)
        |
        | HTTPS + Server-Sent Events
        v
Application server / Next.js route handlers
        |
        +-- Provider adapter layer --> Market-data providers
        +-- Cache (optional Redis) --> shared latest quotes
        +-- PostgreSQL (later) ------> configuration and operational history
```

The browser communicates only with our application server. That server normalizes data from provider-specific formats into one `MarketQuote` shape and reports its actual freshness status.

## Planned repository layout

```text
app/                 Next.js routes and pages (Phase 3)
components/          Reusable dashboard UI (Phase 3)
features/market/     Market-domain UI and state (Phase 5+)
lib/                 Shared utilities and formatting
server/              Provider adapters, caching, and streaming (Phase 4+)
types/               Shared TypeScript contracts
tests/               Unit, integration, and end-to-end tests (Phase 11)
docs/                Phase documentation and changelog
```

Directories other than `docs/` are planned only; they have not been created in Phase 0.

## Documentation

See [the documentation index](docs/README.md), including the [Phase 0 project overview](docs/00-project-overview.md), [Phase 1 environment setup](docs/01-environment-setup.md), [Phase 2 architecture](docs/02-architecture.md), and [changelog](docs/CHANGELOG.md).

## Current checkpoint status

Phase 0 - Project Planning: **COMPLETE**  
Phase 1 - Development Environment: **COMPLETE**  
Phase 2 - Project Architecture: **COMPLETE**  
Phase 3 - Frontend Setup: **COMPLETE**  

Phase 3 contains frontend source code and mock market data only. There is no backend, database, Market API integration, production deployment, or trading/order-execution functionality.

## Current next step

**Phase 3 - Frontend Setup** is complete. See [the Phase 3 frontend setup record](docs/03-frontend-setup.md). `npm run build` and `npm run lint` passed, and the dashboard was verified in the browser.

