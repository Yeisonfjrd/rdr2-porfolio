'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from '@/components/navigation'
import Hero from '@/components/sections/hero'
import About from '@/components/sections/about'
import Projects from '@/components/sections/projects'
import Skills from '@/components/sections/skills'
import Experience from '@/components/sections/experience'
import Contact from '@/components/sections/contact'

export default function Home() {
  const [activeSection, setActiveSection] = useState('inicio')

  const renderSection = () => {
    switch (activeSection) {
      case 'inicio':
        return <Hero onNavigate={setActiveSection} />
      case 'sobre-mi':
        return <About />
      case 'proyectos':
        return <Projects />
      case 'habilidades':
        return <Skills />
      case 'experiencia':
        return <Experience />
      case 'contacto':
        return <Contact />
      default:
        return <Hero onNavigate={setActiveSection} />
    }
  }

  return (
    <div className="min-h-screen bg-[#1e1b14] flex">
      <Navigation 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />
      
      <main className="flex-1 ml-64">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="min-h-screen"
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
