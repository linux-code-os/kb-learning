/**
 * Центральный источник данных для сайта-визитки KB Learning.
 * Здесь собраны все ссылки на репозитории, соцсети, фичи и стек.
 * Чтобы обновить ссылки — отредактируйте этот файл.
 */

import type { LocalStr } from "@/lib/translations";

export const siteConfig = {
  name: "KB Learning",
  tagline: {
    ru: "Учимся крипте на практике",
    en: "Learning crypto the practical way",
  },
  description: {
    ru: "Экосистема образовательных проектов вокруг криптовалют: KB Learning — кроссплатформенное приложение для отслеживания портфеля, тренировки торговли и изучения основ крипты. Без реальных денег. Без рисков. Только знания.",
    en: "An ecosystem of educational projects around cryptocurrencies: KB Learning is a cross-platform app for portfolio tracking, trading practice, and learning crypto fundamentals. No real money. No risk. Just knowledge.",
  },
  // Главная ссылка на GitHub-профиль экосистемы
  github: "https://github.com/linux-code-os",
  flagshipRepo: "https://github.com/linux-code-os/kb-learning",
  owner: {
    name: "linux-code-os",
    handle: "linux-code-os",
    bio: {
      ru: "Software Engineer, интересуется системным программированием, криптографией и современными стеками.",
      en: "Software Engineer interested in systems programming, cryptography, and modern tech stacks.",
    },
    avatar: "https://avatars.githubusercontent.com/u/312413769?v=4",
  },
  email: "mailto:hello@kblearning.dev",
} as const;

/**
 * Экосистема репозиториев на GitHub.
 * Флагман — KB_Learning, остальные — смежные проекты автора.
 */
export type EcosystemProject = {
  name: string;
  repo: string;
  url: string;
  description: LocalStr;
  language: string;
  languageColor: string;
  flagship?: boolean;
  icon: "wallet" | "terminal" | "gamepad" | "map";
  tags: string[];
};

export const ecosystem: EcosystemProject[] = [
  {
    name: "KB Learning",
    repo: "kb-learning",
    url: "https://github.com/linux-code-os/kb-learning",
    description: {
      ru: "Compose Multiplatform приложение (Android + iOS из одной кодовой базы Kotlin) для отслеживания крипто-портфеля, тренировки сделок в симулированном рынке и изучения основ криптовалют.",
      en: "A Compose Multiplatform app (Android + iOS from a single Kotlin codebase) for tracking a crypto portfolio, practicing trades on a simulated market, and learning crypto fundamentals.",
    },
    language: "Kotlin",
    languageColor: "#7F52FF",
    flagship: true,
    icon: "wallet",
    tags: ["KMP", "Compose", "Ktor", "iOS", "Android"],
  },
  {
    name: "KubSU",
    repo: "KubSU",
    url: "https://github.com/linux-code-os/KubSU",
    description: {
      ru: "Вспомогательные скрипты и утилиты для университетских задач и окружения разработки.",
      en: "Helper scripts and utilities for university coursework and development environments.",
    },
    language: "Shell",
    languageColor: "#89E051",
    icon: "terminal",
    tags: ["Shell", "Automation"],
  },
  {
    name: "comand_project",
    repo: "comand_project",
    url: "https://github.com/linux-code-os/comand_project",
    description: {
      ru: "Командный учебный проект на C# — практика архитектуры и совместной разработки.",
      en: "A team learning project in C# — practicing architecture and collaborative development.",
    },
    language: "C#",
    languageColor: "#178600",
    icon: "gamepad",
    tags: ["C#", "Team"],
  },
  {
    name: "geodezia",
    repo: "geodezia",
    url: "https://github.com/linux-code-os/geodezia",
    description: {
      ru: "Инструменты геодезических расчётов на Python — вычисления, обработка данных и визуализация.",
      en: "Geodetic calculation tools in Python — computation, data processing, and visualization.",
    },
    language: "Python",
    languageColor: "#3572A5",
    icon: "map",
    tags: ["Python", "Data"],
  },
];

/**
 * Возможности KB Learning — флагманского продукта экосистемы.
 */
export type Feature = {
  title: LocalStr;
  description: LocalStr;
  icon:
    | "wallet"
    | "trending-up"
    | "candlestick"
    | "bookmark"
    | "book-open"
    | "fingerprint"
    | "bar-chart"
    | "repeat";
  accent: "emerald" | "amber" | "teal" | "rose" | "lime" | "cyan";
};

