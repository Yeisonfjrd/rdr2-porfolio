'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate submission
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const socialLinks = [
    {
      name: 'GitHub',
      icon: '💻',
      url: 'https://github.com/yeisonfajardo',
      color: 'hover:text-gray-400',
    },
    {
      name: 'LinkedIn',
      icon: '💼',
      url: 'https://linkedin.com/in/yeison-fajardo',
      color: 'hover:text-blue-400',
    },
    {
      name: 'Twitter',
      icon: '🐦',
      url: 'https://twitter.com/yeisonfajardo',
      color: 'hover:text-blue-300',
    },
    {
      name: 'Email',
      icon: '📧',
      url: 'mailto:andresfajardo1606@gmail.com',
      color: 'hover:text-amber-400',
    },
  ]

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
          TELEGRAPH
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-red-700 via-amber-500 to-red-700 mx-auto" />
        <p className="text-amber-100/60 mt-4 text-lg">Send your message across the frontier</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="p-8 bg-gradient-to-br from-slate-900/60 via-slate-800/40 to-slate-900/60 border-2 border-amber-900/40 rounded-sm backdrop-blur">
            <h3 className="text-2xl font-cinzel font-bold text-amber-300 mb-6">
              Send A Telegraph
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-amber-300 font-cinzel font-bold text-sm mb-2">
                  YOUR NAME
                </label>
                <motion.input
                  whileFocus={{ boxShadow: '0 0 10px rgba(254, 172, 1, 0.3)' }}
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Marston"
                  className="w-full px-4 py-3 bg-slate-800/50 border-2 border-amber-900/40 text-amber-100 placeholder-amber-700/50 focus:border-amber-500 focus:outline-none font-cinzel transition-colors"
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-amber-300 font-cinzel font-bold text-sm mb-2">
                  EMAIL ADDRESS
                </label>
                <motion.input
                  whileFocus={{ boxShadow: '0 0 10px rgba(254, 172, 1, 0.3)' }}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@frontier.com"
                  className="w-full px-4 py-3 bg-slate-800/50 border-2 border-amber-900/40 text-amber-100 placeholder-amber-700/50 focus:border-amber-500 focus:outline-none font-cinzel transition-colors"
                  required
                />
              </div>

              {/* Subject Field */}
              <div>
                <label className="block text-amber-300 font-cinzel font-bold text-sm mb-2">
                  SUBJECT
                </label>
                <motion.input
                  whileFocus={{ boxShadow: '0 0 10px rgba(254, 172, 1, 0.3)' }}
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Job Opportunity"
                  className="w-full px-4 py-3 bg-slate-800/50 border-2 border-amber-900/40 text-amber-100 placeholder-amber-700/50 focus:border-amber-500 focus:outline-none font-cinzel transition-colors"
                  required
                />
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-amber-300 font-cinzel font-bold text-sm mb-2">
                  MESSAGE
                </label>
                <motion.textarea
                  whileFocus={{ boxShadow: '0 0 10px rgba(254, 172, 1, 0.3)' }}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about the opportunity..."
                  rows={5}
                  className="w-full px-4 py-3 bg-slate-800/50 border-2 border-amber-900/40 text-amber-100 placeholder-amber-700/50 focus:border-amber-500 focus:outline-none font-cinzel transition-colors resize-none"
                  required
                />
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{
                  scale: 1.02,
                  boxShadow: '0 0 20px rgba(189, 8, 26, 0.6)',
                }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full px-6 py-3 bg-red-700 hover:bg-red-800 text-amber-100 font-cinzel font-bold tracking-widest border-2 border-red-600 transition-all duration-300"
              >
                {submitted ? 'TELEGRAPH SENT! ✓' : 'SEND TELEGRAPH'}
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Contact Info & Social Links */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-8"
        >
          {/* Contact Details */}
          <div className="p-8 bg-gradient-to-br from-amber-900/30 via-slate-900/30 to-slate-900/30 border-2 border-amber-700/50 rounded-sm">
            <h3 className="text-2xl font-cinzel font-bold text-amber-300 mb-6">
              Direct Contact
            </h3>

            <div className="space-y-6">
              {/* Email */}
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-red-900/40 border-2 border-amber-600 flex items-center justify-center text-xl flex-shrink-0">
                  📧
                </div>
                <div>
                  <p className="text-amber-400 font-cinzel font-bold text-sm">EMAIL</p>
                  <a
                    href="mailto:andresfajardo1606@gmail.com"
                    className="text-amber-100 hover:text-amber-300 transition-colors break-all"
                  >
                    andresfajardo1606@gmail.com
                  </a>
                </div>
              </motion.div>

              {/* Location */}
              <motion.div whileHover={{ x: 5 }} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-red-900/40 border-2 border-amber-600 flex items-center justify-center text-xl flex-shrink-0">
                  📍
                </div>
                <div>
                  <p className="text-amber-400 font-cinzel font-bold text-sm">LOCATION</p>
                  <p className="text-amber-100">Buenos Aires, Argentina</p>
                </div>
              </motion.div>

              {/* Availability */}
              <motion.div whileHover={{ x: 5 }} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-900/40 border-2 border-green-600 flex items-center justify-center text-xl flex-shrink-0">
                  ✓
                </div>
                <div>
                  <p className="text-amber-400 font-cinzel font-bold text-sm">STATUS</p>
                  <p className="text-amber-100">Available for Work</p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Social Links */}
          <div className="p-8 bg-gradient-to-br from-slate-900/60 via-slate-800/40 to-slate-900/60 border-2 border-amber-900/40 rounded-sm">
            <h3 className="text-2xl font-cinzel font-bold text-amber-300 mb-6">
              Find Me Online
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 bg-slate-800/50 border-2 border-amber-900/40 text-amber-300 font-cinzel font-bold text-center hover:border-amber-600/60 transition-all duration-300 flex flex-col items-center gap-2"
                >
                  <span className="text-3xl">{link.icon}</span>
                  <span className="text-xs">{link.name}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Section Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-700/50 to-transparent" />
    </section>
  )
}
