export default function MarketNotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="text-3xl font-bold">Market not found</h1>
      <p className="mt-3 text-[var(--muted)]">The requested symbol is not present in the current mock dataset.</p>
    </div>
  );
}