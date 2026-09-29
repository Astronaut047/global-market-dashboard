"use client";

import { useState } from "react";
import { CommoditiesPanel } from "@/components/dashboard/commodities-panel";
import { CentralBankMatrix } from "@/components/dashboard/central-bank-matrix";
import { ForexMatrix } from "@/components/dashboard/forex-matrix";
import { IntelligenceWire } from "@/components/dashboard/intelligence-wire";
import { KpiGrid } from "@/components/dashboard/kpi-grid";
import { MacroHeader } from "@/components/dashboard/macro-header";
import { RateWatch } from "@/components/dashboard/rate-watch";
import { SupplyChainPanel } from "@/components/dashboard/supply-chain-panel";
import { YieldCurve } from "@/components/dashboard/yield-curve";
import type { DashboardRegion, TimeHorizon } from "@/data/mock-dashboard-data";

export default function HomePage() {
  const [selectedRegion, setSelectedRegion] =
    useState<DashboardRegion>("GLOBAL");
  const [selectedHorizon, setSelectedHorizon] =
    useState<TimeHorizon>("24H");

  return (
    <div className="min-h-full bg-surface">
      <div id="overview" className="scroll-mt-20">
        <MacroHeader
          selectedRegion={selectedRegion}
          selectedHorizon={selectedHorizon}
          onRegionChange={setSelectedRegion}
          onHorizonChange={setSelectedHorizon}
        />
      </div>

      <div className="mx-auto max-w-[1600px] space-y-4 px-4 py-5 sm:px-6 lg:px-8 lg:py-6">
        <KpiGrid selectedHorizon={selectedHorizon} />

        <div id="central-banks" className="scroll-mt-20 grid gap-4 xl:grid-cols-2">
          <CentralBankMatrix selectedRegion={selectedRegion} />
          <RateWatch
            selectedRegion={selectedRegion}
            selectedHorizon={selectedHorizon}
          />
        </div>

        <div id="forex" className="scroll-mt-20">
          <ForexMatrix
            selectedRegion={selectedRegion}
            selectedHorizon={selectedHorizon}
          />
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          <div id="yields" className="scroll-mt-20">
            <YieldCurve selectedRegion={selectedRegion} />
          </div>
          <div id="commodities" className="scroll-mt-20">
            <CommoditiesPanel
              selectedRegion={selectedRegion}
              selectedHorizon={selectedHorizon}
            />
          </div>
        </div>

        <div id="supply-chain" className="scroll-mt-20">
          <SupplyChainPanel
            selectedRegion={selectedRegion}
            selectedHorizon={selectedHorizon}
          />
        </div>

        <div id="news" className="scroll-mt-20">
          <IntelligenceWire
            selectedRegion={selectedRegion}
            selectedHorizon={selectedHorizon}
          />
        </div>
      </div>
    </div>
  );
}
