/**
 * RdrFilters — SVG filter defs compartidos.
 * Incluido en layout.tsx una sola vez via <RdrFilters />.
 *
 * Filters:
 *   #rdr-paint-sm             cards pequeñas
 *   #rdr-paint-lg             card featured
 *   #rdr-paint-bar            barra cinemática top
 *   #rdr-paint-bar-bottom     barra cinemática bottom
 *   #rdr-paint-container      borde orgánico para divs de menú (normal)
 *   #rdr-paint-container-active  borde orgánico para estado activo/hover
 */
export default function RdrFilters() {
  return (
    <svg
      style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
      aria-hidden
      focusable="false"
    >
      <defs>

        {/* ── Cards ── */}
        <filter id="rdr-paint-sm" x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.055 0.07" numOctaves="3" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="14" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        <filter id="rdr-paint-lg" x="-8%" y="-8%" width="116%" height="116%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.04 0.055" numOctaves="4" seed="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="18" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        {/* ── Barras cinemáticas ── */}
        <filter id="rdr-paint-bar" x="-2%" y="-80%" width="104%" height="260%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.015 0.11" numOctaves="4" seed="11" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="32" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        <filter id="rdr-paint-bar-bottom" x="-2%" y="-80%" width="104%" height="260%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.015 0.11" numOctaves="4" seed="17" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="32" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        {/*
          ── Paint edge para containers/cards de menú ──

          Deforma los bordes del elemento con ruido fractal orgánico.
          baseFrequency 0.025 → ondas largas = pinceladas amplias
          scale 8 → deformación visible pero que no rompe legibilidad

          Uso:
            <div style={{ filter: 'url(#rdr-paint-container)' }}>
              contenido con outline o box-shadow como borde
            </div>

          El borde debe ir en outline/box-shadow (no border CSS),
          porque el filter deforma todo el elemento y el border se pierde.
        */}
        <filter
          id="rdr-paint-container"
          x="-4%" y="-6%"
          width="108%" height="112%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.025 0.04"
            numOctaves="5"
            seed="23"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="8"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Variante activa: más deformación para el rojo seleccionado */}
        <filter
          id="rdr-paint-container-active"
          x="-5%" y="-8%"
          width="110%" height="116%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.022 0.038"
            numOctaves="5"
            seed="31"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="11"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

      </defs>
    </svg>
  )
}