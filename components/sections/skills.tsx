'use client'

import { motion } from 'framer-motion'

interface Skill {
  nombre: string
  nivel: number
}

interface SkillCategory {
  categoria: string
  habilidades: Skill[]
}

const skillCategories: SkillCategory[] = [
  {
    categoria: 'Lenguajes',
    habilidades: [
      { nombre: 'TypeScript', nivel: 95 },
      { nombre: 'JavaScript', nivel: 98 },
      { nombre: 'Python', nivel: 75 },
    ],
  },
  {
    categoria: 'Frontend',
    habilidades: [
      { nombre: 'React', nivel: 95 },
      { nombre: 'Next.js', nivel: 90 },
      { nombre: 'Tailwind CSS', nivel: 95 },
    ],
  },
  {
    categoria: 'Backend',
    habilidades: [
      { nombre: 'Node.js', nivel: 92 },
      { nombre: 'Express', nivel: 90 },
      { nombre: 'Go', nivel: 70 },
    ],
  },
  {
    categoria: 'Bases de Datos',
    habilidades: [
      { nombre: 'PostgreSQL', nivel: 88 },
      { nombre: 'MongoDB', nivel: 85 },
      { nombre: 'Redis', nivel: 75 },
    ],
  },
  {
    categoria: 'Herramientas',
    habilidades: [
      { nombre: 'Git', nivel: 90 },
      { nombre: 'Docker', nivel: 80 },
      { nombre: 'AWS', nivel: 75 },
    ],
  },
]

export default function Skills() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[#bb0000] text-sm tracking-widest mb-4">
            COMPETENCIAS
          </p>
          
          <h2 className="text-[#dcc09a] text-4xl font-medium mb-8">
            Habilidades
          </h2>
        </motion.div>

        <div className="space-y-10">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.categoria}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: catIndex * 0.1, duration: 0.5 }}
            >
              <h3 className="text-[#dcc09a] text-lg mb-4 pb-2 border-b border-[#3a3529]">
                {category.categoria}
              </h3>
              
              <div className="space-y-4">
                {category.habilidades.map((skill) => (
                  <div key={skill.nombre}>
                    <div className="flex justify-between mb-2">
                      <span className="text-[#dcc09a] text-sm">{skill.nombre}</span>
                      <span className="text-[#7a7d77] text-sm">{skill.nivel}%</span>
                    </div>
                    <div className="h-1 bg-[#28251c] overflow-hidden">
                      <motion.div
                        className="h-full bg-[#bb0000]"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.nivel}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
