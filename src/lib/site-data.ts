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
export const navLinks: { href: string; labelKey: string }[] = [
  { href: "#about", labelKey: "nav.about" },
  { href: "#ecosystem", labelKey: "nav.ecosystem" },
  { href: "#features", labelKey: "nav.features" },
  { href: "#tech", labelKey: "nav.tech" },
  { href: "#library", labelKey: "nav.library" },
  { href: "#roadmap", labelKey: "nav.roadmap" },
  { href: "#faq", labelKey: "nav.faq" },
  { href: "#start", labelKey: "nav.start" },
  { href: "#connect", labelKey: "nav.connect" },
];

/**
 * FAQ — частые вопросы.
 */
export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question: "KB Wallet — это настоящее крипто-приложение?",
    answer:
      "Нет. Это образовательный проект. Торговый симулятор использует вымышленные балансы, а цены подгружаются из публичного API CoinRanking. Никаких реальных средств, реальных бирж или реальных транзакций — только тренировка и обучение.",
  },
  {
    question: "Нужно ли платить, чтобы пользоваться?",
    answer:
      "Нет, проект полностью бесплатный и open-source. Код доступен на GitHub под лицензией проекта. Вы можете собрать приложение сами, изучить исходники или даже контрибьютить.",
  },
  {
    question: "На каких платформах работает KB Wallet?",
    answer:
      "Android и iOS из одной кодовой базы Kotlin Multiplatform. Compose Multiplatform отрисовывает один и тот же UI на обеих платформах, а бизнес-логика живёт в общем модуле commonMain.",
  },
  {
    question: "Можно ли потерять деньги в симуляторе?",
    answer:
      "Нет. Баланс симулирован — это просто число в локальной базе Room. Даже если вы «потеряете» всё на стоп-лоссе, вы просто обнулите виртуальный счёт и сможете начать заново. Это безопасная песочница для тренировки.",
  },
  {
    question: "Какие ордера поддерживает торговый симулятор?",
    answer:
      "Рыночные, лимитные и стоп-ордера. Движок рынка в фоне исполняет их по живым тикам цены — так вы тренируете разные типы заявок без риска, как на настоящей бирже.",
  },
  {
    question: "Безопасны ли мои данные аккаунта?",
    answer:
      "Auth-сервер на Ktor хеширует пароли и выдаёт JWT-токены. Для локальной разработки используются безопасные дефолты, но перед любым реальным деплоем обязательно задайте JWT_SECRET через переменную окружения.",
  },
  {
    question: "Могу ли я помочь проекту?",
    answer:
      "Да! Откройте репозиторий на GitHub, сделайте fork, заведите issue с идеей или багом, пришлите pull request. Особенно востребована помощь по iOS-обвязке и новые темы для крипто-библиотеки.",
  },
  {
    question: "Подойдёт ли проект новичку в крипте?",
    answer:
      "Да. Внутри приложения есть справочник из 17 тем — от «что такое блокчейн» и «как работают кошельки» до DeFi и налогов. Начните с раздела «Основы», затем тренируйте сделки в симуляторе.",
  },
];

/**
 * Roadmap — вехи развития проекта.
 */
export type RoadmapItem = {
  phase: string;
  title: string;
  description: string;
  status: "done" | "active" | "planned";
};

export const roadmap: RoadmapItem[] = [
  {
    phase: "v0.1",
    title: "Каркас KMP",
    description:
      "Настроен Kotlin Multiplatform модуль composeApp с commonMain, androidMain и iosMain. Базовый UI на Compose, навигация, Koin DI.",
    status: "done",
  },
  {
    phase: "v0.4",
    title: "Портфель и цены",
    description:
      "Экран портфеля с холдингами, P&L и историей транзакций. Подключён CoinRanking API для живых цен, локальное хранение в Room.",
    status: "done",
  },
  {
    phase: "v0.7",
    title: "Торговый симулятор",
    description:
      "Движок рынка в фоне исполняет лимитные и стоп-ордера по тикам цены. Флоу Buy/Sell с симулированным балансом без реальных средств.",
    status: "done",
  },
  {
    phase: "v1.0",
    title: "Графики и библиотека",
    description:
      "Свечные графики с зумом и SMA, несколько таймфреймов. Встроенная крипто-библиотека из 17 тем — от основ до DeFi и налогов.",
    status: "active",
  },
  {
    phase: "v1.2",
    title: "Аналитика и биометрия",
    description:
      "Разделение реализованной/нереализованной прибыли. Биометрический вход, усиленный auth-сервер на Ktor с JWT-токенами.",
    status: "active",
  },
  {
    phase: "v1.5",
    title: "Watchlist и уведомления",
    description:
      "Список наблюдения за монетами вне портфеля. Push-уведомления о срабатывании ордеров и достижении ценовых целей.",
    status: "planned",
  },
  {
    phase: "v2.0",
    title: "Социальные фичи",
    description:
      "Шаринг портфеля, публичные стратегии, рейтинги трейдеров симулятора. Расширение крипто-библиотеки новыми темами.",
    status: "planned",
  },
];

