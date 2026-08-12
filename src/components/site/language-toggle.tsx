"use client";

import * as React from "react";
import { Languages } from "lucide-react";
import { useParams, useRouter, usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { translations, type Lang } from "@/lib/translations";

export function useLang(): { lang: Lang } {
  const params = useParams();
  const lang = (params?.lang as Lang) || "ru";
  return { lang };
}

/**
 * Возвращает функцию-переводчик t(key) для текущего языка.
 */
export function useT() {
  const { lang } = useLang();
  return React.useCallback(
    (key: keyof typeof translations): string => {
      const entry = translations[key];
      if (!entry) return String(key);
      return entry[lang] ?? entry.ru ?? String(key);
    },
    [lang],
  );
}

export function LanguageToggle() {
  const { lang } = useLang();
  const t = useT();
  const router = useRouter();
  const pathname = usePathname();

  const setLang = (l: Lang) => {
    try {
      localStorage.setItem("kb-lang", l);
    } catch {
      // ignore
    }
    if (!pathname) {
      router.push(`/${l}`);
      return;
    }
    // Заменяем текущий язык в URL на выбранный
    const newPath = pathname.replace(`/${lang}`, `/${l}`);
    router.push(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={t("action.changeLanguage")}
          className="relative h-9 w-9 rounded-full border border-border/60"
        >
          <span className="flex items-center gap-1" aria-hidden="true">
            <Languages className="h-4 w-4" />
          </span>
          <span className="sr-only">{t("action.changeLanguage")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        <DropdownMenuItem
          onClick={() => setLang("ru")}
          className={lang === "ru" ? "bg-accent" : ""}
        >
          🇷🇺 Русский
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLang("en")}
          className={lang === "en" ? "bg-accent" : ""}
        >
          🇬🇧 English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
