"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Github,
  BookOpen,
  ArrowDown,
  Sparkles,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig, stats } from "@/lib/site-data";
import { useCountUp } from "@/lib/use-count-up";
import { useT } from "@/components/site/language-toggle";
import type { TranslationKey } from "@/lib/translations";

function StatCell({
  value,
  suffix,
  labelKey,
}: {
  value: number;
  suffix: string;
  labelKey: TranslationKey;
}) {
  const { value: animated, ref } = useCountUp(value);
  const t = useT();
  return (
    <div className="bg-background/80 p-5 text-center backdrop-blur">
      <div
        ref={ref}
        className="font-mono text-2xl font-bold tabular-nums tracking-tight sm:text-3xl"
      >
        {animated}
        <span className="text-gradient-brand">{suffix}</span>
      </div>
      <div className="mt-1 text-xs text-muted-foreground sm:text-sm">
        {t(labelKey)}
      </div>
    </div>
  );
}



function CoinChip({
  symbol,
  label,
  price,
  delta,
  className,
  delay = 0,
}: {
  symbol: string;
  label: string;
  price: string;
  delta: string;
  className?: string;
  delay?: number;
}) {
  const up = delta.startsWith("+");
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={`glass absolute flex items-center gap-3 rounded-2xl border border-border/60 px-3.5 py-2.5 shadow-xl ${className}`}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-amber-400/30 to-emerald-500/20 text-xs font-bold">
        {symbol.slice(0, 1)}
      </span>
      <div className="leading-tight">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold">{symbol}</span>
          <span className="text-[10px] text-muted-foreground">{label}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-mono font-medium">{price}</span>
          <span
            className={`text-[10px] font-semibold ${
              up ? "text-emerald-500" : "text-rose-500"
            }`}
          >
            {delta}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function Hero() {
  const t = useT();
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28"
    >
      {/* Фон: gradient mesh + сетка */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid animate-grid-pan opacity-60 mask-fade-b" />
        <div className="absolute -top-32 left-1/2 h-[460px] w-[680px] -translate-x-1/2 rounded-full bg-emerald-500/20 blur-[120px]" />
        <div className="absolute -top-10 right-0 h-[360px] w-[420px] rounded-full bg-amber-500/15 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[300px] w-[380px] rounded-full bg-teal-500/10 blur-[120px]" />
        {/* Декоративная подсветка снизу для глубины */}
        <div className="absolute -bottom-20 left-1/2 h-[200px] w-[800px] -translate-x-1/2 rounded-[100%] bg-emerald-500/8 blur-[100px]" />
        {/* Тонкая разделительная линия внизу hero */}
        <div className="absolute bottom-0 left-1/2 h-px w-[60%] -translate-x-1/2 bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-4xl text-center">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-500"
          >
            <Sparkles className="h-3.5 w-3.5" />
            {t("hero.badge")}
          </motion.div>

          {/* Заголовок */}
          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-balance text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
          >
            {t("hero.title1")}
            <br />
            <span className="text-gradient-brand">{t("hero.title2")}</span>
          </motion.h1>

          {/* Подзаголовок */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {t("hero.desc")}
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.19 }}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button
              asChild
              size="lg"
              className="h-12 w-full gap-2 rounded-full bg-emerald-600 px-7 text-base text-white shadow-xl shadow-emerald-600/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-500 hover:shadow-emerald-500/40 sm:w-auto"
            >
              <a
                href={siteConfig.flagshipRepo}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
                {t("action.viewOnGithub")}
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 w-full gap-2 rounded-full border-border/70 px-7 text-base sm:w-auto"
            >
              <a
                href="#start"
              >
                <BookOpen className="h-5 w-5" />
                {t("action.howToRun")}
              </a>
            </Button>
          </motion.div>

          {/* Мини-бейджи доверия */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.26 }}
            className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground"
          >
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
              {t("hero.trust.noMoney")}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Smartphone className="h-3.5 w-3.5 text-amber-500" />
              {t("hero.trust.crossPlatform")}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5 text-teal-500" />
              {t("hero.trust.topics")}
            </span>
          </motion.div>
        </div>

        {/* Визуальная сцена с плавающими монетами */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative mx-auto mt-16 hidden max-w-4xl sm:block"
        >
          <div className="relative h-64 rounded-3xl border border-border/50 bg-card/40 glass shadow-2xl sm:h-72">
            {/* центральная карточка-портфель */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute left-1/2 top-1/2 w-[min(78%,340px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-emerald-500/30 bg-background/80 p-5 shadow-2xl glow-emerald"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">
                  {t("hero.balance")}
                </span>
                <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-500">
                  {t("hero.simulation")}
                </span>
              </div>
              <div className="mt-2 flex items-end gap-2">
                <span className="font-mono text-3xl font-bold tabular-nums tracking-tight">
                  $48,219.40
                </span>
                <span className="mb-1 inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-xs font-semibold text-emerald-500">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                  +12.8%
                </span>
              </div>
              {/* мини-график */}
              <svg
                viewBox="0 0 300 60"
                className="mt-3 h-12 w-full"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="hero-spark" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 45 L30 40 L60 42 L90 32 L120 36 L150 24 L180 28 L210 18 L240 22 L270 10 L300 6 L300 60 L0 60 Z"
                  fill="url(#hero-spark)"
                />
                <path
                  d="M0 45 L30 40 L60 42 L90 32 L120 36 L150 24 L180 28 L210 18 L240 22 L270 10 L300 6"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>

            {/* плавающие чипы монет */}
            <CoinChip
              symbol="BTC"
              label="Bitcoin"
              price="$67,420"
              delta="+3.2%"
              className="left-6 top-8 animate-float-slow"
              delay={0.6}
            />
            <CoinChip
              symbol="ETH"
              label="Ethereum"
              price="$3,518"
              delta="-0.8%"
              className="right-6 top-12 animate-float-medium"
              delay={0.7}
            />
            <CoinChip
              symbol="SOL"
              label="Solana"
              price="$182.4"
              delta="+5.6%"
              className="bottom-8 left-10 animate-float-medium"
              delay={0.8}
            />
            <CoinChip
              symbol="USDT"
              label="Tether"
              price="$1.00"
              delta="+0.0%"
              className="bottom-10 right-8 animate-float-slow"
              delay={0.9}
            />
          </div>
        </motion.div>

        {/* Статистика */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/60 sm:grid-cols-4"
        >
          {stats.map((s, i) => (
            <StatCell
              key={i}
              value={s.value}
              suffix={s.suffix}
              labelKey={
                ["stat.topics", "stat.platforms", "stat.modules", "stat.educational"][i] as TranslationKey
              }
            />
          ))}
        </motion.div>

        {/* индикатор скролла */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-14 flex justify-center"
        >
          <a
            href="#about"
            className="group inline-flex flex-col items-center gap-2 text-xs text-muted-foreground transition hover:text-foreground"
            aria-label={t("action.scrollDown")}
          >
            {t("action.scrollDown")}
            <span className="flex h-9 w-5 items-start justify-center rounded-full border border-border p-1">
              <motion.span
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                className="h-1.5 w-1 rounded-full bg-emerald-500"
              />
            </span>
            <ArrowDown className="h-3 w-3 transition group-hover:translate-y-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
