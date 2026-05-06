'use client'
import { useEffect, useRef } from 'react'
import { motion, useAnimationControls } from 'framer-motion'

interface RevolverCylinderLoaderProps {
  variant?: 'light' | 'dark'  
  size?: number
  pauseMs?: number
}

export default function RevolverCylinderLoader({
  variant = 'light',
  size = 36,
  pauseMs = 480,
}: RevolverCylinderLoaderProps) {

  const fill      = variant === 'light' ? '#e8dfc0' : '#1a1208'
  const textColor = variant === 'light' ? 'rgba(232,223,192,0.45)' : 'rgba(26,18,8,0.45)'
  const glow      = variant === 'light' ? 'drop-shadow(0 0 5px rgba(232,223,192,0.35))' : 'none'

  const controls = useAnimationControls()
  const mounted  = useRef(false)
  const totalRot = useRef(0)
  const timer    = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    mounted.current = true

    const tick = async () => {
      if (!mounted.current) return
      totalRot.current += 60

      try {
        await controls.start({
          rotate: totalRot.current,
          transition: { type: 'spring', stiffness: 700, damping: 32, mass: 0.5 },
        })
      } catch {
        return
      }

      if (mounted.current) timer.current = setTimeout(tick, pauseMs)
    }

    tick()

    return () => {
      mounted.current = false
      if (timer.current) clearTimeout(timer.current)
    }
  }, [controls, pauseMs])

  const ORBIT_R   = 27 
  const BODY_R    = 18 
  const CHAMBER_R = 12 

  const chambers = Array.from({ length: 6 }, (_, i) => {
    const rad = ((i * 60 - 90) * Math.PI) / 180
    return {
      cx: 50 + ORBIT_R * Math.cos(rad),
      cy: 50 + ORBIT_R * Math.sin(rad),
    }
  })

  const maskId = 'revolver-chamber-mask'

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 'clamp(16px, 3vh, 28px)',
        right: 'clamp(16px, 3vw, 28px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        pointerEvents: 'none',
      }}
    >
      <span
        style={{
          fontFamily: 'Courier New, monospace',
          fontSize: '0.55rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: textColor,
          userSelect: 'none',
        }}
      >
        Cargando
      </span>

      <motion.div animate={controls} style={{ width: size, height: size, filter: glow }}>
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <mask id={maskId}>

              <rect x="0" y="0" width="100" height="100" fill="white" />

              {chambers.map((pos, i) => (
                <circle
                  key={`mask-hole-${i}`}
                  cx={pos.cx}
                  cy={pos.cy}
                  r={CHAMBER_R}
                  fill="black"
                />
              ))}
            </mask>
          </defs>  
          <g mask={`url(#${maskId})`}>
            {chambers.map((pos, i) => (
              <circle
                key={`lobe-${i}`}
                cx={pos.cx}
                cy={pos.cy}
                r={BODY_R}
                fill={fill}
              />
            ))}
          </g>
        </svg>
      </motion.div>
    </div>
  )
}