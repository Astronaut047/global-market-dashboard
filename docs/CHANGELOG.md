# Changelog

All notable project changes are documented here. Dates use ISO 8601.

## [0.2.0] - 2026-09-29

### Added

- Phase 1 development-environment verification and setup record.
- Git for Windows `2.55.0.windows.5` and an initialized local repository.
- `.nvmrc` pinning the verified Node.js `24.21.0` runtime.

### Changed

- Selected npm as the future project package manager after verifying the bundled npm installation.

### Verification notes

- Git identity was configured before the first commit using a GitHub private noreply address.
- pnpm and Yarn are not installed. They are not required for the selected npm workflow.
- A newly opened terminal may be required before `git` resolves by name because the installation occurred during the active PowerShell session.
- The repository was later connected to the private GitHub remote and the branch was renamed to `main`.

## [0.1.0] - 2026-09-29

### Added

- Initial project scope, architecture recommendation, and market-data strategy.
- Root README and Phase 0 documentation.
- Proposed standard market quote contract and planned repository structure.

### Verification notes

- No application has been scaffolded; there is no frontend, backend, API integration, database, or test suite yet.
- Provider coverage, licensing, freshness, and commercial terms have not been validated for a selected plan.
- Git status was subsequently verified during Phases 1–2.


## [0.3.0] - 2026-09-29

### Added

- Phase 2 architecture for the read-only market dashboard.
- Provider abstraction, realtime, cache, security, deployment, and testing design.

### Verification

- Architecture reviewed without creating application code, dependencies, provider credentials, API connections, database infrastructure, or deployment configuration.
- Local repository verified on `main`; GitHub `origin` is configured and the repository is private.

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
- No `.env*` files were found during workspace inspection.
- Phase 3 is **COMPLETE**. No Phase 4 work has been started.

