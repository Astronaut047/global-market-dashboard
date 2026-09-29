# Changelog

All notable project changes are documented here. Dates use ISO 8601.

## [0.2.0] - 2026-09-29

### Added

- Phase 1 development-environment verification and setup record.
- Git for Windows `2.55.0.windows.5` and an initialized local repository.
- `.nvmrc` pinning the verified Node.js `24.21.0` runtime.

### Changed

- Selected npm as the future project package manager after verifying the bundled npm installation.

### Known Issues

- Git has no global author name or email configured; user input is required before the first commit.
- pnpm and Yarn are not installed. They are not required for the selected npm workflow.
- A newly opened terminal may be required before `git` resolves by name because the installation occurred during the active PowerShell session.

## [0.1.0] - 2026-09-29

### Added

- Initial project scope, architecture recommendation, and market-data strategy.
- Root README and Phase 0 documentation.
- Proposed standard market quote contract and planned repository structure.

### Known Issues

- No application has been scaffolded; there is no frontend, backend, API integration, database, or test suite yet.
- Provider coverage, licensing, freshness, and commercial terms have not been validated for a selected plan.
- Git status could not be checked because `git` is unavailable in the current shell.

