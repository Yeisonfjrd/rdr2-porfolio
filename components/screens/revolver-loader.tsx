'use client'
import { motion, useAnimationControls } from 'framer-motion'
import { useEffect, useRef } from 'react'

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
 * - 6 chambers arranged in a circle with flower-like wavy outline
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
  const isMountedRef = useRef(false)
  const stepRef = useRef(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    isMountedRef.current = true

    const animate = async () => {
      if (!isMountedRef.current) return

      stepRef.current += 1
      
      try {
        await controls.start({
          rotate: stepRef.current * 60,
          transition: {
            type: 'spring',
            stiffness: 300,
            damping: 20,
            mass: 0.8,
          },
        })
      } catch {
        return
      }

      if (isMountedRef.current) {
        timeoutRef.current = setTimeout(() => {
          animate()
        }, stepDuration * 1000 - 200)
      }
    }

    animate()

    return () => {
      isMountedRef.current = false
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [controls, stepDuration])

  // Calculate positions for 6 chambers
  const chamberPositions = Array.from({ length: 6 }).map((_, i) => {
    const angleDeg = i * 60 - 90
    const angleRad = (angleDeg * Math.PI) / 180
    const cx = 50 + 26 * Math.cos(angleRad)
    const cy = 50 + 26 * Math.sin(angleRad)
    return { cx, cy }
  })

  // Generate flower-like wavy path for outer edge
  // This creates the characteristic revolver cylinder shape where
  // the outline bulges outward around each chamber
  const generateFlowerPath = () => {
    const centerX = 50
    const centerY = 50
    const chamberRadius = 14 // radius of each chamber bulge
    const chamberDistance = 26 // distance from center to chamber center
    const numChambers = 6
    
    let path = ''
    
    for (let i = 0; i < numChambers; i++) {
      const angle1 = (i * 60 - 90) * (Math.PI / 180)
      const angle2 = ((i + 1) * 60 - 90) * (Math.PI / 180)
      
      // Outer point of current chamber bulge
      const outerX = centerX + (chamberDistance + chamberRadius) * Math.cos(angle1)
      const outerY = centerY + (chamberDistance + chamberRadius) * Math.sin(angle1)
      
      // Inner point between chambers (the "waist" of the flower)
      const midAngle = (angle1 + angle2) / 2
      const innerRadius = chamberDistance - 2 // How deep the curve goes inward
      const innerX = centerX + innerRadius * Math.cos(midAngle)
      const innerY = centerY + innerRadius * Math.sin(midAngle)
      
      if (i === 0) {
        path += `M ${outerX} ${outerY} `
      }
      
      // Bezier curve to inner point
      const ctrl1X = centerX + (chamberDistance + chamberRadius * 0.5) * Math.cos(angle1 + 0.3)
      const ctrl1Y = centerY + (chamberDistance + chamberRadius * 0.5) * Math.sin(angle1 + 0.3)
      
      path += `Q ${ctrl1X} ${ctrl1Y} ${innerX} ${innerY} `
      
      // Next outer point
      const nextOuterX = centerX + (chamberDistance + chamberRadius) * Math.cos(angle2)
      const nextOuterY = centerY + (chamberDistance + chamberRadius) * Math.sin(angle2)
      
      // Bezier curve to next outer point
      const ctrl2X = centerX + (chamberDistance + chamberRadius * 0.5) * Math.cos(angle2 - 0.3)
      const ctrl2Y = centerY + (chamberDistance + chamberRadius * 0.5) * Math.sin(angle2 - 0.3)
      
      path += `Q ${ctrl2X} ${ctrl2Y} ${nextOuterX} ${nextOuterY} `
    }
    
    path += 'Z'
    return path
  }

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
          {/* Flower-like outer edge - wavy cylinder shape */}
          <path
            d={generateFlowerPath()}
            stroke={color}
            strokeWidth="4"
            fill="none"
            strokeLinejoin="round"
          />

          {/* 6 outer chambers arranged in circle */}
          {chamberPositions.map((pos, i) => (
            <circle
              key={`chamber-${i}`}
              cx={pos.cx}
              cy={pos.cy}
              r="10"
              stroke={color}
              strokeWidth="4"
              fill="none"
            />
          ))}

          {/* Center ejector rod hole */}
          <circle
            cx="50"
            cy="50"
            r="8"
            stroke={color}
            strokeWidth="4"
            fill="none"
          />
        </svg>
      </motion.div>
    </div>
  )
}
