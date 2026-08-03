"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle, Loader2, Rocket } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { roadmap, type RoadmapItem } from "@/lib/site-data";

const statusConfig: Record<
  RoadmapItem["status"],
  {
    label: string;
    icon: typeof CheckCircle2;
    ring: string;
    dot: string;
    badge: string;
    line: string;
  }
> = {
  done: {
    label: "Готово",
    icon: CheckCircle2,
    ring: "border-emerald-500/40",
    dot: "bg-emerald-500",
    badge: "bg-emerald-500/15 text-emerald-500",
    line: "bg-emerald-500/30",
  },
  active: {
    label: "В работе",
    icon: Loader2,
    ring: "border-amber-500/40",
    dot: "bg-amber-500",
    badge: "bg-amber-500/15 text-amber-500",
    line: "bg-amber-500/30",
  },
  planned: {
    label: "В планах",
    icon: Circle,
    ring: "border-border",
    dot: "bg-muted-foreground/50",
    badge: "bg-muted text-muted-foreground",
    line: "bg-border",
  },
};

export function Roadmap() {
  return (
    <section id="roadmap" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Roadmap"
          title={
            <>
              Куда движется{" "}
              <span className="text-gradient-brand">экосистема</span>
            </>
          }
          description="Развитие KB Wallet по вехам. Зелёное — сделано, янтарное — в активной разработке, серое — в планах. Roadmap обновляется по мере релизов."
        />

        <div className="mt-14">
          {/* Vertical timeline */}
          <div className="relative">
            {/* линия */}
            <div
              className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-emerald-500/40 via-amber-500/40 to-border sm:left-1/2 sm:-translate-x-1/2"
              aria-hidden="true"
            />

            <ol className="space-y-8">
              {roadmap.map((item, i) => {
                const cfg = statusConfig[item.status];
                const Icon = cfg.icon;
                const isLeft = i % 2 === 0;
                return (
                  <motion.li
                    key={item.phase}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: 0.05 }}
                    className={`relative flex items-start gap-6 sm:gap-0 ${
                      isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
                    }`}
                  >
                    {/* узел */}
                    <div className="absolute left-4 top-3 z-10 -translate-x-1/2 sm:left-1/2">
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-full border-2 bg-background ${cfg.ring}`}
                      >
                        <Icon
                          className={`h-4 w-4 ${cfg.dot.replace(
                            "bg-",
                            "text-",
                          )} ${item.status === "active" ? "animate-spin" : ""}`}
                        />
                      </span>
                    </div>

                    {/* карточка */}
                    <div className="ml-12 w-full sm:ml-0 sm:w-[calc(50%-2.5rem)]">
                      <div
                        className={`rounded-2xl border ${cfg.ring} bg-card/60 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="font-mono text-sm font-bold text-muted-foreground">
                            {item.phase}
                          </span>
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${cfg.badge}`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`}
                            />
                            {cfg.label}
                          </span>
                        </div>
                        <h3 className="mt-2 text-base font-bold leading-snug">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* пустая половина для десктопа */}
                    <div className="hidden sm:block sm:w-[calc(50%-2.5rem)]" />
                  </motion.li>
                );
              })}
            </ol>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 flex items-center justify-center gap-2 text-sm text-muted-foreground"
          >
            <Rocket className="h-4 w-4 text-emerald-500" />
            Следите за прогрессом в{" "}
            <a
              href="https://github.com/linux-code-dev/KB_Learning/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-emerald-500 hover:underline"
            >
              issues на GitHub
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