/**
 * Демо-цены для конвертера (симулированные, как в KB Wallet).
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
  { symbol: "USDT", name: "Tether", priceUsd: 1.0 },
];

/**
 * Testimonials — отзывы об обучающем проекте.
 * Помечены как «демо-отзыв» для честности: проект учебный.
 */
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatarColor: string;
  initials: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Наконец понял, чем отличаются лимитный и стоп-ордер. Тренировался на симуляторе неделю — без страха потерять деньги. Теперь читаю графики увереннее.",
    name: "Иван М.",
    role: "Студент-разработчик",
    avatarColor: "from-emerald-500 to-teal-600",
    initials: "ИМ",
    rating: 5,
  },
  {
    quote:
      "Крипто-библиотека — топ. 17 тем в одном месте, от блокчейна до налогов. Не нужно гуглить по крупицам. Всё внутри приложения, офлайн.",
    name: "Анна К.",
    role: "Junior QA",
    avatarColor: "from-amber-500 to-orange-600",
    initials: "АК",
    rating: 5,
  },
  {
    quote:
      "Один Kotlin-код на Android и iOS — это магия Compose Multiplatform. Смотрю исходники как образец архитектуры feature-пакетов с Koin.",
    name: "Дмитрий С.",
    role: "Android-разработчик",
    avatarColor: "from-rose-500 to-pink-600",
    initials: "ДС",
    rating: 5,
  },
  {
    quote:
      "Как новичок в крипте, боялся терминов вроде DeFi и токеномика. В приложении они разложены по полочкам. Без хайпа, по делу.",
    name: "Мария В.",
    role: "Дизайнер",
    avatarColor: "from-teal-500 to-cyan-600",
    initials: "МВ",
    rating: 4,
  },
  {
    quote:
      "Биометрический вход и JWT-сервер — приятный бонус к учебному проекту. Видно, что сделано с пониманием безопасности, а не «для галочки».",
    name: "Павел Р.",
    role: "Backend-разработчик",
    avatarColor: "from-lime-500 to-emerald-600",
    initials: "ПР",
    rating: 5,
  },
  {
    quote:
      "Использую как песочницу для тестов торговых стратегий. Движок рынка в фоне честно исполняет ордера по тикам — не «нарисованная» прибыль.",
    name: "Сергей Л.",
    role: "Data-аналитик",
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
  title: string;
  description: string;
  accent: string;
};

export const audiences: Audience[] = [
  {
    icon: "graduation",
    title: "Новичкам в крипте",
    description:
      "От «что такое блокчейн» до понимания бирж и ордеров. Без воды и хайпа — только основы, которые работают.",
    accent: "emerald",
  },
  {
    icon: "code",
    title: "Разработчикам",
    description:
      "Образец Kotlin Multiplatform архитектуры: feature-пакеты, Koin DI, Ktor-сервер, Room. Читайте исходники — это открытый код.",
    accent: "amber",
  },
  {
    icon: "chart",
    title: "Трейдерам-практикам",
    description:
      "Тренируйте рыночные, лимитные и стоп-ордера на симулированном балансе. Движок рынка честно исполняет заявки по тикам.",
    accent: "teal",
  },
  {
    icon: "shield",
    title: "Любопытным",
    description:
      "Хотите разобраться, как работают кошельки, приватные ключи и JWT-авторизация? Смотрите реализацию — код открыт.",
    accent: "rose",
  },
];
