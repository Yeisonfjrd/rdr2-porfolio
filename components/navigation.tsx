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
    { id: 'projects', label: 'BOUNTIES', icon: '💼' },
    { id: 'skills', label: 'ARSENAL', icon: '⚒️' },
    { id: 'experience', label: 'TIMELINE', icon: '🚂' },
    { id: 'contact', label: 'TELEGRAPH', icon: '📮' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-slate-950/98 via-slate-950/95 to-slate-950/90 backdrop-blur-sm border-b-2 border-red-900/40 shadow-2xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo/Brand - Sheriff Star */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => {
              setActiveSection('home')
              document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-800 border-2 border-red-900 flex items-center justify-center sheriff-star">
              <span className="text-red-900 font-bold">★</span>
            </div>
            <span className="text-amber-100 font-cinzel font-bold text-xs sm:text-sm hidden sm:block tracking-widest">
              YEISON FAJARDO
            </span>
          </motion.div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center gap-0.5">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{
                  scale: 1.08,
                  textShadow: '0 0 10px rgba(189, 8, 26, 0.8)',
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setActiveSection(item.id)
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })
                }}
                className={`px-3 py-2 text-xs sm:text-sm font-cinzel font-bold tracking-widest transition-all duration-300 border-b-2 ${
                  activeSection === item.id
                    ? 'text-amber-100 bg-red-900/50 border-b-red-700 shadow-lg shadow-red-900/30'
                    : 'text-amber-100/60 hover:text-amber-100 border-b-transparent hover:bg-red-900/20'
                }`}
              >
                <span className="hidden sm:inline">{item.icon}</span> {item.label}
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <span className="text-amber-100/50 text-xs font-cinzel">Ctrl+K</span>
          </div>
        </div>
      </div>

      {/* Animated Top Border - Blood Red */ }
      <motion.div
        className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-red-900 to-transparent"
        initial={{ width: '0%' }}
        animate={{ width: '100%' }}
        transition={{ duration: 1.5 }}
      />
    </motion.nav>
  )
}
