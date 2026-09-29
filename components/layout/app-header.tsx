import Link from "next/link";
import { MarketSearch } from "@/components/layout/market-search";

const clocks = [
  { label: "UTC", time: "14:28:42", active: true },
  { label: "NY", time: "10:28:42", active: true },
  { label: "LON", time: "15:28:42", active: true },
  { label: "TKY", time: "23:28:42", active: false },
];

export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur">
      <div className="flex h-16 items-center gap-4 px-4 lg:px-6">
        <Link
          href="/"
          className="flex min-w-fit items-center gap-3"
          aria-label="Global Pulse dashboard"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-surface-lowest">
            <span className="text-lg font-black">GP</span>
          </span>
          <span className="hidden sm:block">
            <span className="block font-headline text-sm font-extrabold tracking-tight text-foreground">
              Global Pulse
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
              Macro Terminal
            </span>
          </span>
        </Link>

        <div className="hidden h-8 w-px bg-border lg:block" />

        <div className="hidden items-center gap-4 text-xs xl:flex" aria-label="Market clocks">
          {clocks.map((clock) => (
            <div key={clock.label} className="flex items-center gap-2">
              <span className="font-semibold text-muted">{clock.label}</span>
              <span className="font-mono tabular-nums text-foreground">{clock.time}</span>
              <span
                className={
                  clock.active
                    ? "h-1.5 w-1.5 rounded-full bg-tertiary"
                    : "h-1.5 w-1.5 rounded-full bg-outline"
                }
                aria-label={clock.active ? "market active" : "market inactive"}
              />
            </div>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <MarketSearch />

          <button
            type="button"
            aria-label="Notifications"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-transparent text-muted transition hover:border-border hover:bg-surface-container hover:text-foreground"
          >
            <span aria-hidden="true">◌</span>
          </button>

          <div className="hidden h-8 w-px bg-border sm:block" />

          <button
            type="button"
            aria-label="Profile"
            className="flex items-center gap-2 rounded-lg px-1.5 py-1 transition hover:bg-surface-container"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-xs font-bold text-primary">
              AP
            </span>
            <span className="hidden text-left lg:block">
              <span className="block text-xs font-semibold text-foreground">Analyst</span>
              <span className="block text-[10px] text-muted">Academic Mode</span>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
