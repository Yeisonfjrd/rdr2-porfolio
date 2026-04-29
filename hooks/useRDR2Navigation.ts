'use client'

import { useEffect, useCallback } from 'react'

interface UseRDR2NavigationOptions {
  onBack?: () => void
  onSelect?: () => void
  onArrowLeft?: () => void
  onArrowRight?: () => void
  onArrowUp?: () => void
  onArrowDown?: () => void
  enabled?: boolean
}

/**
 * Centralized keyboard navigation hook for RDR2-style menus.
 * Handles ESC (back), Enter (select), and arrow keys.
 * 
 * Usage:
 *   useRDR2Navigation({
 *     onBack: () => router.back(),
 *     onSelect: () => handleSelection(),
 *     onArrowRight: () => setIndex(prev => prev + 1),
 *   })
 */
export function useRDR2Navigation({
  onBack,
  onSelect,
  onArrowLeft,
  onArrowRight,
  onArrowUp,
  onArrowDown,
  enabled = true,
}: UseRDR2NavigationOptions) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!enabled) return

      switch (e.key) {
        case 'Escape':
          e.preventDefault()
          onBack?.()
          break
        case 'Enter':
          e.preventDefault()
          onSelect?.()
          break
        case 'ArrowLeft':
          e.preventDefault()
          onArrowLeft?.()
          break
        case 'ArrowRight':
          e.preventDefault()
          onArrowRight?.()
          break
        case 'ArrowUp':
          e.preventDefault()
          onArrowUp?.()
          break
        case 'ArrowDown':
          e.preventDefault()
          onArrowDown?.()
          break
      }
    },
    [enabled, onBack, onSelect, onArrowLeft, onArrowRight, onArrowUp, onArrowDown]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])
}

export default useRDR2Navigation
