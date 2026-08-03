"use client";

const tickers = [
  { symbol: "BTC", name: "Bitcoin", price: "$67,420.50", delta: "+3.24%", up: true },
  { symbol: "ETH", name: "Ethereum", price: "$3,518.20", delta: "-0.82%", up: false },
  { symbol: "SOL", name: "Solana", price: "$182.41", delta: "+5.61%", up: true },
  { symbol: "BNB", name: "BNB", price: "$612.88", delta: "+1.12%", up: true },
  { symbol: "XRP", name: "Ripple", price: "$0.6234", delta: "-1.45%", up: false },
  { symbol: "ADA", name: "Cardano", price: "$0.4521", delta: "+2.08%", up: true },
  { symbol: "DOGE", name: "Dogecoin", price: "$0.1583", delta: "+4.77%", up: true },
  { symbol: "AVAX", name: "Avalanche", price: "$38.92", delta: "-0.34%", up: false },
  { symbol: "DOT", name: "Polkadot", price: "$7.21", delta: "+1.98%", up: true },
  { symbol: "MATIC", name: "Polygon", price: "$0.7102", delta: "-2.11%", up: false },
];

export function Ticker() {
  const items = [...tickers, ...tickers];
  return (
    <section
      aria-label="Симулированные цены (демо)"
      className="border-y border-border/60 bg-card/30"
    >
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-8 py-3">
          {items.map((t, i) => (
            <div
              key={`${t.symbol}-${i}`}
              className="flex shrink-0 items-center gap-2 text-sm"
            >
              <span className="font-semibold">{t.symbol}</span>
              <span className="font-mono text-muted-foreground tabular-nums">{t.price}</span>
              <span
                className={`font-mono text-xs font-medium tabular-nums ${
                  t.up ? "text-emerald-500" : "text-rose-500"
                }`}
              >
                {t.delta}
              </span>
              <span className="ml-2 h-1 w-1 rounded-full bg-border" />
            </div>
          ))}
        </div>
      </div>
      <div className="px-4 py-1.5 text-center text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
        Демо-данные · симуляция KB Learning · не финансовая рекомендация
      </div>
    </section>
  );
}
