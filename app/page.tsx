'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TitleScreen from '@/components/screens/title-screen'
import MainMenu, { type GameScreen } from '@/components/screens/main-menu'
import PortfolioMenu, { type PortfolioInitialSection } from '@/components/screens/portfolio-menu'
import LoadingScreen from '@/components/screens/loading-screen' // Asegúrate de tener este import

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<GameScreen>('title')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isLoading, setIsLoading] = useState(false) // Nuevo estado para la carga cinematográfica
  const [initialSection, setInitialSection] = useState<PortfolioInitialSection | undefined>(undefined)

  const timerRef = useRef<number | null>(null)

  const clearTimer = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

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

    // 1. Pequeño fade out del TitleScreen
    timerRef.current = window.setTimeout(() => {
      setIsLoading(true) // 2. Activamos la pantalla de carga de fotos
      setIsTransitioning(false)

      // 3. Simulamos la carga del "mundo" (tus proyectos)
      timerRef.current = window.setTimeout(() => {
        setIsLoading(false)
        setCurrentScreen('main')
      }, 4500) // Tiempo suficiente para ver un par de fotos sepia
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
    return () => clearTimer()
  }, [])

  return (
    <main className="fixed inset-0 bg-[#0c0a07] overflow-hidden rdr-grain">
      <AnimatePresence mode="wait">
        {/* PANTALLA DE CARGA (FOTOS SEPIA) */}
        {isLoading && (
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