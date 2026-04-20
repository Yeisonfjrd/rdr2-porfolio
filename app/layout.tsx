import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { Crimson_Text } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const chineseRocks = localFont({
  src: './fonts/chinese rocks rg.otf',
  variable: '--font-chinese-rocks',
  display: 'swap',
})

const crimsonText = Crimson_Text({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Yeison Fajardo | Desarrollador Full Stack',
  description:
    'Portafolio profesional de Yeison Fajardo, desarrollador full-stack con 3 años de experiencia.',
}

export const viewport: Viewport = {
  themeColor: '#191910',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${chineseRocks.variable} ${crimsonText.variable}`}>
      <body className="antialiased min-h-full h-full bg-[#020002] text-rdr-cream font-sans">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}