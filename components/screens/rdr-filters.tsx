/**
 * RdrFilters — SVG filter defs compartidos.
 * Incluilo en layout.tsx una sola vez:
 *   import RdrFilters from '@/components/rdr-filters'
 *   <RdrFilters />
 *
 * Cualquier componente puede luego usar:
 *   filter: url(#rdr-paint-sm)
 *   filter: url(#rdr-paint-lg)
 *   filter: url(#rdr-paint-bar)
 */
export default function RdrFilters() {
    return (
      <svg
        style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
        aria-hidden
        focusable="false"
      >
        <defs>
          {/* Cards pequeñas: displacement suave */}
          <filter
            id="rdr-paint-sm"
            x="-10%" y="-10%"
            width="120%" height="120%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.055 0.07"
              numOctaves="3"
              seed="7"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="14"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
  
          {/* Card featured (grande): displacement un poco más fuerte */}
          <filter
            id="rdr-paint-lg"
            x="-8%" y="-8%"
            width="116%" height="116%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.04 0.055"
              numOctaves="4"
              seed="3"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="18"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
  
          {/*
            Barras cinematográficas (title screen / menus):
            baseFrequency baja en X → ondas largas horizontales (como manchas de pintura)
            alta en Y → variación rápida vertical (como goteos/salpicaduras)
            scale 32 → deformación agresiva que da el look de RDR2
          */}
          <filter
            id="rdr-paint-bar"
            x="-2%" y="-80%"
            width="104%" height="260%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.015 0.11"
              numOctaves="4"
              seed="11"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="32"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
  
          {/* Barra inferior con seed diferente para que se vea distinta */}
          <filter
            id="rdr-paint-bar-bottom"
            x="-2%" y="-80%"
            width="104%" height="260%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.015 0.11"
              numOctaves="4"
              seed="17"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="32"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
    )
  }