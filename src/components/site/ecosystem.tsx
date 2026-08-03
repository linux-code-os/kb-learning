"use client";

import { motion } from "framer-motion";
import {
  Wallet,
  Terminal,
  Gamepad2,
  Map,
  ArrowUpRight,
  Star,
  GitFork,
} from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ecosystem, type EcosystemProject } from "@/lib/site-data";
import { useLang, useT } from "@/components/site/language-toggle";
import { pick } from "@/lib/translations";

const iconMap = {
  wallet: Wallet,
  terminal: Terminal,
  gamepad: Gamepad2,
  map: Map,
} as const;

function ProjectCard({ project, index }: { project: EcosystemProject; index: number }) {
  const { lang } = useLang();
  const t = useT();
  const Icon = iconMap[project.icon];
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className={project.flagship ? "sm:col-span-2 lg:col-span-2" : ""}
    >
      <Card
        className={`group relative h-full overflow-hidden border-border/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-xl ${
          project.flagship
            ? "bg-gradient-to-br from-emerald-500/[0.08] via-card to-amber-500/[0.05]"
            : "bg-card/60"
        }`}
      >
        {project.flagship && (
          <span className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-500">
            <Star className="h-3 w-3 fill-emerald-500" />
            {t("ecosystem.flagship")}
          </span>
        )}

        <div className="flex items-center gap-3">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl ${
              project.flagship
                ? "bg-emerald-500/15 text-emerald-500"
                : "bg-muted text-foreground/80"
            }`}
          >
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold leading-tight">{project.name}</h3>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-muted-foreground transition hover:text-emerald-500"
            >
              {project.repo}
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {pick(project.description, lang)}
        </p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="rounded-md bg-muted/70 font-mono text-[11px]"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-border/50 pt-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: project.languageColor }}
            />
            {project.language}
          </span>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition group-hover:text-emerald-500"
          >
            {t("action.openRepo")}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </Card>
    </motion.div>
  );
}

export function Ecosystem() {
  const t = useT();
  return (
    <section id="ecosystem" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-dots opacity-40 mask-fade-b" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t("ecosystem.eyebrow")}
          title={
            <>
              {t("ecosystem.title1")}{" "}
              <span className="text-gradient-brand">{t("ecosystem.titleAccent")}</span>
            </>
          }
          description={t("ecosystem.desc")}
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ecosystem.map((project, i) => (
            <ProjectCard key={project.repo} project={project} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground"
        >
          <GitFork className="h-4 w-4" />
          {t("ecosystem.allOpen")}{" "}
          <a
            href="https://github.com/linux-code-os"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-emerald-500 hover:underline"
          >
            github.com/linux-code-os
          </a>
        </motion.div>
      </div>
    </section>
  );
}
