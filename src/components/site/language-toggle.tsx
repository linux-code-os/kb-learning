"use client";

import * as React from "react";
import { Languages } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { translations, type Lang } from "@/lib/translations";

type Ctx = { lang: Lang; setLang: (l: Lang) => void };
const LanguageContext = React.createContext<Ctx>({
  lang: "ru",
  setLang: () => {},
});

export function useLang() {
  return React.useContext(LanguageContext);
}

/**
 * Возвращает функцию-переводчик t(key) для текущего языка.
 * Если ключ не найден — возвращает сам ключ (для отладки).
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

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = React.useState<Lang>("ru");

  const setLang = React.useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("kb-lang", l);
    } catch {
      /* SSR или приватный режим */
    }
    // Обновляем <html lang> для скринридеров
    if (typeof document !== "undefined") {
      document.documentElement.lang = l;
    }
  }, []);

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem("kb-lang") as Lang | null;
      if (saved === "en" || saved === "ru") {
        setLangState(saved);
        document.documentElement.lang = saved;
      }
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function LanguageToggle() {
  const { lang, setLang } = useLang();
  const t = useT();
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
