import { useEffect, useRef } from 'react'
import { useInView, useReducedMotion } from 'motion/react'
import './FlightPath.css'

const clouds = Array.from({ length: 24 }, (_, index) => ({
  y: [24, 55, 119, 150][index % 4],
  scale: [0.85, 1.25, 1, 1.5, 0.7][index % 5],
  duration: [19, 24, 17, 22][index % 4],
  progress: ((index * 7) % 24) / 24
}))
const cloudShape = 'M 0 8 C 0 3 4 0 9 0 C 12 -7 22 -8 27 -1 C 34 -4 42 0 42 8 Z'

export default function FlightPath() {
  const sceneRef = useRef(null)
  const skyRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()
  const isInView = useInView(sceneRef)

  useEffect(() => {
    if (isInView && !shouldReduceMotion) skyRef.current?.unpauseAnimations()
    else skyRef.current?.pauseAnimations()
  }, [isInView, shouldReduceMotion])

  return (
    <div
      ref={sceneRef}
      className="flight-path"
      data-playing={isInView && !shouldReduceMotion}
      aria-hidden="true"
    >
      <svg ref={skyRef} className="flight-path-art" viewBox="0 0 1040 170" focusable="false">
        {clouds.map(({ y, scale, duration, progress }, index) => (
          <g key={index} transform={`translate(${1080 - progress * 1190} ${y})`}>
            {!shouldReduceMotion && (
              <animateTransform
                attributeName="transform"
                type="translate"
                from={`1080 ${y}`}
                to={`-110 ${y}`}
                dur={`${duration}s`}
                begin={`${-progress * duration}s`}
                repeatCount="indefinite"
              />
            )}
            <path className="flight-path-cloud" transform={`scale(${scale})`} d={cloudShape} />
          </g>
        ))}
      </svg>
      <svg className="flight-path-jet" viewBox="-150 -80 300 160" focusable="false">
        <g className="flight-path-trails">
          <path d="M -145 -8 H -121 M -115 -8 H -110" />
          <path d="M -139 8 H -132 M -125 8 H -102" />
          <path d="M -148 24 H -119" />
        </g>
        <g className="flight-path-plane">
          {/* Far wing and stabilizer sit behind the fuselage. */}
          <path
            className="flight-path-plane-outline flight-path-plane-shade"
            d="M -18 -5 L -45 -36 Q -46 -39 -40 -39 L -30 -38 L 22 -6 Z"
          />
          <path
            className="flight-path-plane-outline"
            d="M -72 -9 L -89 -48 Q -90 -51 -85 -51 L -76 -50 Q -73 -50 -71 -46 L -47 -14 Z"
          />
          {/* Rounded nose and a gently curved belly give the body volume. */}
          <path
            className="flight-path-plane-outline"
            d="M -88 -12 Q -94 -12 -89 -4 Q -71 22 -38 24 L 60 24 Q 81 24 90 14 Q 94 8 86 1 L 74 -8 Q 66 -14 51 -14 L -56 -14 Z"
          />
          <path className="flight-path-plane-seam" d="M -76 8 Q -61 19 -36 19 H 65" />
          <path
            className="flight-path-plane-outline flight-path-plane-shade"
            d="M 66 -9 L 75 -7 L 86 2 H 67 Q 62 0 66 -9 Z"
          />
          {Array.from({ length: 10 }, (_, index) => (
            <rect
              key={index}
              className="flight-path-window"
              x={-44 + index * 9.5}
              y={-6}
              width="4.5"
              height="6.5"
              rx="1.5"
            />
          ))}
          <path
            className="flight-path-plane-outline"
            d="M -70 0 L -94 -7 L -98 -3 L -77 11 L -61 12"
          />
          {/* Near wing and engine overlap the body for a three-quarter view. */}
          <path
            className="flight-path-plane-outline flight-path-plane-shade"
            d="M 14 8 L -21 48 Q -23 51 -29 51 L -40 49 L -20 11 Z"
          />
          <path
            className="flight-path-plane-outline"
            d="M -8 24 L 13 24 Q 20 25 20 32 Q 20 39 13 40 L -8 39 Q -14 37 -14 31 Q -14 26 -8 24 Z"
          />
          <ellipse
            className="flight-path-plane-outline flight-path-plane-shade"
            cx="14"
            cy="32"
            rx="5"
            ry="7"
          />
          <path className="flight-path-plane-detail" d="M -81 -40 L -73 -29 M -36 46 L -27 47" />
        </g>
      </svg>
    </div>
  )
}
