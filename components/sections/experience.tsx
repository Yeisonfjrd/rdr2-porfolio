'use client'

import { motion } from 'framer-motion'

interface TimelineItem {
  fecha: string
  titulo: string
  organizacion: string
  descripcion: string
  tipo: 'educacion' | 'trabajo' | 'logro'
}

const timeline: TimelineItem[] = [
  {
    fecha: 'Enero 2022',
    titulo: 'Desarrollo Web 1',
    organizacion: 'Aprende Programando & UTN',
    descripcion: 'Fundamentos de HTML, CSS y JavaScript. Creacion de paginas web estaticas y dinamicas.',
    tipo: 'educacion',
  },
  {
    fecha: 'Diciembre 2022',
    titulo: 'Desarrollo Web 2',
    organizacion: 'Aprende Programando & UTN',
    descripcion: 'JavaScript avanzado y gestion de bases de datos con MySQL.',
    tipo: 'educacion',
  },
  {
    fecha: 'Julio 2023',
    titulo: 'Desarrollo Web 3',
    organizacion: 'Aprende Programando',
    descripcion: 'React para construccion de interfaces de usuario interactivas y eficientes.',
    tipo: 'educacion',
  },
  {
    fecha: 'Diciembre 2023',
    titulo: 'Desarrollo Web 4 & Python',
    organizacion: 'Aprende Programando',
    descripcion: 'Backend con Node.js, Express, PostgreSQL, MongoDB y autenticacion JWT.',
    tipo: 'educacion',
  },
  {
    fecha: 'Enero 2025',
    titulo: 'Algoritmos y Estructuras de Datos',
    organizacion: 'Udemy',
    descripcion: 'Optimizacion de algoritmos, estructuras de datos y preparacion para entrevistas tecnicas.',
    tipo: 'logro',
  },
  {
    fecha: 'Presente',
    titulo: 'Desarrollador Full Stack',
    organizacion: 'Disponible',
    descripcion: 'Buscando oportunidades laborales. Especializado en arquitectura web escalable y tecnologias modernas.',
    tipo: 'trabajo',
  },
]

export default function Experience() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[#bb0000] text-sm tracking-widest mb-4">
            TRAYECTORIA
          </p>
          
          <h2 className="text-[#dcc09a] text-4xl font-medium mb-8">
            Experiencia
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-[#3a3529]" />
          
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="pl-8 relative"
              >
                <div className="absolute left-0 top-2 w-2 h-2 bg-[#bb0000] -translate-x-1/2" />
                
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[#7a7d77] text-sm">{item.fecha}</span>
                  <span className={`text-xs px-2 py-0.5 ${
                    item.tipo === 'educacion' 
                      ? 'text-blue-400 bg-blue-900/20'
                      : item.tipo === 'trabajo'
                        ? 'text-green-400 bg-green-900/20'
                        : 'text-[#bb0000] bg-red-900/20'
                  }`}>
                    {item.tipo === 'educacion' ? 'Educacion' : item.tipo === 'trabajo' ? 'Trabajo' : 'Logro'}
                  </span>
                </div>
                
                <h3 className="text-[#dcc09a] text-lg mb-1">{item.titulo}</h3>
                <p className="text-[#7a7d77] text-sm mb-2">{item.organizacion}</p>
                <p className="text-[#7a7d77] text-sm">{item.descripcion}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
