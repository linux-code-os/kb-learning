# KB Learning — сайт-визитка

Образовательная экосистема вокруг криптовалют: интерактивный торговый симулятор, конвертер, кросс-курсы, крипто-библиотека.

**Демо**: https://linux-code-os.github.io/kb-learning/

## Возможности

- 🎓 **Торговый симулятор** — виртуальный портфель ($10 000), market/limit ордера, live-цены, P&L в реальном времени
- 💱 **Конвертер криптовалют** — 12 монет, мгновенный пересчёт
- 📊 **Матрица кросс-курсов** — live-обновление из симулятора, click-to-copy
- 📚 **Крипто-библиотека** — 17 тем от основ до DeFi
- 🌍 **i18n RU/EN** — полный перевод интерфейса и контента
- 🌗 **Тёмная/светлая тема** — автоопределение системной
- ♿ **Accessibility** — skip-link, aria-live, focus-visible, keyboard nav
- 💾 **localStorage persistence** — портфель сохраняется между сессиями

## Технологии

- **Next.js 16** (App Router) + **TypeScript 5**
- **Tailwind CSS 4** + **shadcn/ui**
- **Framer Motion** — анимации
- **Zustand** — shared state для live-цен
- **Lucide React** — иконки

## Локальный запуск

```bash
bun install
bun run dev
```

Сайт будет на http://localhost:3000

## Деплой на GitHub Pages

Сайт настроен на статический экспорт. При пуше в `main` GitHub Action автоматически собирает и публикует сайт.

### Автоматически (через GitHub Actions)
1. Запушьте код в репозиторий
2. На GitHub: **Settings → Pages → Source = "GitHub Actions"**
3. Сайт будет на `https://linux-code-os.github.io/kb-learning/`

### Вручную
```bash
bun run build:pages
# содержимое папки out/ → ветка gh-pages
```

## Структура

```
src/
├── app/
│   ├── page.tsx              # Главная страница (18 секций)
│   ├── layout.tsx            # Корневой layout + metadata
│   └── api/                  # API routes (для Node-хостинга)
│       ├── github-stats/     # GitHub метрики (fallback: клиентский fetch)
│       └── subscribe/        # Подписка/контакт (fallback: mailto)
├── components/site/          # Секционные компоненты
├── lib/
│   ├── site-data.ts          # Все данные сайта (ссылки, фичи, FAQ, и т.д.)
│   ├── translations.ts       # Словарь RU/EN
│   └── simulator-store.ts    # Zustand store для live-цен
└── public/                   # Статичные ассеты
```

## Кастомизация

- **Ссылки и контент** — `src/lib/site-data.ts`
- **Переводы** — `src/lib/translations.ts`
- **Конфиг деплоя** — `next.pages.config.ts` (basePath для project pages)

## Лицензия

MIT
