"use client";

import { motion } from "framer-motion";
import { BookOpen, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { libraryTopics } from "@/lib/site-data";
import { useLang, useT } from "@/components/site/language-toggle";
import { pick } from "@/lib/translations";

const groupAccent: Record<
  "basics" | "trading" | "advanced",
  { ring: string; dot: string; chip: string }
> = {
  basics: {
    ring: "border-emerald-500/30",
    dot: "bg-emerald-500",
    chip: "bg-emerald-500/10 text-emerald-500",
  },
  trading: {
    ring: "border-amber-500/30",
    dot: "bg-amber-500",
    chip: "bg-amber-500/10 text-amber-500",
  },
  advanced: {
    ring: "border-rose-500/30",
    dot: "bg-rose-500",
    chip: "bg-rose-500/10 text-rose-500",
  },
};

export function CryptoLibrary() {
  const { lang } = useLang();
  const t = useT();
  const total = libraryTopics.reduce((acc, g) => acc + g.topics.length, 0);

  return (
    <section id="library" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-dots opacity-30 mask-fade-b" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t("library.eyebrow")}
          title={
            <>
              {total} {t("library.title1")}{" "}
              <span className="text-gradient-brand">{t("library.titleAccent")}</span>{" "}
              {t("library.title3")}
            </>
          }
          description={t("library.desc")}
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {libraryTopics.map((group, i) => {
            const accent = groupAccent[group.groupId];
            return (
              <motion.div
                key={group.groupId}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative overflow-hidden rounded-3xl border ${accent.ring} bg-card/60 p-6`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${accent.chip}`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${accent.dot}`} />
                    {pick(group.group, lang)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {group.topics.length} {t("library.topics")}
                  </span>
                </div>

                <ul className="mt-5 space-y-2.5">
                  {group.topics.map((topic) => (
                    <li
                      key={pick(topic, lang)}
                      className="flex items-start gap-2.5 text-sm"
                    >
                      <CheckCircle2
                        className={`mt-0.5 h-4 w-4 shrink-0 ${accent.chip.split(" ")[1]}`}
                      />
                      <span className="text-foreground/90">{pick(topic, lang)}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 flex items-center justify-center gap-3 text-sm text-muted-foreground"
        >
          <BookOpen className="h-4 w-4 text-emerald-500" />
          {t("library.offline")}
        </motion.div>
      </div>
    </section>
  );
}
