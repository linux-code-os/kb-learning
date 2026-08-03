"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  Code2,
  LineChart,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { Card } from "@/components/ui/card";
import { audiences, type Audience } from "@/lib/site-data";

const iconMap: Record<Audience["icon"], LucideIcon> = {
  graduation: GraduationCap,
  code: Code2,
  chart: LineChart,
  shield: ShieldCheck,
};

const accentMap: Record<string, string> = {
  emerald: "bg-emerald-500/15 text-emerald-500",
  amber: "bg-amber-500/15 text-amber-500",
  teal: "bg-teal-500/15 text-teal-500",
  rose: "bg-rose-500/15 text-rose-500",
};

export function Audience() {
  return (
    <section id="audience" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-0 h-[260px] w-[500px] rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="absolute right-1/4 bottom-0 h-[260px] w-[500px] rounded-full bg-amber-500/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Для кого"
          title={
            <>
              Кому будет{" "}
              <span className="text-gradient-brand">полезен проект</span>
            </>
          }
          description="KB Wallet — не «приложение для всех». У него чёткая аудитория, и каждой группе мы даём своё значение."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a, i) => {
            const Icon = iconMap[a.icon];
            return (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: (i % 4) * 0.07 }}
              >
                <Card className="group relative h-full overflow-hidden border-border/60 bg-card/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-border">
                  <div
                    className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${accentMap[a.accent]}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-bold leading-snug">
                    {a.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                    {a.description}
                  </p>
                  <div className="pointer-events-none absolute -bottom-px left-0 h-px w-0 bg-gradient-to-r from-emerald-500 to-amber-500 transition-all duration-500 group-hover:w-full" />
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
