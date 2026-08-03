"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle2, Loader2, User, MessageSquare } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { siteConfig } from "@/lib/site-data";
import { useT } from "@/components/site/language-toggle";

type Mode = "newsletter" | "contact";

export function ContactForm() {
  const t = useT();
  const [mode, setMode] = React.useState<Mode>("newsletter");
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [status, setStatus] = React.useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [feedback, setFeedback] = React.useState("");

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setFeedback("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          message,
          type: mode,
        }),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setStatus("error");
        setFeedback(data.error ?? t("contact.emailInvalid"));
        return;
      }

      setStatus("success");
      setFeedback(
        data.message ??
          (mode === "newsletter"
            ? t("contact.successNewsletter")
            : t("contact.successContact")),
      );
      setEmail("");
      setName("");
      setMessage("");
    } catch {
      setStatus("error");
      setFeedback(t("contact.emailInvalid"));
    }
  };

  const canSubmit =
    emailValid &&
    status !== "loading" &&
    (mode === "newsletter" || (name.length >= 2 && message.length >= 10));

  return (
    <section id="contact-form" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[280px] w-[600px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t("contact.eyebrow")}
          title={
            <>
              {t("contact.title1")}{" "}
              <span className="text-gradient-brand">{t("contact.titleAccent")}</span>
            </>
          }
          description={t("contact.desc")}
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-5">
          {/* Левая колонка — инфо */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="flex h-full flex-col gap-4">
              <div className="rounded-2xl border border-border/60 bg-card/60 p-6">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-500">
                  <Mail className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold">
                  {t("contact.whatYouGet")}
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    {t("contact.get.releases")}
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    {t("contact.get.topics")}
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    {t("contact.get.answers")}
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    {t("contact.get.nospam")}
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-border/60 bg-card/40 p-6">
                <p className="text-sm text-muted-foreground">
                  {t("contact.githubPref")}
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="mt-4 w-full gap-2 rounded-full"
                >
                  <a
                    href={`${siteConfig.flagshipRepo}/issues/new`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageSquare className="h-4 w-4" />
                    {t("contact.openIssue")}
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Правая колонка — форма */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <Card className="overflow-hidden border-border/60 bg-card/60 p-6 sm:p-8">
              <Tabs
                value={mode}
                onValueChange={(v) => {
                  setMode(v as Mode);
                  setStatus("idle");
                  setFeedback("");
                }}
              >
                <TabsList className="grid w-full grid-cols-2 rounded-xl border border-border/60 bg-muted/40 p-1">
                  <TabsTrigger
                    value="newsletter"
                    className="rounded-lg data-[state=active]:bg-emerald-500/15 data-[state=active]:text-emerald-500"
                  >
                    {t("contact.tab.newsletter")}
                  </TabsTrigger>
                  <TabsTrigger
                    value="contact"
                    className="rounded-lg data-[state=active]:bg-emerald-500/15 data-[state=active]:text-emerald-500"
                  >
                    {t("contact.tab.contact")}
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <form onSubmit={onSubmit} className="mt-6 space-y-4">
                {mode === "contact" && (
                  <div className="space-y-2">
                    <label
                      htmlFor="cf-name"
                      className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
                    >
                      {t("contact.name")}
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="cf-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Алексей"
                        className="pl-9"
                        required
                        minLength={2}
                        maxLength={60}
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label
                    htmlFor="cf-email"
                    className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
                  >
                    {t("contact.email")}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="cf-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="pl-9"
                      required
                      maxLength={120}
                      aria-invalid={email.length > 0 && !emailValid}
                    />
                  </div>
                  {email.length > 0 && !emailValid && (
                    <p className="text-xs text-rose-500">
                      Проверьте формат email
                    </p>
                  )}
                </div>

                {mode === "contact" && (
                  <div className="space-y-2">
                    <label
                      htmlFor="cf-message"
                      className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
                    >
                      Сообщение
                    </label>
                    <Textarea
                      id="cf-message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Расскажите, что вас интересует..."
                      rows={4}
                      required
                      minLength={10}
                      maxLength={1000}
                    />
                    <p className="text-right text-[11px] text-muted-foreground">
                      {message.length}/1000
                    </p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={!canSubmit}
                  className="h-11 w-full gap-2 rounded-full bg-emerald-600 text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {t("contact.sending")}
                    </>
                  ) : status === "success" ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      {t("contact.done")}
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      {mode === "newsletter" ? t("contact.subscribe") : t("contact.send")}
                    </>
                  )}
                </Button>

                {feedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-start gap-2 rounded-xl p-3 text-sm ${
                      status === "success"
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                    }`}
                  >
                    {status === "success" ? (
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                    ) : (
                      <span className="mt-0.5 text-base">⚠</span>
                    )}
                    {feedback}
                  </motion.div>
                )}
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
