'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface NavigationProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export default function Navigation({ activeSection, setActiveSection }: NavigationProps) {
  const navItems = [
    { id: 'home', label: 'WANTED', icon: '🔫' },
    { id: 'about', label: 'JOURNAL', icon: '📖' },
    { id: 'projects', label: 'BOUNTIES', icon: '📋' },
    { id: 'skills', label: 'ARSENAL', icon: '🔨' },
    { id: 'experience', label: 'TIMELINE', icon: '🚂' },
    { id: 'contact', label: 'TELEGRAPH', icon: '📡' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-md border-b-2 border-amber-900/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo/Brand */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => {
              setActiveSection('home')
              document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-red-700 to-red-900 border-2 border-amber-600 flex items-center justify-center">
              <span className="text-amber-300 font-bold text-lg">⚔</span>
            </div>
            <span className="text-amber-300 font-cinzel font-bold text-lg hidden sm:block">
              YEISON FAJARDO
            </span>
          </motion.div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setActiveSection(item.id)
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })
                }}
                className={`px-4 py-2 text-sm font-cinzel font-bold tracking-wide transition-all duration-300 ${
                  activeSection === item.id
                    ? 'text-amber-300 bg-red-900/40 border-b-2 border-amber-400'
                    : 'text-amber-100/70 hover:text-amber-300'
                }`}
              >
                {item.icon} {item.label}
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <span className="text-amber-300 text-xs">Ctrl+K</span>
          </div>
        </div>
      </div>

      {/* Animated Border Effect */}
      <motion.div
        layoutId="navbar-underline"
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-red-700 via-amber-500 to-red-700"
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 1.5 }}
      />
    </motion.nav>
  )
}
