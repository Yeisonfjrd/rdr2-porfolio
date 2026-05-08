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
 * Para usarla: coloca tu archivo en la ruta que devuelve ASSETS.INTRO_VIDEO
 * (típicamente /public/intro/video.mp4) y asegurate que el formato sea H.264
 * para compatibilidad máxima en Safari/iOS.
 *
 * Flujo:
 *   1. Se monta → intenta cargar el video.
 *   2. Video termina → flash blanco → "Yeison Fajardo II" fade-in.
 *   3. 1 500 ms después → onComplete().
 *   4. Si el video falla → salta directo al texto y luego a onComplete().
 */
export default function ShotgunBlast({ onComplete }: ShotgunBlastProps) {
  const [videoLoaded,  setVideoLoaded]  = useState(false)
  const [videoEnded,   setVideoEnded]   = useState(false)
  const [showNameText, setShowNameText] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  /* ── Video events ── */
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleCanPlay = () => {
      setVideoLoaded(true)
      video.play().catch(() => {
        // Autoplay bloqueado (raro en muted+playsInline) → saltamos la intro
        triggerEnd()
      })
    }

    const handleEnded = () => triggerEnd()

    const handleError = () => {
      console.warn('[ShotgunBlast] Video no encontrado o inválido — omitiendo intro.')
      triggerEnd()
    }

    video.addEventListener('canplay',  handleCanPlay)
    video.addEventListener('ended',    handleEnded)
    video.addEventListener('error',    handleError)

    return () => {
      video.removeEventListener('canplay',  handleCanPlay)
      video.removeEventListener('ended',    handleEnded)
      video.removeEventListener('error',    handleError)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Cuando el texto aparece → esperar 1 500 ms → onComplete ── */
  useEffect(() => {
    if (!showNameText) return
    const t = setTimeout(onComplete, 1500)
    return () => clearTimeout(t)
  }, [showNameText, onComplete])

  function triggerEnd() {
    setVideoEnded(true)
    setTimeout(() => setShowNameText(true), 300)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black overflow-hidden">

      {/* Video */}
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
        />
      </motion.div>

      {/* Flash en el corte */}
      {videoEnded && !showNameText && (
        <motion.div
          className="absolute inset-0 bg-white pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.35, 0] }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        />
      )}

      {/* Nombre */}
      {videoEnded && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: showNameText ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="font-chinese-rocks uppercase text-center"
            style={{
              fontSize: 'clamp(2rem, 8vw, 5rem)',
              color: '#f2ead8',
              letterSpacing: '0.1em',
              textShadow: '3px 3px 0 #000, -1px -1px 0 rgba(0,0,0,0.7), 5px 5px 12px rgba(0,0,0,0.9)',
              WebkitTextStroke: '0.5px rgba(0,0,0,0.6)',
            }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Yeison Fajardo II
          </motion.h1>
        </motion.div>
      )}
    </div>
  )
}