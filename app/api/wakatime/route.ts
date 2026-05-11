/**
 * /app/api/wakatime/route.ts
 *
 * Proxy seguro para la WakaTime API v1.
 * La WAKATIME_API_KEY nunca llega al cliente.
 *
 * Devuelve un WakaTimeActivityData normalizado:
 * {
 *   dailyAvgHours: string  // "X h Y m"
 *   topLanguage:   string
 *   topProject:    string
 *   editor:        string
 * }
 */

import { NextResponse } from 'next/server'

const WAKATIME_API_KEY = process.env.WAKATIME_API_KEY ?? ''

export interface WakaTimeActivityData {
  dailyAvgHours: string
  topLanguage:   string
  topProject:    string
  editor:        string
}

interface WakaTimeSummary {
  data: {
    languages: { name: string; hours: number; minutes: number }[]
    projects:  { name: string }[]
    editors:   { name: string }[]
    grand_total: { hours: number; minutes: number }
  }[]
}

function toHoursMinutes(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60)
  const m = totalMinutes % 60
  return `${h}h ${m}m`
}

export async function GET() {
  if (!WAKATIME_API_KEY) {
    // Sin clave configurada → fallback honesto
    return NextResponse.json({
      dailyAvgHours: 'N/A',
      topLanguage:   'TypeScript',
      topProject:    'N/A',
      editor:        'VS Code',
    } satisfies WakaTimeActivityData)
  }

  try {
    const key = Buffer.from(WAKATIME_API_KEY).toString('base64')
    const res = await fetch(
      'https://wakatime.com/api/v1/users/current/summaries?range=last_7_days',
      {
        headers: {
          Authorization: `Basic ${key}`,
          'User-Agent': 'portfolio-api',
        },
        next: { revalidate: 600 }, // cache 10 minutos
      }
    )

    if (!res.ok) {
      throw new Error(`WakaTime API ${res.status}`)
    }

    const json: WakaTimeSummary = await res.json()

    // Agrega totales de los últimos 7 días
    let totalMinutes = 0
    const langMap: Record<string, number> = {}
    const projMap: Record<string, number> = {}
    const editorMap: Record<string, number> = {}

    for (const day of json.data) {
      totalMinutes += day.grand_total.hours * 60 + day.grand_total.minutes
      for (const l of day.languages) langMap[l.name] = (langMap[l.name] ?? 0) + l.hours * 60 + l.minutes
      for (const p of day.projects)  projMap[p.name] = (projMap[p.name] ?? 0) + 1
      for (const e of day.editors)   editorMap[e.name] = (editorMap[e.name] ?? 0) + 1
    }

    const days = json.data.length || 1
    const avgMinutes  = Math.round(totalMinutes / days)
    const topLanguage = Object.entries(langMap).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'TypeScript'
    const topProject  = Object.entries(projMap).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'N/A'
    const editor      = Object.entries(editorMap).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'VS Code'

    const data: WakaTimeActivityData = {
      dailyAvgHours: toHoursMinutes(avgMinutes),
      topLanguage,
      topProject,
      editor,
    }

    return NextResponse.json(data)
  } catch (err) {
    console.error('[wakatime/route]', err)
    return NextResponse.json(
      { error: 'No se pudo obtener la actividad de WakaTime' },
      { status: 502 }
    )
  }
}