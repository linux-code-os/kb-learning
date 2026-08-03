/**
 * Словарь переводов RU/EN для UI-строк сайта KB Learning.
 * Доступ через хук useT() — возвращает функцию t(key).
 *
 * Структура: namespace.key -> { ru, en }
 * Имена секций совпадают с section id.
 */

export type TranslationKey = keyof typeof translations;

export const translations = {
  // ===== Глобальное =====
  "brand.name": { ru: "KB Learning", en: "KB Learning" },
  "brand.subtitle": { ru: "learn crypto", en: "learn crypto" },

  "nav.about": { ru: "О проекте", en: "About" },
  "nav.ecosystem": { ru: "Экосистема", en: "Ecosystem" },
  "nav.features": { ru: "Возможности", en: "Features" },
  "nav.tech": { ru: "Технологии", en: "Tech" },
  "nav.library": { ru: "Библиотека", en: "Library" },
  "nav.simulator": { ru: "Симулятор", en: "Simulator" },
  "nav.roadmap": { ru: "Roadmap", en: "Roadmap" },
  "nav.faq": { ru: "FAQ", en: "FAQ" },
  "nav.start": { ru: "Запуск", en: "Get started" },
  "nav.connect": { ru: "Контакты", en: "Contact" },

  "action.github": { ru: "GitHub", en: "GitHub" },
  "action.openGithub": { ru: "Открыть на GitHub", en: "Open on GitHub" },
  "action.openRepo": { ru: "Открыть", en: "Open" },
  "action.openReadme": { ru: "Открыть README на GitHub", en: "Open README on GitHub" },
  "action.viewOnGithub": { ru: "Смотреть на GitHub", en: "View on GitHub" },
  "action.howToRun": { ru: "Как запустить", en: "How to run" },
  "action.scrollToTop": { ru: "Наверх", en: "To top" },
  "action.scrollDown": { ru: "Листайте ниже", en: "Scroll down" },
  "action.backToTop": { ru: "Наверх", en: "Back to top" },
  "action.changeLanguage": { ru: "Сменить язык", en: "Change language" },
  "action.toggleTheme": { ru: "Переключить тему", en: "Toggle theme" },
  "action.openMenu": { ru: "Открыть меню", en: "Open menu" },
  "action.closeMenu": { ru: "Закрыть меню", en: "Close menu" },

  "skip.toContent": { ru: "Перейти к содержимому", en: "Skip to content" },

  // ===== Hero =====
  "hero.badge": { ru: "Образовательный проект · open-source", en: "Educational project · open-source" },
  "hero.title1": { ru: "Учим крипте", en: "Learning crypto" },
  "hero.title2": { ru: "на практике", en: "the practical way" },
  "hero.desc": {
    ru: "KB Learning — образовательный проект для изучения криптовалют: симулятор торговли, конвертер, кросс-курсы и библиотека из 17 тем. Тренируйтесь без реальных денег и рисков.",
    en: "KB Learning is an educational project for learning cryptocurrencies: a trading simulator, converter, cross-rates, and a library of 17 topics. Practice with no real money and no risk.",
  },
  "hero.balance": { ru: "Общий баланс", en: "Total balance" },
  "hero.simulation": { ru: "Симуляция", en: "Simulation" },
  "hero.trust.noMoney": { ru: "Без реальных средств", en: "No real funds" },
  "hero.trust.crossPlatform": { ru: "Android + iOS из одного кода", en: "Android + iOS, one codebase" },
  "hero.trust.topics": { ru: "17 тем в библиотеке", en: "17 topics in library" },

  "stat.topics": { ru: "тем в крипто-библиотеке", en: "topics in crypto library" },
  "stat.platforms": { ru: "платформы из одной кодовой базы", en: "platforms from one codebase" },
  "stat.modules": { ru: "ключевых модулей приложения", en: "core app modules" },
  "stat.educational": { ru: "образовательный, без реальных денег", en: "educational, no real money" },

  // ===== Ticker =====
  "ticker.disclaimer": {
    ru: "Демо-данные · симуляция KB Learning · не финансовая рекомендация",
    en: "Demo data · KB Learning simulation · not financial advice",
  },

  // ===== Section headings (eyebrow / title / desc) =====
  "gh.eyebrow": { ru: "GitHub в живую", en: "GitHub live" },
  "gh.title": { ru: "Прозрачно.", en: "Transparent." },
  "gh.titleAccent": { ru: "Как open-source", en: "Like open-source" },
  "gh.desc": {
    ru: "Метрики репозитория KB Learning тянутся напрямую из GitHub API в реальном времени. Обновляется каждые 15 минут — без накруток и красивых циферок.",
    en: "KB Learning repository metrics are pulled live from the GitHub API. Refreshed every 15 minutes — no vanity metrics.",
  },
  "gh.stars": { ru: "Звёзд на GitHub", en: "GitHub stars" },
  "gh.forks": { ru: "Форков", en: "Forks" },
  "gh.issues": { ru: "Открытых issue", en: "Open issues" },
  "gh.repos": { ru: "Публичных репо", en: "Public repos" },
  "gh.language": { ru: "Язык:", en: "Language:" },
  "gh.lastPush": { ru: "Последний пуш:", en: "Last push:" },
  "gh.refresh": { ru: "Обновить", en: "Refresh" },
  "gh.visitRepo": { ru: "Зайти в репозиторий", en: "Visit repository" },

  "about.eyebrow": { ru: "О проекте", en: "About" },
  "about.title1": { ru: "KB Learning — крипто-портфель,", en: "KB Learning — a crypto portfolio" },
  "about.title2": { ru: "который учит", en: "that teaches" },
  "about.desc": {
    ru: "Compose Multiplatform приложение для Android и iOS из одной кодовой базы Kotlin. Отслеживайте портфель, практикуйте сделки в безопасном симуляторе и изучайте основы криптовалют — от устройства блокчейна до чтения свечных графиков.",
    en: "A Compose Multiplatform app for Android and iOS from a single Kotlin codebase. Track your portfolio, practice trades in a safe simulator, and learn crypto fundamentals — from how a blockchain works to reading candlestick charts.",
  },
  "about.oneCodeTitle": { ru: "Один код — две платформы", en: "One code, two platforms" },
  "about.oneCodeDesc": {
    ru: "Kotlin Multiplatform делит бизнес-логику между Android и iOS, а Compose Multiplatform отрисовывает один и тот же UI. Это значит — меньше дублирования, быстрее фичи, консистентный опыт на обоих платформах.",
    en: "Kotlin Multiplatform shares business logic between Android and iOS, while Compose Multiplatform renders the same UI. Less duplication, faster features, a consistent experience on both platforms.",
  },
  "about.eduTitle": { ru: "Образовательный проект", en: "Educational project" },
  "about.eduDesc": {
    ru: "KB Learning — учебное/демо-приложение. Ничто здесь не является финансовой рекомендацией. Торговый симулятор использует вымышленные балансы — никаких реальных денег и реальных бирж.",
    en: "KB Learning is a learning/demo app. Nothing here is financial advice. The trading simulator uses fictional balances — no real money and no real exchanges.",
  },
  "about.learnTitle": { ru: "Учитесь без риска", en: "Learn without risk" },
  "about.learnDesc": {
    ru: "Сначала разберитесь, как работают кошельки, ключи и биржи — потом тренируйте ордера. Ошибки здесь стоят ноль, а навык остаётся.",
    en: "First understand how wallets, keys, and exchanges work — then practice orders. Mistakes cost nothing here, and the skill stays.",
  },
  "about.author": { ru: "Автор проекта", en: "Project author" },

  "audience.eyebrow": { ru: "Для кого", en: "For whom" },
  "audience.title1": { ru: "Кому будет", en: "Who benefits" },
  "audience.titleAccent": { ru: "полезен проект", en: "from this project" },
  "audience.desc": {
    ru: "KB Learning — не «приложение для всех». У него чёткая аудитория, и каждой группе мы даём своё значение.",
    en: "KB Learning is not an app for everyone. It has a clear audience, and each group gets its own value.",
  },

  "ecosystem.eyebrow": { ru: "Экосистема", en: "Ecosystem" },
  "ecosystem.title1": { ru: "Четыре проекта,", en: "Four projects," },
  "ecosystem.titleAccent": { ru: "один автор", en: "one author" },
  "ecosystem.desc": {
    ru: "KB Learning объединяет несколько репозиториев. Главный — KB Learning, флагман экосистемы. Вокруг — вспомогательные проекты: автоматизация, командная разработка и геодезические расчёты.",
    en: "KB Learning unites several repositories. The main one is KB Learning, the ecosystem flagship. Around it are supporting projects: automation, teamwork, and geodetic calculations.",
  },
  "ecosystem.allOpen": { ru: "Все проекты открыты на", en: "All projects are open on" },
  "ecosystem.flagship": { ru: "Флагман", en: "Flagship" },

  "features.eyebrow": { ru: "Возможности", en: "Features" },
  "features.title1": { ru: "Всё для изучения крипты", en: "Everything to learn crypto" },
  "features.titleAccent": { ru: "в одном месте", en: "in one place" },
  "features.desc": {
    ru: "KB Learning собран как маленькая, но полноценная крипто-среда: портфель, торговля, графики, аналитика и встроенная библиотека знаний.",
    en: "KB Learning is built as a small but complete crypto environment: portfolio, trading, charts, analytics, and a built-in knowledge library.",
  },

  "tech.eyebrow": { ru: "Технологии", en: "Tech stack" },
  "tech.title1": { ru: "Современный стек", en: "A modern" },
  "tech.titleAccent": { ru: "от Kotlin-сообщества", en: "from the Kotlin community" },
  "tech.desc": {
    ru: "Под капотом — проверенные инструменты от JetBrains и сообщества Kotlin. Каждая технология выбрана под конкретную задачу.",
    en: "Under the hood: proven tools from JetBrains and the Kotlin community. Each technology chosen for a specific job.",
  },

  "arch.eyebrow": { ru: "Архитектура", en: "Architecture" },
  "arch.title1": { ru: "Понятная структура,", en: "Clear structure," },
  "arch.titleAccent": { ru: "слои по делу", en: "layers that matter" },
  "arch.desc": {
    ru: "Код под composeApp разбит по фичам с примерным слоёнием data → domain → presentation, связан через Koin. Так легче тестировать и расширять.",
    en: "Code under composeApp is split by feature with a rough data → domain → presentation layering, wired through Koin. Easier to test and extend.",
  },

  "library.eyebrow": { ru: "Крипто-библиотека", en: "Crypto library" },
  "library.title1": { ru: "тем — от", en: "topics — from" },
  "library.titleAccent": { ru: "«что такое блокчейн»", en: "\"what is a blockchain\"" },
  "library.title3": { ru: "до налогов", en: "to taxes" },
  "library.desc": {
    ru: "Справочник встроен прямо в приложение. Не нужно гуглить по крупицам — основы собраны в одном месте и структурированы по уровню.",
    en: "The reference is built right into the app. No need to google in fragments — the basics are gathered in one place and structured by level.",
  },
  "library.topics": { ru: "тем", en: "topics" },
  "library.offline": { ru: "Библиотека доступна офлайн внутри KB Learning", en: "The library is available offline inside KB Learning" },
  "library.group.basics": { ru: "Основы", en: "Basics" },
  "library.group.trading": { ru: "Трейдинг", en: "Trading" },
  "library.group.advanced": { ru: "Продвинутое", en: "Advanced" },

  "converter.eyebrow": { ru: "Демо-инструмент", en: "Demo tool" },
  "converter.title1": { ru: "Конвертер криптовалют", en: "Crypto converter" },
  "converter.titleAccent": { ru: "как в KB Learning", en: "like in KB Learning" },
  "converter.desc": {
    ru: "Попробуйте механику прямо в браузере. Цены симулированные — те же, что использует торговый симулятор приложения. Не финансовая рекомендация.",
    en: "Try the mechanics right in your browser. Prices are simulated — the same ones the app's trading simulator uses. Not financial advice.",
  },
  "converter.give": { ru: "Отдаю", en: "You send" },
  "converter.receive": { ru: "Получаю", en: "You get" },
  "converter.swap": { ru: "Поменять местами", en: "Swap" },
  "converter.rate": { ru: "Симулированные курсы · обновляются вручную", en: "Simulated rates · updated manually" },
  "converter.disclaimer": {
    ru: "Демо-данные для иллюстрации работы конвертера. В реальном KB Learning цены подгружаются из публичного API CoinRanking.",
    en: "Demo data to illustrate how the converter works. In the real KB Learning, prices are pulled from the public CoinRanking API.",
  },

  "testimonials.eyebrow": { ru: "Отзывы", en: "Testimonials" },
  "testimonials.title1": { ru: "Что говорят", en: "What" },
  "testimonials.titleAccent": { ru: "пользователи", en: "users say" },
  "testimonials.desc": {
    ru: "Демо-отзывы от студентов, разработчиков и практиков, которые разбирались в крипте через KB Learning. Честно — проект учебный, но подход рабочий.",
    en: "Demo reviews from students, developers, and practitioners who explored crypto through KB Learning. Honest note: it's an educational project, but the approach works.",
  },
  "testimonials.prev": { ru: "Предыдущий отзыв", en: "Previous testimonial" },
  "testimonials.next": { ru: "Следующий отзыв", en: "Next testimonial" },
  "testimonials.review": { ru: "Отзыв", en: "Review" },

  "roadmap.eyebrow": { ru: "Roadmap", en: "Roadmap" },
  "roadmap.title1": { ru: "Куда движется", en: "Where the" },
  "roadmap.titleAccent": { ru: "проект", en: "the project is heading" },
  "roadmap.desc": {
    ru: "Развитие KB Learning по вехам. Зелёное — сделано, янтарное — в активной разработке, серое — в планах. Roadmap обновляется по мере релизов.",
    en: "KB Learning development by milestones. Green — done, amber — in active development, grey — planned. The roadmap updates with each release.",
  },
  "roadmap.done": { ru: "Готово", en: "Done" },
  "roadmap.active": { ru: "В работе", en: "In progress" },
  "roadmap.planned": { ru: "В планах", en: "Planned" },
  "roadmap.followProgress": { ru: "Следите за прогрессом в", en: "Follow progress in" },

  "faq.eyebrow": { ru: "FAQ", en: "FAQ" },
  "faq.title1": { ru: "Частые вопросы", en: "Common questions," },
  "faq.titleAccent": { ru: "без воды", en: "no fluff" },
  "faq.desc": {
    ru: "Собрали то, что чаще всего спрашивают о KB Learning. Не нашли ответ — заведите issue на GitHub.",
    en: "We collected what people ask most about KB Learning. Didn't find an answer? Open an issue on GitHub.",
  },
  "faq.notFoundTitle": { ru: "Не нашли ответ?", en: "Didn't find an answer?" },
  "faq.notFoundDesc": {
    ru: "Каждый вопрос — повод улучшить документацию. Откройте issue с меткой question — ответим и, возможно, добавим сюда.",
    en: "Every question is a chance to improve the docs. Open an issue with the question label — we'll answer and maybe add it here.",
  },
  "faq.askQuestion": { ru: "Задать вопрос", en: "Ask a question" },

  "start.eyebrow": { ru: "Запуск", en: "Get started" },
  "start.title1": { ru: "Поднимаем проект", en: "Get the project running" },
  "start.titleAccent": { ru: "за пару команд", en: "in a couple of commands" },
  "start.desc": {
    ru: "Локальная разработка работает из коробки с безопасными дефолтами. Для чего-то большего — задайте переменные окружения.",
    en: "Local development works out of the box with safe defaults. For anything bigger — set the environment variables.",
  },
  "start.secretsTitle": { ru: "Секреты и конфигурация", en: "Secrets & configuration" },
  "start.secretsDesc": {
    ru: "JWT-секрет — настоящий серверный секрет, задавайте JWT_SECRET через env в любом окружении с реальными аккаунтами. Ключ CoinRanking зашит в клиент — это вопрос гигиены репо, а не реальная защита.",
    en: "The JWT secret is a real server-side secret — set JWT_SECRET via env in any environment handling real accounts. The CoinRanking key is embedded in the client — that's repo hygiene, not a real secret.",
  },
  "start.prereqTitle": { ru: "Что нужно установить", en: "What you need to install" },
  "start.iosNote": {
    ru: "iOS-таргет Kotlin/Native нельзя собрать на Linux/Windows — нужна macOS с Xcode.",
    en: "The Kotlin/Native iOS target can't be built on Linux/Windows — you need macOS with Xcode.",
  },
  "start.copy": { ru: "Скопировать", en: "Copy" },
  "start.copied": { ru: "Скопировано", en: "Copied" },

  "contact.eyebrow": { ru: "Связаться", en: "Get in touch" },
  "contact.title1": { ru: "Будем на связи —", en: "Let's stay in touch —" },
  "contact.titleAccent": { ru: "без спама", en: "no spam" },
  "contact.desc": {
    ru: "Подпишитесь на обновления проекта или задайте вопрос. Форма обрабатывается на сервере, email нигде не публикуется.",
    en: "Subscribe to project updates or ask a question. The form is processed on the server, your email is never published.",
  },
  "contact.whatYouGet": { ru: "Что вы получите", en: "What you'll get" },
  "contact.githubPref": {
    ru: "Prefer GitHub? Заведите issue — это самый прозрачный способ задать вопрос и получить публичный ответ.",
    en: "Prefer GitHub? Open an issue — it's the most transparent way to ask a question and get a public answer.",
  },
  "contact.openIssue": { ru: "Открыть issue", en: "Open an issue" },
  "contact.tab.newsletter": { ru: "Подписка", en: "Subscribe" },
  "contact.tab.contact": { ru: "Вопрос", en: "Question" },
  "contact.name": { ru: "Ваше имя", en: "Your name" },
  "contact.email": { ru: "Email", en: "Email" },
  "contact.message": { ru: "Сообщение", en: "Message" },
  "contact.emailInvalid": { ru: "Проверьте формат email", en: "Check the email format" },
  "contact.subscribe": { ru: "Подписаться", en: "Subscribe" },
  "contact.send": { ru: "Отправить", en: "Send" },
  "contact.sending": { ru: "Отправляем...", en: "Sending..." },
  "contact.done": { ru: "Готово", en: "Done" },
  "contact.successNewsletter": {
    ru: "Подписка оформлена! Мы будем присылать обновления проекта.",
    en: "Subscription confirmed! We'll send you project updates.",
  },
  "contact.successContact": {
    ru: "Сообщение отправлено! Ответим в ближайшее время.",
    en: "Message sent! We'll reply shortly.",
  },
  "contact.get.releases": { ru: "Уведомления о новых релизах KB Learning", en: "Notifications about new KB Learning releases" },
  "contact.get.topics": { ru: "Анонсы новых тем в крипто-библиотеке", en: "Announcements of new crypto-library topics" },
  "contact.get.answers": { ru: "Ответы на ваши вопросы", en: "Answers to your questions" },
  "contact.get.nospam": { ru: "Никакого спама — отписка в один клик", en: "No spam — unsubscribe in one click" },

  "connect.eyebrow": { ru: "Контакты", en: "Contact" },
  "connect.title1": { ru: "Будем на связи", en: "Let's stay" },
  "connect.titleAccent": { ru: "в проекте", en: "with the project" },
  "connect.desc": {
    ru: "GitHub — наш основной дом. Соцсети подключаются по мере запуска: следите за репозиторием, чтобы не пропустить.",
    en: "GitHub is our main home. Socials come online as they launch: watch the repo so you don't miss it.",
  },
  "connect.soon": { ru: "скоро", en: "soon" },
  "connect.ctaTitle": { ru: "Хотите контрибьютить или задать вопрос?", en: "Want to contribute or ask something?" },
  "connect.ctaDesc": {
    ru: "Проект открыт. Fork, issue, pull request — любая помощь приветствуется. Особенно — по iOS-обвязке и новым темам для крипто-библиотеки.",
    en: "The project is open. Fork, issue, pull request — any help is welcome. Especially around the iOS shell and new crypto-library topics.",
  },
  "connect.ctaButton": { ru: "Перейти на GitHub", en: "Go to GitHub" },

  // ===== Footer =====
  "footer.sections": { ru: "Разделы", en: "Sections" },
  "footer.socials": { ru: "Соцсети", en: "Socials" },
  "footer.madeWith": { ru: "Сделано с", en: "Made with" },
  "footer.andKotlin": { ru: "и Kotlin. Хостится на GitHub.", en: "and Kotlin. Hosted on GitHub." },

  // ===== Trade Simulator (new) =====
  "sim.eyebrow": { ru: "Живое демо", en: "Live demo" },
  "sim.title1": { ru: "Торговый симулятор", en: "Trading simulator" },
  "sim.titleAccent": { ru: "прямо в браузере", en: "right in your browser" },
  "sim.desc": {
    ru: "Попробуйте механику KB Learning: купите и продайте виртуальные монеты на симулированном балансе. Цены двигаются, P&L пересчитывается в реальном времени. Никаких реальных денег — только тренировка.",
    en: "Try the KB Learning mechanics: buy and sell virtual coins on a simulated balance. Prices move, P&L recalculates in real time. No real money — just practice.",
  },
  "sim.balance": { ru: "Баланс (симуляция)", en: "Balance (simulated)" },
  "sim.holdingsValue": { ru: "Стоимость активов", en: "Holdings value" },
  "sim.totalPnl": { ru: "Общий P&L", en: "Total P&L" },
  "sim.reset": { ru: "Сбросить", en: "Reset" },
  "sim.market": { ru: "Рынок", en: "Market" },
  "sim.coinCount": { ru: "Количество монет", en: "Number of coins" },
  "sim.price": { ru: "Цена", en: "Price" },
  "sim.24h": { ru: "24ч", en: "24h" },
  "sim.holding": { ru: "В портфеле", en: "Holding" },
  "sim.value": { ru: "Стоимость", en: "Value" },
  "sim.pnl": { ru: "P&L", en: "P&L" },
  "sim.buy": { ru: "Купить", en: "Buy" },
  "sim.sell": { ru: "Продать", en: "Sell" },
  "sim.amount": { ru: "Количество", en: "Amount" },
  "sim.order.market": { ru: "Рыночный", en: "Market" },
  "sim.order.limit": { ru: "Лимитный", en: "Limit" },
  "sim.limitPrice": { ru: "Цена лимита", en: "Limit price" },
  "sim.placeOrder": { ru: "Разместить ордер", en: "Place order" },
  "sim.orderPlaced": { ru: "Ордер размещён", en: "Order placed" },
  "sim.insufficientFunds": { ru: "Недостаточно средств", en: "Insufficient funds" },
  "sim.insufficientCoins": { ru: "Недостаточно монет", en: "Insufficient coins" },
  "sim.emptyPortfolio": { ru: "Портфель пуст — купите монеты, чтобы начать", en: "Portfolio is empty — buy coins to start" },
  "sim.disclaimer": {
    ru: "Демо-симулятор. Цены генерируются случайно для иллюстрации. Никаких реальных средств. Как в KB Learning.",
    en: "Demo simulator. Prices are randomly generated for illustration. No real funds. Just like in KB Learning.",
  },
  "sim.priceUp": { ru: "Цена выросла", en: "Price up" },
  "sim.priceDown": { ru: "Цена упала", en: "Price down" },
  "sim.orders": { ru: "Открытые ордера", en: "Open orders" },
  "sim.noOrders": { ru: "Нет открытых ордеров", en: "No open orders" },
  "sim.cancel": { ru: "Отменить", en: "Cancel" },
  "sim.orderFilled": { ru: "Ордер исполнен", en: "Order filled" },
  "sim.orderCancelled": { ru: "Ордер отменён", en: "Order cancelled" },
  "sim.tradeHistory": { ru: "Журнал сделок", en: "Trade history" },
  "sim.clearHistory": { ru: "Очистить", en: "Clear" },
  "sim.noTrades": { ru: "Сделок пока нет — исполните ордер", en: "No trades yet — execute an order" },
  "sim.realizedPnl": { ru: "Реализованная P&L", en: "Realized P&L" },
  "sim.exportCsv": { ru: "Экспорт CSV", en: "Export CSV" },
  "sim.buyShort": { ru: "Пок.", en: "Buy" },
  "sim.sellShort": { ru: "Прод.", en: "Sell" },
  "sim.filterAll": { ru: "Все", en: "All" },
  "sim.filterBuy": { ru: "Покупки", en: "Buys" },
  "sim.filterSell": { ru: "Продажи", en: "Sells" },
  "sim.filterByCoin": { ru: "По монете", en: "By coin" },
  "sim.filteredCount": { ru: "показано", en: "shown" },
  "sim.searchPlaceholder": { ru: "Поиск по журналу...", en: "Search history..." },
  "sim.searchNoResults": { ru: "Ничего не найдено", en: "No matches" },
  "sim.clickToCopy": { ru: "Кликните, чтобы скопировать", en: "Click to copy" },
  "sim.copied": { ru: "Скопировано", en: "Copied" },
  "sim.copyValue": { ru: "Копировать значение", en: "Copy value" },
} as const;

export type Lang = "ru" | "en";

/**
 * Локализованная строка для data-массивов.
 * Использование: { ru: "Русский текст", en: "English text" }
 */
export type LocalStr = { ru: string; en: string };

/**
 * Хелпер для выбора строки по языку из LocalStr.
 */
export function pick(str: LocalStr, lang: Lang): string {
  return str[lang] ?? str.ru;
}

