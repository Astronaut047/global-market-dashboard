import type { Metadata } from "next";
import "./globals.css";
import { AppHeader } from "@/components/layout/app-header";
import { Sidebar } from "@/components/layout/sidebar";

export const metadata: Metadata = {
  title: "Global Pulse — Macro Terminal",
  description: "Read-only global market dashboard using clearly labelled mock data.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppHeader />
        <div className="flex min-h-[calc(100vh-4rem)]">
          <Sidebar />
          <main className="min-w-0 flex-1">{children}</main>
        </div>
        <footer className="border-t border-border bg-surface-lowest px-4 py-5 text-xs text-muted lg:ml-72">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span>Global Pulse · Academic Prototype</span>
            <span>Mock Market Data only · No live market feed</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
