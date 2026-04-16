'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface Project {
  id: number
  nombre: string
  descripcion: string
  tecnologias: string[]
  estado: string
  github?: string
  demo?: string
}

const proyectos: Project[] = [
  {
    id: 1,
    nombre: 'RoadEra',
    descripcion: 'Plataforma de alquiler de autos de lujo con reservas en tiempo real, autenticacion de usuarios, panel de administracion y pagos con Stripe.',
    tecnologias: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Stripe'],
    estado: 'Completado',
    github: 'https://github.com/Yeisonfjrd',
  },
  {
    id: 2,
    nombre: 'Tesla Clone',
    descripcion: 'Replica interactiva del sitio oficial de Tesla con animaciones avanzadas, transiciones de scroll y diseno pixel-perfect.',
    tecnologias: ['JavaScript', 'HTML', 'CSS'],
    estado: 'Completado',
    github: 'https://github.com/Yeisonfjrd',
  },
  {
    id: 3,
    nombre: 'X Clone',
    descripcion: 'Clon funcional de Twitter con registro de usuarios, autenticacion, publicacion de posts y sistema de comentarios.',
    tecnologias: ['JavaScript', 'Node.js', 'MongoDB', 'Express'],
    estado: 'En desarrollo',
    github: 'https://github.com/Yeisonfjrd',
  },
]

export default function Projects() {
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState<Project | null>(null)

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[#bb0000] text-sm tracking-widest mb-4">
            PORTAFOLIO
          </p>
          
          <h2 className="text-[#dcc09a] text-4xl font-medium mb-8">
            Proyectos
          </h2>
        </motion.div>

        <div className="space-y-4">
          {proyectos.map((proyecto, index) => (
            <motion.div
              key={proyecto.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onClick={() => setProyectoSeleccionado(proyecto)}
              className="p-6 bg-[#28251c] border border-[#3a3529] cursor-pointer hover:bg-[#2f2c23] transition-colors group"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-[#dcc09a] text-xl group-hover:text-white transition-colors">
                  {proyecto.nombre}
                </h3>
                <span className={`text-xs px-2 py-1 ${
                  proyecto.estado === 'Completado' 
                    ? 'text-green-400 bg-green-900/20' 
                    : 'text-[#bb0000] bg-red-900/20'
                }`}>
                  {proyecto.estado}
                </span>
              </div>
              
              <p className="text-[#7a7d77] text-sm mb-4">
                {proyecto.descripcion}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {proyecto.tecnologias.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-1 text-[#7a7d77] border border-[#3a3529]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {proyectoSeleccionado && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
            onClick={() => setProyectoSeleccionado(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-[#28251c] border border-[#3a3529] p-8 max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-[#dcc09a] text-2xl">{proyectoSeleccionado.nombre}</h3>
                <button
                  onClick={() => setProyectoSeleccionado(null)}
                  className="text-[#7a7d77] hover:text-[#dcc09a] text-xl"
                >
                  X
                </button>
              </div>
              
              <p className="text-[#7a7d77] mb-6">{proyectoSeleccionado.descripcion}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {proyectoSeleccionado.tecnologias.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-1 text-[#dcc09a] border border-[#3a3529]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-4">
                {proyectoSeleccionado.github && (
                  <a
                    href={proyectoSeleccionado.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#3a3529] text-[#dcc09a] text-sm hover:bg-[#4a4539] transition-colors"
                  >
                    Ver Codigo
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
