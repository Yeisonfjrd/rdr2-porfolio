'use client'

import { motion } from 'framer-motion'

interface TitleScreenProps {
  isTransitioning: boolean
}

export default function TitleScreen({ isTransitioning }: TitleScreenProps) {
  return (
    <div className="relative w-full h-full overflow-hidden bg-black">
      <img 
        src="https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3cHlsaHZwMXQ4MGx3N25vczgxMnJvaHhsbmdibmRsOG9rYmF3OWZ3dSZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/QBRyW84AWxZBpqhf51/giphy.gif"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'brightness(0.9) saturate(0.9)' }}
      />

      <div className="absolute top-0 left-0 right-0 h-[12%] bg-black z-20" />
      <div className="absolute bottom-0 left-0 right-0 h-[12%] bg-black z-20" />

      <motion.div 
        className="absolute inset-0 pointer-events-none z-10"
        animate={{ opacity: [0.02, 0.04, 0.02] }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 h-full flex flex-col items-center justify-center">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        >
          <h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-[0.2em] text-white"
            style={{
              textShadow: '0 2px 10px rgba(0,0,0,0.9), 0 0 30px rgba(0,0,0,0.7)',
              fontFamily: '"Times New Roman", Georgia, serif',
              fontWeight: 400,
              letterSpacing: '0.12em',
            }}
          >
            YEISON FAJARDO
          </h1>
        </motion.div>

        <motion.div
          className="absolute bottom-[16%]"
          initial={{ opacity: 0 }}
          animate={{ opacity: isTransitioning ? 0 : [0.3, 0.8, 0.3] }}
          transition={{ 
            duration: 2.5, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <p 
            className="text-white/80 text-xs md:text-sm tracking-[0.4em] uppercase"
            style={{ 
              fontFamily: '"Times New Roman", Georgia, serif',
              fontWeight: 300,
            }}
          >
            Pulsa cualquier tecla
          </p>
        </motion.div>
      </div>

      <motion.div
        className="absolute inset-0 bg-black pointer-events-none z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: isTransitioning ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      />
    </div>
  )
}
