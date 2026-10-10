'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useRDR2Navigation } from '@/hooks/useRDR2Navigation'
import RDR2ControlPrompts from '@/components/ui/rdr2-control-prompts'
import type { PortfolioInitialSection } from '@/components/screens/portfolio-menu'

export type GameScreen = 'title' | 'main' | 'portfolio'
export type MenuTarget = PortfolioInitialSection | 'activities'

interface MainMenuProps {
  onNavigate: (screen: GameScreen, section?: MenuTarget) => void
  onBack: () => void
}

/*
  The pause menu from the game: a red column painted with a dry brush, a pocket watch
  drawn in ink, the options stacked slightly out of line, and a black-and-white still
  of the world behind it that changes with the selection.
*/

interface MenuItem {
  id: MenuTarget | 'exit'
  label: string
  caption: string
  image: string
  indent: number // px; the game's list is deliberately not aligned
}

const menuItems: MenuItem[] = [
  { id: 'perfil',      label: 'PERFIL',      caption: 'Quién soy y qué estoy construyendo.',          image: '/loading/scene1.jpg', indent: 26 },
  { id: 'proyectos',   label: 'PROYECTOS',   caption: 'Lo que construí, con el código a la vista.',    image: '/loading/scene2.jpg', indent: 6 },
  { id: 'habilidades', label: 'HABILIDADES', caption: 'Stack técnico y herramientas de todos los días.', image: '/loading/scene3.jpg', indent: 32 },
  { id: 'experiencia', label: 'EXPERIENCIA', caption: 'Formación y recorrido.',                         image: '/loading/scene4.jpg', indent: 8 },
  { id: 'contacto',    label: 'CONTACTO',    caption: 'Cómo encontrarme.',                              image: '/loading/scene1.jpg', indent: 16 },
  { id: 'activities',  label: 'ACTIVIDAD',   caption: 'GitHub y WakaTime en vivo.',                     image: '/loading/scene3.jpg', indent: 12 },
  { id: 'exit',        label: 'SALIR',       caption: 'Volver a la pantalla de título.',                image: '/loading/scene2.jpg', indent: 0 },
]

/** Pocket watch drawn in ink, showing the visitor's real time. */
function PocketWatch() {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const id = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [])

  const h = now ? (now.getHours() % 12) + now.getMinutes() / 60 : 10
  const m = now ? now.getMinutes() + now.getSeconds() / 60 : 10
  const s = now ? now.getSeconds() : 0
  const hand = (angle: number, length: number) => ({
    x2: 50 + length * Math.sin((angle * Math.PI) / 180),
    y2: 58 - length * Math.cos((angle * Math.PI) / 180),
  })

  return (
    <svg viewBox="0 0 100 112" className="w-[clamp(72px,8.5vw,128px)]" style={{ filter: 'url(#rdr-ink-line)' }} aria-hidden>
      <g fill="none" stroke="#140606" strokeLinecap="round">
        {/* bow and crown */}
        <ellipse cx="50" cy="9" rx="8" ry="7" strokeWidth="3.2" />
        <rect x="45" y="15" width="10" height="7" rx="1.5" fill="#140606" />
        {/* case */}
        <circle cx="50" cy="58" r="37" strokeWidth="5" />
        <circle cx="50" cy="58" r="31" strokeWidth="1.6" />
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i * 30 * Math.PI) / 180
          const inner = i % 3 === 0 ? 22 : 25
          return (
            <line
              key={i}
              x1={50 + inner * Math.sin(a)} y1={58 - inner * Math.cos(a)}
              x2={50 + 29 * Math.sin(a)}    y2={58 - 29 * Math.cos(a)}
              strokeWidth={i % 3 === 0 ? 3 : 1.6}
            />
          )
        })}
        {/* sub-dial for seconds, like a railroad watch */}
        <circle cx="50" cy="72" r="7" strokeWidth="1.2" />
        <line x1="50" y1="72" {...{ x2: 50 + 6 * Math.sin((s * 6 * Math.PI) / 180), y2: 72 - 6 * Math.cos((s * 6 * Math.PI) / 180) }} strokeWidth="1.2" />
        <line x1="50" y1="58" {...hand(h * 30, 15)} strokeWidth="3.6" />
        <line x1="50" y1="58" {...hand(m * 6, 23)} strokeWidth="2.4" />
      </g>
      <circle cx="50" cy="58" r="3" fill="#140606" />
    </svg>
  )
}

