'use client'

import { motion } from 'framer-motion'

interface ControlPrompt {
  key: string
  label: string
  icon?: 'circle' | 'cross'
}

interface RDR2ControlPromptsProps {
  prompts?: ControlPrompt[]
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center'
  className?: string
}

/**
 * RDR2-style control prompts displayed at the bottom of screens.
 * Shows keyboard controls with PlayStation-style icons.
 * 
 * Usage:
 *   <RDR2ControlPrompts prompts={[
 *     { key: 'ESC', label: 'BACK', icon: 'circle' },
 *     { key: 'Enter', label: 'SELECT', icon: 'cross' },
 *   ]} />
 */
export default function RDR2ControlPrompts({
  prompts = [
    { key: 'ESC', label: 'VOLVER', icon: 'circle' },
    { key: 'Enter', label: 'SELECCIONAR', icon: 'cross' },
  ],
  position = 'bottom-right',
  className = '',
}: RDR2ControlPromptsProps) {
  const positionClasses = {
    'bottom-right': 'bottom-[clamp(16px,3vh,28px)] right-[clamp(16px,3vw,28px)]',
    'bottom-left': 'bottom-[clamp(16px,3vh,28px)] left-[clamp(16px,3vw,28px)]',
    'bottom-center': 'bottom-[clamp(16px,3vh,28px)] left-1/2 -translate-x-1/2',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className={`fixed z-50 flex items-center gap-6 ${positionClasses[position]} ${className}`}
    >
      {prompts.map((prompt, index) => (
        <div key={index} className="flex items-center gap-2">
          {/* Key indicator */}
          <span
            className="px-2 py-0.5 text-[10px] font-bold tracking-wider"
            style={{
              fontFamily: 'Courier New, monospace',
              color: '#0d0b08',
              background: '#e8dfc0',
              borderRadius: 2,
              minWidth: 28,
              textAlign: 'center',
            }}
          >
            {prompt.key}
          </span>
          
          {/* Label */}
          <span
            style={{
              fontFamily: 'Courier New, monospace',
              fontSize: '0.6rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(138,125,107,0.9)',
            }}
          >
            {prompt.label}
          </span>
          
          {/* PlayStation-style icon */}
          {prompt.icon && (
            <span
              style={{
                fontSize: '0.7rem',
                color: prompt.icon === 'circle' ? 'rgba(189,8,26,0.7)' : 'rgba(100,149,237,0.7)',
                marginLeft: 2,
              }}
            >
              {prompt.icon === 'circle' ? '○' : '✕'}
            </span>
          )}
        </div>
      ))}
    </motion.div>
  )
}
