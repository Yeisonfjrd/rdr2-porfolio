'use client'
import { motion } from 'framer-motion'

interface RevolverLoaderProps {
  /** 'light' = blanco (sobre fondos oscuros) | 'dark' = negro (sobre fondos claros/sepia) */
  variant?: 'light' | 'dark'
  /** Velocidad en segundos por rotación completa */
  speed?: number
  size?: number
}

/**
 * Cilindro de revólver animado — esquina inferior derecha.
 *
 * Uso:
 *   <RevolverLoader />                    → blanco, 2s, 48px
 *   <RevolverLoader variant="dark" />     → negro (sobre sepia)
 *   <RevolverLoader speed={3} size={40} />
 *
 * El componente es `fixed` por defecto para ir en la esquina de la pantalla.
 * Si lo querés dentro de un container relativo, pasá `className="absolute"`.
 */
export default function RevolverLoader({
  variant = 'light',
  speed = 2,
  size = 48,
}: RevolverLoaderProps) {
  const color    = variant === 'light' ? '#e8dfc0' : '#1a1208'
  const shadow   = variant === 'light' ? 'drop-shadow(0 0 6px rgba(232,223,192,0.4))' : 'none'
  const bgColor  = variant === 'light' ? 'rgba(0,0,0,0.0)' : 'rgba(0,0,0,0.0)'

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 'clamp(16px, 3vh, 28px)',
        right:  'clamp(16px, 3vw, 28px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        pointerEvents: 'none',
      }}
    >
      {/* Etiqueta opcional */}
      <span style={{
        fontFamily: 'Courier New, monospace',
        fontSize: '0.55rem',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: variant === 'light' ? 'rgba(232,223,192,0.45)' : 'rgba(26,18,8,0.45)',
        userSelect: 'none',
      }}>
        Cargando
      </span>

      {/* SVG del cilindro girando */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
        }}
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
          {/*
            Cilindro de revólver: 6 cámaras dispuestas en círculo.
            Igual al icono de la imagen adjunta.
            El anillo exterior es el tambor; los 6 círculos son las recámaras.
          */}

          {/* Anillo exterior del tambor */}
          <circle
            cx="50" cy="50" r="46"
            stroke={color}
            strokeWidth="7"
            fill="none"
          />

          {/* Recámara central */}
          <circle cx="50" cy="50" r="10" stroke={color} strokeWidth="5.5" fill="none" />

          {/*
            6 recámaras exteriores a 60° cada una.
            Radio de órbita: 26px desde el centro.
            Cada círculo tiene r=9.
          */}
          {Array.from({ length: 6 }).map((_, i) => {
            const angleDeg = i * 60 - 90   // arranca desde arriba
            const angleRad = (angleDeg * Math.PI) / 180
            const cx = 50 + 26 * Math.cos(angleRad)
            const cy = 50 + 26 * Math.sin(angleRad)
            return (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r="9"
                stroke={color}
                strokeWidth="5.5"
                fill="none"
              />
            )
          })}
        </svg>
      </motion.div>
    </div>
  )
}