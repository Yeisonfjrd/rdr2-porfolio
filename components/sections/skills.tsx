'use client'

import { motion } from 'framer-motion'

interface Skill {
  name: string
  icon: string
  level: number
  category: string
}

const skills: Skill[] = [
  // Languages
  { name: 'TypeScript', icon: '📘', level: 95, category: 'Languages' },
  { name: 'JavaScript', icon: '⚡', level: 98, category: 'Languages' },
  { name: 'Python', icon: '🐍', level: 75, category: 'Languages' },

  // Frontend
  { name: 'React', icon: '⚛️', level: 95, category: 'Frontend' },
  { name: 'Next.js', icon: '▲', level: 90, category: 'Frontend' },
  { name: 'Tailwind CSS', icon: '🎨', level: 95, category: 'Frontend' },

  // Backend
  { name: 'Node.js', icon: '🟢', level: 92, category: 'Backend' },
  { name: 'Express', icon: '🔗', level: 90, category: 'Backend' },
  { name: 'Go', icon: '🐹', level: 70, category: 'Backend' },

  // Databases
  { name: 'PostgreSQL', icon: '🐘', level: 88, category: 'Databases' },
  { name: 'MongoDB', icon: '🍃', level: 85, category: 'Databases' },
  { name: 'Redis', icon: '🔴', level: 75, category: 'Databases' },

  // Tools & DevOps
  { name: 'Git', icon: '📦', level: 90, category: 'Tools' },
  { name: 'Docker', icon: '🐳', level: 80, category: 'Tools' },
  { name: 'AWS', icon: '☁️', level: 75, category: 'Tools' },
]

export default function Skills() {
  const categories = [...new Set(skills.map((s) => s.category))]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
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
          ARSENAL
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-red-700 via-amber-500 to-red-700 mx-auto" />
        <p className="text-amber-100/60 mt-4 text-lg">Weapons & Tools of the Trade</p>
      </motion.div>

      {/* Skills by Category */}
      {categories.map((category, catIndex) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: catIndex * 0.1 }}
          className="mb-16"
        >
          {/* Category Title */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-gradient-to-r from-amber-700/50 to-transparent" />
            <h3 className="text-2xl font-cinzel font-bold text-amber-300 px-4">
              {category}
            </h3>
            <div className="flex-1 h-px bg-gradient-to-l from-amber-700/50 to-transparent" />
          </div>

          {/* Skills Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {skills
              .filter((skill) => skill.category === category)
              .map((skill) => (
                <motion.div
                  key={skill.name}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className="p-6 bg-gradient-to-br from-slate-800/60 via-slate-800/30 to-slate-900/60 border-2 border-amber-900/40 rounded-sm backdrop-blur transition-all duration-300 hover:border-amber-600/60 hover:shadow-lg hover:shadow-amber-900/30"
                >
                  {/* Skill Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <p className="text-amber-400 font-cinzel font-bold text-sm tracking-widest mb-1">
                        PROFICIENCY
                      </p>
                      <h4 className="text-xl font-cinzel font-bold text-amber-100 flex items-center gap-2">
                        <span className="text-2xl">{skill.icon}</span>
                        {skill.name}
                      </h4>
                    </div>
                    <motion.div
                      className="text-2xl font-cinzel font-bold text-amber-400"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {skill.level}%
                    </motion.div>
                  </div>

                  {/* Progress Bar */}
                  <div className="relative h-3 bg-slate-900/50 border border-amber-900/30 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-red-700 via-amber-500 to-red-700"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                    />
                    {/* Shimmer Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: ['0%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>

                  {/* Proficiency Text */}
                  <p className="text-xs text-amber-100/60 mt-3 text-right font-cinzel">
                    {skill.level > 90
                      ? 'MASTER LEVEL'
                      : skill.level > 80
                        ? 'EXPERT'
                        : 'PROFICIENT'}
                  </p>
                </motion.div>
              ))}
          </motion.div>
        </motion.div>
      ))}

      {/* Summary Box */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-16 p-8 bg-gradient-to-br from-red-900/30 via-amber-900/20 to-slate-900/30 border-2 border-amber-700/50 rounded-sm"
      >
        <h3 className="text-2xl font-cinzel font-bold text-amber-300 mb-4">Quick Facts</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div whileHover={{ scale: 1.05 }} className="text-center">
            <p className="text-4xl font-cinzel font-bold text-amber-400 mb-2">15+</p>
            <p className="text-amber-100/70">Technology Proficiencies</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="text-center">
            <p className="text-4xl font-cinzel font-bold text-amber-400 mb-2">3</p>
            <p className="text-amber-100/70">Years Professional Experience</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="text-center">
            <p className="text-4xl font-cinzel font-bold text-amber-400 mb-2">∞</p>
            <p className="text-amber-100/70">Passion for Learning</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Section Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-700/50 to-transparent" />
    </section>
  )
}
