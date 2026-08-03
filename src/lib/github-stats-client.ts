/**
 * Клиентский fetch GitHub-статистики напрямую из GitHub API (поддерживает CORS).
 * Используется при статическом экспорте на GitHub Pages, где API routes недоступны.
 *
 * Без токена лимит — 60 запросов/час с одного IP. In-memory cache 15 мин.
 */

export type GhStats = {
  stars: number;
  forks: number;
  openIssues: number;
  language: string | null;
  updatedAt: string;
  subscribers: number;
  publicRepos: number;
};

const REPO = "linux-code-dev/KB_Learning";
const USER = "linux-code-dev";
const TTL = 15 * 60 * 1000;

let cache: { data: GhStats; ts: number } | null = null;

export async function fetchGhStats(): Promise<GhStats> {
  const now = Date.now();
  if (cache && now - cache.ts < TTL) return cache.data;

  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
  };
  // Если задан публичный токен (fine-grained, read-only) — повышает лимит до 5000/час
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  const [repoRes, userRes] = await Promise.all([
    fetch(`https://api.github.com/repos/${REPO}`, { headers }),
    fetch(`https://api.github.com/users/${USER}`, { headers }),
  ]);

  if (!repoRes.ok || !userRes.ok) {
    throw new Error(`GitHub API error: ${repoRes.status} / ${userRes.status}`);
  }

  const repo = await repoRes.json();
  const user = await userRes.json();

  const data: GhStats = {
    stars: repo.stargazers_count ?? 0,
    forks: repo.forks_count ?? 0,
    openIssues: repo.open_issues_count ?? 0,
    language: repo.language ?? "Kotlin",
    updatedAt: repo.pushed_at ?? repo.updated_at ?? new Date().toISOString(),
    subscribers: user.followers ?? 0,
    publicRepos: user.public_repos ?? 0,
  };

  cache = { data, ts: now };
  return data;
}
