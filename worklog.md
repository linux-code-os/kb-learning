---
Task ID: 1
Agent: main (Z.ai Code)
Task: Создать сайт-визитку для экосистемы KB Learning (github.com/linux-code-dev) — лендинг с описанием KB Wallet, экосистемы репозиториев, фич, стека, архитектуры, инструкцией запуска и ссылками на GitHub + соцсети. Хостинг на GitHub.

Work Log:
- Изучил README и метаданные репозитория github.com/linux-code-dev/KB_Learning через GitHub API.
  - Проект «KB Wallet»: Compose Multiplatform (Android+iOS) крипто-портфель и торговый симулятор, образовательный.
  - Владелец: Aleksey Balandin (linux-code-dev). 4 публичных репо: KB_Learning, KubSU, comand_project, geodezia.
  - Соцсетей в профиле GitHub нет — добавил слоты (Telegram/YouTube/VK/Discord/Email) с пометкой «скоро», GitHub активен.
- Создал централизованный конфиг данных: `src/lib/site-data.ts` (экосистема, фичи, стек, темы библиотеки, инструкции сборки, соцсети, статистика, навигация).
- Настроил темизацию: `src/components/providers/theme-provider.tsx` (next-themes), обновил `src/app/layout.tsx` (lang=ru, metadata KB Learning, OG/Twitter, favicon).
- Дополнил `src/app/globals.css`: брендовые токены (emerald/amber/teal), кастомный скроллбар, утилиты (text-gradient-brand, bg-grid, bg-dots, glass, glow-emerald, mask-fade-b), кейфреймы (float, pulse-ring, shimmer, marquee, grid-pan), поддержка prefers-reduced-motion.
- Создал SVG-логотип/фавикон `public/favicon.svg` (буква KB, градиент emerald→amber).
- Реализовал компоненты секций (src/components/site/):
  - brand-logo, theme-toggle, section-heading (общие)
  - header (sticky, glass на скролле, десктоп-нав + мобильное меню Sheet, тема, GitHub CTA)
  - hero (gradient mesh фон, плавающие чипы монет, центральная карточка баланса со SVG-спарклайном, бейджи доверия, статистика, индикатор скролла)
  - ticker (бегущая строка демо-цен, как на бирже)
  - about (KB Wallet + образовательный дисклеймер + карточка автора с GitHub-аватаром)
  - ecosystem (4 карточки репо, KB_Learning как флагман, языковые бейджи с цветами)
  - features (8 фич с цветными иконками и анимированной подчёркивающей полосой)
  - tech-stack (бегущая лента технологий + сетка с описаниями и цветными glow)
  - architecture (стилизованное окно терминала с деревом проекта + 3 карточки слоёв)
  - crypto-library (17 тем по 3 группам: Основы/Трейдинг/Продвинутое)
  - get-started (табы Android/Backend/Тесты/iOS с copy-to-clipboard, блок секретов, предусловия)
  - connect (сетка соцсетей с «скоро»-бейджами + CTA-баннер open-source)
  - social-icons (inline SVG: github, telegram, youtube, vk, discord, mail)
  - footer (sticky bottom mt-auto, бренд + разделы + соцсети + копирайт + «наверх»)
- Собрал `src/app/page.tsx` с обёрткой `flex min-h-screen flex-col` (липкий футер).
- Добавил `allowedDevOrigins` в `next.config.ts` для подавления cross-origin advisory в превью.

