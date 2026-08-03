import { NextResponse } from "next/server";

// In-memory cache (15 минут), чтобы не дёргать GitHub API на каждый запрос
type RepoStats = {
  stars: number;
  forks: number;
  openIssues: number;
  language: string | null;
  updatedAt: string;
  subscribers: number;
  publicRepos: number;
  fetchedAt: number;
};

let cache: { data: RepoStats; ts: number } | null = null;
const TTL = 15 * 60 * 1000;

export async function GET() {
  const now = Date.now();

  if (cache && now - cache.ts < TTL) {
    return NextResponse.json(cache.data, {
      headers: { "Cache-Control": "public, max-age=900" },
    });
  }

  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "User-Agent": "kb-learning-site",
    };

    // Если задан GITHUB_TOKEN — прокидываем Authorization для повышения
    // rate limit с 60 до 5000 запросов/час. Без токена работает, но лимит ниже.
    const token = process.env.GITHUB_TOKEN;
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const [repoRes, userRes] = await Promise.all([
      fetch("https://api.github.com/repos/linux-code-dev/KB_Learning", {
        headers,
        next: { revalidate: 900 },
      }),
      fetch("https://api.github.com/users/linux-code-dev", {
        headers,
        next: { revalidate: 900 },
      }),
    ]);

    if (!repoRes.ok || !userRes.ok) {
      throw new Error(`GitHub API error: repo ${repoRes.status}, user ${userRes.status}`);
    }

    const repo = await repoRes.json();
    const user = await userRes.json();

    const data: RepoStats = {
      stars: repo.stargazers_count ?? 0,
      forks: repo.forks_count ?? 0,
      openIssues: repo.open_issues_count ?? 0,
      language: repo.language ?? "Kotlin",
      updatedAt: repo.pushed_at ?? repo.updated_at ?? new Date().toISOString(),
      subscribers: user.followers ?? 0,
      publicRepos: user.public_repos ?? 0,
      fetchedAt: now,
    };

    cache = { data, ts: now };

    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, max-age=900" },
    });
  } catch (err) {
    // При ошибке отдаём безопасные дефолты, чтобы UI не падал
    return NextResponse.json(
      {
        stars: 0,
        forks: 0,
        openIssues: 0,
        language: "Kotlin",
        updatedAt: new Date().toISOString(),
        subscribers: 0,
        publicRepos: 4,
        fetchedAt: now,
        error: err instanceof Error ? err.message : "unknown",
      },
      { status: 200, headers: { "Cache-Control": "no-store" } },
    );
  }
}
