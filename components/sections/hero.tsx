'use client'

import { motion } from 'framer-motion'

interface HeroProps {
  onNavigate: (section: string) => void
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[#bb0000] text-sm tracking-widest mb-4">
            DESARROLLADOR FULL STACK
          </p>
          
          <h1 className="text-[#dcc09a] text-5xl font-medium leading-tight mb-6">
            Yeison Fajardo
          </h1>
          
          <p className="text-[#7a7d77] text-lg leading-relaxed mb-8">
            Especializado en crear aplicaciones web modernas y escalables. 
            Con 3 anos de experiencia en desarrollo frontend y backend, 
            transformo ideas en soluciones digitales efectivas.
          </p>

          <div className="flex gap-4">
            <motion.button
              onClick={() => onNavigate('proyectos')}
              className="px-6 py-3 bg-[#bb0000] text-[#dcc09a] text-sm tracking-wider hover:bg-[#8a0000] transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              VER PROYECTOS
            </motion.button>
            
            <motion.button
              onClick={() => onNavigate('contacto')}
              className="px-6 py-3 border border-[#3a3529] text-[#dcc09a] text-sm tracking-wider hover:bg-[#28251c] transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              CONTACTAR
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 pt-8 border-t border-[#3a3529]"
        >
          <div className="grid grid-cols-3 gap-8">
            <div>
              <p className="text-[#bb0000] text-2xl font-medium">3+</p>
              <p className="text-[#7a7d77] text-sm mt-1">Anos de experiencia</p>
            </div>
            <div>
              <p className="text-[#bb0000] text-2xl font-medium">15+</p>
              <p className="text-[#7a7d77] text-sm mt-1">Proyectos completados</p>
            </div>
            <div>
              <p className="text-[#bb0000] text-2xl font-medium">10+</p>
              <p className="text-[#7a7d77] text-sm mt-1">Tecnologias dominadas</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
