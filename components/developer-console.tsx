'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface ConsoleStat {
  label: string
  value: string
  icon: string
}

interface DeveloperConsoleProps {
  onClose: () => void
}

export default function DeveloperConsole({ onClose }: DeveloperConsoleProps) {
  const [stats, setStats] = useState<ConsoleStat[]>([])

  useEffect(() => {
    // Get dynamic stats
    const uptime = Math.floor(Math.random() * 100) + 1 // Random percentage
    const portfolio = {
      projects: 3,
      skills: 15,
      yearsExp: 3,
      codeLines: '50K+',
      coffeeCups: Math.floor(Math.random() * 1000) + 500,
    }

    setStats([
      { label: 'System Status', value: 'OPERATIONAL', icon: '🟢' },
      { label: 'Projects Active', value: portfolio.projects.toString(), icon: '📁' },
      { label: 'Skills Loaded', value: portfolio.skills.toString(), icon: '⚙️' },
      { label: 'Experience', value: `${portfolio.yearsExp}y`, icon: '📊' },
      { label: 'Code Written', value: portfolio.codeLines, icon: '💻' },
                  { label: 'Coffee Consumed', value: `${portfolio.coffeeCups}c`, icon: '☕' },
      { label: 'System Load', value: `${uptime}%`, icon: '📈' },
      { label: 'Performance', value: 'A+', icon: '⭐' },
    ])
  }, [])

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-slate-950 border-2 border-green-600/50 rounded-sm overflow-hidden shadow-2xl shadow-green-600/50"
      >
        {/* Console Header */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 border-b-2 border-green-600/30 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-3 h-3 rounded-full bg-green-500"
            />
            <h2 className="text-lg font-cinzel font-bold text-green-400">
              DEVELOPER CONSOLE
            </h2>
            <span className="text-xs text-green-600/70 font-mono">v2.0.1</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="text-green-400 hover:text-green-300 text-xl"
          >
            ✕
          </motion.button>
        </div>

        {/* Console Body */}
        <div className="p-6 bg-slate-950/80 backdrop-blur max-h-96 overflow-y-auto font-mono text-sm">
          {/* Boot Message */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <p className="text-green-600 mb-4">
              <span className="text-green-500">$</span> _yeison_dev_console --init
            </p>

            <div className="space-y-2 mb-6 text-green-400/80">
              <p>{'>'}  Initializing portfolio system...</p>
              <p>{'>'}  Loading developer profile...</p>
              <p>{'>'}  Checking system resources...</p>
              <p className="text-green-500">{'>'} System ready. Type "help" for commands.</p>
            </div>

            {/* Divider */}
            <div className="border-t border-green-600/30 my-4" />

            {/* System Stats */}
            <motion.div variants={containerVariants} className="space-y-3 mb-6">
              <p className="text-green-400 mb-4">
                <span className="text-green-500">$</span> system --stats
              </p>

              <motion.div
                variants={containerVariants}
                className="grid grid-cols-2 gap-3"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="p-2 bg-green-950/40 border border-green-600/30 rounded text-xs"
                  >
                    <p className="text-green-500">{stat.icon} {stat.label}</p>
                    <p className="text-green-400 font-bold">→ {stat.value}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Divider */}
            <div className="border-t border-green-600/30 my-4" />

            {/* Available Commands */}
            <motion.div variants={itemVariants} className="space-y-2">
              <p className="text-green-400 mb-3">
                <span className="text-green-500">$</span> help
              </p>

              <div className="space-y-1 text-green-600/80 text-xs">
                <p>
                  <span className="text-green-500">•</span> portfolio --view
                </p>
                <p>
                  <span className="text-green-500">•</span> skills --list
                </p>
                <p>
                  <span className="text-green-500">•</span> contact --email
                </p>
                <p>
                  <span className="text-green-500">•</span> projects --all
                </p>
                <p>
                  <span className="text-green-500">•</span> about --developer
                </p>
                <p>
                  <span className="text-green-500">•</span> exit
                </p>
              </div>
            </motion.div>

            {/* Divider */}
            <div className="border-t border-green-600/30 my-4" />

            {/* Developer Info */}
            <motion.div variants={itemVariants} className="space-y-1 text-green-600/80 text-xs">
              <p>
                <span className="text-green-500">Developer:</span> Yeison Fajardo
              </p>
              <p>
                <span className="text-green-500">Role:</span> Full Stack Developer
              </p>
              <p>
                <span className="text-green-500">Status:</span>{' '}
                <span className="text-green-400">Available for Hire</span>
              </p>
              <p>
                <span className="text-green-500">Last Update:</span> 2026-04-16
              </p>
            </motion.div>

            {/* Cursor */}
            <motion.div
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="text-green-400 mt-4 inline-block"
            >
              <span className="text-green-500">$</span> _
            </motion.div>
          </motion.div>
        </div>

        {/* Console Footer */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 border-t-2 border-green-600/30 px-6 py-3 text-xs text-green-600/70 flex items-center justify-between">
          <p>Press Ctrl+K to toggle console • Type "exit" to close</p>
          <p>Connection: STABLE 🟢</p>
        </div>
      </motion.div>
    </motion.div>
  )
}
