import type { Metadata } from 'next'
import { Inter, Rye, Special_Elite } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-body' })
const rye = Rye({ subsets: ['latin'], weight: '400', variable: '--font-western' })
const specialElite = Special_Elite({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-typewriter',
})

export const metadata: Metadata = {
  title: 'Yeison Fajardo | Desarrollador Full Stack',
  description: 'Portafolio profesional de Yeison Fajardo, desarrollador full-stack con 3 años de experiencia.',
  themeColor: '#1e1b14',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${rye.variable} ${specialElite.variable}`}>
      <body className="antialiased bg-[#1e1b14] text-[#dcc09a] min-h-screen">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
