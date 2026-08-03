"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, MessageCircleQuestion } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/site/section-heading";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { faqs, siteConfig } from "@/lib/site-data";

export function Faq() {
  return (
    <section id="faq" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/4 h-[280px] w-[500px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title={
            <>
              Частые вопросы{" "}
              <span className="text-gradient-brand">без воды</span>
            </>
          }
          description="Собрали то, что чаще всего спрашивают о KB Wallet и экосистеме. Не нашли ответ — заведите issue на GitHub."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-5">
          {/* Левая колонка — sticky intro */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="sticky top-24 rounded-2xl border border-border/60 bg-card/60 p-6">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-500">
                <MessageCircleQuestion className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold">
                Не нашли ответ?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Каждый вопрос — повод улучшить документацию. Откройте issue с
                меткой <span className="font-mono text-xs">question</span> —
                ответим и, возможно, добавим сюда.
              </p>
              <Button
                asChild
                className="mt-5 w-full gap-2 rounded-full bg-emerald-600 text-white hover:bg-emerald-500"
              >
                <a
                  href={`${siteConfig.flagshipRepo}/issues/new`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <HelpCircle className="h-4 w-4" />
                  Задать вопрос
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Правая колонка — аккордеон */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <Card className="overflow-hidden border-border/60 bg-card/40 p-2 sm:p-4">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`item-${i}`}
                    className={`border-border/60 ${
                      i === faqs.length - 1 ? "border-b-0" : ""
                    }`}
                  >
                    <AccordionTrigger className="rounded-lg px-4 py-4 text-left text-base font-semibold hover:bg-accent/50 hover:no-underline [&[data-state=open]>svg]:rotate-180">
                      <span className="flex items-start gap-3">
                        <span className="mt-0.5 font-mono text-xs font-bold text-emerald-500">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span>{faq.question}</span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 pl-12 text-sm leading-relaxed text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