export default function MainMenu({ onNavigate, onBack }: MainMenuProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const selected = menuItems[selectedIndex]

  const activate = (item: MenuItem) => {
    if (item.id === 'exit') onBack()
    else onNavigate('portfolio', item.id)
  }

  useRDR2Navigation({
    onBack,
    onSelect: () => activate(selected),
    onArrowDown: () => setSelectedIndex((i) => (i + 1) % menuItems.length),
    onArrowUp: () => setSelectedIndex((i) => (i - 1 + menuItems.length) % menuItems.length),
  })

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#050404]">
      {/* Displacement used only for this screen: strong sideways, so the right edge of the
          red column tears like a dry brush while top and bottom stay off-screen */}
      <svg width="0" height="0" className="absolute" aria-hidden>
        <filter id="rdr-pause-edge" x="-5%" y="-5%" width="125%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.006 0.045" numOctaves="4" seed="9" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="70" xChannelSelector="R" yChannelSelector="B" />
        </filter>
        {/* barely-there wobble so the watch reads as drawn with a pen, not as vector art */}
        <filter id="rdr-ink-line" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves="2" seed="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="rdr-pause-bristles" x="-5%" y="-5%" width="140%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.004 0.12" numOctaves="3" seed="21" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="120" xChannelSelector="R" yChannelSelector="B" />
        </filter>
      </svg>

      {/* ── Background still: black and white, slow push-in, blurred edges ── */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={selected.image + selectedIndex}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          // the old still waits underneath until the new one has faded in, so the cut never dips to black
          exit={{ opacity: 0, transition: { duration: 0.3, delay: 0.7 } }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <motion.img
            src={selected.image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            style={{ filter: 'grayscale(1) contrast(1.18) brightness(0.82)' }}
            initial={{ scale: 1.02 }}
            animate={{ scale: 1.09 }}
            transition={{ duration: 14, ease: 'linear' }}
          />
          {/* depth of field: the same frame blurred, visible only towards the edges */}
          <motion.img
            src={selected.image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              filter: 'grayscale(1) contrast(1.1) brightness(0.7) blur(7px)',
              maskImage: 'radial-gradient(ellipse 55% 60% at 62% 48%, transparent 45%, black 85%)',
              WebkitMaskImage: 'radial-gradient(ellipse 55% 60% at 62% 48%, transparent 45%, black 85%)',
            }}
            initial={{ scale: 1.02 }}
            animate={{ scale: 1.09 }}
            transition={{ duration: 14, ease: 'linear' }}
          />
        </motion.div>
      </AnimatePresence>
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 70% 75% at 62% 50%, transparent 40%, rgba(0,0,0,0.78) 100%)' }}
      />
      <div className="rdr-grain pointer-events-none absolute inset-0 opacity-60" />

      {/* ── The red column ── */}
      <motion.div
        className="absolute inset-y-0 left-0 z-10 w-[min(82vw,clamp(260px,31vw,480px))]"
        initial={{ x: '-110%' }}
        animate={{ x: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* stray bristles that overshoot the edge */}
        <div
          className="absolute -inset-y-10 -left-10 right-[-14px] opacity-55"
          style={{ background: '#a8070f', filter: 'url(#rdr-pause-bristles)' }}
        />
        {/* main paint body */}
        <div
          className="absolute -inset-y-10 -left-10 right-0"
          style={{
            background: `
              repeating-linear-gradient(176deg, rgba(0,0,0,0.07) 0 2px, transparent 2px 9px),
              repeating-linear-gradient(181deg, rgba(255,255,255,0.035) 0 1px, transparent 1px 13px),
              linear-gradient(90deg, #b3060f 0%, #c40a14 55%, #ad050d 100%)
            `,
            filter: 'url(#rdr-pause-edge)',
          }}
        />
        {/* uneven pigment: darker where the brush pressed harder */}
        <div
          className="pointer-events-none absolute inset-0 mix-blend-multiply"
          style={{
            background: `
              radial-gradient(ellipse 60% 35% at 20% 15%, rgba(90,0,6,0.35), transparent 70%),
              radial-gradient(ellipse 50% 40% at 70% 80%, rgba(80,0,5,0.3), transparent 70%)
            `,
          }}
        />

        <div className="relative flex h-full flex-col pl-[clamp(28px,4vw,64px)] pr-6 pt-[clamp(28px,5vh,56px)] pb-[clamp(56px,12vh,120px)]">
          <PocketWatch />

          <nav className="mt-auto flex flex-col" aria-label="Menú principal">
            {menuItems.map((item, index) => {
              const isActive = index === selectedIndex
              return (
                <motion.button
                  key={item.id}
                  type="button"
                  onMouseEnter={() => setSelectedIndex(index)}
                  onFocus={() => setSelectedIndex(index)}
                  onClick={() => activate(item)}
                  className="font-chinese-rocks w-fit text-left uppercase leading-[1.04] outline-none"
                  style={{
                    marginLeft: item.indent,
                    fontSize: 'clamp(1.45rem, 2.7vw, 2.8rem)',
                    letterSpacing: '0.02em',
                    color: isActive ? '#ffffff' : 'rgba(255,240,236,0.74)',
                    textShadow: isActive ? '0 0 18px rgba(255,255,255,0.25), 2px 2px 0 rgba(60,0,4,0.55)' : '1px 1px 0 rgba(60,0,4,0.4)',
                  }}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: isActive ? 6 : 0, scale: isActive ? 1.06 : 1 }}
                  transition={{ duration: 0.18, delay: 0.25 + index * 0.04 }}
                >
                  {item.label}
                </motion.button>
              )
            })}
          </nav>
        </div>
      </motion.div>

      {/* ── What the selection opens, in the corner of the still ── */}
      <AnimatePresence mode="wait">
        <motion.p
          key={selected.id}
          className="pointer-events-none absolute hidden sm:block bottom-[clamp(52px,9vh,90px)] right-[clamp(16px,3vw,28px)] z-20 max-w-[36ch] text-right italic"
          style={{ fontFamily: 'var(--font-body), serif', color: 'rgba(232,223,192,0.82)', fontSize: 'clamp(0.95rem, 1.2vw, 1.15rem)', textShadow: '0 1px 3px #000' }}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {selected.caption}
        </motion.p>
      </AnimatePresence>

      <RDR2ControlPrompts
        prompts={[
          { key: 'Enter', label: 'SELECCIONAR', icon: 'cross' },
          { key: 'ESC', label: 'VOLVER', icon: 'circle' },
        ]}
      />
    </div>
  )
}
