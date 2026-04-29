'use client'
import { motion, useAnimationControls } from 'framer-motion'
import { useEffect } from 'react'

interface RevolverLoaderProps {
  /** 'light' = cream color (on dark backgrounds) | 'dark' = dark brown (on light/sepia backgrounds) */
  variant?: 'light' | 'dark'
  /** Seconds per 60° step (one chamber rotation) */
  stepDuration?: number
  size?: number
}

/**
 * Revolver cylinder loader with realistic stepped rotation.
 * 
 * Features:
 * - 6 chambers arranged in a circle
 * - 6 cylinder notches on the outer edge (like real revolver)
 * - Stepped 60° rotation with spring easing for mechanical feel
 * - Click sound simulation via animation timing
 * 
 * Usage:
 *   <RevolverLoader />                     → cream, 0.8s/step, 48px
 *   <RevolverLoader variant="dark" />      → dark (on sepia backgrounds)
 *   <RevolverLoader stepDuration={1} size={40} />
 */
export default function RevolverLoader({
  variant = 'light',
  stepDuration = 0.8,
  size = 48,
}: RevolverLoaderProps) {
  const color = variant === 'light' ? '#e8dfc0' : '#1a1208'
  const shadow = variant === 'light' ? 'drop-shadow(0 0 6px rgba(232,223,192,0.4))' : 'none'
  const textColor = variant === 'light' ? 'rgba(232,223,192,0.45)' : 'rgba(26,18,8,0.45)'
  
  const controls = useAnimationControls()

  useEffect(() => {
    let step = 0
    const animate = async () => {
      while (true) {
        step += 1
        await controls.start({
          rotate: step * 60,
          transition: {
            type: 'spring',
            stiffness: 300,
            damping: 20,
            mass: 0.8,
          },
        })
        // Pause between steps for mechanical feel
        await new Promise(resolve => setTimeout(resolve, stepDuration * 1000 - 200))
      }
    }
    animate()
  }, [controls, stepDuration])

  // Calculate positions for 6 cylinder notches on outer edge
  const notchPositions = Array.from({ length: 6 }).map((_, i) => {
    const angleDeg = i * 60 - 90 // Start from top
    const angleRad = (angleDeg * Math.PI) / 180
    // Position on outer edge of cylinder
    const cx = 50 + 42 * Math.cos(angleRad)
    const cy = 50 + 42 * Math.sin(angleRad)
    return { cx, cy, angle: angleDeg + 90 }
  })

  // Calculate positions for 6 chambers
  const chamberPositions = Array.from({ length: 6 }).map((_, i) => {
    const angleDeg = i * 60 - 90 // Start from top
    const angleRad = (angleDeg * Math.PI) / 180
    const cx = 50 + 26 * Math.cos(angleRad)
    const cy = 50 + 26 * Math.sin(angleRad)
    return { cx, cy }
  })

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
      {/* Loading label */}
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

      {/* Animated cylinder SVG */}
      <motion.div
        animate={controls}
        style={{
          width: size,
          height: size,
          filter: shadow,
        }}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
        >
          {/* Outer drum ring */}
          <circle
            cx="50"
            cy="50"
            r="46"
            stroke={color}
            strokeWidth="6"
            fill="none"
          />

          {/* 6 Cylinder notches on outer edge - realistic revolver detail */}
          {notchPositions.map((pos, i) => (
            <rect
              key={`notch-${i}`}
              x={pos.cx - 3}
              y={pos.cy - 6}
              width="6"
              height="8"
              fill={color}
              transform={`rotate(${pos.angle}, ${pos.cx}, ${pos.cy})`}
              rx="1"
            />
          ))}

          {/* Center chamber - ejector rod hole */}
          <circle
            cx="50"
            cy="50"
            r="10"
            stroke={color}
            strokeWidth="5"
            fill="none"
          />

          {/* 6 outer chambers arranged in circle */}
          {chamberPositions.map((pos, i) => (
            <circle
              key={`chamber-${i}`}
              cx={pos.cx}
              cy={pos.cy}
              r="9"
              stroke={color}
              strokeWidth="5"
              fill="none"
            />
          ))}

          {/* Inner structural ring connecting chambers */}
          <circle
            cx="50"
            cy="50"
            r="17"
            stroke={color}
            strokeWidth="1.5"
            fill="none"
            opacity="0.4"
          />
        </svg>
      </motion.div>
    </div>
  )
}
