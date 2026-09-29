import type { AssetType, MarketInstrument } from "@/types/market";

const history = (base: number, steps: number[]) =>
  steps.map((delta, index) => ({
    timestamp: new Date(Date.now() - (steps.length - index) * 60 * 60 * 1000).toISOString(),
    price: Number((base + delta).toFixed(4)),
  }));

const instrument = (
  symbol: string,
  name: string,
  assetType: AssetType,
  currency: string,
  price: number,
  change: number,
  changePercent: number,
  steps: number[],
): MarketInstrument => ({
  symbol, name, assetType, currency, price, change, changePercent,
  status: "MOCK", timestamp: new Date().toISOString(), source: "Mock Provider",
  history: history(price, steps),
});

export const MOCK_MARKET_DATA: MarketInstrument[] = [
  instrument("SPX", "S&P 500", "INDEX", "USD", 5634.61, 31.45, 0.56, [-38,-24,-12,-20,-4,8,2,15,9,31]),
  instrument("NDX", "NASDAQ", "INDEX", "USD", 18392.03, 118.62, 0.65, [-140,-92,-55,-70,-35,-18,10,42,72,118]),
  instrument("DJI", "Dow Jones", "INDEX", "USD", 41407.80, 96.12, 0.23, [-110,-80,-44,-65,-30,-15,8,20,54,96]),
  instrument("FTSE", "FTSE 100", "INDEX", "GBP", 8283.37, -24.11, -0.29, [52,38,20,32,18,8,-4,2,-12,-24]),
  instrument("N225", "Nikkei 225", "INDEX", "JPY", 38126.33, 214.40, 0.57, [-240,-180,-110,-72,-30,5,60,92,148,214]),
  instrument("HSI", "Hang Seng", "INDEX", "HKD", 17689.40, -82.70, -0.47, [190,142,96,70,42,20,-12,-26,-55,-82]),
  instrument("EUR/USD", "Euro / US Dollar", "FX", "USD", 1.0842, 0.0021, 0.19, [-0.009,-0.006,-0.004,-0.003,-0.001,0.001,0.003,0.004,0.001,0.002]),
  instrument("GBP/USD", "British Pound / US Dollar", "FX", "USD", 1.2718, -0.0014, -0.11, [0.008,0.006,0.004,0.002,0.001,-0.001,-0.002,-0.001,-0.003,-0.001]),
  instrument("USD/JPY", "US Dollar / Japanese Yen", "FX", "JPY", 157.21, 0.34, 0.22, [-1.1,-0.8,-0.5,-0.2,-0.4,-0.1,0.2,0.4,0.6,0.34]),
  instrument("XAU/USD", "Gold", "COMMODITY", "USD", 2356.70, 12.40, 0.53, [-30,-24,-18,-12,-7,-3,4,6,9,12]),
  instrument("XAG/USD", "Silver", "COMMODITY", "USD", 30.41, 0.28, 0.93, [-1.3,-1.0,-0.7,-0.4,-0.2,0.1,0.3,0.4,0.2,0.28]),
  instrument("WTI", "Crude Oil", "COMMODITY", "USD", 78.32, -0.62, -0.79, [2.4,1.8,1.2,0.8,0.2,-0.3,-0.6,-0.4,-0.7,-0.62]),
  instrument("BTC/USD", "Bitcoin", "CRYPTO", "USD", 64280.50, 812.30, 1.28, [-1800,-1300,-900,-500,-220,180,420,650,720,812]),
  instrument("ETH/USD", "Ethereum", "CRYPTO", "USD", 3482.70, 38.60, 1.12, [-120,-90,-55,-30,-12,8,22,34,29,38]),
];

export const MARKET_GROUPS: { key: AssetType; title: string }[] = [
  { key: "INDEX", title: "Global Indices" },
  { key: "FX", title: "Foreign Exchange" },
  { key: "COMMODITY", title: "Commodities" },
  { key: "CRYPTO", title: "Crypto" },
];

export function getMarketBySymbol(symbol: string): MarketInstrument | undefined {
  const normalized = decodeURIComponent(symbol).toUpperCase();
  return MOCK_MARKET_DATA.find((market) => market.symbol.toUpperCase() === normalized);
}