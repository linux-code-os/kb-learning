"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowLeftRight, Calculator, Info } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { demoCoins } from "@/lib/site-data";
import { useT, useLang } from "@/components/site/language-toggle";
import { pick } from "@/lib/translations";

function formatAmount(n: number): string {
  if (!isFinite(n)) return "0";
  if (n >= 1) {
    return n.toLocaleString("en-US", {
      maximumFractionDigits: 6,
      minimumFractionDigits: 0,
    });
  }
  // для маленьких чисел — больше знаков
  return n.toLocaleString("en-US", {
    maximumFractionDigits: 8,
    minimumFractionDigits: 4,
  });
}

export function CryptoConverter() {
  const t = useT();
  const { lang } = useLang();
  const [fromSymbol, setFromSymbol] = React.useState("BTC");
  const [toSymbol, setToSymbol] = React.useState("USDT");
  const [amount, setAmount] = React.useState("1");

  const fromCoin = demoCoins.find((c) => c.symbol === fromSymbol)!;
  const toCoin = demoCoins.find((c) => c.symbol === toSymbol)!;

  const numericAmount = parseFloat(amount.replace(/,/g, ".")) || 0;
  const usdValue = numericAmount * fromCoin.priceUsd;
  const result = usdValue / toCoin.priceUsd;

  const swap = () => {
    setFromSymbol(toSymbol);
    setToSymbol(fromSymbol);
  };

  return (
    <section id="converter" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-dots opacity-30 mask-fade-b" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t("converter.eyebrow")}
          title={
            <>
              {t("converter.title1")}{" "}
              <span className="text-gradient-brand">{t("converter.titleAccent")}</span>
            </>
          }
          description={t("converter.desc")}
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto mt-12 max-w-3xl"
        >
          <Card className="overflow-hidden border-border/60 bg-card/60 p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-500">
                <Calculator className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold">{pick({ ru: "Калькулятор", en: "Calculator" }, lang)}</h3>
                <p className="text-xs text-muted-foreground">
                  {t("converter.rate")}
                </p>
              </div>
            </div>

            <div className="grid items-end gap-4 sm:grid-cols-[1fr_auto_1fr]">
              {/* From */}
              <div className="space-y-2">
                <label htmlFor="cc-amount" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {t("converter.give")}
                </label>
                <Input
                  id="cc-amount"
                  type="text"
                  inputMode="decimal"
                  value={amount}
                  onChange={(e) =>
                    setAmount(e.target.value.replace(/[^0-9.,]/g, ""))
                  }
                  className="font-mono text-lg tabular-nums"
                  placeholder="0.00"
                  aria-label={t("converter.give")}
                />
                <Select value={fromSymbol} onValueChange={setFromSymbol}>
                  <SelectTrigger className="w-full" aria-label={t("converter.give")}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {demoCoins.map((c) => (
                      <SelectItem key={c.symbol} value={c.symbol}>
                        {c.symbol} — {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  ≈ ${formatAmount(usdValue)}
                </p>
              </div>

              {/* Swap button */}
              <div className="flex justify-center pb-1">
                <button
                  onClick={swap}
                  aria-label={t("converter.swap")}
                  className="group flex h-11 w-11 items-center justify-center rounded-full border border-emerald-500/40 bg-background text-emerald-500 transition hover:rotate-180 hover:bg-emerald-500 hover:text-white"
                >
                  <ArrowLeftRight className="h-4 w-4 transition-transform" />
                </button>
              </div>

              {/* To */}
              <div className="space-y-2">
                <label htmlFor="cc-result" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {t("converter.receive")}
                </label>
                <div id="cc-result" className="flex h-10 w-full items-center rounded-md border border-input bg-muted/40 px-3 font-mono text-lg tabular-nums" aria-live="polite">
                  {formatAmount(result)}
                </div>
                <Select value={toSymbol} onValueChange={setToSymbol}>
                  <SelectTrigger className="w-full" aria-label={t("converter.receive")}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {demoCoins.map((c) => (
                      <SelectItem key={c.symbol} value={c.symbol}>
                        {c.symbol} — {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  1 {fromSymbol} = {formatAmount(fromCoin.priceUsd / toCoin.priceUsd)}{" "}
                  {toSymbol}
                </p>
              </div>
            </div>

            {/* Курс */}
            <div className="mt-6 grid grid-cols-2 gap-3 border-t border-border/60 pt-5 sm:grid-cols-3">
              {demoCoins.slice(0, 6).map((c) => (
                <div
                  key={c.symbol}
                  className="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2 text-sm"
                >
                  <span className="font-semibold">{c.symbol}</span>
                  <span className="font-mono text-xs tabular-nums text-muted-foreground">
                    ${formatAmount(c.priceUsd)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-start gap-2 rounded-xl bg-amber-500/[0.07] p-3 text-xs text-muted-foreground">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" aria-hidden="true" />
              {t("converter.disclaimer")}
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
