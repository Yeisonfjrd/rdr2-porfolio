'use client'

import { motion } from 'framer-motion'
import { RevolverLoader } from '@/components/ui/revolver-loader'
import { LoadingTips } from '@/components/ui/loading-tips'

interface LoadingScreenProps {
  /** Optional message to display */
  message?: string
}

export default function LoadingScreen({ message }: LoadingScreenProps) {
  return (
    <div className="relative w-full h-full overflow-hidden bg-[#0a0908]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#0f0e0c_0%,#1a1815_50%,#0f0e0c_100%)]" />
      
      {/* Subtle grain overlay */}
      <motion.div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
        animate={{ opacity: [0.02, 0.04, 0.02] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      
      {/* Vignette effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, rgba(0,0,0,0.7) 100%)',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center">
        {/* Revolver loader */}
        <RevolverLoader size={80} />
        
        {/* Loading message */}
        {message && (
          <motion.p
            className="mt-8 text-[#6b635a] text-sm tracking-[0.2em] uppercase"
            style={{ fontFamily: 'var(--font-typewriter), Courier New, monospace' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {message}
          </motion.p>
        )}
        
        {/* Loading tips at bottom */}
        <div className="absolute bottom-12 left-0 right-0 px-8">
          <LoadingTips />
        </div>
      </div>
    </div>
  )
}
