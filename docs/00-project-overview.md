# Phase 0 — Project overview

**Status:** Complete (planning only)  
**Date:** 2026-09-29

## Scope and constraints

Global Market Dashboard is a read-only market-information product. The MVP is intended to show market overview, indices, forex, commodities, cryptoassets, quote changes, charts, source attribution, timestamps, and honest data-state indicators.

It must not include order entry, buy/sell functions, trade execution, deposits, withdrawals, or portfolio trading. Future features such as news, calendar, watchlists, accounts, alerts, screeners, indicators, and AI analysis are outside the MVP.

## Current-state inspection

| Area | Result |
| --- | --- |
| Workspace contents | Empty; no source code or configuration files found. |
| Dependencies | None found. |
| Environment variables | No project configuration found. |
| Existing documentation | None found. |
| Git status | Not verified: `git` is unavailable in the current shell. |

No frontend, backend, database, API integration, or application folder was created in this phase.

## Recommended technology stack

| Concern | Recommendation | Rationale |
| --- | --- | --- |
| Web application | Next.js (App Router) with TypeScript | One typed codebase can serve the dashboard and server-side endpoints while keeping provider keys off the client. |
| UI | React with Tailwind CSS | Component composition and responsive styling are fast to iterate on for a data-dense dashboard. |
| Server boundary | Next.js route handlers and a provider-adapter layer | Centralizes authentication, validation, normalization, rate limiting, retries, and vendor changes. |
| Realtime delivery | Server-Sent Events (SSE) initially | Dashboard updates are server-to-browser only; SSE is simpler than bidirectional WebSockets. Reassess WebSockets if interaction requirements change. |
| Charts | TradingView Lightweight Charts | Well suited to price-series charts and time-range views without implying trading capability. |
| Relational storage | PostgreSQL, introduced only when needed | Suitable for provider configuration, session metadata, audit/operational records, and curated historical data. It is not needed for Phase 0. |
| Latest-quote cache | Redis, optional and later | Limits provider calls and lets multiple viewers share normalized quotes. Add only after measured need. |
| Deployment | Vercel for the web app; managed PostgreSQL if/when persistence is added | Low operational overhead for the initial application. A persistent worker may be evaluated later if continuous provider streams require it. |

### Trade-offs

- Next.js simplifies the first deployment, but long-lived upstream WebSocket connections may later need a separate worker rather than a serverless request lifecycle.
- SSE is deliberately one-way and is ideal for display updates; a later trading or collaboration product would need a different protocol, but those features are out of scope.
- PostgreSQL and Redis are deferred to avoid infrastructure before the product needs durable history or shared cache behavior.
- TradingView Lightweight Charts is focused on financial time series. If the dashboard later needs complex analytical or non-financial visualizations, Apache ECharts should be reconsidered.

## Proposed architecture

```text
Dashboard client
  └─ fetches snapshots / subscribes to SSE
       └─ application server
            ├─ validates and normalizes provider responses
            ├─ publishes a standard quote contract
            ├─ caches latest permitted data (optional, later)
            └─ records permitted operational metadata (optional, later)
                 └─ market-data provider adapters
```

Provider integrations must be isolated behind adapters. UI components must never consume raw provider response formats or provider API keys. Each adapter will report source name, timestamp, availability, and known delay information so the interface can render a truthful state.

## Standard quote contract (proposal)

```ts
type MarketDataState = "LIVE" | "DELAYED" | "CLOSED" | "UNAVAILABLE" | "MOCK";

type MarketQuote = {
  symbol: string;
  name: string;
  assetType: "index" | "forex" | "commodity" | "crypto";
  price: number;
  change: number | null;
  changePercent: number | null;
  currency: string;
  timestamp: string;
  marketStatus: MarketDataState;
  source: string;
  delayMinutes: number | null;
};
```

`timestamp` represents the provider timestamp where supplied. `marketStatus` describes the data state—not merely whether a screen connection is open. Any mock dataset must use `MOCK`, and no delayed source may be labelled `LIVE`.

## Market-data strategy

### Recommendation

Use a provider-adapter architecture with **Twelve Data as the primary evaluation candidate** for the first unified quote integration, and **CoinGecko as a separate crypto evaluation candidate** if its coverage and terms meet the MVP needs.

This is a design recommendation, not an approved commercial-data purchase or an assertion that either source supplies real-time data for every listed instrument. Exchange coverage, freshness, rate limits, websocket access, redistribution rights, commercial terms, and pricing vary by plan and instrument.

### Why this approach

- Twelve Data is a pragmatic candidate to evaluate for a broad API surface across common asset categories, reducing initial adapter complexity.
- CoinGecko is a useful complementary candidate for crypto market data, but its data freshness and terms still need explicit validation.
- Separating adapters keeps the dashboard independent of vendors and permits accurate source attribution per quote.

### Required Phase 5 provider validation

Before credentials are added or UI uses live data, record evidence from current provider documentation and the selected plan for:

1. Exact symbols and asset coverage (including indices, forex, commodities, and crypto).
2. Data delay and exchange-specific real-time entitlements.
3. REST and WebSocket availability, quotas, and reconnect behavior.
4. Historical-candle availability for 1D, 1W, 1M, 3M, 6M, and 1Y charts.
5. Pricing, commercial use, display/redistribution rights, and attribution rules.
6. Key management, acceptable-use terms, and fallback behavior when a provider is unavailable.

Until that validation is complete, development must use clearly labelled `MOCK` data. The UI must show source, last updated time, and `LIVE`, `DELAYED`, `CLOSED`, `UNAVAILABLE`, or `MOCK` as appropriate.

## Planned folder structure

```text
global-market-dashboard/
├── app/                    # Planned Next.js application routes
├── components/             # Planned reusable presentational components
├── features/market/        # Planned market dashboard feature modules
├── lib/                    # Planned shared formatters and utilities
├── server/
│   ├── providers/          # Planned vendor adapters
│   ├── streaming/          # Planned SSE publication and reconnect handling
│   └── validation/         # Planned input/provider payload validation
├── types/                  # Planned shared contracts such as MarketQuote
├── tests/                  # Planned automated tests
├── docs/                   # Phase documentation
└── README.md
```

Only `README.md` and `docs/` exist after Phase 0.

## Phase 0 verification

| Check | Result |
| --- | --- |
| No frontend scaffold created | Verified by workspace inspection and planned layout. |
| No backend, database, or API integration created | Verified by workspace inspection and phase scope. |
| Required Phase 0 documents created | Verified: root README, project overview, changelog, and documentation index. |
| Build/test command | Not applicable: no application or dependency manifest exists yet. |
| Git status | Not verified: `git` is unavailable in the current shell. |

## Next phase

**Phase 1 — Development Environment**, pending approval. It will inspect available Node.js/package-manager tooling, establish a reproducible development environment, and document only the setup actually performed.

## Current scope checkpoint

The planned data types are global indices, foreign exchange, commodities, cryptocurrencies, market status, timestamp, data source, and LIVE/DELAYED/UNAVAILABLE state. None is connected yet.

The product remains read-only: it accepts no orders or deposits and has no portfolio or order execution.
