# Phase 2 - Project Architecture

**Status:** Complete (documentation only)  
**Date:** 2026-09-29

## Scope

Global Market Dashboard is a read-only dashboard for global indices, foreign exchange, commodities, and cryptocurrency. It has no orders, execution, funds, or portfolio features. This phase creates no application code, frontend, backend, database, dependency, API credential, provider connection, or deployment.

## Decisions

| Area | Decision | Reason |
| --- | --- | --- |
| Framework | Next.js App Router, React, TypeScript, Tailwind CSS in Phase 3. | One typed project supports UI and server-only boundaries. |
| Contract | Normalize provider output before UI delivery. | Provider replacement does not require broad frontend changes. |
| Updates | Start with snapshots; consider SSE after provider validation. | The dashboard is one-way and should begin simply. |
| Charts | TradingView Lightweight Charts. | Fits read-only financial time series. |
| State | Component state for UI; feature query/cache boundary for remote data. | Avoid premature global state. |
| Database | No MVP database. | No scoped durable user data exists. |
| Cache | No distributed cache initially. | Add only for measured quota, latency, or concurrency pressure. |

## Frontend architecture

Planned routes are `/` for overview, `/markets/[symbol]` for detail/chart, and optional `/status` for provider freshness. Planned components include an application shell/header/data banner; market overview/section/quote-card/status-badge/meta/chart/range-selector; and loading/empty/error states.

Server data (quotes, history, source, last update) lives at a feature query/cache boundary. Local controls (range and section expansion) stay in component state. Pure utilities derive price formatting, direction, and stale labels. Components consume normalized application data only, never vendor payloads or API keys.

Desktop uses multi-column sections, tablet reduces columns, and mobile uses single-column cards. Color is supplemented by text/icons and all loading, empty, error, and stale states are explicit.

**Alternative:** separate React SPA plus API service. It adds CORS, deployment, and contract overhead before necessary.

## Backend architecture

The request path is: browser -> application API route -> validation/rate guard -> market-data service -> provider adapter -> provider API or stream -> normalized result.

| Layer | Responsibility |
| --- | --- |
| API | Strict public validation, stable response shape, safe errors, request IDs. |
| Market-data service | Adapter selection, normalization, freshness calculation, source/status metadata. |
| Provider adapter | Authentication, symbol mapping, parsing, provider-specific errors. |
| Validation | Allowlist browser inputs and reject invalid external payloads. |
| Error handling | Bounded retries; retain last data only when age and licensing permit it. |
| Rate handling | Concurrency limits, `Retry-After`, backoff, circuit breaking, permitted cache. |

Invalid requests do not call providers. Rate limits, timeouts, malformed payloads, or configuration failures return safe delayed/unavailable states. Raw provider errors and credentials are never exposed.

## Market data and provider abstraction

Every quote has symbol, name, asset type, price, change when supplied, currency, provider timestamp, source, known delay, and `LIVE`, `DELAYED`, `CLOSED`, `UNAVAILABLE`, or `MOCK`. `LIVE` requires evidence that the selected plan and exchange entitlement support it.

Adapters expose capabilities such as latest quote, historical series, session metadata, and optional streaming. Adapters own vendor symbol translation; browser code uses canonical application symbols.

| Candidate | Potential role | Status |
| --- | --- | --- |
| Twelve Data | Broad quote/history evaluation candidate. | Not selected. |
| CoinGecko | Cryptocurrency quote/history candidate. | Not selected. |
| Direct exchange/crypto provider | Candidate where terms and coverage fit. | Not selected. |
| Other licensed provider | Candidate with better requirements fit. | Not selected. |

Phase 5 must verify current API limits, streaming, freshness, exact coverage, historical data, licensing, exchange entitlements, attribution, commercial/display rights, cost, and fallback behavior before selection.

Freshness compares provider timestamp, server receipt time, expected cadence, asset class, and market metadata. `CLOSED` is session state, `DELAYED` is provider/plan delay, `UNAVAILABLE` has no valid quote, and `MOCK` is development-only. Exact thresholds are an open question until provider evidence exists.

## Real-time, caching, and security

Progression: explicit mock fixtures, provider-compliant server polling, one server-side upstream stream shared by clients only if entitled, then normalized SSE browser events if justified. The server owns provider connections. Reconnect uses bounded exponential backoff with jitter; stale detection uses timestamps/cadence rather than socket closure. Connection state remains separate from data state. Repeated upstream failure opens a temporary circuit breaker.

Browser/application WebSockets are an alternative only if an approved future feature needs bidirectional messages.

No cache is needed before real provider traffic. If needed later, cache normalized server results after validation: latest quotes in memory then Redis for multi-instance coordination; history in server/CDN-compatible cache; configuration in server memory. Retention, delay labels, and redistribution must comply with provider terms.

- Provider keys are server-side environment configuration only: never browser bundles, repository files, logs, or error responses.
- Future `.env` files remain untracked; preview and production secrets are separated.
- API inputs use strict schemas, allowlists, response-size bounds, and application rate limits.
- Redact authorization headers, keys, tokens, and raw provider error bodies.
- Prefer same-origin access, restrictive CORS, HTTPS, and deployment security headers.

## Database, deployment, testing

**Database decision:** no MVP database. Accounts, user settings, portfolios, and permitted historical ingestion are out of scope. PostgreSQL is a future candidate for approved durable metadata; Redis is a future candidate for shared caching. Neither is provisioned here.

| Environment | Intended architecture |
| --- | --- |
| Development | Local application with mock data; no provider key for UI work. |
| Preview | Isolated deployment with mock/sanitized data and no production credentials. |
| Production | HTTPS application, server-only secrets, monitoring, entitlement-aware provider configuration; persistent worker only if validated streams require it. |

| Test layer | Design |
| --- | --- |
| Unit | Formatters, freshness/status, symbol maps, validation. |
| Provider adapter | Synthetic/recorded payloads and typed failure fixtures. |
| Integration/API | API/service with fake adapter plus response-schema tests. |
| Frontend | Components with normalized `MOCK` fixtures. |
| E2E | Optional mock-endpoint workflows; no live provider dependency. |

## Planned folder structure

Future directories are `app`, `components`, `features/market`, `lib`, `server` (market service, providers, streaming, validation), `types`, `tests` (unit, integration, contract, mock fixtures), and `docs`. They are not created in this phase.

## Assumptions and open questions

| Type | Item | Resolution |
| --- | --- | --- |
| Assumption | MVP uses a curated instrument list. | Confirm before integration. |
| Assumption | Browser updates are one-way. | Revisit only for approved interaction. |
| Open question | Provider/plan per asset class and geography. | Validate rights, coverage, cost, entitlements in Phase 5. |
| Open question | Delay labels and stale thresholds. | Record provider evidence before live/delayed claims. |
| Open question | Persistent streaming worker. | Measure after provider selection. |
| Open question | Markets, symbols, currencies, chart ranges. | Obtain product direction. |

## Verification

README, Phase 0, Phase 1, and changelog were reviewed. Branch `main` was clean and commit `fff4c26` verified before this phase. No application code, dependency, API integration, database, secret, or deployment was created.

## Next phase

**Phase 3 - Frontend Setup** requires explicit approval and must not start automatically.
