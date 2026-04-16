'use client'

import { motion } from 'framer-motion'

interface TimelineEvent {
  date: string
  title: string
  organization: string
  description: string
  icon: string
  type: 'education' | 'work' | 'achievement'
}

const timeline: TimelineEvent[] = [
  {
    date: 'January 2022',
    title: 'Desarrollo Web 1',
    organization: 'Aprende Programando & UTN',
    description: 'Learned HTML, CSS, and JavaScript fundamentals. Created static and dynamic web pages.',
    icon: '📚',
    type: 'education',
  },
  {
    date: 'December 2022',
    title: 'Desarrollo Web 2',
    organization: 'Aprende Programando & UTN',
    description: 'Advanced web development with JavaScript and MySQL database management.',
    icon: '⚙️',
    type: 'education',
  },
  {
    date: 'July 2023',
    title: 'Desarrollo Web 3',
    organization: 'Aprende Programando',
    description: 'Mastered React for building interactive and efficient user interfaces.',
    icon: '⚛️',
    type: 'education',
  },
  {
    date: 'December 2023',
    title: 'Desarrollo Web 4 & Python',
    organization: 'Aprende Programando',
    description: 'Backend specialization with Node.js, Express, PostgreSQL, MongoDB, JWT authentication.',
    icon: '🐍',
    type: 'education',
  },
  {
    date: 'January 2025',
    title: 'Big O & Algorithms',
    organization: 'Udemy',
    description: 'Mastered algorithm optimization, data structures, and interview preparation.',
    icon: '🧮',
    type: 'achievement',
  },
  {
    date: 'Present',
    title: 'Full Stack Developer',
    organization: 'Open to Opportunities',
    description: 'Available for work. Specialized in scalable web architecture and modern technologies.',
    icon: '🚀',
    type: 'work',
  },
]

export default function Experience() {
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
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl sm:text-6xl font-cinzel font-black text-amber-300 mb-4">
          TIMELINE
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-red-700 via-amber-500 to-red-700 mx-auto" />
        <p className="text-amber-100/60 mt-4 text-lg">The path that shaped this frontier man</p>
      </motion.div>

      {/* Timeline */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        className="relative"
      >
        {/* Vertical Line */}
        <div className="absolute left-0 sm:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-700 via-red-700 to-amber-700 sm:-translate-x-1/2" />

        {/* Timeline Events */}
        {timeline.map((event, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className={`mb-8 flex ${index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
          >
            {/* Content */}
            <div className={`w-full sm:w-1/2 ${index % 2 === 0 ? 'sm:pr-8' : 'sm:pl-8'} pl-12 sm:pl-0`}>
              <motion.div
                whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(189, 8, 26, 0.3)' }}
                className="p-6 bg-gradient-to-br from-slate-900/60 via-slate-800/40 to-slate-900/60 border-2 border-amber-900/40 rounded-sm backdrop-blur transition-all duration-300"
              >
                {/* Badge */}
                <div className="inline-block mb-3">
                  <span
                    className={`px-3 py-1 text-xs font-cinzel font-bold tracking-widest ${
                      event.type === 'education'
                        ? 'bg-blue-900/60 text-blue-300'
                        : event.type === 'work'
                          ? 'bg-green-900/60 text-green-300'
                          : 'bg-purple-900/60 text-purple-300'
                    }`}
                  >
                    {event.type === 'education'
                      ? '📖 EDUCATION'
                      : event.type === 'work'
                        ? '💼 WORK'
                        : '⭐ ACHIEVEMENT'}
                  </span>
                </div>

                {/* Date */}
                <p className="text-amber-400 font-cinzel font-bold text-xs tracking-widest mb-2">
                  {event.date}
                </p>

                {/* Title */}
                <h3 className="text-xl font-cinzel font-bold text-amber-200 mb-1">
                  {event.title}
                </h3>

                {/* Organization */}
                <p className="text-amber-300/70 text-sm mb-2 font-semibold">
                  {event.organization}
                </p>

                {/* Description */}
                <p className="text-amber-100/70 text-sm leading-relaxed">
                  {event.description}
                </p>
              </motion.div>
            </div>

            {/* Timeline Dot */}
            <div className="flex justify-center items-start sm:items-center relative">
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="w-6 h-6 rounded-full bg-gradient-to-br from-red-700 to-red-900 border-3 border-amber-500 flex items-center justify-center flex-shrink-0"
              >
                <span className="text-xs">{event.icon}</span>
              </motion.div>
            </div>
          </motion.div>
        ))}

        {/* End Point */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="relative flex justify-center items-center mt-12"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-red-700 border-3 border-amber-300 flex items-center justify-center">
            <span className="text-xl">✓</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Educational Focus */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-16 p-8 bg-gradient-to-br from-blue-900/30 via-slate-900/30 to-blue-900/30 border-2 border-blue-700/50 rounded-sm"
      >
        <h3 className="text-2xl font-cinzel font-bold text-amber-300 mb-4">Continuous Learning</h3>
        <p className="text-amber-100/70 mb-4">
          A commitment to growth drives everything I do. From university studies in Software Development at UPE to specialized courses in algorithms and advanced web technologies, my education is ongoing and passion-driven.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Learn Daily', 'Code Better', 'Solve Hard Problems', 'Build Scale'].map((trait) => (
            <motion.div
              key={trait}
              whileHover={{ scale: 1.05 }}
              className="px-4 py-3 bg-slate-800/50 border border-amber-600/40 text-amber-300 font-cinzel font-bold text-xs text-center"
            >
              {trait}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Section Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-700/50 to-transparent" />
    </section>
  )
}
