import { MockBadge } from "@/components/ui/mock-badge";

export default function StatusPage() {
  const lastUpdate = new Date().toISOString();
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3"><MockBadge /><span className="text-sm text-[var(--muted)]">Development environment</span></div>
      <h1 className="mt-4 text-3xl font-bold">System status</h1>
      <p className="mt-2 text-[var(--muted)]">Phase 3 uses a local mock provider only.</p>
      <div className="mt-8 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--panel)]">
        <dl className="divide-y divide-[var(--border)]">
          <div className="grid gap-1 p-5 sm:grid-cols-2"><dt className="text-[var(--muted)]">Provider</dt><dd>Mock Provider</dd></div>
          <div className="grid gap-1 p-5 sm:grid-cols-2"><dt className="text-[var(--muted)]">Operational</dt><dd className="text-emerald-300">Operational</dd></div>
          <div className="grid gap-1 p-5 sm:grid-cols-2"><dt className="text-[var(--muted)]">Data</dt><dd>Mock</dd></div>
          <div className="grid gap-1 p-5 sm:grid-cols-2"><dt className="text-[var(--muted)]">Last Update</dt><dd>{lastUpdate}</dd></div>
          <div className="grid gap-1 p-5 sm:grid-cols-2"><dt className="text-[var(--muted)]">Mock Latency</dt><dd>~25 ms (simulated)</dd></div>
        </dl>
      </div>
    </div>
  );
}