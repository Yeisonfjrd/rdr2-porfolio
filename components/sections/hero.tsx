'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface HeroProps {
  onEnter?: () => void
}

export default function Hero({ onEnter }: HeroProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  }

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12">
      {/* Background: Snowy Pine Forest with Mist (RDR2 aesthetic) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950" />
        
        {/* Atmospheric mist and fog */}
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-slate-700/40 via-transparent to-transparent" />
        </motion.div>

        {/* Pine trees silhouettes */}
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 opacity-30">
          <svg viewBox="0 0 200 400" className="w-full h-full fill-slate-950">
            <polygon points="100,0 0,200 60,200 0,320 100,320" />
            <polygon points="150,50 80,200 110,200 60,320 150,320" />
          </svg>
        </div>
        <div className="absolute bottom-0 right-0 w-1/3 h-1/2 opacity-30 scale-x-[-1]">
          <svg viewBox="0 0 200 400" className="w-full h-full fill-slate-950">
            <polygon points="100,0 0,200 60,200 0,320 100,320" />
            <polygon points="150,50 80,200 110,200 60,320 150,320" />
          </svg>
        </div>
      </div>

      {/* Main Content - Wanted Poster */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? 'visible' : 'hidden'}
        className="relative z-10 max-w-2xl mx-auto px-4"
      >
        {/* Outer shadow/perspective frame */}
        <motion.div
          className="p-8"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* WANTED Poster - Paper texture */}
          <div className="wanted-poster paper-texture p-0 relative">
            {/* Metal pins at corners */}
            <motion.div className="metal-pin -top-2 -left-2" />
            <motion.div className="metal-pin -top-2 -right-2" />
            <motion.div className="metal-pin -bottom-2 -left-2" />
            <motion.div className="metal-pin -bottom-2 -right-2" />

            <div className="p-8 sm:p-12">
              {/* "WANTED" Distressed Title */}
              <motion.div variants={itemVariants} className="mb-6">
                <motion.h1
                  className="text-6xl sm:text-7xl font-cinzel font-black tracking-widest text-center text-red-900 drop-shadow-lg glow-red relative"
                  style={{
                    textShadow: '2px 2px 0px rgba(0,0,0,0.3), 3px 3px 0px rgba(189, 8, 26, 0.5)',
                  }}
                  animate={{
                    scale: [1, 1.02, 1],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  WANTED
                </motion.h1>
                {/* Decorative line */}
                <motion.div
                  className="h-1 w-2/3 mx-auto mt-4 bg-gradient-to-r from-transparent via-red-900 to-transparent"
                  animate={{ scaleX: [0.8, 1, 0.8] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </motion.div>

              {/* Bounty Portrait */}
              <motion.div variants={itemVariants} className="mb-8 flex justify-center">
                <div className="relative w-48 h-64 sm:w-56 sm:h-72">
                  {/* Sepia-toned photograph frame */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-900 via-yellow-800 to-amber-950 border-2 border-amber-700 shadow-inner">
                    {/* Sepia photo effect */}
                    <div className="w-full h-full bg-gradient-to-br from-amber-100/40 via-yellow-900/20 to-amber-900/40 flex items-center justify-center relative overflow-hidden">
                      {/* Portrait placeholder with sepia color */}
                      <motion.div
                        animate={{ opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 5, repeat: Infinity }}
                        className="text-7xl sepia-[80%]"
                      >
                        🤠
                      </motion.div>

                      {/* Worn/scratched effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/5 to-transparent opacity-40" />
                    </div>
                  </div>

                  {/* Torn edges effect */}
                  <div className="absolute -top-1 -left-1 w-8 h-8 border-l-4 border-t-4 border-amber-900 opacity-40" />
                  <div className="absolute -top-1 -right-1 w-8 h-8 border-r-4 border-t-4 border-amber-900 opacity-40" />
                  <div className="absolute -bottom-1 -left-1 w-8 h-8 border-l-4 border-b-4 border-amber-900 opacity-40" />
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 border-r-4 border-b-4 border-amber-900 opacity-40" />

                  {/* Bullet holes */}
                  <motion.div className="bullet-hole absolute top-10 left-8 animate-pulse" />
                  <motion.div className="bullet-hole absolute bottom-16 right-12 animate-pulse" />
                </div>
              </motion.div>

              {/* Name - Bold serif uppercase */}
              <motion.div variants={itemVariants} className="text-center mb-4">
                <h2 className="text-3xl sm:text-4xl font-cinzel font-black text-amber-900 tracking-widest">
                  YEISON FAJARDO
                </h2>
                <div className="h-0.5 w-1/2 mx-auto bg-gradient-to-r from-transparent via-amber-800 to-transparent mt-3" />
              </motion.div>

              {/* Tagline in cursive */}
              <motion.div variants={itemVariants} className="mb-6 text-center">
                <p className="text-lg sm:text-xl font-caveat text-amber-900 italic tracking-wide">
                  &quot;Code Outlaw • Architecture Gunslinger&quot;
                </p>
              </motion.div>

              {/* Details / Description */}
              <motion.div variants={itemVariants} className="mb-6 space-y-2 text-center text-sm text-amber-950/80 font-caveat">
                <p>Full Stack Developer | 3 Years in the Code Frontier</p>
                <p>Known for: TypeScript Mastery, Scalable Web Architecture</p>
                <p>Last Seen: Building Digital Empires</p>
              </motion.div>

              {/* REWARD box */}
              <motion.div variants={itemVariants} className="mb-8 text-center">
                <div className="inline-block border-3 border-red-900 px-6 py-3 bg-yellow-50/30 backdrop-blur-sm">
                  <p className="font-cinzel font-bold text-red-900 tracking-widest">REWARD FOR CAPTURE</p>
                  <p className="text-amber-900 text-xl font-cinzel mt-1">💼 HIRE ME 💼</p>
                </div>
              </motion.div>

              {/* Action Buttons - RDR2 Style */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 0 20px rgba(189, 8, 26, 0.8)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    onEnter?.()
                    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="px-6 py-2 bg-red-900 hover:bg-red-950 text-yellow-50 font-cinzel font-bold tracking-widest border-3 border-red-700 transition-all duration-300 shadow-lg hover:shadow-red-900/50 text-sm sm:text-base"
                >
                  ENTER THE FRONTIER
                </motion.button>

                <motion.a
                  href="#contact"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 0 20px rgba(254, 172, 1, 0.6)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-amber-800/50 hover:bg-amber-800/70 text-yellow-100 font-cinzel font-bold tracking-widest border-3 border-amber-700 transition-all duration-300 text-sm sm:text-base"
                >
                  SEND TELEGRAPH
                </motion.a>
              </motion.div>

              {/* Sheriff Star Decorations */}
              <motion.div
                className="absolute -top-6 left-1/2 -translate-x-1/2 w-10 h-10 bg-amber-700 sheriff-star opacity-70"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <div className="text-center">
          <p className="text-xs sm:text-sm font-cinzel text-amber-700/70 mb-2 tracking-widest">SCROLL TO CONTINUE</p>
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-2xl text-amber-700/70"
          >
            ↓
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
