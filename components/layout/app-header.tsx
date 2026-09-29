import Link from "next/link";

export function AppHeader() {
  return (
    <header className="border-b border-[var(--border)] bg-[#091524]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-bold tracking-tight">Global Market Dashboard</Link>
        <nav aria-label="Primary navigation" className="flex gap-4 text-sm text-[var(--muted)]">
          <Link href="/" className="hover:text-white">Markets</Link>
          <Link href="/status" className="hover:text-white">Status</Link>
        </nav>
      </div>
    </header>
  );
}