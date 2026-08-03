"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Grid3x3 } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { Card } from "@/components/ui/card";
import { useLang, useT } from "@/components/site/language-toggle";
import { pick } from "@/lib/translations";
import { demoCoins } from "@/lib/site-data";

function formatRate(n: number): string {
  if (n >= 100) return n.toFixed(0);
  if (n >= 1) return n.toFixed(4);
  if (n >= 0.01) return n.toFixed(6);
  return n.toExponential(2);
}

export function CrossRates() {
  const { lang } = useLang();
  const t = useT();
  // Берём 6 основных монет для матрицы 6×6
  const coins = demoCoins.slice(0, 6);

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
              ru: "Сколько одной монеты стоит другая — симулированные курсы, как в конвертере KB Wallet. Удобно для оценки относительной стоимости без пересчёта через USD.",
              en: "How much of one coin another coin is worth — simulated rates, like in the KB Wallet converter. Handy for judging relative value without converting through USD.",
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
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-500">
                <Grid3x3 className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-bold">
                {pick({ ru: "1 ед. по горизонтали = ? ед. по вертикали", en: "1 unit (row) = ? units (column)" }, lang)}
              </h3>
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
                        const rate = from.priceUsd / to.priceUsd;
                        const isSelf = from.symbol === to.symbol;
                        return (
                          <td
                            key={to.symbol}
                            className={`p-2 font-mono tabular-nums ${
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
              {pick(
                {
                  ru: "Демо-данные. В реальном KB Wallet курсы пересчитываются через live-цены CoinRanking API.",
                  en: "Demo data. In the real KB Wallet, rates recalculate through live CoinRanking API prices.",
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
