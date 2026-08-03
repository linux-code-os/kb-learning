"use client";

import { motion } from "framer-motion";
import {
  Wallet,
  TrendingUp,
  Bookmark,
  BookOpen,
  Fingerprint,
  BarChart3,
  Repeat,
  CandlestickChart,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { Card } from "@/components/ui/card";
import { features, type Feature } from "@/lib/site-data";

const iconMap: Record<Feature["icon"], LucideIcon> = {
  wallet: Wallet,
  "trending-up": TrendingUp,
  candlestick: CandlestickChart,
  bookmark: Bookmark,
  "book-open": BookOpen,
  fingerprint: Fingerprint,
  "bar-chart": BarChart3,
  repeat: Repeat,
};

const accentMap: Record<Feature["accent"], string> = {
  emerald: "bg-emerald-500/15 text-emerald-500 group-hover:shadow-emerald-500/20",
  amber: "bg-amber-500/15 text-amber-500 group-hover:shadow-amber-500/20",
  teal: "bg-teal-500/15 text-teal-500 group-hover:shadow-teal-500/20",
  rose: "bg-rose-500/15 text-rose-500 group-hover:shadow-rose-500/20",
  lime: "bg-lime-500/15 text-lime-600 group-hover:shadow-lime-500/20",
  cyan: "bg-cyan-500/15 text-cyan-500 group-hover:shadow-cyan-500/20",
};

export function Features() {
  return (
    <section id="features" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Возможности"
          title={
            <>
              Всё для изучения крипты{" "}
              <span className="text-gradient-brand">в одном месте</span>
            </>
          }
          description="KB Wallet собран как маленькая, но полноценная крипто-среда: портфель, торговля, графики, аналитика и встроенная библиотека знаний."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => {
            const Icon = iconMap[feature.icon];
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: (i % 4) * 0.06 }}
              >
                <Card className="group relative h-full overflow-hidden border-border/60 bg-card/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-border">
                  <div
                    className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl shadow-lg transition-shadow ${accentMap[feature.accent]}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold leading-snug">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                  <span className="pointer-events-none absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-emerald-500 to-amber-500 transition-all duration-500 group-hover:w-full" />
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