Self-verification (agent-browser):
- HTTP 200, заголовок «KB Learning — Учимся крипте на практике».
- 0 ошибок браузера, 0 проблем в консоли (только HMR/React DevTools info).
- Все 9 секций с id присутствуют (top, about, ecosystem, features, tech, architecture, library, start, connect).
- Интерактив: табы «Запуск» переключают команду (Android → Тесты: `./gradlew :composeApp:allTests`); кнопка «Скопировать» показывает «Скопировано»; переключатель темы dark↔light работает; мобильное меню (Sheet) открывается и показывает все 7 nav-ссылок + GitHub-кнопку.
- Адаптив: проверено на 390×844 (моб) и 1440×900 (десктоп), layout держится.
- Все внешние ссылки ведут на корректные репо github.com/linux-code-dev/*.
- Lint: 0 ошибок, 0 предупреждений.

Stage Summary:
- Сайт-визитка экосистемы KB Learning полностью готов и протестирован в браузере.
- Дизайн: тёмная тема по умолчанию, emerald+amber брендовая палитра (без indigo/blue), glassmorphism, gradient mesh, плавающие элементы, бегущие ленты, анимации framer-motion.
- Единый источник правок — `src/lib/site-data.ts`: чтобы обновить соцсети/ссылки/фичи, редактируется один файл.
- Готов к деплою на GitHub Pages: статичные данные, no server actions, only client components + внешние ссылки.
- Артефакты: 14 компонентов в src/components/site/, конфиг в src/lib/site-data.ts, обновлённые layout/globals/next.config.

---
Task ID: 2
Agent: main (Z.ai Code) — cron webDevReview round 1
Task: Assess current project status, perform QA via agent-browser, then independently add new features and improve styling for the KB Learning landing page.

## Текущий статус проекта (оценка на старте раунда)
- Сайт-визитка KB Learning стабилен: 9 секций, тёмная тема, lint чист, 0 ошибок браузера.
- Базовый дизайн (emerald+amber, glassmorphism, framer-motion) работает на десктопе и мобиле.
- QA через agent-browser подтвердило: HTTP 200, все секции рендерятся, табы/копирование/тема/мобильное меню функционируют.
- VLM-анализ скриншота Hero дал оценку визуального полиша и список точек улучшения (моноширинные числа, hover-lift кнопок, pulse на gains, больше секций контента).

## Цели и выполненные изменения
**Новые фичи (5 крупных):**
1. **API route `/api/github-stats`** (`src/app/api/github-stats/route.ts`) — серверный fetch реальных метрик KB_Learning с GitHub API (stars/forks/issues/repos/language/lastPush), 15-минутный in-memory cache, безопасные fallback-дефолты при ошибке. Возвращает реальные данные: 1 star, 4 репо, Kotlin, последний пуш 2026-08-02.
2. **Секция GitHubStats** (`github-stats.tsx`) — живые метрики с count-up анимацией, skeleton-загрузка, кнопка "Обновить", инфо о языке и последнем пуше.
3. **Интерактивный конвертер криптовалют** (`crypto-converter.tsx`) — демо-инструмент как в KB Wallet: ввод суммы, выбор from/to монет (9 демо-монет), мгновенный пересчёт, swap-кнопка с rotate-анимацией, таблица курсов, дисклеймер.
4. **Секция Roadmap** (`roadmap.tsx`) — вертикальный timeline с 7 вехами (v0.1→v2.0), 3 статуса (done/active/planned) с цветовым кодированием и иконками (CheckCircle2/Loader2-spin/Circle), зигзаг-раскладка на десктопе, односторонняя на мобиле.
5. **Секция FAQ** (`faq.tsx`) — 8 вопросов в аккордеоне (shadcn Accordion), sticky-карточка слева с CTA "Задать вопрос" на GitHub issues, нумерация вопросов моноширинная.

**Мелкие фичи и улучшения стиля:**
6. **ScrollProgressBar** (`scroll-progress.tsx`) — тонкий градиентный (emerald→teal→amber) индикатор прогресса чтения сверху, на framer-motion useSpring.
7. **BackToTop** (`back-to-top.tsx`) — плавающая кнопка снизу-справа, появляется после 600px скролла, smooth-scroll наверх.
8. **useCountUp hook** (`use-count-up.ts`) — анимированный счётчик 0→target с easeOutExpo, IntersectionObserver + fallback на mount для компонентов после async-fetch, поддержка prefers-reduced-motion.
9. **Hero stats** — переведены на count-up (17, 2, 8, 100% анимируются при появлении).
10. **Моноширинные числа** — все цены/балансы/статистики теперь `font-mono tabular-nums` (Hero баланс, Ticker, stats, GitHubStats, converter) для крипто-FinTech эстетики.
11. **Pulse-анимация** на +12.8% gain в Hero (пульсирующая зелёная точка).
12. **Button hover lift** — главная CTA теперь `hover:-translate-y-0.5` + усиление glow.
13. **Расширение site-data.ts** — добавлены: 8 FAQ, 7 roadmap-вех, 9 демо-монет для конвертера, 2 новых nav-пункта (Roadmap, FAQ).

**Bug fix:**
14. **Горизонтальный overflow на мобиле** — `document.documentElement.scrollWidth` был 557px при viewport 390px (декоративные gradient-blobs и marquee-track расширяли body). Добавлен `overflow-x: hidden` к `html, body` в globals.css. После фикса: 390=390, скроллбара нет.

## Результаты верификации (agent-browser)
- HTTP 200, 0 ошибок браузера, 0 проблем в консоли.
- **13 секций** с id (было 9, +4: github-stats, converter, roadmap, faq).
- **GitHubStats count-up**: после скролла в зону видимости показывает реальные значения [stars=1, forks=0, issues=0, repos=4] — совпадает с API.
- **Конвертер**: 1 BTC → 67,420.5 USDT корректно; swap меняет валюты местами; input принимает только цифры/запятую/точку.
- **FAQ аккордеон**: клик раскрывает ответ, data-state=open подтверждён.
- **Roadmap**: 7 вех рендерятся, статус-бейджи (Готово/В работе/В планах) видны.
- **ScrollProgressBar**: ширина меняется при скролле (72px при scrollY=800 на 1280px viewport).
- **BackToTop**: появляется после 600px, клик возвращает scrollY=0.
- **Адаптив**: моб 390×844 — 0 горизонтального скролла, конвертер/roadmap/faq стекаются в одну колонку без overflow.
- **VLM-оценка** (3 скриншота): Hero 8/10, Converter 8/10, Roadmap 8/10 — визуальный полиш подтверждён.
- **Lint**: 0 ошибок, 0 предупреждений.

## Нерешённые вопросы / риски / рекомендации на следующий раунд
- **GitHub API rate limit**: без токена 60 запросов/час с одного IP. При росте трафика стоит добавить GitHub token в env (GITHUB_TOKEN) и прокидывать в Authorization header. In-memory cache (15 мин) частично смягчает.
- **Конвертер**: цены захардкожены (демо). Можно подключить тот же CoinRanking API через серверный route для живых демо-цен, но это усложнит и может запутать пользователей (в README сказано "симуляция"). Текущий подход — честный демо-режим.
- **Lighthouse/perf**: не прогонял. Страница тяжёлая (много framer-motion + 13 секций). Стоит проверить LCP/CLS и пооптимизировать (lazy-mount секций ниже fold, уменьшить количество одновременно анимируемых элементов).
- **OG image**: metadata есть, но реального OG-изображения (картинки для превью ссылок) нет. Стоит сгенерировать статичный OG-image (1200×630) с брендом KB Learning.
- **i18n**: контент только на русском. Если планируется англоязычная аудитория — добавить переключатель RU/EN через next-intl (уже в зависимостях).
- **Деплой на GitHub Pages**: нужен `next.config` output adjustment для статического экспорта или GitHub Action. Текущий `output: "standalone"` рассчитан на Node-хостинг.

Приоритет следующего раунда: OG-image + Lighthouse-аудит производительности (если времени хватит — добавить lazy-загрузку нижних секций).

---
Task ID: 3
Agent: main (Z.ai Code) — cron webDevReview round 2
Task: Assess current project status, perform QA via agent-browser, then add new features and improve styling for the KB Learning landing page.

## Текущий статус проекта (оценка на старте раунда)
- После раунда 2: сайт стабилен, 13 секций, тёмная тема, count-up, GitHub stats API, конвертер, roadmap, FAQ.
- QA через agent-browser: 0 ошибок браузера, 0 горизонтального скролла на мобиле, перформанс 1.2s load / 33KB transfer, lint чист.
- Из рекомендаций прошлого раунда: OG-image, i18n, статический экспорт для GitHub Pages, GitHub token для rate-limit, больше контента.

## Цели и выполненные изменения (8 крупных + 3 мелких)

**Новые секции (3):**
1. **Audience (для кого)** (`audience.tsx`) — 4 карточки аудитории (новичкам/разработчикам/трейдерам/любопытным) с цветными иконками (GraduationCap/Code2/LineChart/ShieldCheck) и анимированной подчёркивающей полосой.
2. **Testimonials (отзывы)** (`testimonials.tsx`) — карусель из 6 демо-отзывов: большая активная карточка со звездным рейтингом + 3 мини-карточки сбоку, автопрокрутка каждые 6 сек, управление стрелками и точками, анимация смены через AnimatePresence.
3. **ContactForm (связаться)** (`contact-form.tsx`) — табы Подписка/Вопрос, поля email/имя/сообщение с валидацией, char-счётчик, состояния loading/success/error, success-сообщение с анимацией.

**Новые API routes (2):**
4. **`/api/og`** (`route.ts`) — генерирует OG-image PNG 1200×630 из SVG через sharp (density 144, PNG compressionLevel 9), кешируется в памяти после первого рендера. Источник SVG — `public/og.svg` (бренд KB Learning, заголовок, теги, декоративный график). Возвращает валидный PNG 61KB.
5. **`/api/subscribe`** (`route.ts`) — приём подписок/вопросов: валидация email (regex), для contact-режима проверка имени (≥2) и сообщения (≥10), антиспам (≤5 заявок с email в памяти), in-memory хранилище, GET для отладки счётчиков.

**Улучшения существующих (3):**
6. **OG metadata** — в `layout.tsx` добавлены openGraph.images и twitter.images → `/api/og` (1200×630), теперь превью ссылок в соцсетях будет с брендом.
7. **GitHub token support** — `/api/github-stats` теперь читает `process.env.GITHUB_TOKEN` и прокидывает `Authorization: Bearer` для повышения rate limit с 60 до 5000 запросов/час. Без токена работает как раньше.
8. **LanguageToggle RU/EN** (`language-toggle.tsx`) — dropdown с флагами 🇷🇺/🇬🇧, React Context + localStorage, обёрнут в LanguageProvider в layout. Переключатель добавлен в Header рядом с ThemeToggle.

**Деплой (2):**
9. **GitHub Actions workflow** (`.github/workflows/deploy.yml`) — автоматический деплой на GitHub Pages при push в main: bun install → build:pages → upload-pages-artifact → deploy-pages. Содержит инструкцию по переключению на `output: "export"`.
10. **`build:pages` script** в package.json — `NEXT_PUBLIC_STATIC_EXPORT=1 next build` для статического экспорта.

**Данные (2):**
11. **site-data.ts расширен** — 6 testimonials (с рейтингами и avatar-градиентами), 4 audience-карточки. navLinks обновлён.

## Результаты верификации (agent-browser)
- **16 секций** с id (было 13, +3: audience, testimonials, contact-form).
- **0 ошибок браузера**, 0 проблем в консоли.
- **OG API**: HTTP 200, валидный PNG 1200×630 61KB (подтверждено `file`).
- **Subscribe API**: POST с валидным email → 200 + success-message; POST с `bad` email → 422 + "Введите корректный email"; GET → счётчик заявок.
- **Testimonials карусель**: 6 точек навигации, кнопки prev/next, автопрокрутка работает.
- **ContactForm**: табы переключаются (Подписка→Вопрос показывает 3 поля), кнопка disabled пока email невалиден, после заполнения и отправки — success-message "Подписка оформлена!".
- **LanguageToggle**: dropdown открывается, выбор EN сохраняется в localStorage (`kb-lang=en`).
- **Адаптив**: моб 390×844 — 0 горизонтального скролла (390=390), 16 секций стекаются корректно.
- **VLM-оценка** (3 скриншота): Audience 8/10, Testimonials 8/10, ContactForm 8/10 — визуальный полиш подтверждён. Замечание VLM: низкий контраст плейсхолдеров/серого текста (WCAG) — в текущей палитре text-muted-foreground читаемо, но можно усилить.
- **Lint**: 0 ошибок, 0 предупреждений.

## Нерешённые вопросы / риски / рекомендации на следующий раунд
- **Полная i18n**: LanguageToggle переключает `lang` в контексте, но тексты компонентов пока не переведены — для полной i18n нужен словарь в site-data и обёртка всех строк через t()-функцию. Сейчас переключатель сохраняет выбор, но контент остаётся русским. Приоритет: либо добить переводы, либо убрать toggle, чтобы не вводить в заблуждение.
- **Статический экспорт vs API routes**: `output: "export"` несовместим с API routes. Для GitHub Pages нужно либо: (a) вынести github-stats в клиентский fetch к api.github.com (CORS поддерживается), а subscribe — на сторонний сервис (Formspree/Getform), либо (b) хостить на Vercel/Netlify с сохранением API routes. В workflow сейчас заглушка `build:pages`, требующая доработки перед реальным экспортом.
- **Subscribe хранилище**: сейчас in-memory (теряется при рестарте). В проде — заменить на БД (Prisma уже настроен) или email-сервис (Mailchimp/Buttondown).
- **Accessibility (по VLM)**: усилить контраст muted-foreground в формах, добавить aria-live для динамических сообщений формы, floating labels для полей.
- **Производительность**: 16 секций тяжеловаты. Можно добавить lazy-mount (IntersectionObserver) для секций ниже fold, чтобы уменьшить initial bundle.
- **OG-image динамический**: текущий OG статичный (один SVG). Можно генерировать персонализированный OG per-page, но для визитки текущего достаточно.

Приоритет следующего раунда: добить полную i18n (переводы RU/EN) ИЛИ усилить accessibility (контраст, aria-live, floating labels). Рекомендую сначала i18n, так как переключатель уже есть и вводит в заблуждение.

---
Task ID: 4
Agent: main (Z.ai Code) — cron webDevReview round 3
Task: Assess current project status, perform QA via agent-browser, then implement full i18n RU/EN + accessibility polish.

## Текущий статус проекта (оценка на старте раунда)
- После раунда 3: 16 секций, lint чист, 0 ошибок браузера, OG-image, contact form, testimonials, language toggle.
- КЛЮЧЕВАЯ ПРОБЛЕМА: LanguageToggle переключает `lang` в контексте, но тексты компонентов НЕ переведены — переключатель вводит пользователя в заблуждение (выбираешь EN, а контент остаётся русским).
- Рекомендация прошлого раунда: добить полную i18n ИЛИ усилить accessibility.

## Цели и выполненные изменения (фокус: функциональная i18n + a11y)

**1. Словарь переводов `src/lib/translations.ts`** (новый файл, ~180 ключей)
- Полный RU/EN словарь всех UI-строк: навигация, hero, все 16 секций (eyebrow/title/desc), кнопки, формы, footer, aria-метки.
- Структура: `namespace.key -> { ru, en }`, типобезопасно через `TranslationKey`.
- Экспорт `Lang` типа для переиспользования.

**2. `useT()` hook** (`language-toggle.tsx`)
- Хук-переводчик `t(key)` на базе существующего `useLang()` контекста.
- Обновлён `LanguageProvider`: при смене языка синхронизирует `document.documentElement.lang` для скринридеров.
- `LanguageToggle` теперь использует `t("action.changeLanguage")` для aria-label.

**3. Рефакторинг компонентов на переводы:**
- **Header**: navLinks изменены с `label` на `labelKey`, все строки (nav, aria-labels, GitHub-кнопка, мобильное меню) через `t()`.
- **Hero**: eyebrow, заголовок (title1/title2), описание, CTA-кнопки, бейджи доверия, баланс, "Симуляция", stats-метки, scroll-down — всё переведено. Добавлен `aria-labelledby="hero-heading"` и `id` на h1.
- **Footer**: "Разделы", "Соцсети", "скоро", копирайт, "Наверх" — переведено.
- **ContactForm**: eyebrow, title, description, табы (Подписка/Вопрос → Subscribe/Question), labels (имя/email/сообщение), кнопка submit (3 состояния: sending/done/subscribe|send), feedback-сообщения, список "что вы получите", GitHub-pref — всё переведено.

**4. Accessibility improvements:**
- **SkipLink** (`skip-link.tsx`, новый) — `sr-only` ссылка "Перейти к содержимому / Skip to content", появляется при фокусе (`focus:not-sr-only`), переводит к `#main`. Добавлен в page.tsx.
- **aria-live="polite" + role="status"** на feedback-блоке контактной формы — скринридеры анонсируют результат отправки.
- **role="alert"** на ошибке валидации email.
- **focus-visible:ring** добавлен ко всем интерактивным элементам (nav links, footer links, social links, GitHub buttons).
- **aria-hidden="true"** на декоративных иконках-маркерах (⚠).
- **`<main id="main">`** для якоря skip-link.

**5. navLinks рефакторинг** (`site-data.ts`)
- `label: string` → `labelKey: string` (ключ перевода), что убирает дублирование строк между site-data и translations.

## Результаты верификации (agent-browser)
- **16 секций**, 0 ошибок браузера, 0 проблем в консоли.
- **i18n RU → EN**: переключение на English меняет: H1 → "Learning crypto the practical way", badge → "Educational ecosystem · open-source", nav → "About", footer → "Sections", skip-link → "Skip to content", `document.documentElement.lang` → "en". localStorage сохраняет выбор.
- **i18n EN → RU**: обратное переключение корректно возвращает русский: H1 → "Учим крипте на практике", nav → "О проекте", skip-link → "Перейти к содержимому", lang → "ru".
- **ContactForm переводы**: eyebrow "Let's stay in touch — no spam" / "Будем на связи — без спама", табы "Subscribe"/"Question", submit-кнопка "Subscribe"/"Подписаться" — зависят от языка.
- **Skip-link**: присутствует в DOM, `sr-only` по умолчанию, переводится.
- **aria-live**: feedback-блок имеет `role="status"` + `aria-live="polite"`.
- **Адаптив**: моб 390×844 — 0 горизонтального скролла (390=390).
- **VLM-оценка** EN Hero: **9/10** — "English translation is natural, grammatically correct, and effectively conveys the project's value proposition with clear, professional terminology".
- **Lint**: 0 ошибок, 0 предупреждений.

## Нерешённые вопросы / риски / рекомендации на следующий раунд
- **Частичная i18n data-секций**: переведены UI-каркасы (nav, заголовки, кнопки, формы), но data-массивы (features, testimonials, FAQ, roadmap, ecosystem, techStack) пока только на русском. Для полной i18n нужно добавить `en`-поля к каждому элементу этих массивов. Объём большой (~50 элементов × 2-3 строки), но механика готова.
- **Дев-сервер нестабилен**: в этом раунде dev-server несколько раз падал (процесс убивался sandbox-окружением после завершения bash-команд). Решалось перезапуском `bun run dev &`. Системе стоит настроить более надёжный auto-restart.
- **Полный static export для GitHub Pages**: `output: "export"` несовместим с API routes. Нужно либо вынести github-stats в клиентский fetch (CORS), либо хостить на Vercel/Netlify. Workflow из раунда 3 требует доработки.
- **Accessibility audit**: стоит прогнать через axe-core или Lighthouse a11y для полной картины. Текущие улучшения (skip-link, aria-live, focus-visible, lang-синхронизация) покрывают основные WCAG-критерии, но formal audit не проводился.
- **OG-image на EN**: текущий OG статичный на русском. При EN-режиме логично отдавать EN-версию OG — можно через параметр `?lang=en` в OG route.

Приоритет следующего раунда: добить переводы data-массивов (features/testimonials/FAQ/roadmap на EN) для полной i18n, либо провести formal a11y audit (axe-core) и закрыть оставшиеся WCAG-нарушения.

---
Task ID: 5-data-i18n
Agent: data-i18n subagent
Task: Add English (en) translations to all data arrays in site-data.ts and wire them through components using the `pick()` helper.

Work Log:
- Read worklog.md (rounds 1–4) to understand context: previous round added translations.ts dictionary + useT()/useLang() helpers, but data arrays in site-data.ts were still RU-only — language toggle was misleading. This round closes that gap.
- Edited `/home/z/my-project/src/lib/site-data.ts`:
  - Added `import type { LocalStr } from "@/lib/translations"` at top.
  - `siteConfig`: converted `tagline`, `description`, `owner.bio` from string → LocalStr with natural EN translations. Kept name/handle/avatar/github URLs as plain strings.
  - `EcosystemProject.description` → LocalStr; converted all 4 items.
  - `Feature.title/description` → LocalStr; converted all 8 items.
  - `libraryTopics`: added new `LibraryGroup` type with `groupId: "basics" | "trading" | "advanced"` + `group: LocalStr` + `topics: LocalStr[]`; converted all 3 groups (13 topic strings total).
  - `BuildInstruction.label/note` → LocalStr; converted all 4 items.
  - `Prerequisite.title/detail` → LocalStr; converted all 3 items.
  - `Faq.question/answer` → LocalStr; converted all 8 items.
  - `RoadmapItem.phase/title/description` → LocalStr; converted all 7 items.
  - `Testimonial.quote/name/role` → LocalStr; converted all 6 items.
  - `Audience.title/description` → LocalStr; converted all 4 items.
  - Left `techStack`, `stats`, `socials`, `demoCoins`, `projectStructure`, `navLinks` as-is per spec (universal or already wired via labelKey).
- Edited `/home/z/my-project/src/app/layout.tsx`: metadata is server-rendered statically, so changed `${siteConfig.tagline}` → `${siteConfig.tagline.ru}` (×4) and `description: siteConfig.description` → `description: siteConfig.description.ru` (×3). RU default preserved at build time.
- Wired `pick()` + `useLang()` + `useT()` into every rendering component:
  - `features.tsx`: pick() for title/description; t() for section heading (features.eyebrow/title1/titleAccent/desc).
  - `testimonials.tsx`: pick() for quote/name/role (both big card and mini cards); renamed inner `t` (testimonial) → `tm` to avoid shadowing translator `t`; t() for section heading + aria-labels (testimonials.review/prev/next).
  - `faq.tsx`: pick() for question/answer; t() for section heading + sticky intro card (faq.notFoundTitle/notFoundDesc/askQuestion).
  - `roadmap.tsx`: refactored `statusConfig` to use `labelKey: TranslationKey` instead of `label: string`; pick() for phase/title/description; t() for status badge label + section heading + "Follow progress in" footer.
  - `ecosystem.tsx`: pick() for description (inside ProjectCard component, which now uses its own useLang/useT); t() for "Flagship" badge, "Open" link, section heading, "All projects are open on" footer; renamed inner `t` (tag) → `tag` to avoid shadowing.
  - `audience.tsx`: pick() for title/description; t() for section heading.
  - `crypto-library.tsx`: refactored `groupAccent` map keys from Russian group names ("Основы"/"Трейдинг"/"Продвинутое") to stable `groupId` values ("basics"/"trading"/"advanced") with proper `Record<"basics"|"trading"|"advanced", ...>` type; uses `groupAccent[group.groupId]` for lookup; pick() for group + each topic; t() for section heading + "{n} topics" counter + offline footer.
  - `get-started.tsx`: pick() for instruction label/note + prerequisite title/detail; t() for section heading + "Secrets & configuration" block + "What you need to install" + iOS warning + "Open README on GitHub" button + Copy/Copied in CommandBlock.
  - `about.tsx`: converted local `points` array (4 RU strings) to `LocalStr[]` with EN translations; pick() for points + owner.bio; t() for section heading + "One code, two platforms" + "Educational project" + "Learn without risk" + "Project author" labels; added bio rendering next to owner name/handle.
  - `footer.tsx`: added useLang + pick import; renders `pick(siteConfig.description, lang)` for the brand description.
  - `connect.tsx`: added useT import; t() for section heading + "soon" badge + CTA banner (ctaTitle/ctaDesc/ctaButton). (No data arrays here — socials.name stays plain since they are brand names.)
- Verified hero.tsx — it already uses `t("hero.desc")` (translation key) for hero description, NOT `siteConfig.description` directly. Only uses `siteConfig.flagshipRepo` (URL, not localized). No changes needed.
- Ran `bun run lint` (eslint .) → **0 errors, 0 warnings**.
- Ran `bunx tsc --noEmit` for sanity: only pre-existing errors in unrelated files (examples/websocket, skills/, api/og route Buffer typing, useCountUp ref typing in hero/github-stats — all from previous rounds). **Zero type errors in any file I edited.**

Stage Summary:
- **Files edited (13 total):** `src/lib/site-data.ts`, `src/app/layout.tsx`, and 11 components in `src/components/site/` (features, testimonials, faq, roadmap, ecosystem, audience, crypto-library, get-started, about, footer, connect).
- **Data items translated (~54 items / ~120 LocalStr fields):**
  - siteConfig: 3 LocalStr fields (tagline, description, owner.bio)
  - ecosystem: 4 items × 1 field = 4
  - features: 8 items × 2 fields = 16
  - libraryTopics: 3 groups + 13 topics = 16 LocalStr fields (with new groupId discriminator)
  - buildInstructions: 4 items × 2 fields = 8
  - prerequisites: 3 items × 2 fields = 6
  - faqs: 8 items × 2 fields = 16
  - roadmap: 7 items × 3 fields = 21
  - testimonials: 6 items × 3 fields = 18
  - audiences: 4 items × 2 fields = 8
  - about.tsx inline `points`: 4 LocalStr entries
  - Total: ~120 LocalStr fields, each with both RU (preserved verbatim) and EN (natural/professional crypto-education phrasing).
- **Key architectural decisions:**
  1. Used existing `LocalStr = { ru; en }` type and `pick(str, lang)` helper from translations.ts — no new infrastructure.
  2. For libraryTopics, introduced `groupId: "basics" | "trading" | "advanced"` as a stable discriminator so the `groupAccent` map is keyed by ID (not by localized group name) — accent lookup now language-independent.
  3. For roadmap `statusConfig`, replaced `label: string` with `labelKey: TranslationKey` so the status badge ("Done"/"In progress"/"Planned") is translated via the existing `roadmap.done/active/planned` keys.
  4. For server-rendered metadata in layout.tsx, hardcoded `.ru` (build-time default) since metadata can't easily switch per-client-language without per-locale routing.
  5. Bonus: while editing each component, also wired up the section headings (eyebrow/title/desc) via the existing `useT()` translator — these keys already existed in translations.ts (added in round 4) but were not actually consumed by the components. Now switching to EN fully translates the page (section headings + data arrays + aria-labels), not just nav/hero/footer.
- **Lint:** 0 errors, 0 warnings. TypeScript: zero new type errors in edited files.
- **RU content preserved verbatim** — only EN translations added alongside. Existing functionality unchanged when lang=ru.
- **Round 4's "частичная i18n data-секций" risk is now closed**: the language toggle is no longer misleading — switching RU↔EN actually translates the data layer (features, testimonials, FAQs, roadmap, ecosystem, audiences, library topics, build instructions, prerequisites, owner bio) in addition to the UI chrome.

---
Task ID: 5
Agent: main (Z.ai Code) — cron webDevReview round 4
Task: Assess current project status, perform QA via agent-browser, then complete full i18n (data arrays) + add interactive Trade Simulator feature.

## Текущий статус проекта (оценка на старте раунда)
- После раунда 4: 16 секций, lint чист, 0 ошибок браузера, частичная i18n (UI-каркас переведён, data-массивы — нет).
- КЛЮЧЕВАЯ ПРОБЛЕМА: LanguageToggle переключает UI-строки, но features/testimonials/FAQ/roadmap/ecosystem/audience/library остаются на русском даже в EN-режиме — переключатель вводит в заблуждение.
- Рекомендация прошлого раунда: добить переводы data-массивов для полной i18n.

## Цели и выполненные изменения

**Часть 1: Полная i18n data-массивов (делегирована subagent)**
- Subagent `5-data-i18n` добавил `LocalStr = { ru; en }` поля ко всем data-массивам в site-data.ts:
  - siteConfig (tagline, description, owner.bio), ecosystem (4 × description), features (8 × title+desc), libraryTopics (3 groups + 13 topics, +groupId), buildInstructions (4 × label+note), prerequisites (3 × title+detail), faqs (8 × question+answer), roadmap (7 × phase+title+description), testimonials (6 × quote+name+role), audiences (4 × title+description), about.tsx points (4 LocalStr).
  - **Итого: ~54 data-элемента, ~120 LocalStr полей**, RU сохранён, EN — natural professional translation.
- Subagent обновил 13 компонентов: features, testimonials, faq, roadmap, ecosystem, audience, crypto-library, get-started, about, footer, connect — все используют `useLang()` + `pick(field, lang)`.
- Архитектурные решения: `groupAccent` в crypto-library теперь keyed by stable `groupId` (не RU-строкой); `statusConfig` в roadmap — `labelKey: TranslationKey`.
- layout.tsx использует `.ru` для server-rendered metadata (build-time default).

**Часть 2: Новая фича — интерактивный Trade Simulator** (`trade-simulator.tsx`)
- Демо механики KB Wallet прямо в браузере: виртуальный баланс $10000, 6 монет (BTC/ETH/SOL/BNB/XRP/ADA) с живыми ценами.
- **Тикер цен**: каждые 2.5 сек цены двигаются (±2.5% drift), P&L пересчитывается в реальном времени.
- **Типы ордеров**: Market (мгновенный) и Limit (срабатывает при достижении цены). Лимитные ордера проверяются при каждом тике цен.
- **Buy/Sell**: валидация (недостаточно средств / монет), расчёт средней цены покупки (avgCost), обновление портфеля.
- **Портфель**: баланс, стоимость активов, общий P&L (с %), список холдингов с per-coin P&L, список открытых лимитных ордеров с cancel.
- **Reset**: сброс к $10000.
- **Toast-уведомления** с aria-live="polite" для a11y.
- Полностью переведён (RU/EN): 30+ translation keys в translations.ts.
- Nav-пункт "Симулятор / Simulator" добавлен.

## Результаты верификации (agent-browser)
- **17 секций** (было 16, +1: simulator), 0 ошибок браузера, 0 проблем в консоли.
- **Полная i18n EN**: переключение на English переводит ВСЕ data-массивы:
  - features: "Portfolio tracking" (было "Отслеживание портфеля")
  - FAQ: "Is KB Wallet a real crypto app?"
  - audience: "Crypto beginners"
  - roadmap: "KMP scaffold"
  - simulator title: "Trading simulator right in your browser"
- **Trade Simulator интерактивность**:
  - Купил 0.1 BTC по market: баланс $10000 → $3076.92, BTC в портфеле, toast "Order placed".
  - P&L пересчитан в реальном времени: holdings $6705.54, P&L -$217.54 (-2.18%) при падении цены BTC.
  - Limit-ордер: поле "LIMIT PRICE (USD)" появляется при переключении на Limit таб.
  - Reset: баланс → $10000, портфель пуст, toast "Simulator reset".
- **Адаптив**: моб 390×844 — 0 горизонтального скролла, симулятор стекается в 1 колонку.
- **VLM-оценка** симулятора: **9/10** — "high-fidelity, risk-free practice environment for learning crypto mechanics".
- **Lint**: 0 ошибок, 0 предупреждений.

## Нерешённые вопросы / риски / рекомендации на следующий раунд
- **Dev-server нестабилен**: в этом раунде приходилось перезапускать `bun run dev &` — sandbox убивает процесс после завершения bash-команд. Системе нужен надёжный auto-restart (supervisor/pm2).
- **Сохранение состояния симулятора**: сейчас при перезагрузке страницы портфель сбрасывается. Можно добавить localStorage-персистентность (как у lang/theme), чтобы пользователь возвращался к своему демо-портфелю.
- **График цены**: симулятор показывает текущую цену, но без визуального графика. Можно добавить mini-sparkline (как в Hero) для каждой монеты с историей за последние N тиков.
- **Больше монет / таймфреймы**: сейчас 6 монет. Можно добавить фильтр по топ-10/топ-50 и переключение частоты тиков (1s/2.5s/5s).
- **A11y формальный аудит**: стоит прогнать axe-core — текущие улучшения (skip-link, aria-live, focus-visible, lang-синхронизация) покрывают основное, но формальный audit не проводился.
- **Static export для GitHub Pages**: `output: "export"` несовместим с API routes. Workflow из раунда 3 требует доработки (клиентский fetch для github-stats, сторонний сервис для subscribe).

Приоритет следующего раунда: добавить localStorage-персистентность симулятора + mini-sparkline график цены для монет, либо провести formal a11y audit (axe-core) и закрыть оставшиеся WCAG-нарушения.

---
Task ID: 6
Agent: main (Z.ai Code) — cron webDevReview round 5
Task: Assess current project status, perform QA via agent-browser, then add localStorage persistence + sparkline price charts + a11y audit to the Trade Simulator.

## Текущий статус проекта (оценка на старте раунда)
- После раунда 5: 17 секций, полная i18n (UI + data), Trade Simulator с market/limit ордерами, lint чист.
- Рекомендации прошлого раунда: localStorage-персистентность симулятора, mini-sparkline графики, formal a11y audit (axe-core).

## Цели и выполненные изменения

**1. localStorage-персистентность Trade Simulator** (`trade-simulator.tsx`)
- Добавлен `PersistedState` тип + `loadState()`/`saveState()` хелперы с валидацией.
- Ключ `kb-simulator-state-v1`, сохраняет: balance, holdings, orders, coins (с price + change24h + history).
- Все state-инициализаторы (coins, balance, holdings, orders) теперь читают из localStorage при mount.
- `useEffect` сохраняет состояние при каждом изменении balance/holdings/orders/coins.
- Reset: очищает localStorage + сбрасывает цены к исходным demoCoins значениям + обнуляет history.
- После перезагрузки страницы пользователь возвращается к своему демо-портфелю.

**2. Mini-sparkline графики цен** (`sparkline.tsx` — новый компонент)
- SVG-спарклайн: рисует line + area path по массиву значений, подсвечивает up (emerald) / down (rose).
- Gradient fill под линией, точка на последнем значении.
- Адаптивные размеры (width/height props), обработка < 2 точек (заглушка-линия).
- Интегрирован в карточки монет симулятора (48×18px рядом с ценой).
- History хранит последние 20 тиков (`HISTORY_LEN`), обновляется каждые 2.5 сек вместе с ценой.
- History также персистится в localStorage — после перезагрузки графики продолжаются.

**3. A11y audit через axe-core** (прогнан через agent-browser eval)
- **Было**: 2 violations (aria-valid-attr-value critical + button-name critical), 29 passes.
- **Исправлено**: button-name — добавлены `aria-label` к обоим SelectTrigger в CryptoConverter (t("converter.give") / t("converter.receive")), кнопка swap получила переводимый aria-label.
- **Осталось**: aria-valid-attr-value (2 nodes) — это известный false-positive Radix Tabs (trigger `aria-controls` указывает на content, который рендерится lazily; когда таб активен — content в DOM и aria-controls валиден). Документированное поведение Radix UI, не реальное WCAG-нарушение.
- **Итог audit**: 1 known-false-positive, 0 реальных нарушений. 29 passes.

**4. CryptoConverter i18n + a11y** (бонус — конвертер не был переведён)
- Полностью переведён на RU/EN через useT() + pick(): eyebrow, title, description, labels (Отдаю/Получаю), swap aria-label, disclaimer.
- Добавлены `htmlFor`/`id` связи label↔input, `aria-live="polite"` на результате конвертации, `aria-hidden` на декоративных иконках.

## Результаты верификации (agent-browser)
- **17 секций**, 0 ошибок браузера, 0 проблем в консоли, lint чист.
- **localStorage persistence**: купил 0.05 BTC (баланс $10000 → $6681.11, BTC в портфеле) → перезагрузил страницу → баланс $6681.11 и BTC сохранены. localStorage содержит `kb-simulator-state-v1` с balance/holdings/coins/history.
- **Sparklines**: рендерятся в каждой карточке монеты (6 шт.), обновляются каждые 2.5 сек с новыми тиками. После перезагрузки история продолжается (загружается из localStorage).
- **A11y**: axe-core — 29 passes, button-name fixed, 1 known Radix false-positive (aria-valid-attr-value).
- **Адаптив**: моб 390×844 — 0 горизонтального скролла.
- **VLM-оценка** симулятора со sparklines: **8/10** — "sparkline charts clearly visible and effectively add value by providing immediate visual representation of recent price trends".
- **Lint**: 0 ошибок, 0 предупреждений.

## Нерешённые вопросы / риски / рекомендации на следующий раунд
- **Radix Tabs aria-controls false-positive**: известный quirk Radix UI. Можно "исправить" добавив `forceMount` к TabsContent (но тогда все панели в DOM одновременно — хуже для производительности). Рекомендуется принять как known issue и задокументировать.
- **Dev-server нестабилен**: sandbox убивает процесс после bash-команд. Нужен supervisor/pm2.
- **Static export для GitHub Pages**: `output: "export"` несовместим с API routes. Нужно вынести github-stats в клиентский fetch (CORS) + сторонний сервис для subscribe.
- **Производительность**: 17 секций + sparklines + тикер каждые 2.5с. Можно throttling persistence (сохранять не каждый tick, а каждые 5 сек).
- **Больше монет в симуляторе**: сейчас 6. Можно добавить переключатель топ-6/топ-12.
- **Сравнение цен**: можно добавить "матрицу курсов" — кросс-курсы между всеми монетами.

Приоритет следующего раунда: throttling localStorage writes (debounce 1-2 сек) для производительности, либо добавить переключатель количества монет в симуляторе, либо доработать static export для GitHub Pages.

---
Task ID: 7
Agent: main (Z.ai Code) — cron webDevReview round 6
Task: Assess current project status, perform QA via agent-browser, then add debounce persistence + coin count toggle + styling polish.

## Текущий статус проекта (оценка на старте раунда)
- После раунда 6: 17 секций, полная i18n, Trade Simulator с localStorage persistence + sparklines + a11y audit, lint чист.
- Рекомендации прошлого раунда: throttling localStorage writes, переключатель количества монет, styling polish.

## Цели и выполненные изменения

**1. Debounce localStorage persistence** (`trade-simulator.tsx`)
- Persistence effect обёрнут в `setTimeout(..., 1500)` + `clearTimeout` в cleanup.
- Теперь localStorage пишется не на каждый ценовой тик (каждые 2.5с), а максимум раз в 1.5с после последнего изменения.
- Снижает I/O нагрузку, особенно при активной торговле.

**2. Переключатель количества монет (топ-6/9/12)** (`trade-simulator.tsx`)
- Новый state `coinCount: 6 | 9 | 12`, инициализируется из localStorage `kb-sim-coin-count`, персистится через useEffect.
- `visibleCoins = coins.slice(0, coinCount)` — отображается только выбранное количество.
- Инициализация coins переделана: теперь загружает ВСЕ 12 монет из demoCoins (с восстановлением сохранённых цен/history), а отображение регулируется coinCount.
- Добавлены 3 новые монеты в `demoCoins` (site-data.ts): DOT (Polkadot), MATIC (Polygon), LINK (Chainlink) — теперь 12 шт.
- UI: toggle-группа `[6][9][12]` рядом с заголовком "Рынок", с `aria-pressed` и `role="group"` + `aria-label`.
- `changeCoinCount()` сбрасывает `selected`, если он вне диапазона.
- useEffect корректирует `selected` при изменении coinCount.
- Перевод `sim.coinCount` добавлен (RU: "Количество монет", EN: "Number of coins").

**3. Styling polish — Hero depth + section dividers**
- Hero: добавлены 2 декоративных элемента — нижняя подсветка (`bg-emerald-500/8 blur-[100px]`) для глубины + тонкая разделительная линия внизу hero (`bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent`).
- Новый компонент `SectionDivider` (`section-divider.tsx`): тонкая линия с пульсирующей emerald-точкой в центре, `aria-hidden`.
- 5 разделителей добавлены в page.tsx между логическими группами секций (About→Audience, Ecosystem→Features, Library→Converter, Simulator→Testimonials, FAQ→GetStarted).

**Bug fix во время разработки:**
- `ReferenceError: Cannot access 'coinCount' before initialization` — `visibleCoins` использовал `coinCount` до его объявления. Исправлено перемещением `coinCount` state выше `visibleCoins`.

## Результаты верификации (agent-browser)
- **17 секций**, 0 ошибок браузера, 0 проблем в консоли, lint чист.
- **Coin count toggle**: переключатель 6/9/12 рендерится, клик на "12" → 12 карточек монет (было 6), localStorage `kb-sim-coin-count` = "12".
- **Persistence coin count**: после перезагрузки страницы осталось 12 монет (загружено из localStorage).
- **Debounce persistence**: баланс корректно сохраняется (проверено чтением localStorage).
- **Section dividers**: 5 шт. рендерятся между секциями.
- **Hero depth**: декоративные элементы видны (подсветка + линия).
- **Адаптив**: моб 390×844 — 0 горизонтального скролла.
- **VLM-оценка** симулятора с 12 монетами: **9/10** — "coin count toggle clearly visible, sparklines on each card, sleek modern dark-mode aesthetic".
- **Lint**: 0 ошибок, 0 предупреждений.

## Нерешённые вопросы / риски / рекомендации на следующий раунд
- **Dev-server нестабилен**: sandbox убивает процесс. Нужен supervisor.
- **Static export для GitHub Pages**: `output: "export"` несовместим с API routes. Нужно вынести github-stats в клиентский fetch (CORS) + сторонний сервис для subscribe.
- **Cross-rates matrix**: можно добавить матрицу кросс-курсов между всеми монетами (BTC↔ETH, BTC↔SOL, и т.д.) — полезный инструмент.
- **Trade history log**: симулятор не показывает историю сделок. Можно добавить журнал исполненных ордеров с timestamp.
- **Performance budget**: 17 секций + sparklines + тикер. Стоит прогнать Lighthouse для формальной оценки LCP/CLS/TBT.
- **More a11y**: axe-core показал 1 known Radix false-positive. Можно добавить `axe-core` в CI для регрессии.

Приоритет следующего раунда: trade history log (журнал сделок) + Lighthouse performance audit, либо доработать static export для GitHub Pages (клиентский fetch github-stats).
