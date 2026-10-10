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
        // The game shows "Select (x)  Back (o)": the action in the menu font, then the button
        <div key={index} className="flex items-center gap-2" title={prompt.key}>
          <span
            className="font-chinese-rocks uppercase"
            style={{ fontSize: "clamp(0.8rem, 1vw, 0.95rem)", letterSpacing: "0.06em", color: "rgba(255,255,255,0.88)", textShadow: "0 1px 2px #000" }}
          >
            {prompt.label}
          </span>
          <span
            className="inline-flex items-center justify-center rounded-full"
            style={{
              minWidth: 22, height: 22, padding: prompt.icon ? 0 : "0 7px",
              border: "1.5px solid rgba(255,255,255,0.85)",
              color: "rgba(255,255,255,0.92)",
              fontSize: prompt.icon ? "0.7rem" : "0.55rem",
              fontFamily: prompt.icon ? "inherit" : "Arial, sans-serif",
              fontWeight: 700,
              letterSpacing: prompt.icon ? 0 : "0.04em",
              boxShadow: "0 1px 3px rgba(0,0,0,0.6)",
            }}
          >
            {prompt.icon === "circle" ? "○" : prompt.icon === "cross" ? "✕" : prompt.key}
          </span>
        </div>
      ))}
    </motion.div>
  )
}
