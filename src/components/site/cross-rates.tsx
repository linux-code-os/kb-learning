"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Grid3x3, Radio } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLang, useT } from "@/components/site/language-toggle";
import { pick } from "@/lib/translations";
import { demoCoins } from "@/lib/site-data";
import { useSimulatorStore } from "@/lib/simulator-store";

function formatRate(n: number): string {
  if (n >= 100) return n.toFixed(0);
  if (n >= 1) return n.toFixed(4);
  if (n >= 0.01) return n.toFixed(6);
  return n.toExponential(2);
}

export function CrossRates() {
  const { lang } = useLang();
  const t = useT();
  const liveCoins = useSimulatorStore((s) => s.coins);

  // Берём 6 основных монет. Цены — из live store (если есть), иначе из demoCoins.
  const coins = React.useMemo(() => {
    const symbols = ["BTC", "ETH", "SOL", "BNB", "XRP", "ADA"];
    return symbols.map((sym) => {
      const live = liveCoins.find((c) => c.symbol === sym);
      const demo = demoCoins.find((c) => c.symbol === sym);
      return {
        symbol: sym,
        name: demo?.name ?? sym,
        price: live?.price ?? demo?.priceUsd ?? 1,
        change24h: live?.change24h ?? 0,
      };
    });
  }, [liveCoins]);

  const isLive = liveCoins.length > 0;

  return (
    <section id="rates" className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={pick({ ru: "Кросс-курсы", en: "Cross-rates" }, lang)}
          title={
            <>
              {pick({ ru: "Матрица курсов", en: "Rates matrix" }, lang)}{" "}
              <span className="text-gradient-brand">
                {pick({ ru: "между монетами", en: "across coins" }, lang)}
              </span>
            </>
          }
          description={pick(
            {
              ru: "Сколько одной монеты стоит другая — курсы обновляются вживую из торгового симулятора выше.",
              en: "How much of one coin another coin is worth — rates update live from the trading simulator above.",
            },
            lang,
          )}
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto mt-10 max-w-4xl"
        >
          <Card className="overflow-hidden border-border/60 bg-card/60 p-4 sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-500">
                  <Grid3x3 className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-bold">
                  {pick({ ru: "1 ед. по горизонтали = ? ед. по вертикали", en: "1 unit (row) = ? units (column)" }, lang)}
                </h3>
              </div>
              {isLive && (
                <Badge
                  variant="secondary"
                  className="gap-1.5 bg-emerald-500/10 text-emerald-500"
                >
                  <Radio className="h-3 w-3 animate-pulse" />
                  {pick({ ru: "Live", en: "Live" }, lang)}
                </Badge>
              )}
            </div>

            {/* Матрица */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-center text-xs sm:text-sm">
                <thead>
                  <tr>
                    <th className="sticky left-0 z-10 bg-card/80 p-2 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground backdrop-blur">
                      {pick({ ru: "из ↓ / в →", en: "from ↓ / to →" }, lang)}
                    </th>
                    {coins.map((c) => (
                      <th
                        key={c.symbol}
                        className="p-2 text-[11px] font-bold text-foreground"
                      >
                        {c.symbol}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {coins.map((from) => (
                    <tr key={from.symbol} className="border-t border-border/40">
                      <td className="sticky left-0 z-10 bg-card/80 p-2 text-left text-[11px] font-bold backdrop-blur">
                        {from.symbol}
                      </td>
                      {coins.map((to) => {
                        const rate = from.price / to.price;
                        const isSelf = from.symbol === to.symbol;
                        return (
                          <td
                            key={to.symbol}
                            className={`p-2 font-mono tabular-nums transition-colors ${
                              isSelf
                                ? "text-muted-foreground/40"
                                : "text-foreground/80"
                            }`}
                          >
                            {isSelf ? "—" : formatRate(rate)}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-[11px] text-muted-foreground">
              {isLive
                ? pick(
                    {
                      ru: "Цены обновляются каждые 2.5 сек из симулятора выше.",
                      en: "Prices refresh every 2.5s from the simulator above.",
                    },
                    lang,
                  )
                : pick(
                    {
                      ru: "Демо-данные. Запустите симулятор выше, чтобы курсы стали live.",
                      en: "Demo data. Run the simulator above to make rates live.",
                    },
                    lang,
                  )}
            </p>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
