"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  Wallet,
  ShieldAlert,
  CheckCircle2,
} from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/lib/site-data";

const points = [
  "Отслеживание холдингов и P&L в реальном времени",
  "Тренировка сделок на симулированном балансе",
  "Движок рынка исполняет лимитные и стоп-ордера",
  "17-темный справочник по крипте внутри приложения",
];

export function About() {
  return (
    <section id="about" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="О проекте"
          title={
            <>
              KB Wallet — крипто-портфель,
              <br className="hidden sm:block" /> который учит
            </>
          }
          description="Compose Multiplatform приложение для Android и iOS из одной кодовой базы Kotlin. Отслеживайте портфель, практикуйте сделки в безопасном симуляторе и изучайте основы криптовалют — от устройства блокчейна до чтения свечных графиков."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          {/* Левая карточка — что это */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            <div className="relative h-full overflow-hidden rounded-3xl border border-border/60 bg-card/60 p-7 sm:p-9">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-500/15 blur-3xl" />
              <div className="relative">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-500">
                  <Wallet className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold sm:text-2xl">
                  Один код — две платформы
                </h3>
                <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Kotlin Multiplatform делит бизнес-логику между Android и iOS,
                  а Compose Multiplatform отрисовывает один и тот же UI. Это
                  значит — меньше дублирования, быстрее фичи, консистентный
                  опыт на обоих платформах.
                </p>

                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {points.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-2.5 text-sm text-foreground/90"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-wrap gap-2">
                  <Badge
                    variant="secondary"
                    className="rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  >
                    Kotlin Multiplatform
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400"
                  >
                    Compose Multiplatform
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400"
                  >
                    Ktor backend
                  </Badge>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Правая колонка — образовательный дисклеймер */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-6 lg:col-span-2"
          >
            <div className="relative overflow-hidden rounded-3xl border border-amber-500/30 bg-amber-500/[0.07] p-7">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-500">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold">
                Образовательный проект
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                KB Wallet — учебное/демо-приложение. Ничто здесь не является
                финансовой рекомендацией. Торговый симулятор использует
                вымышленные балансы — никаких реальных денег и реальных бирж.
              </p>
            </div>

            <div className="relative flex-1 overflow-hidden rounded-3xl border border-border/60 bg-card/60 p-7">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-500">
                <GraduationCap className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold">Учитесь без риска</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Сначала разберитесь, как работают кошельки, ключи и биржи —
                потом тренируйте ордера. Ошибки здесь стоят ноль, а навык
                остаётся.
              </p>
              <div className="mt-5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Автор проекта
              </div>
              <div className="mt-2 flex items-center gap-3">
                {/* Аватар с GitHub — внешний хостинг, Next/Image не нужен */}
                <img
                  src={siteConfig.owner.avatar}
                  alt={siteConfig.owner.name}
                  className="h-9 w-9 rounded-full border border-border"
                />
                <div className="leading-tight">
                  <div className="text-sm font-semibold">
                    {siteConfig.owner.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {siteConfig.owner.handle}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
