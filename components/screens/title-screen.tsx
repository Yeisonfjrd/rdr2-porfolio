'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface TitleScreenProps {
  isTransitioning: boolean
}

const GIFS = [
  'https://media2.giphy.com/media/3oriOdderbO8gZmi2s/giphy.gif',
  'https://media0.giphy.com/media/l2Jhyg5MG2UVvwVu8/giphy.gif',
  'https://media2.giphy.com/media/QBRyW84AWxZBpqhf51/giphy.gif',
]

export default function TitleScreen({ isTransitioning }: TitleScreenProps) {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [nextIdx, setNextIdx] = useState(1)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setCurrentIdx((prev) => (prev + 1) % GIFS.length)
        setNextIdx((prev) => (prev + 1) % GIFS.length)
        setFading(false)
      }, 1800)
    }, 12000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <style>{`
        @font-face {
          font-family: 'ChineseRocks';
          src: url('/fonts/chinese-rocks.woff2') format('woff2'),
               url('/fonts/chinese-rocks.ttf') format('truetype');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }
        .font-chinese-rocks {
          font-family: 'ChineseRocks', 'Georgia', serif;
        }
      `}</style>

      <div className="relative w-full h-full overflow-hidden bg-black">

        <img
          src={GIFS[currentIdx]}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            zIndex: 1,
            opacity: fading ? 0 : 1,
            transition: 'opacity 1.8s ease',
          }}
        />

        <img
          src={GIFS[nextIdx]}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            zIndex: 2,
            opacity: fading ? 1 : 0,
            transition: 'opacity 1.8s ease',
          }}
        />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 3, background: 'rgba(55,30,5,0.48)' }}
        />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 4,
            background:
              'radial-gradient(ellipse 85% 80% at 50% 50%, transparent 28%, rgba(0,0,0,0.94) 100%)',
          }}
        />

        <svg
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 5, opacity: 0.06, width: '100%', height: '100%' }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <filter id="grain-filter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.72"
              numOctaves="4"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain-filter)" />
        </svg>

        <div
          className="absolute top-0 left-0 right-0"
          style={{ height: '22%', background: '#000', zIndex: 10 }}
        />

        <div
          className="absolute left-0 right-0 overflow-hidden pointer-events-none"
          style={{ top: 'calc(22% - 20px)', height: '28px', zIndex: 11 }}
        >
          <svg
            viewBox="0 0 1000 28"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            style={{ width: '100%', height: '100%', display: 'block' }}
          >
            <path
              d="M0,0 L1000,0 L1000,4
              Q987,7 974,3 Q960,0 947,5 Q933,10 920,4
              Q906,0 892,6 Q878,11 864,5 Q850,1 836,7
              Q822,13 808,6 Q794,2 780,8 Q766,14 751,7
              Q736,3 722,9 Q707,15 692,8 Q677,4 663,10
              Q648,15 633,9 Q618,5 604,11 Q589,16 574,10
              Q560,6 545,12 Q531,17 516,11 Q501,7 486,13
              Q472,18 457,12 Q442,8 427,14 Q413,18 398,13
              Q384,9 369,15 Q355,19 340,14 Q326,10 311,16
              Q297,20 282,15 Q267,11 253,17 Q238,21 223,16
              Q208,12 194,18 Q179,22 164,17 Q150,13 135,19
              Q120,23 105,18 Q90,14 75,20 Q60,23 45,19
              Q30,15 15,21 Q7,23 0,20 Z"
              fill="#000"
            />
          </svg>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0"
          style={{ height: '19%', background: '#000', zIndex: 10 }}
        />

        <div
          className="absolute left-0 right-0 overflow-hidden pointer-events-none"
          style={{ bottom: 'calc(19% - 20px)', height: '28px', zIndex: 11 }}
        >
          <svg
            viewBox="0 0 1000 28"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            style={{ width: '100%', height: '100%', display: 'block' }}
          >
            <path
              d="M0,28 L1000,28 L1000,24
              Q986,21 972,25 Q958,28 944,23 Q930,19 916,24
              Q902,28 888,23 Q874,19 860,25 Q846,28 831,23
              Q817,20 803,25 Q789,28 775,24 Q761,21 747,26
              Q733,28 719,24 Q705,21 691,26 Q677,28 663,24
              Q649,21 635,27 Q621,28 607,24 Q593,22 579,27
              Q565,28 551,25 Q537,22 523,27 Q510,28 496,25
              Q482,23 468,27 Q454,28 440,25 Q426,23 412,27
              Q398,28 384,25 Q370,23 356,28 Q342,28 328,25
              Q314,23 300,27 Q286,28 272,25 Q258,23 244,28
              Q230,28 216,26 Q202,24 188,28 Q174,28 160,26
              Q146,24 132,28 Q118,28 104,26 Q90,24 76,28
              Q62,28 48,26 Q34,25 20,28 Q10,28 0,27 Z"
              fill="#000"
            />
          </svg>
        </div>

        <motion.div
          className="absolute top-0 left-0 right-0 flex items-center justify-center pointer-events-none"
          style={{ height: '22%', zIndex: 20, gap: 'clamp(6px, 2vw, 20px)' }}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', lineHeight: 0.88, gap: '2px' }}>
            <span
              className="font-chinese-rocks uppercase text-[#f2ead8]"
              style={{
                fontSize: 'clamp(1.1rem, 3.8vw, 2.9rem)',
                letterSpacing: '0.04em',
                textShadow: '2px 2px 0 #000, -1px -1px 0 rgba(0,0,0,0.7), 3px 3px 8px rgba(0,0,0,0.95)',
                WebkitTextStroke: '0.5px rgba(0,0,0,0.5)',
              }}
            >
              YEISON
            </span>
            <span
              className="font-chinese-rocks uppercase text-[#f2ead8]"
              style={{
                fontSize: 'clamp(1.1rem, 3.8vw, 2.9rem)',
                letterSpacing: '0.04em',
                textShadow: '2px 2px 0 #000, -1px -1px 0 rgba(0,0,0,0.7), 3px 3px 8px rgba(0,0,0,0.95)',
                WebkitTextStroke: '0.5px rgba(0,0,0,0.5)',
              }}
            >
              FAJARDO
            </span>
          </div>

          <span
            className="font-chinese-rocks text-[#c01010]"
            style={{
              fontSize: 'clamp(2.8rem, 9.5vw, 7.2rem)',
              lineHeight: 0.82,
              alignSelf: 'center',
              textShadow: '3px 3px 0 #5a0000, 5px 5px 0 #3a0000, 0 0 20px rgba(160,0,0,0.55)',
              WebkitTextStroke: '1px #7a0000',
            }}
          >
            II
          </span>
        </motion.div>

        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ zIndex: 20 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
        >
          <span
            className="font-chinese-rocks uppercase text-[#e8dfc0]"
            style={{
              fontSize: 'clamp(0.9rem, 2.6vw, 1.7rem)',
              letterSpacing: '0.3em',
              textShadow: '2px 2px 0 rgba(0,0,0,0.95), 0 0 14px rgba(0,0,0,0.8)',
            }}
          >
            Portfolio
          </span>
        </motion.div>

        <motion.div
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
          style={{ bottom: '22%', zIndex: 20 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isTransitioning ? 0 : [0.25, 0.85, 0.25] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <p
            className="font-chinese-rocks uppercase text-[#dcc89b]/75"
            style={{
              fontSize: 'clamp(0.45rem, 1.1vw, 0.65rem)',
              letterSpacing: '0.38em',
              whiteSpace: 'nowrap',
              textShadow: '0 0 8px rgba(0,0,0,0.95)',
            }}
          >
            Pulsa cualquier tecla para continuar
          </p>
        </motion.div>

        <div
          className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4"
          style={{ height: '19%', zIndex: 20, paddingBottom: '0.4%' }}
        >
          <span
            className="font-chinese-rocks uppercase text-[#c8b68a]/70"
            style={{ fontSize: 'clamp(0.35rem, 0.8vw, 0.5rem)', letterSpacing: '0.18em' }}
          >
            Buenos Aires
          </span>
          <span
            className="font-chinese-rocks uppercase text-[#c8b68a]/70"
            style={{ fontSize: 'clamp(0.35rem, 0.8vw, 0.5rem)', letterSpacing: '0.18em' }}
          >
            2025
          </span>
        </div>

        <motion.div
          className="absolute inset-0 bg-black pointer-events-none"
          style={{ zIndex: 50 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isTransitioning ? 1 : 0 }}
          transition={{ duration: 0.8 }}
        />
      </div>
    </>
  )
}