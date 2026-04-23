'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TitleScreen from '@/components/screens/title-screen'
import MainMenu from '@/components/screens/main-menu'
import PortfolioMenu, {
  type PortfolioInitialSection,
} from '@/components/screens/portfolio-menu'

type GameScreen = 'title' | 'main' | 'portfolio'

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<GameScreen>('title')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [initialSection, setInitialSection] =
    useState<PortfolioInitialSection | undefined>(undefined)

  const transitionTimerRef = useRef<number | null>(null)

  const clearTransitionTimer = () => {
    if (transitionTimerRef.current !== null) {
      window.clearTimeout(transitionTimerRef.current)
      transitionTimerRef.current = null
    }
  }

  const goToScreen = (
    screen: GameScreen,
    section?: PortfolioInitialSection
  ) => {
    if (isTransitioning) return

    clearTransitionTimer()
    setIsTransitioning(true)
    setInitialSection(section)

    transitionTimerRef.current = window.setTimeout(() => {
      setCurrentScreen(screen)
      setIsTransitioning(false)
      transitionTimerRef.current = null
    }, 320)
  }

  useEffect(() => {
    const handleKeyPress = () => {
      if (currentScreen === 'title' && !isTransitioning) {
        goToScreen('main')
      }
    }

    const handleClick = () => {
      if (currentScreen === 'title' && !isTransitioning) {
        goToScreen('main')
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

  useEffect(() => {
    return () => {
      clearTransitionTimer()
    }
  }, [])

  const handleNavigate = (
    screen: GameScreen,
    section?: PortfolioInitialSection
  ) => {
    goToScreen(screen, section)
  }

  const handleBack = () => {
    if (isTransitioning) return

    clearTransitionTimer()
    setIsTransitioning(true)

    transitionTimerRef.current = window.setTimeout(() => {
      if (currentScreen === 'portfolio') {
        setCurrentScreen('main')
      } else if (currentScreen === 'main') {
        setCurrentScreen('title')
      }
      setIsTransitioning(false)
      transitionTimerRef.current = null
    }, 240)
  }

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#020002]">
      <AnimatePresence mode="wait" initial={false}>
        {currentScreen === 'title' && (
          <motion.div
            key="title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <TitleScreen isTransitioning={isTransitioning} />
          </motion.div>
        )}

        {currentScreen === 'main' && (
          <motion.div
            key="main"
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.01 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <MainMenu onNavigate={handleNavigate} onBack={handleBack} />
          </motion.div>
        )}

        {currentScreen === 'portfolio' && (
          <motion.div
            key="portfolio"
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.01 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <PortfolioMenu
              onBack={handleBack}
              initialSection={initialSection}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}