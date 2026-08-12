import { translations, type Lang, type TranslationKey } from "./translations";

/**
 * Возвращает функцию перевода `t` для заданного языка.
 * Используется в Server Components, где lang передается через props.
 */
export function getT(lang: Lang) {
  return (key: TranslationKey): string => {
    const entry = translations[key];
    if (!entry) return String(key);
    return entry[lang] ?? entry.ru ?? String(key);
  };
}
