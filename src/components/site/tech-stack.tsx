"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/site/section-heading";
import { techStack } from "@/lib/site-data";
import { useT } from "@/components/site/language-toggle";

function TechBadge({
  name,
  color,
}: {
  name: string;
  color: string;
}) {
  return (
    <div className="mx-2 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/70 px-4 py-2 text-sm font-medium">
      <span
        className="h-2.5 w-2.5 rounded-full"
        style={{ backgroundColor: color }}
      />
      {name}
    </div>
  );
}

export function TechStack() {
  const t = useT();
  // дублируем для бесшовной ленты
  const marquee = [...techStack, ...techStack];

  return (
    <section id="tech" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t("tech.eyebrow")}
          title={
            <>
              {t("tech.title1")}{" "}
              <span className="text-gradient-brand">{t("tech.titleAccent")}</span>
            </>
          }
          description={t("tech.desc")}
        />

        {/* Бегущая лента технологий */}
        <div className="relative mt-12 overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <div className="flex w-max animate-marquee">
            {marquee.map((t, i) => (
              <TechBadge key={`${t.name}-${i}`} name={t.name} color={t.color} />
            ))}
          </div>
        </div>

        {/* Сетка с описаниями */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {techStack.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-border"
            >
              <div
                className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-20 blur-2xl transition-opacity duration-300 group-hover:opacity-40"
                style={{ backgroundColor: tech.color }}
              />
              <div className="relative">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: tech.color }}
                  />
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {tech.category}
                  </span>
                </div>
                <h3 className="mt-2 text-base font-bold leading-tight">
                  {tech.name}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {tech.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