export const features: Feature[] = [
  {
    title: {
      ru: "Отслеживание портфеля",
      en: "Portfolio tracking",
    },
    description: {
      ru: "Холдинги, актуальные цены, прибыль/убыток и история транзакций в одном экране.",
      en: "Holdings, live prices, profit/loss, and transaction history on a single screen.",
    },
    icon: "wallet",
    accent: "emerald",
  },
  {
    title: {
      ru: "Купить / Продать",
      en: "Buy / Sell",
    },
    description: {
      ru: "Полный флоу сделок с симулированным балансом — реальные средства никогда не двигаются.",
      en: "A complete trade flow with a simulated balance — real funds never move.",
    },
    icon: "repeat",
    accent: "teal",
  },
  {
    title: {
      ru: "Торговый симулятор",
      en: "Trading simulator",
    },
    description: {
      ru: "Движок рынка в фоне исполняет лимитные и стоп-ордера по живым тикам цены. Тренируйтесь без риска.",
      en: "A background market engine executes limit and stop orders against live price ticks. Practice risk-free.",
    },
    icon: "trending-up",
    accent: "amber",
  },
  {
    title: {
      ru: "Графики и свечи",
      en: "Charts & candles",
    },
    description: {
      ru: "Линейные графики и японские свечи с панорамированием, зумом, SMA и несколькими таймфреймами.",
      en: "Line charts and Japanese candlesticks with pan, zoom, SMA, and multiple timeframes.",
    },
    icon: "candlestick",
    accent: "lime",
  },
  {
    title: {
      ru: "Список наблюдения",
      en: "Watchlist",
    },
    description: {
      ru: "Следите за монетами, которых ещё нет в портфеле, чтобы не упустить момент входа.",
      en: "Track coins you don't hold yet so you never miss the right entry point.",
    },
    icon: "bookmark",
    accent: "cyan",
  },
  {
    title: {
      ru: "Крипто-библиотека",
      en: "Crypto library",
    },
    description: {
      ru: "17 тем — от кошельков и приватных ключей до DeFi, токеномики и налогов. Справочник внутри приложения.",
      en: "17 topics — from wallets and private keys to DeFi, tokenomics, and taxes. A reference built into the app.",
    },
    icon: "book-open",
    accent: "emerald",
  },
  {
    title: {
      ru: "Биометрический вход",
      en: "Biometric login",
    },
    description: {
      ru: "Безопасная авторизация по биометрии и лёгкий auth-сервер на Ktor с выдачей токенов.",
      en: "Secure biometric authentication and a lightweight Ktor auth server that issues tokens.",
    },
    icon: "fingerprint",
    accent: "rose",
  },
  {
    title: {
      ru: "Аналитика P&L",
      en: "P&L analytics",
    },
    description: {
      ru: "Разделение реализованной и нереализованной прибыли — понимайте реальную доходность.",
      en: "Split between realized and unrealized profit — understand your real returns.",
    },
    icon: "bar-chart",
    accent: "amber",
  },
];

/**
 * Технологический стек KB Learning.
 */
export type Tech = {
  name: string;
  category: string;
  color: string;
  description: string;
};

export const techStack: Tech[] = [
  { name: "Kotlin Multiplatform", category: "Язык", color: "#7F52FF", description: "Android + iOS из одной кодовой базы" },
  { name: "Compose Multiplatform", category: "UI", color: "#4285F4", description: "Декларативный UI, Material 3" },
  { name: "Ktor", category: "Backend", color: "#FF6F00", description: "Auth-сервер, токены, хеширование" },
  { name: "Koin", category: "DI", color: "#F6B73C", description: "Лёгкий dependency injection" },
  { name: "Room (KMP)", category: "База данных", color: "#34495E", description: "Локальное хранение данных" },
  { name: "Coil 3", category: "Изображения", color: "#311B92", description: "Загрузка и кеширование картинок" },
  { name: "kotlinx.serialization", category: "Сериализация", color: "#7F52FF", description: "JSON и типобезопасные модели" },
  { name: "kotlinx.datetime", category: "Время", color: "#7F52FF", description: "Кроссплатформенная работа со временем" },
];

/**
 * Структура проекта KB Learning — для визуализации архитектуры.
 */
