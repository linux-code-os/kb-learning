"use client";

import { motion } from "framer-motion";
import { FolderTree, Layers, Server, Smartphone } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { projectStructure } from "@/lib/site-data";
import { useLang, useT } from "@/components/site/language-toggle";
import { pick } from "@/lib/translations";

const layers = [
  {
    icon: Smartphone,
    titleKey: "arch.layer1.title" as const,
    descKey: "arch.layer1.desc" as const,
    accent: "text-emerald-500 bg-emerald-500/15",
  },
  {
    icon: Layers,
    titleKey: "arch.layer2.title" as const,
    descKey: "arch.layer2.desc" as const,
    accent: "text-amber-500 bg-amber-500/15",
  },
  {
    icon: Server,
    titleKey: "arch.layer3.title" as const,
    descKey: "arch.layer3.desc" as const,
    accent: "text-teal-500 bg-teal-500/15",
  },
];

export function Architecture() {
  const { lang } = useLang();
  const t = useT();

  return (
    <section id="architecture" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t("arch.eyebrow")}
          title={
            <>
              {t("arch.title1")}{" "}
              <span className="text-gradient-brand">{t("arch.titleAccent")}</span>
            </>
          }
          description={t("arch.desc")}
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          {/* Дерево проекта */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            <div className="overflow-hidden rounded-2xl border border-border/60 bg-[#0a0f0d] shadow-2xl">
              <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-rose-500/70" />
                <span className="h-3 w-3 rounded-full bg-amber-500/70" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/70" />
                <span className="ml-2 inline-flex items-center gap-1.5 text-xs text-white/50">
                  <FolderTree className="h-3.5 w-3.5" />
                  kb-learning
                </span>
              </div>
              <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed text-white/80">
                <code>{pick(projectStructure, lang)}</code>
              </pre>
            </div>
          </motion.div>

          {/* Слои */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-4 lg:col-span-2"
          >
            {layers.map((layer) => {
              const Icon = layer.icon;
              return (
                <div
                  key={layer.title}
                  className="rounded-2xl border border-border/60 bg-card/60 p-5"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${layer.accent}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-mono text-sm font-bold">
                      {t(layer.titleKey as any)}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {t(layer.descKey as any)}
                  </p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
