import type { Metadata } from "next";
import "./globals.css";
import { AppHeader } from "@/components/layout/app-header";

export const metadata: Metadata = {
  title: "Global Market Dashboard",
  description: "Read-only global market overview using clearly labelled mock data.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AppHeader />
        <main>{children}</main>
        <footer className="mx-auto max-w-7xl px-4 pb-8 text-xs text-[var(--muted)] sm:px-6 lg:px-8">
          Charting by TradingView Lightweight Charts · Development mock data only
        </footer>
      </body>
    </html>
  );
}