export const projectStructure = `KB_Learning/
├── composeApp/            # Общий KMP-клиент
│   └── src/
│       ├── commonMain/    # Общий UI + бизнес-логика
│       ├── androidMain/   # Android-реализации
│       └── iosMain/       # iOS-реализации
├── iosApp/                # Точка входа iOS (SwiftUI shell)
└── server/                # Ktor-бэкенд: auth, аккаунты, токены`;

/**
 * Темы крипто-библиотеки внутри KB Learning (17 тем сгруппированы).
 * groupId — стабильный идентификатор группы для lookup-таблиц (accent).
 */
export type LibraryGroup = {
  groupId: "basics" | "trading" | "advanced";
  group: LocalStr;
  topics: LocalStr[];
};

export const libraryTopics: LibraryGroup[] = [
  {
    groupId: "basics",
    group: { ru: "Основы", en: "Basics" },
    topics: [
      { ru: "Что такое блокчейн", en: "What is a blockchain" },
      { ru: "Кошельки", en: "Wallets" },
      { ru: "Приватные ключи", en: "Private keys" },
      { ru: "Биржи", en: "Exchanges" },
      { ru: "Стейблкоины", en: "Stablecoins" },
    ],
  },
  {
    groupId: "trading",
    group: { ru: "Трейдинг", en: "Trading" },
    topics: [
      { ru: "Свечные графики", en: "Candlestick charts" },
      { ru: "Типы ордеров", en: "Order types" },
      { ru: "Таймфреймы", en: "Timeframes" },
      { ru: "SMA и индикаторы", en: "SMA & indicators" },
    ],
  },
  {
    groupId: "advanced",
    group: { ru: "Продвинутое", en: "Advanced" },
    topics: [
      { ru: "DeFi", en: "DeFi" },
      { ru: "Токеномика", en: "Tokenomics" },
      { ru: "Плечо", en: "Leverage" },
      { ru: "Налоги", en: "Taxes" },
    ],
  },
];

/**
 * Инструкции по сборке — табы.
 */
export type BuildInstruction = {
  id: string;
  label: LocalStr;
  command: string;
  note: LocalStr;
};

export const buildInstructions: BuildInstruction[] = [
  {
    id: "android",
    label: { ru: "Android", en: "Android" },
    command: "./gradlew :composeApp:assembleDebug",
    note: {
      ru: "Откройте проект в Android Studio и запустите debug-сборку.",
      en: "Open the project in Android Studio and run the debug build.",
    },
  },
  {
    id: "server",
    label: { ru: "Backend (Ktor)", en: "Backend (Ktor)" },
    command: "./gradlew :server:run",
    note: {
      ru: "Запускает локальный auth-сервер. Перед деплоем задайте JWT_SECRET.",
      en: "Starts the local auth server. Set JWT_SECRET before deploying.",
    },
  },
  {
    id: "tests",
    label: { ru: "Тесты", en: "Tests" },
    command: "./gradlew :composeApp:allTests",
    note: {
      ru: "Прогон всех общих тестов KMP.",
      en: "Runs all shared KMP tests.",
    },
  },
  {
    id: "ios",
    label: { ru: "iOS", en: "iOS" },
    command: "open iosApp/iosApp.xcodeproj",
    note: {
      ru: "Откройте в Xcode на Mac — он хостит общий Compose UI.",
      en: "Open in Xcode on a Mac — it hosts the shared Compose UI.",
    },
  },
];

/**
 * Предварительные требования для запуска.
 */
export type Prerequisite = {
  title: LocalStr;
  detail: LocalStr;
};

export const prerequisites: Prerequisite[] = [
  {
    title: { ru: "JDK 21", en: "JDK 21" },
    detail: {
      ru: "Java Development Kit для сборки Kotlin",
      en: "Java Development Kit for building Kotlin",
    },
  },
  {
    title: { ru: "Android Studio", en: "Android Studio" },
    detail: {
      ru: "Последняя стабильная для Android",
      en: "Latest stable version for Android",
    },
  },
  {
    title: { ru: "Xcode + Mac", en: "Xcode + Mac" },
    detail: {
      ru: "Для iOS-таргета (Kotlin/Native)",
      en: "Required for the iOS target (Kotlin/Native)",
    },
  },
];

