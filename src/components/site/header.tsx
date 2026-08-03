"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { BrandLogo } from "@/components/site/brand-logo";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { navLinks, siteConfig } from "@/lib/site-data";

export function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "glass border-b border-border/60 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.3)]"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="#top"
          className="rounded-lg outline-none ring-offset-background transition focus-visible:ring-2 focus-visible:ring-emerald-500/60"
          aria-label="KB Learning — наверх"
        >
          <BrandLogo />
        </Link>

        {/* Десктоп-навигация */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            asChild
            size="sm"
            className="hidden h-9 gap-2 rounded-full bg-emerald-600 px-4 text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-500 sm:inline-flex"
          >
            <a
              href={siteConfig.flagshipRepo}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </Button>

          {/* Мобильное меню */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full border border-border/60 lg:hidden"
                aria-label="Открыть меню"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] border-border/60 bg-background/95 p-0"
            >
              <div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
                <SheetTitle className="text-left">
                  <BrandLogo />
                </SheetTitle>
                <SheetClose asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    aria-label="Закрыть меню"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </SheetClose>
              </div>
              <AnimatePresence>
                <motion.nav
                  className="flex flex-col gap-1 px-3 py-4"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: { transition: { staggerChildren: 0.04 } },
                  }}
                >
                  {navLinks.map((link) => (
                    <motion.div
                      key={link.href}
                      variants={{
                        hidden: { opacity: 0, x: 16 },
                        visible: { opacity: 1, x: 0 },
                      }}
                    >
                      <SheetClose asChild>
                        <Link
                          href={link.href}
                          className="flex items-center justify-between rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                        >
                          {link.label}
                          <ArrowUpRight className="h-4 w-4 opacity-50" />
                        </Link>
                      </SheetClose>
                    </motion.div>
                  ))}
                  <div className="mt-4 border-t border-border/60 pt-4">
                    <SheetClose asChild>
                      <Button
                        asChild
                        className="w-full gap-2 rounded-full bg-emerald-600 text-white hover:bg-emerald-500"
                      >
                        <a
                          href={siteConfig.flagshipRepo}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="h-4 w-4" />
                          Открыть на GitHub
                        </a>
                      </Button>
                    </SheetClose>
                  </div>
                </motion.nav>
              </AnimatePresence>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
