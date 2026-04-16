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
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Wanted Poster Background */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/20 via-transparent to-slate-950" />
      </motion.div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? 'visible' : 'hidden'}
        className="relative z-10 text-center max-w-4xl px-4"
      >
        {/* "WANTED" Text */}
        <motion.div variants={itemVariants} className="mb-8">
          <motion.h1
            className="text-7xl sm:text-8xl font-cinzel font-black tracking-widest text-amber-300 drop-shadow-2xl"
            animate={{
              textShadow: [
                '0 0 10px rgba(253, 224, 71, 0.5)',
                '0 0 20px rgba(253, 224, 71, 0.8)',
                '0 0 10px rgba(253, 224, 71, 0.5)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            WANTED
          </motion.h1>
          <motion.div
            className="h-1 w-32 bg-gradient-to-r from-red-700 via-amber-500 to-red-700 mx-auto mt-4"
            animate={{ scaleX: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>

        {/* Portrait Placeholder */}
        <motion.div
          variants={itemVariants}
          className="mb-8 flex justify-center"
        >
          <div className="relative w-48 h-56 sm:w-64 sm:h-80">
            <div className="absolute inset-0 border-4 border-amber-900 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 flex items-center justify-center overflow-hidden">
              {/* Placeholder Image with Film Effect */}
              <div className="w-full h-full bg-gradient-to-br from-amber-900/40 via-slate-800 to-slate-950 flex items-center justify-center relative">
                <motion.div
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="text-6xl"
                >
                  📸
                </motion.div>
                {/* Film burn effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent opacity-30" />
              </div>
            </div>
            <motion.div
              className="absolute -top-2 -left-2 w-6 h-6 bg-amber-600"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute -bottom-2 -right-2 w-6 h-6 bg-amber-600"
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        </motion.div>

        {/* Name & Title */}
        <motion.div variants={itemVariants} className="mb-6">
          <h2 className="text-4xl sm:text-5xl font-cinzel font-bold text-amber-100 mb-3 drop-shadow-lg">
            YEISON FAJARDO
          </h2>
          <p className="text-xl sm:text-2xl font-caveat text-amber-300 italic">
            &quot;A Developer Worth Every Dollar&quot;
          </p>
        </motion.div>

        {/* Description */}
        <motion.div variants={itemVariants} className="mb-8">
          <p className="text-amber-100/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Full Stack Developer | 3 Years Experience | TypeScript Specialist
          </p>
          <p className="text-amber-100/60 text-sm sm:text-base mt-3">
            Available for work • Specialized in Web Architecture & Scalable Solutions
          </p>
        </motion.div>

        {/* Reward Amount */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="inline-block border-2 border-amber-600 px-8 py-4 bg-slate-900/50 backdrop-blur">
            <p className="text-amber-300 font-cinzel font-bold text-xl">REWARD</p>
            <p className="text-amber-400 font-caveat text-3xl">Hire Me!</p>
          </div>
        </motion.div>

        {/* Action Button */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(189, 8, 26, 0.6)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              onEnter?.()
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="px-8 py-3 bg-red-700 hover:bg-red-800 text-amber-100 font-cinzel font-bold tracking-widest border-2 border-red-600 transition-all duration-300 shadow-lg hover:shadow-red-700/50"
          >
            ENTER THE FRONTIER
          </motion.button>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-amber-700/30 hover:bg-amber-700/50 text-amber-300 font-cinzel font-bold tracking-widest border-2 border-amber-600 transition-all duration-300"
          >
            SEND TELEGRAPH
          </motion.a>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute top-20 left-10 text-4xl opacity-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          ⭐
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-10 text-4xl opacity-20"
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          ⭐
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="text-amber-400 text-center">
          <p className="text-sm font-cinzel mb-2">SCROLL TO CONTINUE</p>
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-2xl"
          >
            ⬇
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
