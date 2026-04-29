'use client'
import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { ASSETS } from '@/lib/assets'

interface ShotgunBlastProps {
  onComplete: () => void
}

/**
 * Shotgun Blast Intro Sequence
 * 
 * Plays once on first load (tracked via sessionStorage).
 * Shows video followed by "Yeison Fajardo II" text fade-in.
 * Automatically transitions to TitleScreen when complete.
 * 
 * Session Storage:
 * - 'rdr2_intro_played': Set to 'true' after first playthrough
 * - Cleared on page reload/new session
 */
export default function ShotgunBlast({ onComplete }: ShotgunBlastProps) {
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoEnded, setVideoEnded] = useState(false)
  const [showNameText, setShowNameText] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleEnded = () => {
      setVideoEnded(true)
      // Show name text after brief delay
      setTimeout(() => {
        setShowNameText(true)
      }, 300)
    }

    const handleCanPlay = () => {
      setVideoLoaded(true)
      video.play()
    }

    video.addEventListener('ended', handleEnded)
    video.addEventListener('canplay', handleCanPlay)

    // Auto-transition to TitleScreen after name text fades in
    const transitionTimer = setTimeout(() => {
      if (videoEnded && showNameText) {
        setTimeout(onComplete, 1500) // Let name text display for 1.5s
      }
    }, 2500) // Wait for video (~2s) + text fade-in

    return () => {
      video.removeEventListener('ended', handleEnded)
      video.removeEventListener('canplay', handleCanPlay)
      clearTimeout(transitionTimer)
    }
  }, [videoEnded, showNameText, onComplete])

  return (
    <div className="fixed inset-0 z-50 bg-black overflow-hidden">
      {/* Video Container */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: videoLoaded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <video
          ref={videoRef}
          src={ASSETS.INTRO_VIDEO}
          className="absolute inset-0 w-full h-full object-cover"
          playsInline
          muted
          onError={() => {
            console.error('[v0] Shotgun blast video failed to load, completing sequence')
            setVideoEnded(true)
            setTimeout(() => setShowNameText(true), 300)
          }}
        />
      </motion.div>

      {/* Fallback black screen while video loads */}
      {!videoLoaded && (
        <div className="absolute inset-0 bg-black" />
      )}

      {/* Name Text - "Yeison Fajardo II" appears after blast */}
      {videoEnded && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: showNameText ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          <div className="text-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1
                className="font-chinese-rocks uppercase"
                style={{
                  fontSize: 'clamp(2rem, 8vw, 5rem)',
                  color: '#f2ead8',
                  letterSpacing: '0.1em',
                  textShadow: '3px 3px 0 #000, -1px -1px 0 rgba(0,0,0,0.7), 5px 5px 12px rgba(0,0,0,0.9)',
                  WebkitTextStroke: '0.5px rgba(0,0,0,0.6)',
                }}
              >
                Yeison Fajardo II
              </h1>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Flash effect on video end */}
      {videoEnded && !showNameText && (
        <motion.div
          className="absolute inset-0 bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      )}
    </div>
  )
}
