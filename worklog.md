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
