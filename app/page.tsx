'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TitleScreen from '@/components/screens/title-screen'
import MainMenu, { type GameScreen } from '@/components/screens/main-menu'
import PortfolioMenu, {
  type PortfolioInitialSection,
} from '@/components/screens/portfolio-menu'

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<GameScreen>('title')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [initialSection, setInitialSection] =
  useState<PortfolioInitialSection | undefined>(undefined)

  const timerRef = useRef<number | null>(null)

  const clearTimer = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  const goToScreen = (screen: GameScreen, section?: PortfolioInitialSection) => {
    if (isTransitioning) return
    clearTimer()
    setIsTransitioning(true)
    setInitialSection(section)

    timerRef.current = window.setTimeout(() => {
      setCurrentScreen(screen)
      setIsTransitioning(false)
      timerRef.current = null
    }, 300)
  }

  const goToMain = () => {
    if (isTransitioning) return
    clearTimer()
    setIsTransitioning(true)

    timerRef.current = window.setTimeout(() => {
      setCurrentScreen('main')
      setIsTransitioning(false)
      timerRef.current = null
    }, 220)
  }

  const goToTitle = () => {
    if (isTransitioning) return
    clearTimer()
    setIsTransitioning(true)

    timerRef.current = window.setTimeout(() => {
      setCurrentScreen('title')
      setIsTransitioning(false)
      timerRef.current = null
    }, 220)
  }

  useEffect(() => {
    const advance = () => {
      if (currentScreen !== 'title' || isTransitioning) return
      goToMain()
    }

    window.addEventListener('keydown', advance)
    window.addEventListener('click', advance)

    return () => {
      window.removeEventListener('keydown', advance)
      window.removeEventListener('click', advance)
    }
  }, [currentScreen, isTransitioning])

  useEffect(() => {
    return () => clearTimer()
  }, [])

  const handleNavigate = (screen: GameScreen, section?: PortfolioInitialSection) => {
    goToScreen(screen, section)
  }

  return (
    <div className="fixed inset-0 bg-[#0c0a07] overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        {currentScreen === 'title' && (
          <motion.div
            key="title"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <TitleScreen isTransitioning={isTransitioning} />
          </motion.div>
        )}

        {currentScreen === 'main' && (
          <motion.div
            key="main"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <MainMenu
              onNavigate={handleNavigate}
              onBack={goToTitle}
            />
          </motion.div>
        )}

        {currentScreen === 'portfolio' && (
          <motion.div
            key="portfolio"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <PortfolioMenu
              onBack={goToMain}
              initialSection={initialSection}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}