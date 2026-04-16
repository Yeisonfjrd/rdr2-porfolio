'use client'

import { motion } from 'framer-motion'

interface NavigationProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

const menuItems = [
  { id: 'inicio', label: 'INICIO' },
  { id: 'sobre-mi', label: 'SOBRE MI' },
  { id: 'proyectos', label: 'PROYECTOS' },
  { id: 'habilidades', label: 'HABILIDADES' },
  { id: 'experiencia', label: 'EXPERIENCIA' },
  { id: 'contacto', label: 'CONTACTO' },
]

export default function Navigation({ activeSection, setActiveSection }: NavigationProps) {
  return (
    <nav className="fixed left-0 top-0 h-screen w-64 bg-[#28251c] border-r border-[#3a3529] flex flex-col z-50">
      <div className="p-6 border-b border-[#3a3529]">
        <h1 className="text-[#dcc09a] text-lg font-medium tracking-wide">
          YEISON FAJARDO
        </h1>
        <p className="text-[#7a7d77] text-sm mt-1">
          Desarrollador Full Stack
        </p>
      </div>

      <div className="flex-1 py-4">
        {menuItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`w-full text-left px-6 py-3 text-sm tracking-wider transition-all duration-200 relative ${
              activeSection === item.id
                ? 'text-[#dcc09a] bg-[#3a3529]'
                : 'text-[#7a7d77] hover:text-[#dcc09a] hover:bg-[#2f2c23]'
            }`}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            {activeSection === item.id && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute left-0 top-0 bottom-0 w-1 bg-[#bb0000]"
                initial={false}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
            {item.label}
          </motion.button>
        ))}
      </div>

      <div className="p-6 border-t border-[#3a3529]">
        <div className="flex gap-4">
          <a
            href="https://github.com/Yeisonfjrd"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#7a7d77] hover:text-[#dcc09a] transition-colors text-sm"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/yeison-fajardo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#7a7d77] hover:text-[#dcc09a] transition-colors text-sm"
          >
            LinkedIn
          </a>
        </div>
        <p className="text-[#7a7d77] text-xs mt-4">
          2026 Todos los derechos reservados
        </p>
      </div>
    </nav>
  )
}