/**
 * Социальные сети экосистемы.
 * По умолчанию ведут на GitHub-профиль — обновите ссылки при необходимости.
 */
export type Social = {
  name: string;
  href: string;
  icon: "github" | "telegram" | "youtube" | "vk" | "discord" | "mail";
  handle: string;
  available: boolean;
};

export const socials: Social[] = [
  {
    name: "GitHub",
    href: "https://github.com/linux-code-os",
    icon: "github",
    handle: "@linux-code-os",
    available: true,
  },
  {
    name: "Telegram",
    href: "https://t.me/kblearning",
    icon: "telegram",
    handle: "@kblearning",
    available: false,
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@kblearning",
    icon: "youtube",
    handle: "KB Learning",
    available: false,
  },
  {
    name: "ВКонтакте",
    href: "https://vk.com/kblearning",
    icon: "vk",
    handle: "KB Learning",
    available: false,
  },
  {
    name: "Discord",
    href: "https://discord.gg/kblearning",
    icon: "discord",
    handle: "KB Learning",
    available: false,
  },
  {
    name: "Email",
    href: "mailto:hello@kblearning.dev",
    icon: "mail",
    handle: "hello@kblearning.dev",
    available: false,
  },
];

/**
 * Ключевые цифры для анимированных счётчиков.
 */
export const stats: { value: number; suffix: string; label: string }[] = [
  { value: 17, suffix: "", label: "тем в крипто-библиотеке" },
  { value: 2, suffix: "", label: "платформы из одной кодовой базы" },
  { value: 8, suffix: "", label: "ключевых модулей приложения" },
  { value: 100, suffix: "%", label: "образовательный, без реальных денег" },
];

/**
 * Навигация по странице.
 */
export const navLinks: { href: string; labelKey: string }[] = [
  { href: "#about", labelKey: "nav.about" },
  { href: "#ecosystem", labelKey: "nav.ecosystem" },
  { href: "#features", labelKey: "nav.features" },
  { href: "#tech", labelKey: "nav.tech" },
  { href: "#library", labelKey: "nav.library" },
  { href: "#simulator", labelKey: "nav.simulator" },
  { href: "#roadmap", labelKey: "nav.roadmap" },
  { href: "#faq", labelKey: "nav.faq" },
  { href: "#start", labelKey: "nav.start" },
  { href: "#connect", labelKey: "nav.connect" },
];

/**
 * FAQ — частые вопросы.
 */
export type Faq = { question: LocalStr; answer: LocalStr };

