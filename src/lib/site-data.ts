/**
 * Центральный источник данных для сайта-визитки KB Learning.
 * Здесь собраны все ссылки на репозитории, соцсети, фичи и стек.
 * Чтобы обновить ссылки — отредактируйте этот файл.
 */

export const siteConfig = {
  name: "KB Learning",
  tagline: "Учимся крипте на практике",
  description:
    "Экосистема образовательных проектов вокруг криптовалют: KB Wallet — кроссплатформенное приложение для отслеживания портфеля, тренировки торговли и изучения основ крипты. Без реальных денег. Без рисков. Только знания.",
  // Главная ссылка на GitHub-профиль экосистемы
  github: "https://github.com/linux-code-dev",
  flagshipRepo: "https://github.com/linux-code-dev/KB_Learning",
  owner: {
    name: "Aleksey Balandin",
    handle: "linux-code-dev",
    bio: "Software Engineer, интересуется системным программированием, криптографией и современными стеками.",
    avatar: "https://avatars.githubusercontent.com/u/174013453?v=4",
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
  description: string;
  language: string;
  languageColor: string;
  flagship?: boolean;
  icon: "wallet" | "terminal" | "gamepad" | "map";
  tags: string[];
};

export const ecosystem: EcosystemProject[] = [
  {
    name: "KB Wallet",
    repo: "KB_Learning",
    url: "https://github.com/linux-code-dev/KB_Learning",
    description:
      "Compose Multiplatform приложение (Android + iOS из одной кодовой базы Kotlin) для отслеживания крипто-портфеля, тренировки сделок в симулированном рынке и изучения основ криптовалют.",
    language: "Kotlin",
    languageColor: "#7F52FF",
    flagship: true,
    icon: "wallet",
    tags: ["KMP", "Compose", "Ktor", "iOS", "Android"],
  },
  {
    name: "KubSU",
    repo: "KubSU",
    url: "https://github.com/linux-code-dev/KubSU",
    description:
      "Вспомогательные скрипты и утилиты для университетских задач и окружения разработки.",
    language: "Shell",
    languageColor: "#89E051",
    icon: "terminal",
    tags: ["Shell", "Automation"],
  },
  {
    name: "comand_project",
    repo: "comand_project",
    url: "https://github.com/linux-code-dev/comand_project",
    description:
      "Командный учебный проект на C# — практика архитектуры и совместной разработки.",
    language: "C#",
    languageColor: "#178600",
    icon: "gamepad",
    tags: ["C#", "Team"],
  },
  {
    name: "geodezia",
    repo: "geodezia",
    url: "https://github.com/linux-code-dev/geodezia",
    description:
      "Инструменты геодезических расчётов на Python — вычисления, обработка данных и визуализация.",
    language: "Python",
    languageColor: "#3572A5",
    icon: "map",
    tags: ["Python", "Data"],
  },
];

/**
 * Возможности KB Wallet — флагманского продукта экосистемы.
 */
export type Feature = {
  title: string;
  description: string;
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
    title: "Отслеживание портфеля",
    description:
      "Холдинги, актуальные цены, прибыль/убыток и история транзакций в одном экране.",
    icon: "wallet",
    accent: "emerald",
  },
  {
    title: "Купить / Продать",
    description:
      "Полный флоу сделок с симулированным балансом — реальные средства никогда не двигаются.",
    icon: "repeat",
    accent: "teal",
  },
  {
    title: "Торговый симулятор",
    description:
      "Движок рынка в фоне исполняет лимитные и стоп-ордера по живым тикам цены. Тренируйтесь без риска.",
    icon: "trending-up",
    accent: "amber",
  },
  {
    title: "Графики и свечи",
    description:
      "Линейные графики и японские свечи с панорамированием, зумом, SMA и несколькими таймфреймами.",
    icon: "candlestick",
    accent: "lime",
  },
  {
    title: "Список наблюдения",
    description:
      "Следите за монетами, которых ещё нет в портфеле, чтобы не упустить момент входа.",
    icon: "bookmark",
    accent: "cyan",
  },
  {
    title: "Крипто-библиотека",
    description:
      "17 тем — от кошельков и приватных ключей до DeFi, токеномики и налогов. Справочник внутри приложения.",
    icon: "book-open",
    accent: "emerald",
  },
  {
    title: "Биометрический вход",
    description:
      "Безопасная авторизация по биометрии и лёгкий auth-сервер на Ktor с выдачей токенов.",
    icon: "fingerprint",
    accent: "rose",
  },
  {
    title: "Аналитика P&L",
    description:
      "Разделение реализованной и нереализованной прибыли — понимайте реальную доходность.",
    icon: "bar-chart",
    accent: "amber",
  },
];

/**
 * Технологический стек KB Wallet.
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
 * Структура проекта KB Wallet — для визуализации архитектуры.
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
 * Темы крипто-библиотеки внутри KB Wallet (17 тем сгруппированы).
 */
export const libraryTopics: { group: string; topics: string[] }[] = [
  {
    group: "Основы",
    topics: ["Что такое блокчейн", "Кошельки", "Приватные ключи", "Биржи", "Стейблкоины"],
  },
  {
    group: "Трейдинг",
    topics: ["Свечные графики", "Типы ордеров", "Таймфреймы", "SMA и индикаторы"],
  },
  {
    group: "Продвинутое",
    topics: ["DeFi", "Токеномика", "Плечо", "Налоги"],
  },
];

/**
 * Инструкции по сборке — табы.
 */
export const buildInstructions: { id: string; label: string; command: string; note: string }[] = [
  {
    id: "android",
    label: "Android",
    command: "./gradlew :composeApp:assembleDebug",
    note: "Откройте проект в Android Studio и запустите debug-сборку.",
  },
  {
    id: "server",
    label: "Backend (Ktor)",
    command: "./gradlew :server:run",
    note: "Запускает локальный auth-сервер. Перед деплоем задайте JWT_SECRET.",
  },
  {
    id: "tests",
    label: "Тесты",
    command: "./gradlew :composeApp:allTests",
    note: "Прогон всех общих тестов KMP.",
  },
  {
    id: "ios",
    label: "iOS",
    command: "open iosApp/iosApp.xcodeproj",
    note: "Откройте в Xcode на Mac — он хостит общий Compose UI.",
  },
];

/**
 * Предварительные требования для запуска.
 */
export const prerequisites: { title: string; detail: string }[] = [
  { title: "JDK 21", detail: "Java Development Kit для сборки Kotlin" },
  { title: "Android Studio", detail: "Последняя стабильная для Android" },
  { title: "Xcode + Mac", detail: "Для iOS-таргета (Kotlin/Native)" },
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
    href: "https://github.com/linux-code-dev",
    icon: "github",
    handle: "@linux-code-dev",
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
export const navLinks: { href: string; label: string }[] = [
  { href: "#about", label: "О проекте" },
  { href: "#ecosystem", label: "Экосистема" },
  { href: "#features", label: "Возможности" },
  { href: "#tech", label: "Технологии" },
  { href: "#library", label: "Библиотека" },
  { href: "#start", label: "Запуск" },
  { href: "#connect", label: "Контакты" },
];
