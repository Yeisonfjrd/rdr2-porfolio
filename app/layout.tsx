import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

// SOLO ESTA FUENTE
const chineseRocks = localFont({
  src: './fonts/chinese rocks rg.otf',
  variable: '--font-chinese-rocks',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Yeison Fajardo | Desarrollador Full Stack',
  description:
    'Portafolio profesional de Yeison Fajardo, desarrollador full-stack con 3 años de experiencia.',
}

export const viewport: Viewport = {
  themeColor: '#1e1b14',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={chineseRocks.variable}>
      <body className="antialiased bg-[#1e1b14] text-[#dcc09a] min-h-screen font-chinese">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
