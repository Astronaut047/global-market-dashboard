"use client";

import { useEffect, useRef } from "react";
import { createChart, LineSeries, ColorType, type IChartApi, type UTCTimestamp } from "lightweight-charts";
import type { MarketHistoryPoint } from "@/types/market";

export function MarketChart({ data }: { data: MarketHistoryPoint[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!containerRef.current || !data.length) return;

    const chart = createChart(containerRef.current, {
      autoSize: true,
      height: 320,
      layout: { background: { type: ColorType.Solid, color: "#0d1a2b" }, textColor: "#8ea2ba" },
      grid: { vertLines: { color: "#20334a" }, horzLines: { color: "#20334a" } },
      rightPriceScale: { borderColor: "#20334a" },
      timeScale: { borderColor: "#20334a" },
    });

    const series = chart.addSeries(LineSeries, {
      lineWidth: 2,
      priceLineVisible: false,
      lastValueVisible: true,
    });

    series.setData(data.map((point) => ({
      time: Math.floor(new Date(point.timestamp).getTime() / 1000) as UTCTimestamp,
      value: point.price,
    })));

    chart.timeScale().fitContent();
    chartRef.current = chart;

    return () => {
      chart.remove();
      chartRef.current = null;
    };
  }, [data]);

  return <div ref={containerRef} className="h-[320px] w-full overflow-hidden rounded-xl border border-[var(--border)]" aria-label="Mock historical price chart" />;
}