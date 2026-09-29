# Phase 4 — Backend Foundation & Mock Market API

**Status:** COMPLETE  
**Project type:** Academic Prototype  
**Data mode:** Mock-only  
**External market-data API:** None

---

## 1. Phase Objective

Phase 4 establishes the server-side market-data boundary for the Global Market Dashboard.

This phase intentionally uses a **Mock Market Data Provider** instead of a real market-data API because this project is an academic prototype with no requirement or budget for paid/live market-data services.

The goal is to keep the architecture ready for a future real provider without requiring an API key or external service during development.

---

## 2. Architecture

The current data flow is:

```
Browser
   ↓
Next.js API Route
   ↓
Market Data Service
   ↓
Mock Market Data Provider
   ↓
data/mock-market-data.ts
```

The browser does not call the mock-data module directly through the API boundary.

The provider abstraction also keeps the application independent from a specific market-data vendor.

---

## 3. Why Mock Provider?

The project does not require real-time financial data for the academic prototype.

Using a Mock Provider provides:

- No API key
- No external service dependency
- No subscription cost
- No provider rate-limit dependency
- Deterministic development data
- Easy local testing
- A clear separation between application logic and data-provider logic

The mock data is **not real market data** and must not be presented as live financial information.

---

## 4. Provider Abstraction

The application defines a provider interface in:

```
server/market-data/types.ts
```

The interface is:

```ts
export interface MarketDataProvider {
  getQuote(symbol: string): Promise<MarketQuote>;
}
```

The current implementation is:

```
server/providers/mock.ts
```

with:

```ts
MockMarketDataProvider
```

This means the service layer does not need to know how market data is produced.

A future provider could implement the same interface without changing the API contract.

---

## 5. Mock Data Source

Mock market instruments are stored in:

```
data/mock-market-data.ts
```

The current fixture set contains:

### Indices

- SPX
- NDX
- DJI
- FTSE
- N225
- HSI

### FX

- EUR/USD
- GBP/USD
- USD/JPY

### Commodities

- XAU/USD
- XAG/USD
- WTI

### Crypto

- BTC/USD
- ETH/USD

Every mock quote uses:

```
status: "MOCK"
source: "Mock Provider"
```

This makes the data origin explicit in the application.

---

## 6. Canonical Symbol Validation

Symbol validation is handled by:

```
server/market-data/symbols.ts
```

The function:

```ts
getCanonicalMarket(symbol)
```

normalizes the incoming symbol and checks it against the supported mock instruments.

Unsupported symbols are rejected before market data is requested.

---

## 7. Market Data Service

The service is located at:

```
server/market-data/service.ts
```

The service creates the current provider:

```ts
const provider: MarketDataProvider = new MockMarketDataProvider();
```

The API route therefore communicates with the service rather than directly depending on the mock-data fixture.

This preserves the intended architecture:

```
API Route
   ↓
Service
   ↓
Provider Interface
   ↓
Mock Provider
   ↓
Mock Fixtures
```

---

## 8. API Endpoint

The server endpoint is:

```
GET /api/markets?symbol=SPX
```

### Valid symbol

A valid supported symbol returns HTTP `200` with normalized quote data.

The exact fixture values may vary because the mock history is generated at runtime.

### Invalid symbol

An unsupported symbol returns HTTP `400`.

Example:

```json
{
  "error": "Invalid or unsupported market symbol."
}
```

### Unexpected server error

Unexpected failures return HTTP `503` with an `UNAVAILABLE` status where appropriate.

---

## 9. Error Boundary

The application uses:

```
MarketDataError
```

to keep provider/service errors separate from HTTP response handling.

Current error categories include:

- `INVALID_SYMBOL`
- `UPSTREAM`
- `CONFIGURATION`
- `TIMEOUT`

The Mock Provider currently needs only the invalid-symbol path during normal operation. The additional categories remain available for future provider implementations.

---

## 10. Environment Variables

The current academic prototype does **not** require market-data environment variables.

The project contains:

```
.env.example
```

which documents that no external market-data API is required.

No API key should be added to the repository for the current Mock-only implementation.

If a real provider is introduced in a future version, provider-specific server-only environment variables should be documented separately.

---

## 11. Security Rules

Even though the current provider is local mock data, the following architectural rules remain:

1. Browser code must not contain provider secrets.
2. API keys must never be committed to Git.
3. Real provider credentials, if introduced later, must remain server-side.
4. The browser should communicate through the application's API boundary.
5. Provider-specific implementation details should remain outside the UI layer.

These rules preserve a safe migration path toward a real provider if the project requirements change.

---

## 12. Scope Limitations

Phase 4 does not implement:

- Real-time market data
- External market-data APIs
- Trading
- Order execution
- Portfolio persistence
- User accounts
- Database storage
- WebSocket market streams
- SSE streaming
- Redis
- Production financial-data licensing

The project is a read-only academic prototype.

---

## 13. Future Migration Path

If real market data becomes a requirement later, the intended migration is:

```
Current
Mock Provider
     ↓
Server-side polling
     ↓
Provider-compliant streaming
     ↓
Normalized application contract
     ↓
SSE / other application transport
```

A future real provider should implement the existing `MarketDataProvider` interface rather than coupling the UI directly to that provider.

Any future provider must be evaluated separately for:

- Symbol coverage
- Data freshness
- Licensing
- Exchange entitlements
- Rate limits
- Cost
- API reliability
- Historical-data availability
- Commercial-use restrictions

No real-provider capability is claimed by the current implementation.

---

## 14. Phase 4 Verification Results

### Code quality

```powershell
npm run lint
```

**Result: PASS**

No ESLint errors or warnings were reported.

### Production build

```powershell
npm run build
```

**Result: PASS**

Next.js production build completed successfully, including TypeScript checking, page generation, and route optimization.

### API — valid Index symbol

Tested:

```
GET /api/markets?symbol=SPX
```

**Result: PASS — HTTP 200**

Verified:

```json
"symbol": "SPX"
"status": "MOCK"
"source": "Mock Provider"
```

### API — valid Crypto symbol

Tested:

```
GET /api/markets?symbol=BTC%2FUSD
```

**Result: PASS — HTTP 200**

Verified:

```json
"symbol": "BTC/USD"
"assetType": "CRYPTO"
"status": "MOCK"
"source": "Mock Provider"
```

### API — invalid symbol

Tested:

```
GET /api/markets?symbol=INVALID
```

**Result: PASS — HTTP 400**

Response:

```json
{
  "error": "Invalid or unsupported market symbol."
}
```

---

## 15. Completion Criteria

- [x] Provider interface exists
- [x] Mock Provider exists
- [x] Twelve Data dependency has been removed
- [x] Provider-specific symbol mapping has been removed
- [x] API key requirement has been removed
- [x] Server-side API route exists
- [x] Invalid symbols are rejected
- [x] `npm run lint` passes after the Mock conversion
- [x] `npm run build` passes after the Mock conversion
- [x] Valid API request returns mock data
- [x] Invalid API request returns HTTP 400
- [ ] Phase 4 commit is created
- [ ] Phase 4 commit is pushed to GitHub

---

## 16. Summary

Phase 4 provides the backend foundation without introducing the cost or dependency of a real market-data provider.

The current architecture is:

```
Next.js API
     ↓
Market Data Service
     ↓
Mock Market Data Provider
     ↓
Local Mock Fixtures
```

The implementation and verification work for Phase 4 is complete. The remaining steps are Git commit and push to the private GitHub repository.

This phase is sufficient for an academic, read-only prototype while preserving a clean boundary for a future real-data implementation.
