'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TitleScreen from '@/components/screens/title-screen'
import MainMenu from '@/components/screens/main-menu'
import PortfolioMenu from '@/components/screens/portfolio-menu'

type GameScreen = 'title' | 'main' | 'portfolio'

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<GameScreen>('title')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [initialSection, setInitialSection] = useState<string | undefined>(undefined)
  const lastScrollTime = useRef(0)

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (currentScreen === 'title' && !isTransitioning) {
        setIsTransitioning(true)
        setTimeout(() => {
          setCurrentScreen('main')
          setIsTransitioning(false)
        }, 800)
      }
    }

    const handleClick = () => {
      if (currentScreen === 'title' && !isTransitioning) {
        setIsTransitioning(true)
        setTimeout(() => {
          setCurrentScreen('main')
          setIsTransitioning(false)
        }, 800)
      }
    }

    if (currentScreen === 'title') {
      window.addEventListener('keydown', handleKeyPress)
      window.addEventListener('click', handleClick)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
      window.removeEventListener('click', handleClick)
    }
  }, [currentScreen, isTransitioning])

  const handleNavigate = (screen: GameScreen, section?: string) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setInitialSection(section)
    setTimeout(() => {
      setCurrentScreen(screen)
      setIsTransitioning(false)
    }, 500)
  }

  const handleBack = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      if (currentScreen === 'portfolio') {
        setCurrentScreen('main')
      } else if (currentScreen === 'main') {
        setCurrentScreen('title')
      }
      setIsTransitioning(false)
    }, 500)
  }

  return (
    <div className="fixed inset-0 bg-[#0a0908] overflow-hidden">
      <AnimatePresence mode="wait">
        {currentScreen === 'title' && (
          <motion.div
            key="title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <TitleScreen isTransitioning={isTransitioning} />
          </motion.div>
        )}

        {currentScreen === 'main' && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <MainMenu 
              onNavigate={handleNavigate} 
              onBack={handleBack}
            />
          </motion.div>
        )}

        {currentScreen === 'portfolio' && (
          <motion.div
            key="portfolio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <PortfolioMenu onBack={handleBack} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