export const faqs: Faq[] = [
  {
    question: {
      ru: "KB Learning — это настоящее крипто-приложение?",
      en: "Is KB Learning a real crypto app?",
    },
    answer: {
      ru: "Нет. Это образовательный проект. Торговый симулятор использует вымышленные балансы, а цены подгружаются из публичного API CoinRanking. Никаких реальных средств, реальных бирж или реальных транзакций — только тренировка и обучение.",
      en: "No. This is an educational project. The trading simulator uses fictional balances, and prices are pulled from the public CoinRanking API. No real funds, real exchanges, or real transactions — just practice and learning.",
    },
  },
  {
    question: {
      ru: "Нужно ли платить, чтобы пользоваться?",
      en: "Do I have to pay to use it?",
    },
    answer: {
      ru: "Нет, проект полностью бесплатный и open-source. Код доступен на GitHub под лицензией проекта. Вы можете собрать приложение сами, изучить исходники или даже контрибьютить.",
      en: "No, the project is completely free and open-source. The code is available on GitHub under the project's license. You can build the app yourself, read the source, or even contribute.",
    },
  },
  {
    question: {
      ru: "На каких платформах работает KB Learning?",
      en: "Which platforms does KB Learning support?",
    },
    answer: {
      ru: "Android и iOS из одной кодовой базы Kotlin Multiplatform. Compose Multiplatform отрисовывает один и тот же UI на обеих платформах, а бизнес-логика живёт в общем модуле commonMain.",
      en: "Android and iOS from a single Kotlin Multiplatform codebase. Compose Multiplatform renders the same UI on both platforms, and the business logic lives in the shared commonMain module.",
    },
  },
  {
    question: {
      ru: "Можно ли потерять деньги в симуляторе?",
      en: "Can I lose money in the simulator?",
    },
    answer: {
      ru: "Нет. Баланс симулирован — это просто число в локальной базе Room. Даже если вы «потеряете» всё на стоп-лоссе, вы просто обнулите виртуальный счёт и сможете начать заново. Это безопасная песочница для тренировки.",
      en: "No. The balance is simulated — it's just a number in the local Room database. Even if you \"lose\" everything on a stop-loss, you simply reset the virtual account and start over. It's a safe sandbox for practice.",
    },
  },
  {
    question: {
      ru: "Какие ордера поддерживает торговый симулятор?",
      en: "What order types does the trading simulator support?",
    },
    answer: {
      ru: "Рыночные, лимитные и стоп-ордера. Движок рынка в фоне исполняет их по живым тикам цены — так вы тренируете разные типы заявок без риска, как на настоящей бирже.",
      en: "Market, limit, and stop orders. The background market engine executes them against live price ticks — so you practice different order types risk-free, just like on a real exchange.",
    },
  },
  {
    question: {
      ru: "Безопасны ли мои данные аккаунта?",
      en: "Is my account data secure?",
    },
    answer: {
      ru: "Auth-сервер на Ktor хеширует пароли и выдаёт JWT-токены. Для локальной разработки используются безопасные дефолты, но перед любым реальным деплоем обязательно задайте JWT_SECRET через переменную окружения.",
      en: "The Ktor auth server hashes passwords and issues JWT tokens. Safe defaults are used for local development, but before any real deployment you must set JWT_SECRET via an environment variable.",
    },
  },
  {
    question: {
      ru: "Могу ли я помочь проекту?",
      en: "Can I contribute to the project?",
    },
    answer: {
      ru: "Да! Откройте репозиторий на GitHub, сделайте fork, заведите issue с идеей или багом, пришлите pull request. Особенно востребована помощь по iOS-обвязке и новые темы для крипто-библиотеки.",
      en: "Yes! Open the repository on GitHub, fork it, file an issue with an idea or bug, send a pull request. Help is especially welcome on the iOS shell and on new crypto-library topics.",
    },
  },
  {
    question: {
      ru: "Подойдёт ли проект новичку в крипте?",
      en: "Is the project suitable for crypto beginners?",
    },
    answer: {
      ru: "Да. Внутри приложения есть справочник из 17 тем — от «что такое блокчейн» и «как работают кошельки» до DeFi и налогов. Начните с раздела «Основы», затем тренируйте сделки в симуляторе.",
      en: "Yes. Inside the app there's a reference of 17 topics — from \"what is a blockchain\" and \"how wallets work\" to DeFi and taxes. Start with the \"Basics\" section, then practice trades in the simulator.",
    },
  },
];

/**
 * Roadmap — вехи развития проекта.
 */
export type RoadmapItem = {
  phase: LocalStr;
  title: LocalStr;
  description: LocalStr;
  status: "done" | "active" | "planned";
};

