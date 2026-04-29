'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface RevolverLoaderProps {
  /** Size of the loader in pixels */
  size?: number
  /** Override color (defaults to auto-detected based on background) */
  color?: string
  /** Chamber rotation interval in ms */
  interval?: number
}

/**
 * A 6-chamber revolver cylinder loader with stepped 180° rotation animation.
 * Features edge notches like a real revolver cylinder and spring physics for natural movement.
 */
export function RevolverLoader({ 
  size = 64, 
  color,
  interval = 600 
}: RevolverLoaderProps) {
  const [loaderColor, setLoaderColor] = useState(color || '#c4a882')
  const [currentStep, setCurrentStep] = useState(0)
  
  // Motion values for spring animation
  const rotation = useMotionValue(0)
  const springRotation = useSpring(rotation, {
    stiffness: 180,
    damping: 20,
    mass: 1,
  })

  // Auto-detect color based on background if not provided
  useEffect(() => {
    if (color) {
      setLoaderColor(color)
      return
    }

    // Detect background luminance and set appropriate color
    const detectBackgroundColor = () => {
      const body = document.body
      const computedStyle = window.getComputedStyle(body)
      const bgColor = computedStyle.backgroundColor
      
      // Parse RGB values
      const rgb = bgColor.match(/\d+/g)
      if (rgb && rgb.length >= 3) {
        const luminance = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000
        // Use light color on dark backgrounds, dark on light
        setLoaderColor(luminance < 128 ? '#c4a882' : '#2a2721')
      }
    }

    detectBackgroundColor()
  }, [color])

  // Stepped rotation animation - rotate 180° (3 chambers) each step
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep(prev => {
        const next = prev + 1
        rotation.set(next * 180) // 180° per step
        return next
      })
    }, interval)

    return () => clearInterval(timer)
  }, [interval, rotation])

  // SVG viewBox dimensions
  const viewBoxSize = 100
  const center = viewBoxSize / 2
  const outerRadius = 42
  const innerRadius = 35
  const chamberRadius = 10
  const chamberDistance = 25
  const notchDepth = 4
  const notchWidth = 8

  // Generate 6 chamber positions (60° apart)
  const chambers = Array.from({ length: 6 }, (_, i) => {
    const angle = (i * 60 - 90) * (Math.PI / 180) // Start from top
    return {
      x: center + Math.cos(angle) * chamberDistance,
      y: center + Math.sin(angle) * chamberDistance,
    }
  })

  // Generate outer edge path with notches at each chamber position
  const generateOuterPath = () => {
    const segments: string[] = []
    const numPoints = 72 // Points around the circle
    
    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * Math.PI * 2 - Math.PI / 2
      const chamberIndex = Math.round((angle + Math.PI / 2) / (Math.PI / 3)) % 6
      const chamberAngle = (chamberIndex * 60 - 90) * (Math.PI / 180)
      const angleDiff = Math.abs(angle - chamberAngle)
      
      // Create notch near chamber positions
      let radius = outerRadius
      if (angleDiff < 0.15 || angleDiff > Math.PI * 2 - 0.15) {
        const notchFactor = 1 - Math.pow(angleDiff / 0.15, 2)
        radius = outerRadius - notchDepth * Math.max(0, notchFactor)
      }
      
      const x = center + Math.cos(angle) * radius
      const y = center + Math.sin(angle) * radius
      
      if (i === 0) {
        segments.push(`M ${x.toFixed(2)} ${y.toFixed(2)}`)
      } else {
        segments.push(`L ${x.toFixed(2)} ${y.toFixed(2)}`)
      }
    }
    
    segments.push('Z')
    return segments.join(' ')
  }

  return (
    <div 
      className="relative"
      style={{ width: size, height: size }}
    >
      <motion.svg
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        style={{ 
          width: '100%', 
          height: '100%',
          rotate: springRotation,
        }}
      >
        {/* Outer cylinder edge with notches */}
        <path
          d={generateOuterPath()}
          fill="none"
          stroke={loaderColor}
          strokeWidth="2"
          opacity={0.8}
        />
        
        {/* Inner circle */}
        <circle
          cx={center}
          cy={center}
          r={innerRadius}
          fill="none"
          stroke={loaderColor}
          strokeWidth="1.5"
          opacity={0.4}
        />
        
        {/* Center hub */}
        <circle
          cx={center}
          cy={center}
          r={6}
          fill="none"
          stroke={loaderColor}
          strokeWidth="2"
          opacity={0.6}
        />
        
        {/* Small center dot */}
        <circle
          cx={center}
          cy={center}
          r={2}
          fill={loaderColor}
          opacity={0.8}
        />
        
        {/* 6 chambers */}
        {chambers.map((chamber, i) => {
          // Highlight the "loaded" chamber (top position after rotation)
          const isLoaded = i === (currentStep * 3) % 6
          
          return (
            <g key={i}>
              {/* Chamber circle */}
              <circle
                cx={chamber.x}
                cy={chamber.y}
                r={chamberRadius}
                fill="none"
                stroke={loaderColor}
                strokeWidth={isLoaded ? 2 : 1.5}
                opacity={isLoaded ? 1 : 0.5}
              />
              
              {/* Chamber inner detail */}
              <circle
                cx={chamber.x}
                cy={chamber.y}
                r={chamberRadius - 3}
                fill="none"
                stroke={loaderColor}
                strokeWidth="1"
                opacity={isLoaded ? 0.6 : 0.25}
              />
              
              {/* "Bullet" indicator in loaded chamber */}
              {isLoaded && (
                <motion.circle
                  cx={chamber.x}
                  cy={chamber.y}
                  r={3}
                  fill={loaderColor}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.8 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </g>
          )
        })}
        
        {/* Radial lines connecting chambers to center */}
        {chambers.map((chamber, i) => (
          <line
            key={`line-${i}`}
            x1={center}
            y1={center}
            x2={chamber.x}
            y2={chamber.y}
            stroke={loaderColor}
            strokeWidth="0.5"
            opacity={0.2}
          />
        ))}
      </motion.svg>
    </div>
  )
}
