import type { NextConfig } from "next";

// Конфиг для GitHub Pages (статический экспорт).
// Используется через `bun run build:pages`.
//
// ВАЖНО для GitHub Pages:
// 1. `output: "export"` генерирует статический HTML/CSS/JS в папке `out/`.
// 2. API routes НЕ работают при static export — поэтому github-stats
//    использует клиентский fetch (src/lib/github-stats-client.ts),
//    а contact-form — fallback на mailto при 404.
// 3. `basePath` = "/kb-learning" — имя репозитория. Если деплой в корень
//    (user/organization pages: username.github.io), basePath не нужен.
// 4. `images.unoptimized = true` — Next/Image optimizer требует сервер.
// 5. GitHub Pages требует `.nojekyll` файл в `out/` (добавляется автоматически
//    через копирование из public/).

const repo = process.env.GITHUB_REPOSITORY || "linux-code-os/kb-learning";
const repoName = repo.split("/")[1];

const nextConfig: NextConfig = {
  output: "export",
  // basePath для project pages (username.github.io/repo-name).
  // Для user/org pages (username.github.io) — закомментируйте basePath.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? `/${repoName}`,
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH ?? `/${repoName}/`,
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  trailingSlash: true,
};

export default nextConfig;
