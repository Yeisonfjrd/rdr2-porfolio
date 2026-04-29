'use client'

import { useState, useRef, useCallback } from 'react'

interface UseSmartLoadingOptions {
  /** Delay before showing loading screen (ms) - prevents flicker for fast loads */
  visibilityDelay?: number
  /** Minimum time to show loading screen once visible (ms) */
  minimumDuration?: number
}

interface UseSmartLoadingReturn {
  /** Whether loading screen should be visible */
  isVisible: boolean
  /** Call when starting a loading operation */
  startLoading: () => void
  /** Call when loading operation completes */
  stopLoading: () => void
  /** Whether loading is in progress (even if not visible) */
  isLoading: boolean
}

/**
 * Smart loading hook that prevents loading screen flicker for fast responses
 * and ensures minimum visibility duration when shown.
 * 
 * - If loading completes within visibilityDelay, no loading screen is shown
 * - If loading screen appears, it stays visible for at least minimumDuration
 */
export function useSmartLoading(options: UseSmartLoadingOptions = {}): UseSmartLoadingReturn {
  const { visibilityDelay = 200, minimumDuration = 2000 } = options
  
  const [isLoading, setIsLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  
  const visibilityTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const minimumDurationTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const loadingStartTimeRef = useRef<number | null>(null)
  const pendingHideRef = useRef(false)

  const clearTimeouts = useCallback(() => {
    if (visibilityTimeoutRef.current) {
      clearTimeout(visibilityTimeoutRef.current)
      visibilityTimeoutRef.current = null
    }
    if (minimumDurationTimeoutRef.current) {
      clearTimeout(minimumDurationTimeoutRef.current)
      minimumDurationTimeoutRef.current = null
    }
  }, [])

  const startLoading = useCallback(() => {
    clearTimeouts()
    setIsLoading(true)
    pendingHideRef.current = false
    
    // Start visibility timeout - only show loading after delay
    visibilityTimeoutRef.current = setTimeout(() => {
      setIsVisible(true)
      loadingStartTimeRef.current = Date.now()
    }, visibilityDelay)
  }, [visibilityDelay, clearTimeouts])

  const stopLoading = useCallback(() => {
    setIsLoading(false)
    
    // If loading screen never became visible, just clean up
    if (!isVisible && visibilityTimeoutRef.current) {
      clearTimeouts()
      return
    }
    
    // If loading screen is visible, ensure minimum duration
    if (isVisible && loadingStartTimeRef.current) {
      const elapsed = Date.now() - loadingStartTimeRef.current
      const remaining = minimumDuration - elapsed
      
      if (remaining > 0) {
        // Wait for remaining minimum duration
        pendingHideRef.current = true
        minimumDurationTimeoutRef.current = setTimeout(() => {
          setIsVisible(false)
          loadingStartTimeRef.current = null
          pendingHideRef.current = false
        }, remaining)
      } else {
        // Minimum duration already elapsed
        setIsVisible(false)
        loadingStartTimeRef.current = null
      }
    }
    
    // Clear visibility timeout if still pending
    if (visibilityTimeoutRef.current) {
      clearTimeout(visibilityTimeoutRef.current)
      visibilityTimeoutRef.current = null
    }
  }, [isVisible, minimumDuration, clearTimeouts])

  return {
    isVisible,
    startLoading,
    stopLoading,
    isLoading,
  }
}
