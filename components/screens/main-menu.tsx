'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

type GameScreen = 'title' | 'main' | 'portfolio'

interface MainMenuProps {
  onNavigate: (screen: GameScreen, section?: string) => void
  onBack: () => void
}

const menuItems = [
  { id: 'portfolio', label: 'PORTFOLIO', description: 'Ver mi trabajo y proyectos' },
  { id: 'about', label: 'SOBRE MÍ', description: 'Conocer mi trayectoria' },
  { id: 'contact', label: 'CONTACTO', description: 'Conectar conmigo' },
  { id: 'exit', label: 'SALIR', description: 'Volver al inicio' },
]

export default function MainMenu({ onNavigate, onBack }: MainMenuProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const handleSelect = (id: string) => {
    if (id === 'portfolio' || id === 'about' || id === 'contact') {
      onNavigate('portfolio', id)
    } else if (id === 'exit') {
      onBack()
    }
  }

  const activeIndex = hoveredIndex !== null ? hoveredIndex : selectedIndex

  return (
    <div className="rdr-cinematic-bars absolute inset-0 min-h-0 overflow-hidden bg-[#020002]">
      {/* Coverr y similares suelen bloquearse por CORS (OpaqueResponseBlocking); fondo estático estable */}
      <div className="absolute inset-0 bg-[#100d08]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(254,172,1,0.08),transparent_55%),linear-gradient(to_bottom,rgba(0,0,0,0.25),rgba(0,0,0,0.88))]"
        aria-hidden
      />

      <div className="absolute inset-0 bg-western" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/42 to-black/76" />
      <div className="absolute inset-0 rdr-golden-hour opacity-[0.65]" aria-hidden />

      <motion.div
        className="rdr-grain absolute inset-0 pointer-events-none"
        animate={{ opacity: [0.03, 0.06, 0.03] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <div className="rdr-vignette absolute inset-0 pointer-events-none" />

      <div className="relative z-10 h-full flex">
        <div className="w-full max-w-md pl-8 md:pl-[10vw] flex flex-col justify-center">
          <p className="font-typewriter text-[#5a5348] text-[10px] md:text-xs tracking-[0.35em] uppercase mb-6">
            Menú principal
          </p>
          <nav className="space-y-1 border-l border-[#feac01]/25 pl-3">
            {menuItems.map((item, index) => (
              <motion.button
                key={item.id}
                className="w-full text-left py-3 px-4 relative group"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => {
                  setSelectedIndex(index)
                  handleSelect(item.id)
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                {activeIndex === index && (
                  <motion.div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-9 bg-[#bd081a] shadow-[0_0_12px_rgba(189,8,26,0.45)]"
                    layoutId="menuIndicator"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}

                <span
                  className={`font-chinese-rocks uppercase text-xl md:text-2xl tracking-[0.12em] transition-colors duration-200 ${
                    activeIndex === index
                      ? 'text-[#e8dfc0] rdr-text-glow'
                      : 'text-[#5c5348]'
                  }`}
                >
                  {item.label}
                </span>
              </motion.button>
            ))}
          </nav>

          <motion.div 
            className="mt-12 pl-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-[#716454] text-sm tracking-wide font-sans leading-relaxed max-w-sm">
              {menuItems[activeIndex].description}
            </p>
          </motion.div>
        </div>

        <div className="flex-1 relative">
          <motion.div
            className="absolute bottom-8 right-8 text-right"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="font-typewriter text-[#4a4338] text-xs tracking-[0.2em] uppercase">
              Navega con el cursor
            </p>
            <p className="font-typewriter text-[#4a4338] text-xs tracking-[0.2em] uppercase mt-1">
              Clic para seleccionar
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
