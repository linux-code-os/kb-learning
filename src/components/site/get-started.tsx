"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Copy, Check, Terminal, AlertTriangle, KeyRound } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { buildInstructions, prerequisites, siteConfig } from "@/lib/site-data";

function CommandBlock({ command }: { command: string }) {
  const [copied, setCopied] = React.useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard может быть недоступен */
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border/60 bg-[#0a0f0d]">
      <div className="flex items-center justify-between border-b border-white/5 px-4 py-2">
        <span className="inline-flex items-center gap-1.5 text-xs text-white/50">
          <Terminal className="h-3.5 w-3.5" />
          bash
        </span>
        <button
          onClick={onCopy}
          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-white/60 transition hover:bg-white/10 hover:text-white"
          aria-label="Скопировать команду"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              Скопировано
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Копировать
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-3 font-mono text-sm text-emerald-300">
        <code>$ {command}</code>
      </pre>
    </div>
  );
}

export function GetStarted() {
  return (
    <section id="start" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Запуск"
          title={
            <>
              Поднимаем проект{" "}
              <span className="text-gradient-brand">за пару команд</span>
            </>
          }
          description="Локальная разработка работает из коробки с безопасными дефолтами. Для чего-то большего — задайте переменные окружения."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          {/* Команды */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            <Tabs defaultValue={buildInstructions[0].id}>
              <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1 rounded-xl border border-border/60 bg-card/60 p-1">
                {buildInstructions.map((item) => (
                  <TabsTrigger
                    key={item.id}
                    value={item.id}
                    className="rounded-lg px-3 py-2 text-xs font-medium data-[state=active]:bg-emerald-500/15 data-[state=active]:text-emerald-500"
                  >
                    {item.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {buildInstructions.map((item) => (
                <TabsContent
                  key={item.id}
                  value={item.id}
                  className="mt-4 space-y-3"
                >
                  <CommandBlock command={item.command} />
                  <p className="text-sm text-muted-foreground">{item.note}</p>
                </TabsContent>
              ))}
            </Tabs>

            {/* Секреты */}
            <div className="mt-6 rounded-2xl border border-amber-500/30 bg-amber-500/[0.07] p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 text-amber-500">
                  <KeyRound className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold">
                    Секреты и конфигурация
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                    JWT-секрет — настоящий серверный секрет, задавайте{" "}
                    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px]">
                      JWT_SECRET
                    </code>{" "}
                    через env в любом окружении с реальными аккаунтами. Ключ
                    CoinRanking зашит в клиент — это вопрос гигиены репо, а не
                    реальная защита.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Предварительные требования */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="h-full rounded-2xl border border-border/60 bg-card/60 p-6">
              <h3 className="text-base font-bold">Что нужно установить</h3>
              <ul className="mt-5 space-y-4">
                {prerequisites.map((p) => (
                  <li
                    key={p.title}
                    className="flex items-start gap-3 border-b border-border/40 pb-4 last:border-0 last:pb-0"
                  >
                    <span className="mt-1 flex h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                    <div>
                      <div className="text-sm font-semibold">{p.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {p.detail}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-start gap-2.5 rounded-xl bg-muted/50 p-3 text-xs text-muted-foreground">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                iOS-таргет Kotlin/Native нельзя собрать на Linux/Windows —
                нужна macOS с Xcode.
              </div>

              <a
                href={siteConfig.flagshipRepo}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-500"
              >
                Открыть README на GitHub
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
