# Phase 5 — Interactive Dashboard

## Status

**Implementation Complete / Verification Pending**

Phase 5 extends the read-only mock dashboard with interactive Region and Time Horizon controls, functional CSV export, a Mock Supply Chain & Logistics panel, and expanded Intelligence Wire context.

## Scope

Phase 5 does not introduce:

- Real market-data APIs
- API keys
- Live market feeds
- Trading or order execution
- Portfolio functionality
- Database storage
- Fabricated historical market series
- Real news or logistics feeds

All dashboard values remain local mock fixtures.

## Interactive controls

### Region

Supported regions:

- Global
- US
- EU
- APAC
- EM

The selected region is shared through the main dashboard state and is passed to relevant panels.

### Time Horizon

Supported horizons:

- 24H
- 7D
- 1M
- YTD

The selected horizon is intentionally treated as dashboard context.

It changes labels, descriptions, and exported metadata, but does not create historical observations or recalculate mock market values.

## Functional dashboard modules

Phase 5 connects the following modules to the dashboard state:

- Macro KPI Grid
- Central Bank Matrix
- Rate Watch
- Forex Matrix
- Yield Curve
- Commodities & Resource panel
- Supply Chain & Logistics
- Intelligence Wire

## Supply Chain & Logistics

A new Mock Logistics Monitor was added.

### Mock metrics

- Global Transit Index
- Port Capacity
- Air Cargo Capacity
- Route Disruption

### Route monitor

Routes contain:

- Region
- Route name
- Transport mode
- Status
- Transit Index
- Capacity
- Mock scenario note

### Transport modes

- Sea
- Air
- Rail
- Road

The panel explicitly states that values are fixed local mock fixtures and do not represent live shipping conditions.

## Intelligence Wire

The Intelligence Wire now receives both:

- selected Region
- selected Time Horizon

Region changes which mock entries are displayed.

The Time Horizon changes the displayed dashboard context only. It does not generate historical news or imply that the entries are live news.

## CSV export

The Data Export button in the Macro Header is functional.

The export is performed entirely in the browser using:

- Blob
- object URLs
- temporary download anchor

No API request is made.

### Export filename

The filename follows this pattern:

`global-pulse-<region>-<horizon>-mock.csv`

Example:

`global-pulse-apac-7d-mock.csv`

### Export contents

The CSV contains:

- Export metadata
- Data mode
- Region
- Time Horizon
- Horizon description
- Macro KPIs
- Central bank snapshots
- Forex matrix
- Commodities
- Yield curves
- Rate Watch

The export is clearly labelled as Mock data.

## Files added

```text
data/mock-supply-chain-data.ts
components/dashboard/supply-chain-panel.tsx
lib/dashboard-export.ts
```

## Files updated

```text
app/page.tsx
components/dashboard/macro-header.tsx
components/dashboard/intelligence-wire.tsx
README.md
docs/CHANGELOG.md
```

## Architecture

The browser continues to use local mock fixtures for the dashboard.

```text
Dashboard UI
    ↓
React dashboard state
    ↓
Local mock data modules
    ↓
Interactive presentation / CSV export
```

The Phase 4 application API remains available as a separate server-side boundary for normalized mock market quotes.

## Verification

The project provides:

```bash
npm run lint
npm run build
```

The current workspace tool session does not expose a shell/npm execution command, so Phase 5 lint and build verification have not been executed in this session.

Before committing Phase 5 as fully verified, run:

```bash
npm run lint
npm run build
```

from the project terminal.

## Acceptance checklist

- [x] Region selector remains functional
- [x] Time Horizon selector remains functional
- [x] Data Export button is functional
- [x] Export is Mock-only
- [x] Supply Chain section is no longer a placeholder
- [x] Supply Chain follows selected Region
- [x] Supply Chain displays selected Horizon context
- [x] Intelligence Wire follows selected Region
- [x] Intelligence Wire displays selected Horizon context
- [x] No live market feed added
- [x] No external API added
- [x] No fabricated historical series added
- [ ] Final `npm run lint`
- [ ] Final `npm run build`

## Phase 5 conclusion

The Phase 5 implementation is complete. The remaining step is local terminal verification with ESLint and Next.js production build before creating the Phase 5 Git commit.
