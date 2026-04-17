'use client'

import { motion } from 'framer-motion'

interface TitleScreenProps {
  isTransitioning: boolean
}

export default function TitleScreen({ isTransitioning }: TitleScreenProps) {
  return (
    <div className="rdr-cinematic-bars relative w-full h-full overflow-hidden bg-black">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=2200&q=80"
      >
        <source
          src="https://cdn.coverr.co/videos/coverr-horses-in-a-field-1560/1080p.mp4"
          type="video/mp4"
        />
      </video>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(210,146,80,0.12)_0%,rgba(0,0,0,0.76)_72%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-black/80" />

      <motion.div
        className="rdr-grain absolute inset-0 pointer-events-none z-10"
        animate={{ opacity: [0.02, 0.06, 0.02] }}
        transition={{ duration: 2.6, repeat: Infinity }}
      />

      <div className="rdr-vignette absolute inset-0 pointer-events-none" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.25 }}
        >
          <h1 
            className="font-western text-5xl md:text-7xl lg:text-8xl tracking-[0.1em] text-[#f5f0e5]"
            style={{
              textShadow: '0 2px 10px rgba(0,0,0,0.9), 0 0 28px rgba(0,0,0,0.7)',
            }}
          >
            YEISON FAJARDO
          </h1>
          <p className="font-typewriter mt-5 text-[11px] md:text-xs uppercase tracking-[0.44em] text-[#dfc89f]/85">
            Full Stack Developer
          </p>
        </motion.div>

        <motion.div
          className="absolute bottom-[16%] text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isTransitioning ? 0 : [0.3, 0.8, 0.3] }}
          transition={{ 
            duration: 2.5, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <p 
            className="font-typewriter text-[#f2e5cb]/80 text-[10px] md:text-xs tracking-[0.4em] uppercase"
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