export const roadmap: RoadmapItem[] = [
  {
    phase: { ru: "v0.1", en: "v0.1" },
    title: { ru: "Каркас KMP", en: "KMP scaffold" },
    description: {
      ru: "Настроен Kotlin Multiplatform модуль composeApp с commonMain, androidMain и iosMain. Базовый UI на Compose, навигация, Koin DI.",
      en: "Set up the Kotlin Multiplatform composeApp module with commonMain, androidMain, and iosMain. Basic Compose UI, navigation, and Koin DI.",
    },
    status: "done",
  },
  {
    phase: { ru: "v0.4", en: "v0.4" },
    title: { ru: "Портфель и цены", en: "Portfolio & prices" },
    description: {
      ru: "Экран портфеля с холдингами, P&L и историей транзакций. Подключён CoinRanking API для живых цен, локальное хранение в Room.",
      en: "Portfolio screen with holdings, P&L, and transaction history. CoinRanking API wired up for live prices, local storage in Room.",
    },
    status: "done",
  },
  {
    phase: { ru: "v0.7", en: "v0.7" },
    title: { ru: "Торговый симулятор", en: "Trading simulator" },
    description: {
      ru: "Движок рынка в фоне исполняет лимитные и стоп-ордера по тикам цены. Флоу Buy/Sell с симулированным балансом без реальных средств.",
      en: "A background market engine executes limit and stop orders on price ticks. Buy/Sell flow with a simulated balance, no real funds.",
    },
    status: "done",
  },
  {
    phase: { ru: "v1.0", en: "v1.0" },
    title: { ru: "Графики и библиотека", en: "Charts & library" },
    description: {
      ru: "Свечные графики с зумом и SMA, несколько таймфреймов. Встроенная крипто-библиотека из 17 тем — от основ до DeFi и налогов.",
      en: "Candlestick charts with zoom and SMA, multiple timeframes. A built-in crypto library of 17 topics — from basics to DeFi and taxes.",
    },
    status: "active",
  },
  {
    phase: { ru: "v1.2", en: "v1.2" },
    title: { ru: "Аналитика и биометрия", en: "Analytics & biometrics" },
    description: {
      ru: "Разделение реализованной/нереализованной прибыли. Биометрический вход, усиленный auth-сервер на Ktor с JWT-токенами.",
      en: "Split between realized/unrealized profit. Biometric login and a hardened Ktor auth server with JWT tokens.",
    },
    status: "active",
  },
  {
    phase: { ru: "v1.5", en: "v1.5" },
    title: { ru: "Watchlist и уведомления", en: "Watchlist & notifications" },
    description: {
      ru: "Список наблюдения за монетами вне портфеля. Push-уведомления о срабатывании ордеров и достижении ценовых целей.",
      en: "A watchlist for coins outside the portfolio. Push notifications for triggered orders and price-target hits.",
    },
    status: "planned",
  },
  {
    phase: { ru: "v2.0", en: "v2.0" },
    title: { ru: "Социальные фичи", en: "Social features" },
    description: {
      ru: "Шаринг портфеля, публичные стратегии, рейтинги трейдеров симулятора. Расширение крипто-библиотеки новыми темами.",
      en: "Portfolio sharing, public strategies, simulator trader leaderboards. Crypto library expanded with new topics.",
    },
    status: "planned",
  },
];

/**
 * Демо-цены для конвертера (симулированные, как в KB Learning).
 */
export const demoCoins: { symbol: string; name: string; priceUsd: number }[] = [
  { symbol: "BTC", name: "Bitcoin", priceUsd: 67420.5 },
  { symbol: "ETH", name: "Ethereum", priceUsd: 3518.2 },
  { symbol: "SOL", name: "Solana", priceUsd: 182.41 },
  { symbol: "BNB", name: "BNB", priceUsd: 612.88 },
  { symbol: "XRP", name: "Ripple", priceUsd: 0.6234 },
  { symbol: "ADA", name: "Cardano", priceUsd: 0.4521 },
  { symbol: "DOGE", name: "Dogecoin", priceUsd: 0.1583 },
  { symbol: "AVAX", name: "Avalanche", priceUsd: 38.92 },
  { symbol: "DOT", name: "Polkadot", priceUsd: 7.21 },
  { symbol: "MATIC", name: "Polygon", priceUsd: 0.7102 },
  { symbol: "LINK", name: "Chainlink", priceUsd: 14.85 },
  { symbol: "USDT", name: "Tether", priceUsd: 1.0 },
];

/**
 * Testimonials — отзывы об обучающем проекте.
 * Помечены как «демо-отзыв» для честности: проект учебный.
 */
