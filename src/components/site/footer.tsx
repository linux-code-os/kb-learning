"use client";

import Link from "next/link";
import { ArrowUp, Heart } from "lucide-react";
import { BrandLogo } from "@/components/site/brand-logo";
import { GithubIcon } from "@/components/site/social-icons";
import { useT } from "@/components/site/language-toggle";
import { navLinks, siteConfig, socials } from "@/lib/site-data";
import type { TranslationKey } from "@/lib/translations";

export function Footer() {
  const year = new Date().getFullYear();
  const t = useT();

  return (
    <footer className="relative mt-auto border-t border-border/60 bg-card/40">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Бренд */}
          <div className="lg:col-span-5">
            <BrandLogo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {siteConfig.description}
            </p>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-border/60 px-4 py-2 text-sm font-medium transition hover:border-emerald-500/40 hover:text-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
            >
              <GithubIcon className="h-4 w-4" />
              {siteConfig.owner.handle}
            </a>
          </div>

          {/* Навигация */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t("footer.sections")}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/80 transition hover:text-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
                  >
                    {t(link.labelKey as TranslationKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Соцсети */}
          <div className="lg:col-span-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t("footer.socials")}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {socials.map((social) => (
                <li key={social.name}>
                  {social.available ? (
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-foreground/80 transition hover:text-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
                    >
                      {social.name}
                      <span className="text-xs text-muted-foreground">
                        · {social.handle}
                      </span>
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-sm text-muted-foreground/60">
                      {social.name}
                      <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] uppercase tracking-wider">
                        {t("connect.soon")}
                      </span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 sm:flex-row">
          <p className="text-center text-xs text-muted-foreground sm:text-left">
            © {year} {siteConfig.name}. {t("footer.madeWith")}{" "}
            <Heart className="inline h-3 w-3 fill-rose-500 text-rose-500" />{" "}
            {t("footer.andKotlin")}
          </p>
          <a
            href="#top"
            className="inline-flex items-center gap-1.5 rounded-full border border-border/60 px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-emerald-500/40 hover:text-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
          >
            {t("action.backToTop")}
            <ArrowUp className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
