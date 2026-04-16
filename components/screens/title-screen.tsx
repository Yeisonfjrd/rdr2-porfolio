'use client'

import { motion } from 'framer-motion'

interface TitleScreenProps {
  isTransitioning: boolean
}

export default function TitleScreen({ isTransitioning }: TitleScreenProps) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `
            linear-gradient(to bottom, 
              rgba(10, 9, 8, 0.3) 0%, 
              rgba(10, 9, 8, 0.1) 30%,
              rgba(10, 9, 8, 0.1) 70%,
              rgba(10, 9, 8, 0.8) 100%
            ),
            url('/landscape.jpg')
          `,
          filter: 'sepia(20%) saturate(80%)',
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

      <motion.div 
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: [0.02, 0.05, 0.02] }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 h-full flex flex-col items-center justify-between py-16">
        <motion.div 
          className="mt-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold tracking-[0.2em] text-[#c4a882]"
            style={{
              textShadow: '0 4px 20px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.5)',
              fontFamily: 'Georgia, serif',
              letterSpacing: '0.15em',
            }}
          >
            YEISON FAJARDO
          </h1>
          <motion.div 
            className="h-[2px] bg-gradient-to-r from-transparent via-[#8b7355] to-transparent mt-4"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
          />
          <motion.p 
            className="text-center text-[#8b7d6b] text-lg tracking-[0.3em] mt-3 uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Desarrollador Full Stack
          </motion.p>
        </motion.div>

        <div className="flex-1" />

        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: isTransitioning ? 0 : [0.4, 1, 0.4] }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <p 
            className="text-[#a09080] text-sm tracking-[0.4em] uppercase"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Pulsa cualquier tecla
          </p>
        </motion.div>
      </div>

      <motion.div
        className="absolute inset-0 bg-black pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isTransitioning ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      />
    </div>
  )
}
