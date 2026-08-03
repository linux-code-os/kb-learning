"use client";

import { useT } from "@/components/site/language-toggle";

/**
 * Skip-link для скринридеров и клавиатурной навигации:
 * невидим по умолчанию, появляется при фокусе, переводит к #main.
 */
export function SkipLink() {
  const t = useT();
  return (
    <a
      href="#main"
      className="sr-only z-[100] rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
    >
      {t("skip.toContent")}
    </a>
  );
}
