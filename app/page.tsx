'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

// Component Sections
import Hero from '@/components/sections/hero'
import About from '@/components/sections/about'
import Projects from '@/components/sections/projects'
import Skills from '@/components/sections/skills'
import Experience from '@/components/sections/experience'
import Contact from '@/components/sections/contact'
import Navigation from '@/components/navigation'
import DeveloperConsole from '@/components/developer-console'

export default function Home() {
  const [showConsole, setShowConsole] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  // Developer Console Hotkey (K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setShowConsole(!showConsole)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [showConsole])

  return (
    <>
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main className="relative min-h-screen bg-slate-950 text-amber-50">
        {/* Ambient Background Elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-red-900/10 blur-3xl rounded-full opacity-40" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-900/10 blur-3xl rounded-full opacity-40" />
        </div>

        {/* Content Sections */}
        <div className="relative z-10">
          <section id="home" className="min-h-screen flex items-center">
            <Hero onEnter={() => setActiveSection('about')} />
          </section>

          <section id="about" className="min-h-screen py-20">
            <About />
          </section>

          <section id="projects" className="min-h-screen py-20">
            <Projects />
          </section>

          <section id="skills" className="min-h-screen py-20">
            <Skills />
          </section>

          <section id="experience" className="min-h-screen py-20">
            <Experience />
          </section>

          <section id="contact" className="min-h-screen py-20">
            <Contact />
          </section>
        </div>

        {/* Footer */}
        <footer className="relative z-10 bg-slate-900/50 border-t border-amber-900/30 text-center py-8">
          <p className="text-amber-100/70 text-sm">
            Last seen in Buenos Aires – 1899 | Built with Next.js & Framer Motion
          </p>
          <p className="text-amber-100/50 text-xs mt-2">
            © 2026 Yeison Fajardo. All rights reserved.
          </p>
        </footer>
      </main>

      {/* Developer Console */}
      <AnimatePresence>
        {showConsole && <DeveloperConsole onClose={() => setShowConsole(false)} />}
      </AnimatePresence>
    </>
  )
}
