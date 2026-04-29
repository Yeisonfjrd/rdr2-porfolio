'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface ActivityStat {
  label: string
  value: string | number
  icon: string
  category: 'commits' | 'language' | 'project'
}

interface ActivitiesScreenProps {
  onBack: () => void
}

/**
 * Activities Screen - GitHub integration mockup
 * Displays development statistics in RDR2 style grid with red selection borders
 * Prepared for real GitHub API integration
 */
export default function ActivitiesScreen({ onBack }: ActivitiesScreenProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [activities, setActivities] = useState<ActivityStat[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Mock data - replace with real GitHub API calls
  const mockActivities: ActivityStat[] = [
    // Commits (Stamina/Energy equivalent)
    { label: 'Commits Today', value: 12, icon: '💻', category: 'commits' },
    { label: 'Commits This Week', value: 68, icon: '📊', category: 'commits' },
    { label: 'Commits This Month', value: 287, icon: '📈', category: 'commits' },
    
    // Languages (Skills equivalent)
    { label: 'TypeScript', value: '45%', icon: '🔷', category: 'language' },
    { label: 'JavaScript', value: '30%', icon: '💛', category: 'language' },
    { label: 'Go', value: '15%', icon: '🐹', category: 'language' },
    
    // Projects (Missions equivalent)
    { label: 'RoadEra', value: 'In Progress', icon: '🚗', category: 'project' },
    { label: 'Portfolio RDR2', value: 'Active', icon: '🎮', category: 'project' },
    { label: 'Open Source', value: '3 Repos', icon: '⭐', category: 'project' },
  ]

  useEffect(() => {
    // Simulate loading delay for API call
    const timer = setTimeout(() => {
      setActivities(mockActivities)
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setSelectedIndex(prev => (prev + 1) % activities.length)
      } else if (e.key === 'ArrowLeft') {
        setSelectedIndex(prev => (prev - 1 + activities.length) % activities.length)
      } else if (e.key === 'Escape' || e.key === 'Backspace') {
        onBack()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activities.length, onBack])

  return (
    <div className="rdr-cinematic-bars absolute inset-0 overflow-hidden" style={{ background: '#0d0b08' }}>
      {/* Atmospheric gradient */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse 60% 50% at 70% 50%, rgba(254,172,1,0.05) 0%, transparent 100%),
          radial-gradient(ellipse 40% 80% at 0% 50%, rgba(0,0,0,0.5) 0%, transparent 100%)
        `
      }} />

      <div className="relative flex flex-col h-full px-8 md:px-[8vw] py-[14vh]" style={{ zIndex: 30 }}>
        
        {/* Header */}
        <div className="mb-8 w-full">
          <h1 className="font-chinese-rocks uppercase tracking-[0.1em] text-[#e8dfc0]"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
            ACTIVITIES - Mi Desarrollo
          </h1>
          <div className="w-full h-[2px] mt-2 bg-[#4a3e32] opacity-60" />
          <p className="text-sm text-[#a89a88] mt-3">Estadísticas en vivo de programación y proyectos</p>
        </div>

        {/* Loading state */}
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <p className="text-[#e8dfc0] font-chinese-rocks tracking-[0.1em] uppercase mb-4">Cargando estadísticas...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Activities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
              {activities.map((activity, index) => {
                const isSelected = index === selectedIndex
                const categoryColor = {
                  commits: '#c41e3a',   // Red for commits
                  language: '#fead00',  // Gold for languages
                  project: '#8b7d6b',   // Brown for projects
                }[activity.category]

                return (
                  <motion.button
                    key={index}
                    onClick={() => setSelectedIndex(index)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className="relative text-left group focus:outline-none transition-all duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Activity Card with paint border */}
                    <div className={`p-[2px] transition-all duration-300 ${
                      isSelected 
                        ? 'rdr-menu-card-active' 
                        : 'rdr-menu-card-idle opacity-70'
                    }`}>
                      <div className="bg-[#1a1208] p-6 min-h-[140px] flex flex-col justify-between relative overflow-hidden">
                        
                        {/* Selection indicator border */}
                        {isSelected && (
                          <motion.div
                            layoutId="selectedBorder"
                            className="absolute inset-0 border-2 pointer-events-none"
                            style={{ borderColor: categoryColor }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                          />
                        )}

                        {/* Content */}
                        <div className="relative z-10">
                          <div className="text-3xl mb-2">{activity.icon}</div>
                          <p className="text-xs uppercase tracking-[0.15em] text-[#8a7d6b] mb-2">
                            {activity.category.replace('_', ' ')}
                          </p>
                          <h3 className="font-chinese-rocks uppercase tracking-[0.08em] text-[#e8dfc0] mb-3">
                            {activity.label}
                          </h3>
                          <p className="text-xl font-bold" style={{ color: categoryColor }}>
                            {activity.value}
                          </p>
                        </div>

                        {/* Hover effect overlay */}
                        {isSelected && (
                          <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(255,174,0,0.1)] pointer-events-none" />
                        )}
                      </div>
                    </div>
                  </motion.button>
                )
              })}
            </div>

            {/* Activity Details */}
            {activities[selectedIndex] && (
              <motion.div
                className="mt-8 pt-6 border-t border-[#4a3e32]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-sm text-[#a89a88]">
                  <span className="text-[#e8dfc0] font-chinese-rocks">SELECCIONADO:</span> {activities[selectedIndex].label}
                </p>
                <p className="text-xs text-[#8a7d6b] mt-2">
                  Esta sección está preparada para conectar con la API de GitHub para mostrar estadísticas en tiempo real de tu actividad de desarrollo.
                </p>
              </motion.div>
            )}
          </>
        )}

        {/* Footer with controls */}
        <div className="mt-auto pt-6 w-full">
          <div className="w-full h-[1px] mb-4 bg-[#4a3e32] opacity-40" />
          <div className="flex justify-end gap-8">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 flex items-center justify-center bg-[#e8dfc0] text-[#0d0b08] rounded-sm font-bold text-[10px]">←→</span>
              <span className="font-typewriter text-[10px] tracking-[0.2em] uppercase text-[#8a7d6b]">NAVEGAR</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 flex items-center justify-center bg-[#e8dfc0] text-[#0d0b08] rounded-sm font-bold text-[10px]">B</span>
              <span className="font-typewriter text-[10px] tracking-[0.2em] uppercase text-[#8a7d6b]">VOLVER</span>
            </div>
          </div>
        </div>
      </div>

      {/* Vignette overlay */}
      <div className="pointer-events-none absolute inset-0 z-[90] rdr-vignette opacity-60" />
    </div>
  )
}
