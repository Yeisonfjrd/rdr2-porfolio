'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

type GameScreen = 'title' | 'main' | 'portfolio'

interface MainMenuProps {
  onNavigate: (screen: GameScreen) => void
  onBack: () => void
}

const menuItems = [
  { id: 'portfolio', label: 'PORTFOLIO', description: 'Ver mi trabajo y proyectos' },
  { id: 'online', label: 'CONTACTO', description: 'Conectar conmigo' },
  { id: 'settings', label: 'SOBRE MÍ', description: 'Conocer mi historia' },
  { id: 'exit', label: 'SALIR', description: 'Volver al inicio' },
]

export default function MainMenu({ onNavigate, onBack }: MainMenuProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const handleSelect = (id: string) => {
    if (id === 'portfolio') {
      onNavigate('portfolio')
    } else if (id === 'exit') {
      onBack()
    }
  }

  const activeIndex = hoveredIndex !== null ? hoveredIndex : selectedIndex

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #0f0e0c 0%, #1a1815 50%, #0f0e0c 100%)',
        }}
      />

      <motion.div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
      
      <div className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 200px 100px rgba(0,0,0,0.5)',
        }}
      />

      <div className="relative z-10 h-full flex">
        <div className="w-full max-w-md pl-12 md:pl-24 flex flex-col justify-center">
          <nav className="space-y-1">
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
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#cc0000]"
                    layoutId="menuIndicator"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
                
                <span 
                  className={`text-xl md:text-2xl tracking-[0.15em] transition-colors duration-200 ${
                    activeIndex === index 
                      ? 'text-[#e8dcc8]' 
                      : 'text-[#6b635a]'
                  }`}
                  style={{ fontFamily: 'Georgia, serif' }}
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
            <p className="text-[#4a453d] text-sm tracking-wider"
              style={{ fontFamily: 'Georgia, serif' }}
            >
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
            <p className="text-[#3d3a35] text-xs tracking-[0.2em] uppercase"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Navega con el cursor
            </p>
            <p className="text-[#3d3a35] text-xs tracking-[0.2em] uppercase mt-1"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Click para seleccionar
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
