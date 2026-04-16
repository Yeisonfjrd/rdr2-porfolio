'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: '',
  })
  const [enviado, setEnviado] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setEnviado(true)
    setTimeout(() => {
      setEnviado(false)
      setFormData({ nombre: '', email: '', mensaje: '' })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[#bb0000] text-sm tracking-widest mb-4">
            CONTACTO
          </p>
          
          <h2 className="text-[#dcc09a] text-4xl font-medium mb-8">
            Hablemos
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[#7a7d77] text-sm mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#28251c] border border-[#3a3529] text-[#dcc09a] focus:border-[#bb0000] focus:outline-none transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-[#7a7d77] text-sm mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#28251c] border border-[#3a3529] text-[#dcc09a] focus:border-[#bb0000] focus:outline-none transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-[#7a7d77] text-sm mb-2">
                  Mensaje
                </label>
                <textarea
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-[#28251c] border border-[#3a3529] text-[#dcc09a] focus:border-[#bb0000] focus:outline-none transition-colors resize-none"
                />
              </div>
              
              <motion.button
                type="submit"
                className="w-full px-6 py-3 bg-[#bb0000] text-[#dcc09a] text-sm tracking-wider hover:bg-[#8a0000] transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {enviado ? 'MENSAJE ENVIADO' : 'ENVIAR MENSAJE'}
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-[#dcc09a] text-lg mb-4">Informacion de Contacto</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-[#7a7d77] text-sm">Email</p>
                  <a 
                    href="mailto:andresfajardo1606@gmail.com"
                    className="text-[#dcc09a] hover:text-[#bb0000] transition-colors"
                  >
                    andresfajardo1606@gmail.com
                  </a>
                </div>
                
                <div>
                  <p className="text-[#7a7d77] text-sm">Ubicacion</p>
                  <p className="text-[#dcc09a]">Buenos Aires, Argentina</p>
                </div>
                
                <div>
                  <p className="text-[#7a7d77] text-sm">Estado</p>
                  <p className="text-[#bb0000]">Disponible para trabajar</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-[#dcc09a] text-lg mb-4">Redes</h3>
              
              <div className="flex gap-4">
                <a
                  href="https://github.com/Yeisonfjrd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-[#3a3529] text-[#7a7d77] text-sm hover:text-[#dcc09a] hover:bg-[#28251c] transition-colors"
                >
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/yeison-fajardo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-[#3a3529] text-[#7a7d77] text-sm hover:text-[#dcc09a] hover:bg-[#28251c] transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
