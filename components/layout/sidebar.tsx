"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const navigation = [
  { label: "Overview", href: "#overview", target: "overview", icon: "⌂" },
  { label: "Currencies & Forex Rates", href: "#forex", target: "forex", icon: "↔" },
  { label: "Commodities & Energy", href: "#commodities", target: "commodities", icon: "◆" },
  { label: "Sovereign Bonds & Yields", href: "#yields", target: "yields", icon: "▥" },
  { label: "Central Banks & Rates", href: "#central-banks", target: "central-banks", icon: "⌁" },
  { label: "Supply Chain & Logistics", href: "#supply-chain", target: "supply-chain", icon: "⇄" },
  { label: "Global News Wire", href: "#news", target: "news", icon: "▤" },
];

export function Sidebar() {
  const [activeSection, setActiveSection] = useState("overview");
  const isProgrammaticScroll = useRef(false);
  const navigationTarget = useRef<string | null>(null);

  useEffect(() => {
    const sections = navigation
      .map((item) => document.getElementById(item.target))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) {
      return;
    }

    let animationFrame = 0;

    const updateActiveSection = () => {
      if (isProgrammaticScroll.current) {
        return;
      }

      const activationLine = 96;
      let current = sections[0].id;

      for (const section of sections) {
        if (section.getBoundingClientRect().top <= activationLine) {
          current = section.id;
        } else {
          break;
        }
      }

      setActiveSection((previous) =>
        previous === current ? previous : current,
      );
    };

    const handleScroll = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(updateActiveSection);
    };

    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");

      if (navigation.some((item) => item.target === hash)) {
        setActiveSection(hash);
      }
    };

    updateActiveSection();
    handleHashChange();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const handleNavigation = (target: string) => {
    const section = document.getElementById(target);

    if (!section) {
      return;
    }

    isProgrammaticScroll.current = true;
    navigationTarget.current = target;
    setActiveSection(target);
    window.history.replaceState(null, "", `#${target}`);

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    const releaseNavigationLock = () => {
      if (navigationTarget.current === target) {
        isProgrammaticScroll.current = false;
        navigationTarget.current = null;
        setActiveSection(target);
      }
    };

    if ("onscrollend" in window) {
      window.addEventListener("scrollend", releaseNavigationLock, {
        once: true,
      });
    } else {
      setTimeout(releaseNavigationLock, 800);
    }
  };

  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-72 shrink-0 border-r border-border bg-surface-lowest lg:flex lg:flex-col">
      <div className="flex-1 overflow-y-auto px-3 py-5">
        <nav aria-label="Dashboard sections" className="space-y-1">
          {navigation.map((item) => {
            const isActive = activeSection === item.target;

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={(event) => {
                  const section = document.getElementById(item.target);

                  if (section) {
                    event.preventDefault();
                    handleNavigation(item.target);
                  }
                }}
                className={[
                  "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-semibold transition",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted hover:bg-surface-container hover:text-foreground",
                ].join(" ")}
              >
                <span
                  className={[
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-sm",
                    isActive
                      ? "bg-primary/15 text-primary"
                      : "text-muted group-hover:text-foreground",
                  ].join(" ")}
                  aria-hidden="true"
                >
                  {item.icon}
                </span>
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="my-6 h-px bg-border" />

        <div className="px-3">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
            System
          </p>
          <Link
            href="/status"
            className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-semibold text-muted transition hover:bg-surface-container hover:text-foreground"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-md text-sm text-tertiary">
              ⚡
            </span>
            <span>Telemetry / Synchronized</span>
          </Link>
        </div>
      </div>

      <div className="border-t border-border p-3">
        <div className="rounded-xl border border-border bg-surface-low p-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-tertiary" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-tertiary">
              Mock Data Mode
            </span>
          </div>
          <p className="mt-2 text-[11px] leading-relaxed text-muted">
            Academic prototype. No live market feed or external API is connected.
          </p>
        </div>
      </div>
    </aside>
  );
}
