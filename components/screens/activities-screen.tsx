'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRDR2Navigation } from '@/hooks/useRDR2Navigation'
import RDR2ControlPrompts from '@/components/ui/rdr2-control-prompts'

interface Activity {
  id: string
  title: string
  description: string
  image: string
  stats?: {
    label: string
    value: string | number
  }[]
}

interface GitHubStats {
  commits: number
  streak: number
  languages: { name: string; percent: number }[]
  recentRepos: string[]
}

interface ActivitiesScreenProps {
  onBack: () => void
}

/**
 * Activities Screen - RDR2 style with horizontal card grid
 * Displays development activities as activity cards with sepia images
 * Red selection borders like the RDR2 Activities menu
 */
export default function ActivitiesScreen({ onBack }: ActivitiesScreenProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [githubStats, setGithubStats] = useState<GitHubStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Activities matching RDR2 style - large cards with images
  const activities: Activity[] = [
    {
      id: 'github',
      title: 'GitHub',
      description: 'Actividad de desarrollo en tiempo real. Commits, pull requests y contribuciones a repositorios open source.',
      image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&q=80',
      stats: githubStats ? [
        { label: 'Commits este mes', value: githubStats.commits },
        { label: 'Racha actual', value: `${githubStats.streak} días` },
      ] : undefined,
    },
    {
      id: 'wakatime',
      title: 'Coding',
      description: 'Tiempo de programación rastreado con WakaTime. Lenguajes utilizados y proyectos activos.',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80',
      stats: [
        { label: 'Horas esta semana', value: '32h' },
        { label: 'Lenguaje principal', value: 'TypeScript' },
      ],
    },
    {
      id: 'projects',
      title: 'Proyectos',
      description: 'Portafolio de proyectos activos y completados. Arquitecturas full-stack y experiencias web.',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80',
      stats: [
        { label: 'Proyectos activos', value: 4 },
        { label: 'En producción', value: 3 },
      ],
    },
    {
      id: 'learning',
      title: 'Aprendizaje',
      description: 'Cursos completados, certificaciones obtenidas y tecnologías en estudio continuo.',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80',
      stats: [
        { label: 'Certificaciones', value: 5 },
        { label: 'En curso', value: 'AWS Solutions' },
      ],
    },
  ]

  // Fetch GitHub stats (mock - replace with real API)
  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        // TODO: Replace with actual GitHub API call
        // const res = await fetch('/api/github/stats')
        // const data = await res.json()
        
        // Mock data for now
        await new Promise(resolve => setTimeout(resolve, 500))
        setGithubStats({
          commits: 287,
          streak: 14,
          languages: [
            { name: 'TypeScript', percent: 45 },
            { name: 'JavaScript', percent: 30 },
            { name: 'Go', percent: 15 },
            { name: 'Python', percent: 10 },
          ],
          recentRepos: ['rdr2-portfolio', 'roadera', 'tesla-clone'],
        })
      } catch (error) {
        console.error('Failed to fetch GitHub stats:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchGitHubStats()
  }, [])

  // Navigation with centralized hook
  useRDR2Navigation({
    onBack,
    onArrowRight: () => setSelectedIndex(prev => (prev + 1) % activities.length),
    onArrowLeft: () => setSelectedIndex(prev => (prev - 1 + activities.length) % activities.length),
  })

  const currentActivity = activities[selectedIndex]

  return (
    <div className="rdr-cinematic-bars absolute inset-0 overflow-hidden" style={{ background: '#0d0b08' }}>
      {/* Atmospheric gradient */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse 60% 50% at 70% 50%, rgba(254,172,1,0.05) 0%, transparent 100%),
          radial-gradient(ellipse 40% 80% at 0% 50%, rgba(0,0,0,0.5) 0%, transparent 100%)
        `
      }} />

      <motion.div className="rdr-grain absolute inset-0 pointer-events-none"
        animate={{ opacity: [0.03, 0.055, 0.03] }}
        transition={{ duration: 4, repeat: Infinity }} />

      {/* Paint edges for cinematic bars */}
      <div className="rdr-bar-paint-edge-top" style={{ top: 'calc(12% - 10px)' }} />
      <div className="rdr-bar-paint-edge-bottom" style={{ bottom: 'calc(12% - 10px)' }} />

      <div className="relative flex flex-col h-full px-8 md:px-[8vw] py-[14vh]" style={{ zIndex: 30 }}>
        
        {/* Header */}
        <div className="mb-6 w-full">
          <h1 className="font-chinese-rocks uppercase tracking-[0.1em] text-[#e8dfc0]"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
            ACTIVITIES
          </h1>
          <div className="w-full h-[2px] mt-2 bg-[#4a3e32] opacity-60" />
        </div>

        {/* Loading skeleton */}
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-[#e8dfc0] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-[#8a7d6b] text-sm uppercase tracking-widest">Cargando actividades...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Horizontal Activity Cards Grid - RDR2 Style */}
            <div className="flex gap-4 overflow-x-auto pb-4 flex-1 items-start" style={{ scrollbarWidth: 'none' }}>
              {activities.map((activity, index) => {
                const isSelected = index === selectedIndex

                return (
                  <motion.button
                    key={activity.id}
                    onClick={() => setSelectedIndex(index)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className="relative flex-shrink-0 text-left focus:outline-none group"
                    style={{ width: 'clamp(200px, 22vw, 280px)' }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    {/* Card Container with RED border when active */}
                    <div className={`w-full transition-all duration-300 ${
                      isSelected ? 'outline outline-2 outline-[#c41e3a] outline-offset-2' : ''
                    }`}
                      style={{
                        backfaceVisibility: 'hidden',
                        transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                      }}
                    >
                      {/* Image with sepia filter */}
                      <div className="relative aspect-[4/3] overflow-hidden bg-[#110e0a]">
                        <img
                          src={activity.image}
                          alt={activity.title}
                          className={`w-full h-full object-cover transition-all duration-500 ${
                            isSelected ? 'opacity-90 grayscale-[30%] sepia-[60%]' : 'opacity-50 grayscale-[70%] sepia-[40%]'
                          }`}
                        />
                        {/* Inner shadow */}
                        <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.9)] pointer-events-none" />
                        
                        {/* Red selection glow */}
                        {isSelected && (
                          <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(196,30,58,0.3)] pointer-events-none" />
                        )}
                      </div>

                      {/* Title and Description below image */}
                      <div className="mt-3 px-1">
                        <h2 className="font-chinese-rocks uppercase tracking-[0.08em] transition-colors duration-200"
                          style={{
                            fontSize: 'clamp(0.9rem, 1.4vw, 1.1rem)',
                            color: isSelected ? '#e8dfc0' : '#8a7d6b',
                            textShadow: isSelected ? '1px 1px 0 #000' : 'none',
                          }}>
                          {activity.title}
                        </h2>
                        <p className="mt-2 text-xs leading-relaxed font-sans" 
                          style={{ 
                            color: isSelected ? '#a89a88' : '#5a4a38',
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}>
                          {activity.description}
                        </p>

                        {/* Stats (only shown on hover/selected) */}
                        {isSelected && activity.stats && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-3 pt-3 border-t border-[#4a3e32]/40"
                          >
                            {activity.stats.map((stat, i) => (
                              <div key={i} className="flex justify-between text-xs mb-1">
                                <span className="text-[#8a7d6b]">{stat.label}</span>
                                <span className="text-[#c41e3a] font-bold">{stat.value}</span>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.button>
                )
              })}
            </div>

            {/* Selected Activity Details */}
            {currentActivity && (
              <motion.div
                key={currentActivity.id}
                className="mt-4 pt-4 border-t border-[#4a3e32]/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start gap-6">
                  {/* Activity info */}
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-[0.2em] text-[#8a7d6b] mb-2">Seleccionado</p>
                    <h3 className="font-chinese-rocks uppercase text-[#e8dfc0] text-lg tracking-wide">
                      {currentActivity.title}
                    </h3>
                  </div>

                  {/* GitHub languages (if applicable) */}
                  {currentActivity.id === 'github' && githubStats && (
                    <div className="text-right">
                      <p className="text-xs uppercase tracking-[0.2em] text-[#8a7d6b] mb-2">Lenguajes</p>
                      <div className="flex gap-3">
                        {githubStats.languages.slice(0, 3).map((lang, i) => (
                          <div key={i} className="text-xs">
                            <span className="text-[#e8dfc0]">{lang.name}</span>
                            <span className="text-[#c41e3a] ml-1">{lang.percent}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </>
        )}

        {/* Footer separator */}
        <div className="mt-auto pt-4 w-full">
          <div className="w-full h-[1px] bg-[#4a3e32] opacity-40" />
        </div>
      </div>

      {/* Control prompts */}
      <RDR2ControlPrompts
        prompts={[
          { key: 'ESC', label: 'VOLVER', icon: 'circle' },
          { key: '←→', label: 'NAVEGAR' },
        ]}
      />

      {/* Vignette overlay */}
      <div className="pointer-events-none absolute inset-0 z-[90] rdr-vignette opacity-60" />
    </div>
  )
}