export type Testimonial = {
  quote: LocalStr;
  name: LocalStr;
  role: LocalStr;
  avatarColor: string;
  initials: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    quote: {
      ru: "Наконец понял, чем отличаются лимитный и стоп-ордер. Тренировался на симуляторе неделю — без страха потерять деньги. Теперь читаю графики увереннее.",
      en: "I finally understand the difference between a limit and a stop order. I practiced on the simulator for a week — with no fear of losing money. Now I read charts with more confidence.",
    },
    name: { ru: "Иван М.", en: "Ivan M." },
    role: { ru: "Студент-разработчик", en: "Student developer" },
    avatarColor: "from-emerald-500 to-teal-600",
    initials: "ИМ",
    rating: 5,
  },
  {
    quote: {
      ru: "Крипто-библиотека — топ. 17 тем в одном месте, от блокчейна до налогов. Не нужно гуглить по крупицам. Всё внутри приложения, офлайн.",
      en: "The crypto library is top-notch. 17 topics in one place, from blockchain to taxes. No need to google in fragments. It's all inside the app, offline.",
    },
    name: { ru: "Анна К.", en: "Anna K." },
    role: { ru: "Junior QA", en: "Junior QA" },
    avatarColor: "from-amber-500 to-orange-600",
    initials: "АК",
    rating: 5,
  },
  {
    quote: {
      ru: "Один Kotlin-код на Android и iOS — это магия Compose Multiplatform. Смотрю исходники как образец архитектуры feature-пакетов с Koin.",
      en: "One Kotlin codebase for Android and iOS — that's the magic of Compose Multiplatform. I read the source as a reference for feature-package architecture with Koin.",
    },
    name: { ru: "Дмитрий С.", en: "Dmitry S." },
    role: { ru: "Android-разработчик", en: "Android developer" },
    avatarColor: "from-rose-500 to-pink-600",
    initials: "ДС",
    rating: 5,
  },
  {
    quote: {
      ru: "Как новичок в крипте, боялся терминов вроде DeFi и токеномика. В приложении они разложены по полочкам. Без хайпа, по делу.",
      en: "As a crypto beginner, I was intimidated by terms like DeFi and tokenomics. In the app they're laid out clearly. No hype, just the substance.",
    },
    name: { ru: "Мария В.", en: "Maria V." },
    role: { ru: "Дизайнер", en: "Designer" },
    avatarColor: "from-teal-500 to-cyan-600",
    initials: "МВ",
    rating: 4,
  },
  {
    quote: {
      ru: "Биометрический вход и JWT-сервер — приятный бонус к учебному проекту. Видно, что сделано с пониманием безопасности, а не «для галочки».",
      en: "Biometric login and a JWT server are a nice bonus for a learning project. You can tell it's built with security in mind, not just \"for show\".",
    },
    name: { ru: "Павел Р.", en: "Pavel R." },
    role: { ru: "Backend-разработчик", en: "Backend developer" },
    avatarColor: "from-lime-500 to-emerald-600",
    initials: "ПР",
    rating: 5,
  },
  {
    quote: {
      ru: "Использую как песочницу для тестов торговых стратегий. Движок рынка в фоне честно исполняет ордера по тикам — не «нарисованная» прибыль.",
      en: "I use it as a sandbox for testing trading strategies. The background market engine executes orders on ticks honestly — no \"painted\" profits.",
    },
    name: { ru: "Сергей Л.", en: "Sergey L." },
    role: { ru: "Data-аналитик", en: "Data analyst" },
    avatarColor: "from-violet-500 to-fuchsia-600",
    initials: "СЛ",
    rating: 5,
  },
];

/**
 * Варианты «для кого» проект — карточки аудитории.
 */
export type Audience = {
  icon: "graduation" | "code" | "chart" | "shield";
  title: LocalStr;
  description: LocalStr;
  accent: string;
};

export const audiences: Audience[] = [
  {
    icon: "graduation",
    title: { ru: "Новичкам в крипте", en: "Crypto beginners" },
    description: {
      ru: "От «что такое блокчейн» до понимания бирж и ордеров. Без воды и хайпа — только основы, которые работают.",
      en: "From \"what is a blockchain\" to understanding exchanges and orders. No fluff and no hype — just the fundamentals that work.",
    },
    accent: "emerald",
  },
  {
    icon: "code",
    title: { ru: "Разработчикам", en: "Developers" },
    description: {
      ru: "Образец Kotlin Multiplatform архитектуры: feature-пакеты, Koin DI, Ktor-сервер, Room. Читайте исходники — это открытый код.",
      en: "A reference Kotlin Multiplatform architecture: feature packages, Koin DI, a Ktor server, Room. Read the source — it's open.",
    },
    accent: "amber",
  },
  {
    icon: "chart",
    title: { ru: "Трейдерам-практикам", en: "Active traders" },
    description: {
      ru: "Тренируйте рыночные, лимитные и стоп-ордера на симулированном балансе. Движок рынка честно исполняет заявки по тикам.",
      en: "Practice market, limit, and stop orders on a simulated balance. The market engine executes orders on ticks honestly.",
    },
    accent: "teal",
  },
  {
    icon: "shield",
    title: { ru: "Любопытным", en: "The curious" },
    description: {
      ru: "Хотите разобраться, как работают кошельки, приватные ключи и JWT-авторизация? Смотрите реализацию — код открыт.",
      en: "Want to understand how wallets, private keys, and JWT auth actually work? Read the implementation — the code is open.",
    },
    accent: "rose",
  },
];
