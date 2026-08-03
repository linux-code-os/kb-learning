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

export type Lang = "ru" | "en";

type Ctx = { lang: Lang; setLang: (l: Lang) => void };
const LanguageContext = React.createContext<Ctx>({
  lang: "ru",
  setLang: () => {},
});

export function useLang() {
  return React.useContext(LanguageContext);
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
  }, []);

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem("kb-lang") as Lang | null;
      if (saved === "en" || saved === "ru") setLangState(saved);
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
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Сменить язык"
          className="relative h-9 w-9 rounded-full border border-border/60 text-xs font-bold uppercase"
        >
          <span className="flex items-center gap-1">
            <Languages className="h-4 w-4" />
          </span>
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
