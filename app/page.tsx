'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TitleScreen from '@/components/screens/title-screen'
import MainMenu, { type GameScreen } from '@/components/screens/main-menu'
import PortfolioMenu, { type PortfolioInitialSection } from '@/components/screens/portfolio-menu'
import LoadingScreen from '@/components/screens/loading-screen'

// Timing constants for smart loading
const LOADING_THRESHOLD_MS = 200  // Show loader only if operation takes longer than this
const MIN_LOADING_DISPLAY_MS = 2000  // Minimum time to display loader once shown

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<GameScreen>('title')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [shouldShowLoader, setShouldShowLoader] = useState(false)
  const [initialSection, setInitialSection] = useState<PortfolioInitialSection | undefined>(undefined)

  const timerRef = useRef<number | null>(null)
  const loadingStartRef = useRef<number | null>(null)
  const thresholdTimerRef = useRef<number | null>(null)

  const clearTimer = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  const clearAllTimers = useCallback(() => {
    clearTimer()
    if (thresholdTimerRef.current !== null) {
      window.clearTimeout(thresholdTimerRef.current)
      thresholdTimerRef.current = null
    }
  }, [])

  // Lógica de navegación con carga opcional
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

  const startSequence = () => {
    if (isTransitioning || isLoading) return
    setIsTransitioning(true)
    
    // Track when loading starts for smart timing
    loadingStartRef.current = Date.now()

    // 1. Small fade out from TitleScreen
    timerRef.current = window.setTimeout(() => {
      setIsLoading(true)
      setIsTransitioning(false)
      
      // 2. Set threshold timer - only show visual loader if operation takes > 200ms
      thresholdTimerRef.current = window.setTimeout(() => {
        setShouldShowLoader(true)
      }, LOADING_THRESHOLD_MS)

      // 3. Simulate world loading (your projects)
      timerRef.current = window.setTimeout(() => {
        const elapsed = Date.now() - (loadingStartRef.current ?? Date.now())
        
        // If loader was shown, ensure minimum display time
        if (shouldShowLoader && elapsed < MIN_LOADING_DISPLAY_MS) {
          const remaining = MIN_LOADING_DISPLAY_MS - elapsed
          timerRef.current = window.setTimeout(() => {
            setShouldShowLoader(false)
            setIsLoading(false)
            setCurrentScreen('main')
          }, remaining)
        } else {
          setShouldShowLoader(false)
          setIsLoading(false)
          setCurrentScreen('main')
        }
      }, 4500) // Time to see a couple sepia photos
    }, 400)
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
    const handleInput = () => {
      if (currentScreen === 'title' && !isTransitioning && !isLoading) {
        startSequence()
      }
    }

    window.addEventListener('keydown', handleInput)
    window.addEventListener('click', handleInput)
    return () => {
      window.removeEventListener('keydown', handleInput)
      window.removeEventListener('click', handleInput)
    }
  }, [currentScreen, isTransitioning, isLoading])

  useEffect(() => {
    return () => clearAllTimers()
  }, [clearAllTimers])

  return (
    <main className="fixed inset-0 bg-[#0c0a07] overflow-hidden rdr-grain">
      <AnimatePresence mode="wait">
        {/* PANTALLA DE CARGA (FOTOS SEPIA) - Only renders when threshold exceeded */}
        {isLoading && shouldShowLoader && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-[100]"
          >
            <LoadingScreen />
          </motion.div>
        )}

        {/* TITLE SCREEN */}
        {currentScreen === 'title' && !isLoading && (
          <motion.div
            key="title"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TitleScreen isTransitioning={isTransitioning} />
          </motion.div>
        )}

        {/* MENÚ PRINCIPAL */}
        {currentScreen === 'main' && !isLoading && (
          <motion.div
            key="main"
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <MainMenu
              onNavigate={(screen, section) => goToScreen(screen, section)}
              onBack={goToTitle}
            />
          </motion.div>
        )}

        {/* PORTAFOLIO / COMPENDIO */}
        {currentScreen === 'portfolio' && (
          <motion.div
            key="portfolio"
            className="absolute inset-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
            <PortfolioMenu
              onBack={goToMain}
              initialSection={initialSection}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay de atmósfera global */}
      <div className="pointer-events-none absolute inset-0 z-[90] rdr-vignette opacity-60" />
    </main>
  )
}
