'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

type GameScreen = 'title' | 'main' | 'portfolio'
type PortfolioInitialSection = 'portfolio' | 'about' | 'contact'

interface MainMenuProps {
  onNavigate: (screen: GameScreen, section?: PortfolioInitialSection) => void
  onBack: () => void
}

// ── CAMBIO: labels e ids actualizados (Sobre mí → Activities, Contacto → Audio) ──
const menuItems = [
  {
    id: 'portfolio',
    label: 'PORTFOLIO',
    description: 'Ver mi trabajo y proyectos de desarrollo backend y arquitectura de sistemas.',
    image: 'https://picsum.photos/seed/rdr2-port/600/350',
  },
  {
    id: 'activities',
    label: 'ACTIVITIES',
    description: 'Métricas en vivo: actividad de GitHub, tiempo de código con WakaTime y rendimiento en Strava.',
    image: 'https://picsum.photos/seed/rdr2-about/600/350',
  },
  {
    id: 'audio',
    label: 'AUDIO',
    description: 'Panel de configuración de efectos de sonido ambientales y música de fondo del portafolio.',
    image: 'https://picsum.photos/seed/rdr2-contact/600/350',
  },
  {
    id: 'exit',
    label: 'SALIR',
    description: 'Regresar a la pantalla de título principal.',
    image: 'https://picsum.photos/seed/rdr2-exit/600/350',
  },
]

export default function MainMenu({ onNavigate, onBack }: MainMenuProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setSelectedIndex(prev => (prev + 1) % menuItems.length)
      } else if (e.key === 'ArrowLeft') {
        setSelectedIndex(prev => (prev - 1 + menuItems.length) % menuItems.length)
      } else if (e.key === 'Enter') {
        const selected = menuItems[selectedIndex].id
        if (selected === 'portfolio' || selected === 'about' || selected === 'contact') {
          onNavigate('portfolio', selected as PortfolioInitialSection)
        } else if (selected === 'exit') {
          onBack()
        }
      } else if (e.key === 'Escape') {
        onBack()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIndex, onNavigate, onBack])

  return (
    <div className="rdr-cinematic-bars absolute inset-0 overflow-hidden" style={{ background: '#0d0b08' }}>

      {/* Atmósfera original — sin cambios */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse 60% 50% at 70% 50%, rgba(254,172,1,0.05) 0%, transparent 100%),
          radial-gradient(ellipse 40% 80% at 0% 50%, rgba(0,0,0,0.5) 0%, transparent 100%)
        `
      }} aria-hidden />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.55) 100%)'
      }} aria-hidden />

      {/* AGREGADO: luz dorada muy sutil al centro — añade ambiente sin oscurecer nada */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 50% 38% at 50% 54%, rgba(254,172,1,0.04) 0%, transparent 100%)',
        mixBlendMode: 'screen',
      }} aria-hidden />

      <motion.div className="rdr-grain absolute inset-0 pointer-events-none"
        animate={{ opacity: [0.03, 0.055, 0.03] }}
        transition={{ duration: 4, repeat: Infinity }} />

      <div className="rdr-bar-paint-edge-top"    style={{ top:    'calc(12% - 10px)' }} aria-hidden />
      <div className="rdr-bar-paint-edge-bottom" style={{ bottom: 'calc(12% - 10px)' }} aria-hidden />

      <div className="relative flex flex-col h-full px-8 md:px-[8vw] py-[14vh]" style={{ zIndex: 30 }}>

        <div className="mb-8 w-full">
          <h1 className="font-chinese-rocks uppercase tracking-[0.1em] text-[#e8dfc0]"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
            MENÚ PRINCIPAL
          </h1>
          <div className="w-full h-[2px] mt-2 bg-[#4a3e32] opacity-60" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 flex-1 w-full max-w-7xl mx-auto items-start mt-4">
          {menuItems.map((item, index) => {
            const isActive = selectedIndex === index

            return (
              <motion.button
                key={item.id}
                className="relative text-left flex flex-col w-full bg-transparent focus:outline-none group"
                onMouseEnter={() => setSelectedIndex(index)}
                onClick={() => {
                  if (item.id === 'exit') onBack()
                  else onNavigate('portfolio', item.id as PortfolioInitialSection)
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className={`w-full p-[2px] transition-colors duration-200 ${isActive ? 'bg-[#bd081a]' : 'bg-transparent'}`}>
                  <div className="bg-[#110e0a] overflow-hidden w-full aspect-[16/10] relative">
                    <img
                      src={item.image}
                      alt={item.label}
                      className={`w-full h-full object-cover transition-all duration-500 ${isActive ? 'opacity-90 grayscale-[20%] sepia-[30%]' : 'opacity-50 grayscale-[80%] sepia-[50%]'}`}
                    />
                    <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] pointer-events-none" />
                  </div>
                </div>

                <div className="mt-4 px-1">
                  <h2 className="font-chinese-rocks uppercase tracking-[0.08em] transition-colors duration-200"
                    style={{
                      fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
                      color: isActive ? '#e8dfc0' : '#8a7d6b',
                      textShadow: isActive ? '2px 2px 0 #000' : 'none',
                    }}>
                    {item.label}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed font-sans" style={{ color: '#6b5a48' }}>
                    {item.description}
                  </p>
                </div>
              </motion.button>
            )
          })}
        </div>

        <div className="mt-auto pt-6 w-full">
          <div className="w-full h-[1px] mb-3 bg-[#4a3e32] opacity-40" />
          <div className="flex justify-end gap-6">
            <span className="font-typewriter text-[10px] md:text-xs tracking-[0.2em] uppercase" style={{ color: '#8a7d6b' }}>
              <strong className="text-[#e8dfc0]">ENTER</strong> SELECCIONAR
            </span>
            <span className="font-typewriter text-[10px] md:text-xs tracking-[0.2em] uppercase" style={{ color: '#8a7d6b' }}>
              <strong className="text-[#e8dfc0]">ESC</strong> VOLVER
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}