'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function About() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const y = useTransform(scrollYProgress, [0, 1], [50, 0])

  const journalEntries = [
    {
      date: '19 years old',
      title: 'The Journey Begins',
      content: 'Started passionate about creating innovative solutions through code. Every line written brings me closer to mastery.',
      icon: '🎯',
    },
    {
      date: '3 Years',
      title: 'Professional Experience',
      content: 'Building advanced web applications with focus on user experience and scalable architecture. Led teams to deliver enterprise solutions.',
      icon: '💼',
    },
    {
      date: 'Current',
      title: 'Full Stack Master',
      content: 'Specialized in TypeScript, React, Node.js, and modern frameworks. Obsessed with clean code and elegant solutions.',
      icon: '⚡',
    },
  ]

  return (
    <section ref={containerRef} className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl sm:text-6xl font-cinzel font-black text-amber-300 mb-4">
          ARTHUR'S JOURNAL
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-red-700 via-amber-500 to-red-700 mx-auto" />
        <p className="text-amber-100/60 mt-4 text-lg">Personal thoughts of a man shaping his future</p>
      </motion.div>

      {/* Journal Entries */}
      <div className="space-y-8">
        {journalEntries.map((entry, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className={`flex gap-6 items-start ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}
          >
            {/* Timeline Dot */}
            <div className="flex flex-col items-center">
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-red-700 to-red-900 border-3 border-amber-500 flex items-center justify-center text-xl flex-shrink-0"
              >
                {entry.icon}
              </motion.div>
              {index < journalEntries.length - 1 && (
                <div className="w-1 h-24 bg-gradient-to-b from-amber-600 to-transparent mt-2" />
              )}
            </div>

            {/* Content Card */}
            <motion.div
              whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(189, 8, 26, 0.4)' }}
              className="flex-1 p-6 bg-gradient-to-br from-slate-900/60 via-slate-800/40 to-slate-900/60 border-2 border-amber-900/40 backdrop-blur rounded-sm transition-all duration-300"
            >
              <p className="text-amber-400 font-cinzel font-bold text-sm tracking-widest mb-2">
                {entry.date}
              </p>
              <h3 className="text-2xl font-cinzel font-bold text-amber-200 mb-2">
                {entry.title}
              </h3>
              <p className="text-amber-100/70 leading-relaxed">{entry.content}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Skills Summary */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-16 p-8 bg-gradient-to-br from-red-900/30 via-amber-900/20 to-slate-900/30 border-2 border-amber-700/50 rounded-sm"
      >
        <h3 className="text-2xl font-cinzel font-bold text-amber-300 mb-4">Technical Arsenal</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {['JavaScript', 'TypeScript', 'React', 'Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'AWS'].map(
            (skill) => (
              <motion.div
                key={skill}
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 bg-slate-800/50 border border-amber-600/40 text-amber-300 font-cinzel font-bold text-sm text-center"
              >
                {skill}
              </motion.div>
            )
          )}
        </div>
      </motion.div>

      {/* Decorative Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-700/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-700/50 to-transparent" />
    </section>
  )
}
