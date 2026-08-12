"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Star,
  GitFork,
  CircleDot,
  Eye,
  FolderGit2,
  RefreshCw,
  Github,
} from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCountUp } from "@/lib/use-count-up";
import { siteConfig } from "@/lib/site-data";
import { fetchGhStats } from "@/lib/github-stats-client";
import { useLang, useT } from "@/components/site/language-toggle";

type Stats = {
  stars: number;
  forks: number;
  openIssues: number;
  language: string | null;
  updatedAt: string;
  subscribers: number;
  publicRepos: number;
  fetchedAt: number;
};

function formatNumber(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  return String(n);
}

function timeAgo(iso: string): string {
  try {
    const diff = Date.now() - new Date(iso).getTime();
    const days = Math.floor(diff / 86400000);
    if (days > 30) return new Date(iso).toLocaleDateString("ru-RU");
    if (days > 0) return `${days} дн. назад`;
    const hours = Math.floor(diff / 3600000);
    if (hours > 0) return `${hours} ч. назад`;
    const mins = Math.floor(diff / 60000);
    if (mins > 0) return `${mins} мин. назад`;
    return "только что";
  } catch {
    return "—";
  }
}

function StatCard({
  icon: Icon,
  label,
  value,
  suffix,
  accent,
  index,
}: {
  icon: typeof Star;
  label: string;
  value: number;
  suffix?: string;
  accent: string;
  index: number;
}) {
  const { value: animated, ref } = useCountUp(value);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
    >
      <Card className="group relative h-full overflow-hidden border-border/60 bg-card/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-border">
        <div
          className={`absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-40 ${accent}`}
        />
        <div className="relative">
          <div
            className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl ${accent}`}
          >
            <Icon className="h-5 w-5 text-white" />
          </div>
          <div
            ref={ref}
            className="font-mono text-2xl font-bold tabular-nums tracking-tight sm:text-3xl"
          >
            {formatNumber(animated)}
            {suffix && <span className="text-gradient-brand">{suffix}</span>}
          </div>
          <div className="mt-1 text-xs text-muted-foreground sm:text-sm">
            {label}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export function GitHubStats() {
  const [stats, setStats] = React.useState<Stats | null>(null);
  const [loading, setLoading] = React.useState(true);
  const { lang } = useLang();
  const t = useT();

  const load = React.useCallback(async () => {
    setLoading(true);
    try {
      // Клиентский fetch напрямую в GitHub API (CORS поддерживается).
      // Работает и на GitHub Pages (без API routes), и на Node-хостинге.
      const data = await fetchGhStats();
      setStats(data as unknown as Stats);
    } catch {
      /* тихо — UI покажет fallback */
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  const cells = stats
    ? [
        {
          icon: Star,
          label: t("gh.stars"),
          value: stats.stars,
          accent: "bg-amber-500",
        },
        {
          icon: GitFork,
          label: t("gh.forks"),
          value: stats.forks,
          accent: "bg-emerald-500",
        },
        {
          icon: CircleDot,
          label: t("gh.issues"),
          value: stats.openIssues,
          accent: "bg-teal-500",
        },
        {
          icon: FolderGit2,
          label: t("gh.repos"),
          value: stats.publicRepos,
          accent: "bg-rose-500",
        },
      ]
    : [];

  return (
    <section id="github-stats" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[280px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t("gh.eyebrow")}
          title={
            <>
              {t("gh.title")}{" "}
              <span className="text-gradient-brand">{t("gh.titleAccent")}</span>
            </>
          }
          description={t("gh.desc")}
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {loading || !stats ? (
            Array.from({ length: 4 }).map((_, i) => (
              <Card
                key={i}
                className="h-[140px] animate-pulse border-border/60 bg-card/40 p-5"
              >
                <div className="mb-3 h-10 w-10 rounded-xl bg-muted" />
                <div className="h-7 w-20 rounded bg-muted" />
                <div className="mt-2 h-4 w-28 rounded bg-muted/70" />
              </Card>
            ))
          ) : (
            cells.map((c, i) => (
              <StatCard
                key={c.label}
                icon={c.icon}
                label={c.label}
                value={c.value}
                accent={c.accent}
                index={i}
              />
            ))
          )}
        </div>

        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-border/60 bg-card/40 p-5 sm:flex-row"
          >
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground sm:justify-start">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                {t("gh.language")}{" "}
                <span className="font-semibold text-foreground">
                  {stats.language ?? "Kotlin"}
                </span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Eye className="h-3.5 w-3.5" />
                {t("gh.lastPush")}{" "}
                <span className="font-semibold text-foreground">
                  {timeAgo(stats.updatedAt)}
                </span>
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={load}
              className="gap-2 rounded-full"
            >
              <RefreshCw
                className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`}
              />
              {t("gh.refresh")}
            </Button>
          </motion.div>
        )}

        <div className="mt-8 flex justify-center">
          <Button
            asChild
            className="gap-2 rounded-full bg-foreground px-6 text-background hover:bg-foreground/90"
          >
            <a
              href={siteConfig.flagshipRepo}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4" />
              {t("gh.visitRepo")}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
