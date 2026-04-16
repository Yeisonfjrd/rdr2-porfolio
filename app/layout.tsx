import type { Metadata } from 'next'
import { Caveat, Cinzel } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const caveat = Caveat({ subsets: ["latin"], variable: '--font-caveat' });
const cinzel = Cinzel({ subsets: ["latin"], variable: '--font-cinzel' });

export const metadata: Metadata = {
  title: 'Yeison Fajardo - Full Stack Developer | RDR2 Portfolio',
  description: 'Interactive portfolio of Yeison Fajardo, a full-stack developer with 3 years of experience. Designed with Red Dead Redemption 2 aesthetic.',
  generator: 'v0.app',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    themeColor: '#020002'
  },
  icons: {
    icon: [
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${caveat.variable} ${cinzel.variable}`}>
      <body className="font-sans antialiased bg-slate-950 text-slate-100">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
