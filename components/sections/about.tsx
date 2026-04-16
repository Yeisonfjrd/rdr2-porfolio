'use client'

import { motion } from 'framer-motion'

export default function About() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[#bb0000] text-sm tracking-widest mb-4">
            SOBRE MI
          </p>
          
          <h2 className="text-[#dcc09a] text-4xl font-medium mb-8">
            Perfil Profesional
          </h2>
          
          <div className="space-y-6 text-[#7a7d77] leading-relaxed">
            <p>
              Soy un desarrollador full stack con 3 anos de experiencia creando 
              aplicaciones web modernas y escalables. Mi enfoque se centra en 
              escribir codigo limpio, mantenible y eficiente.
            </p>
            
            <p>
              Especializado en TypeScript, React y Node.js, he trabajado en 
              proyectos que van desde plataformas de alquiler de vehiculos hasta 
              clones de redes sociales con arquitecturas complejas.
            </p>
            
            <p>
              Actualmente estudio Desarrollo de Software en la Universidad 
              Provincial de Ezeiza mientras continuo expandiendo mis conocimientos 
              en algoritmos, estructuras de datos y arquitectura de sistemas.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-12 pt-8 border-t border-[#3a3529]"
        >
          <h3 className="text-[#dcc09a] text-xl mb-6">Informacion Personal</h3>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-[#7a7d77] text-sm">Nombre</p>
              <p className="text-[#dcc09a]">Yeison Andres Fajardo</p>
            </div>
            <div>
              <p className="text-[#7a7d77] text-sm">Edad</p>
              <p className="text-[#dcc09a]">19 anos</p>
            </div>
            <div>
              <p className="text-[#7a7d77] text-sm">Ubicacion</p>
              <p className="text-[#dcc09a]">Buenos Aires, Argentina</p>
            </div>
            <div>
              <p className="text-[#7a7d77] text-sm">Disponibilidad</p>
              <p className="text-[#bb0000]">Disponible para trabajar</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-12 pt-8 border-t border-[#3a3529]"
        >
          <h3 className="text-[#dcc09a] text-xl mb-6">Idiomas</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[#dcc09a]">Espanol</span>
              <span className="text-[#7a7d77] text-sm">Nativo</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#dcc09a]">Ingles</span>
              <span className="text-[#7a7d77] text-sm">Intermedio</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
