/**
 * /app/api/github/route.ts
 *
 * Proxy seguro para la GitHub REST API.
 * El GITHUB_TOKEN nunca llega al cliente.
 *
 * Devuelve un ActivityData normalizado:
 * {
 *   publicRepos: number
 *   totalStars:  number
 *   topLanguage: string
 *   recentPush:  string   // ISO date del último push
 *   username:    string
 * }
 */

import { NextResponse } from 'next/server'

const GITHUB_USERNAME = process.env.GITHUB_USERNAME ?? 'yeisonfjrd'
const GITHUB_TOKEN    = process.env.GITHUB_TOKEN    ?? ''

export interface GitHubActivityData {
  publicRepos: number
  totalStars:  number
  topLanguage: string
  recentPush:  string
  username:    string
}

interface GitHubRepo {
  stargazers_count: number
  language:         string | null
  pushed_at:        string
}

interface GitHubUser {
  public_repos: number
  login:        string
}

async function githubFetch(path: string) {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'portfolio-api',
  }
  if (GITHUB_TOKEN) headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`

  const res = await fetch(`https://api.github.com${path}`, {
    headers,
    next: { revalidate: 300 }, // cache 5 minutos
  })

  if (!res.ok) {
    throw new Error(`GitHub API ${res.status}: ${path}`)
  }
  return res.json()
}

export async function GET() {
  try {
    const [user, repos] = await Promise.all([
      githubFetch(`/users/${GITHUB_USERNAME}`) as Promise<GitHubUser>,
      githubFetch(`/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed`) as Promise<GitHubRepo[]>,
    ])

    // Conteo de lenguajes
    const langCount: Record<string, number> = {}
    let totalStars = 0
    let recentPush = ''

    for (const repo of repos) {
      totalStars += repo.stargazers_count
      if (repo.language) langCount[repo.language] = (langCount[repo.language] ?? 0) + 1
      if (!recentPush || repo.pushed_at > recentPush) recentPush = repo.pushed_at
    }

    const topLanguage = Object.entries(langCount).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'TypeScript'

    const data: GitHubActivityData = {
      publicRepos: user.public_repos,
      totalStars,
      topLanguage,
      recentPush,
      username: user.login,
    }

    return NextResponse.json(data)
  } catch (err) {
    console.error('[github/route]', err)
    return NextResponse.json(
      { error: 'No se pudo obtener la actividad de GitHub' },
      { status: 502 }
    )
  }
}