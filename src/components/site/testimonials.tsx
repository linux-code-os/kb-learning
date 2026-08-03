"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { testimonials } from "@/lib/site-data";
import { useLang, useT } from "@/components/site/language-toggle";
import { pick } from "@/lib/translations";

export function Testimonials() {
  const { lang } = useLang();
  const t = useT();
  const [active, setActive] = React.useState(0);
  const [direction, setDirection] = React.useState(0);
  const [autoplay, setAutoplay] = React.useState(true);

  const go = React.useCallback(
    (dir: number) => {
      setDirection(dir);
      setActive((prev) => (prev + dir + testimonials.length) % testimonials.length);
    },
    [],
  );

  // Автопрокрутка каждые 6 секунд
  React.useEffect(() => {
    if (!autoplay) return;
    const id = setInterval(() => go(1), 6000);
    return () => clearInterval(id);
  }, [autoplay, go]);

  const current = testimonials[active];

  return (
    <section id="testimonials" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-dots opacity-30 mask-fade-b" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t("testimonials.eyebrow")}
          title={
            <>
              {t("testimonials.title1")}{" "}
              <span className="text-gradient-brand">{t("testimonials.titleAccent")}</span>
            </>
          }
          description={t("testimonials.desc")}
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          {/* Большая активная карточка */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            <Card className="relative h-full overflow-hidden border-border/60 bg-card/60 p-7 sm:p-9">
              <Quote className="absolute right-6 top-6 h-16 w-16 text-emerald-500/10" />
              <div className="relative">
                {/* Рейтинг */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < current.rating
                          ? "fill-amber-400 text-amber-400"
                          : "fill-muted text-muted"
                      }`}
                    />
                  ))}
                </div>

                {/* Цитата с анимацией смены */}
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.blockquote
                    key={active}
                    custom={direction}
                    initial={{ opacity: 0, x: direction > 0 ? 30 : -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction > 0 ? -30 : 30 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="mt-5 text-lg font-medium leading-relaxed text-foreground/90 sm:text-xl"
                  >
                    «{pick(current.quote, lang)}»
                  </motion.blockquote>
                </AnimatePresence>

                {/* Автор */}
                <div className="mt-7 flex items-center gap-3 border-t border-border/60 pt-5">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${current.avatarColor} text-sm font-bold text-white`}
                  >
                    {current.initials}
                  </div>
                  <div>
                    <div className="text-sm font-bold">{pick(current.name, lang)}</div>
                    <div className="text-xs text-muted-foreground">
                      {pick(current.role, lang)}
                    </div>
                  </div>
                </div>

                {/* Управление */}
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setDirection(i > active ? 1 : -1);
                          setActive(i);
                        }}
                        aria-label={`${t("testimonials.review")} ${i + 1}`}
                        className={`h-1.5 rounded-full transition-all ${
                          i === active
                            ? "w-6 bg-emerald-500"
                            : "w-1.5 bg-muted hover:bg-muted-foreground/50"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-9 w-9 rounded-full"
                      onClick={() => go(-1)}
                      aria-label={t("testimonials.prev")}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-9 w-9 rounded-full"
                      onClick={() => go(1)}
                      aria-label={t("testimonials.next")}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Сетка мини-отзывов */}
          <div className="grid gap-4 lg:col-span-2">
            {testimonials.slice(0, 3).map((tm, i) => (
              <motion.button
                key={pick(tm.name, lang)}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                onClick={() => {
                  setDirection(i > active ? 1 : -1);
                  setAutoplay(false);
                  setActive(i);
                }}
                className={`group rounded-2xl border p-4 text-left transition-all hover:-translate-y-0.5 ${
                  i === active
                    ? "border-emerald-500/40 bg-emerald-500/[0.06]"
                    : "border-border/60 bg-card/40 hover:border-border"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br ${tm.avatarColor} text-[10px] font-bold text-white`}
                    >
                      {tm.initials}
                    </div>
                    <div className="leading-tight">
                      <div className="text-xs font-bold">{pick(tm.name, lang)}</div>
                      <div className="text-[11px] text-muted-foreground">
                        {pick(tm.role, lang)}
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <Star
                        key={si}
                        className={`h-3 w-3 ${
                          si < tm.rating
                            ? "fill-amber-400 text-amber-400"
                            : "fill-muted text-muted"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                  {pick(tm.quote, lang)}
                </p>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
