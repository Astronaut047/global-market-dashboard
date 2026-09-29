import { MockBadge } from "@/components/ui/mock-badge";

const statusItems = [
  {
    label: "Provider",
    value: "Mock Provider",
    detail: "Local fixture-backed provider",
    tone: "text-tertiary",
  },
  {
    label: "Operational",
    value: "Operational",
    detail: "Application boundary available",
    tone: "text-tertiary",
  },
  {
    label: "Data Mode",
    value: "MOCK",
    detail: "No external market feed",
    tone: "text-secondary",
  },
  {
    label: "Trading",
    value: "Disabled",
    detail: "Read-only academic prototype",
    tone: "text-muted",
  },
];

export default function StatusPage() {
  const lastUpdate = new Date().toISOString();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="flex flex-wrap items-center gap-3">
        <MockBadge />
        <span className="text-sm text-muted">System status · Phase 6 QA</span>
      </div>

      <h1 className="mt-4 font-headline text-3xl font-extrabold tracking-tight text-foreground">
        System status
      </h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
        Global Pulse is running as a read-only academic prototype. Market
        values are supplied by local mock fixtures and are not live financial
        information.
      </p>

      <section
        className="mt-8 grid gap-3 sm:grid-cols-2"
        aria-label="System status summary"
      >
        {statusItems.map((item) => (
          <article
            key={item.label}
            className="rounded-xl border border-border bg-surface-container p-5"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
              {item.label}
            </p>
            <p className={`mt-2 text-lg font-bold ${item.tone}`}>
              {item.value}
            </p>
            <p className="mt-1 text-xs text-muted">{item.detail}</p>
          </article>
        ))}
      </section>

      <section className="mt-4 overflow-hidden rounded-xl border border-border bg-surface-container">
        <div className="border-b border-border px-5 py-4">
          <h2 className="text-sm font-bold text-foreground">
            Runtime information
          </h2>
        </div>

        <dl className="divide-y divide-border">
          <div className="grid gap-1 px-5 py-4 sm:grid-cols-2">
            <dt className="text-xs text-muted">Last status render</dt>
            <dd className="font-mono text-xs text-foreground">{lastUpdate}</dd>
          </div>
          <div className="grid gap-1 px-5 py-4 sm:grid-cols-2">
            <dt className="text-xs text-muted">Simulated latency</dt>
            <dd className="text-xs text-foreground">~25 ms</dd>
          </div>
          <div className="grid gap-1 px-5 py-4 sm:grid-cols-2">
            <dt className="text-xs text-muted">Market API</dt>
            <dd className="text-xs text-foreground">Not connected</dd>
          </div>
          <div className="grid gap-1 px-5 py-4 sm:grid-cols-2">
            <dt className="text-xs text-muted">Persistence</dt>
            <dd className="text-xs text-foreground">No database</dd>
          </div>
        </dl>
      </section>

      <div className="mt-4 rounded-xl border border-border bg-surface-low px-5 py-4">
        <p className="text-[10px] leading-relaxed text-muted">
          <span className="font-bold uppercase tracking-wider text-secondary">
            Data integrity:
          </span>{" "}
          status indicators describe the prototype runtime and mock-data state;
          they do not indicate that a live market provider is connected.
        </p>
      </div>
    </div>
  );
}
