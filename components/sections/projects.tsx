'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface Project {
  id: number
  name: string
  description: string
  longDescription: string
  tech: string[]
  reward: string
  status: 'WANTED' | 'CAPTURED' | 'ACTIVE'
  image: string
}

const projects: Project[] = [
  {
    id: 1,
    name: 'RoadEra',
    description: 'Luxury car rental platform with real-time bookings',
    longDescription: 'A comprehensive web platform for luxury car rentals. Features user authentication, admin panel for vehicle management, real-time availability updates, and secure Stripe payment integration. Built with robust database architecture for managing profiles, rental history, and transactions.',
    tech: ['TypeScript', 'JavaScript', 'CSS', 'React', 'Node.js', 'PostgreSQL', 'Stripe'],
    reward: 'HIGH PRIORITY',
    status: 'WANTED',
    image: '🚗',
  },
  {
    id: 2,
    name: 'Tesla Clone',
    description: 'Interactive website mirroring Tesla official site',
    longDescription: 'A challenge to recreate Tesla\'s official website with pixel-perfect animations and smooth transitions. Focuses on advanced JavaScript for header transitions, color transitions, and complex scroll animations matching the original design.',
    tech: ['JavaScript', 'HTML', 'CSS'],
    reward: 'MEDIUM PRIORITY',
    status: 'CAPTURED',
    image: '⚡',
  },
  {
    id: 3,
    name: 'X (Twitter) Clone',
    description: 'Social platform with user management and posts',
    longDescription: 'A fully functional social media clone with user registration, login, session management, logout functionality, and the ability to interact with posts through comments. Built with a complete database supporting user data and post interactions.',
    tech: ['JavaScript', 'Node.js', 'MongoDB'],
    reward: 'HIGH PRIORITY',
    status: 'ACTIVE',
    image: '🐦',
  },
]

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl sm:text-6xl font-cinzel font-black text-amber-300 mb-4">
          BOUNTY BOARD
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-red-700 via-amber-500 to-red-700 mx-auto" />
        <p className="text-amber-100/60 mt-4 text-lg">Outstanding projects & technical achievements</p>
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
      >
        {projects.map((project) => (
          <motion.div
            key={project.id}
            variants={itemVariants}
            whileHover={{ y: -10, boxShadow: '0 20px 50px rgba(189, 8, 26, 0.3)' }}
            onClick={() => setSelectedProject(project)}
            className="cursor-pointer relative group"
          >
            {/* Wanted Poster Card */}
            <div className="h-full bg-gradient-to-br from-yellow-100 via-yellow-50 to-amber-100 border-4 border-amber-900 p-6 relative overflow-hidden transition-all duration-300 transform group-hover:scale-105">
              {/* Torn Paper Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-noise pointer-events-none" />

              <div className="relative z-10">
                {/* Status Badge */}
                <div className="inline-block mb-3">
                  <span
                    className={`px-3 py-1 text-xs font-cinzel font-bold tracking-wider ${
                      project.status === 'WANTED'
                        ? 'bg-red-700 text-yellow-100'
                        : project.status === 'CAPTURED'
                          ? 'bg-green-700 text-yellow-100'
                          : 'bg-amber-700 text-yellow-100'
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                {/* Icon */}
                <div className="text-6xl mb-4 text-center">{project.image}</div>

                {/* Title */}
                <h3 className="text-2xl font-cinzel font-bold text-amber-900 mb-2">
                  {project.name}
                </h3>

                {/* Description */}
                <p className="text-amber-900/80 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Reward Info */}
                <div className="border-t-2 border-b-2 border-amber-900 py-2 mb-4">
                  <p className="text-center text-amber-900 font-cinzel font-bold text-sm">
                    REWARD: {project.reward}
                  </p>
                </div>

                {/* Tech Stack (Small) */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-1 bg-amber-900/20 border border-amber-900/40 text-amber-900 font-cinzel"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="text-xs px-2 py-1 text-amber-900 font-cinzel">
                      +{project.tech.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Decorative Corners */}
              <div className="absolute top-2 right-2 text-amber-900 opacity-30 text-xl">⭐</div>
              <div className="absolute bottom-2 left-2 text-amber-900 opacity-30 text-xl">⭐</div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-yellow-50 border-4 border-amber-900 p-8 max-w-2xl w-full max-h-96 overflow-y-auto relative"
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-2xl text-amber-900 hover:bg-amber-900/10 w-10 h-10 flex items-center justify-center"
            >
              ✕
            </motion.button>

            <div className="text-amber-900">
              <div className="text-5xl mb-4 text-center">{selectedProject.image}</div>
              <h2 className="text-3xl font-cinzel font-bold mb-2">{selectedProject.name}</h2>

              <div className="border-b-2 border-amber-900 py-2 mb-4">
                <p className="font-cinzel font-bold text-sm">
                  REWARD: {selectedProject.reward}
                </p>
              </div>

              <p className="text-sm leading-relaxed mb-4">{selectedProject.longDescription}</p>

              <div className="mb-4">
                <p className="font-cinzel font-bold text-sm mb-2">TECHNICAL ARSENAL:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-3 py-1 bg-amber-900/20 border border-amber-900/40 text-amber-900 font-cinzel"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button className="flex-1 px-4 py-2 bg-amber-900 text-yellow-100 font-cinzel font-bold text-sm hover:bg-amber-950 transition-colors">
                  VIEW CODE
                </button>
                <button className="flex-1 px-4 py-2 bg-red-700 text-yellow-100 font-cinzel font-bold text-sm hover:bg-red-800 transition-colors">
                  LIVE DEMO
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Section Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-700/50 to-transparent" />
    </section>
  )
}
