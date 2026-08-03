"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { socials, siteConfig } from "@/lib/site-data";
import { socialIconMap } from "@/components/site/social-icons";
import { useT } from "@/components/site/language-toggle";

export function Connect() {
  const t = useT();
  return (
    <section id="connect" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-emerald-500/15 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t("connect.eyebrow")}
          title={
            <>
              {t("connect.title1")}{" "}
              <span className="text-gradient-brand">{t("connect.titleAccent")}</span>
            </>
          }
          description={t("connect.desc")}
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {socials.map((social, i) => {
            const Icon = socialIconMap[social.icon];
            const available = social.available;
            const inner = (
              <Card
                className={`group relative flex h-full items-center gap-4 overflow-hidden border-border/60 p-5 transition-all duration-300 hover:-translate-y-1 ${
                  available
                    ? "bg-card/60 hover:border-emerald-500/40 hover:shadow-xl"
                    : "bg-card/40 opacity-75 hover:opacity-100"
                }`}
              >
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors ${
                    available
                      ? "bg-emerald-500/15 text-emerald-500"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold">{social.name}</h3>
                    {!available && (
                      <Badge
                        variant="secondary"
                        className="rounded-full bg-muted/70 text-[10px] uppercase tracking-wider"
                      >
                        {t("connect.soon")}
                      </Badge>
                    )}
                  </div>
                  <p className="truncate text-sm text-muted-foreground">
                    {social.handle}
                  </p>
                </div>
                <ArrowUpRight
                  className={`h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                    available ? "text-emerald-500" : "text-muted-foreground"
                  }`}
                />
              </Card>
            );

            return (
              <motion.div
                key={social.name}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.07 }}
              >
                {available ? (
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full"
                  >
                    {inner}
                  </a>
                ) : (
                  <div className="block h-full cursor-not-allowed">{inner}</div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* CTA-баннер */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="relative mt-10 overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/[0.12] via-card to-amber-500/[0.08] p-8 sm:p-10"
        >
          <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-emerald-500/20 blur-3xl" />
          <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-500">
                <Sparkles className="h-3.5 w-3.5" />
                Open-source
              </div>
              <h3 className="text-xl font-bold sm:text-2xl">
                {t("connect.ctaTitle")}
              </h3>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                {t("connect.ctaDesc")}
              </p>
            </div>
            <a
              href={siteConfig.flagshipRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-500"
            >
              {t("connect.ctaButton")}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
