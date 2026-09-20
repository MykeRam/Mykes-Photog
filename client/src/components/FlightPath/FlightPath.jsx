import { useReducedMotion } from 'motion/react'
import './FlightPath.css'

const flightPath =
  'M 520 22 C 760 22 930 50 930 85 C 930 120 760 148 520 148 C 280 148 110 120 110 85 C 110 50 280 22 520 22 Z'

export default function FlightPath() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="flight-path" aria-hidden="true">
      <svg className="flight-path-art" viewBox="0 0 1040 170" role="presentation" focusable="false">
        <path id="flight-path-route" className="flight-path-route" d={flightPath} />
        <path className="flight-path-accent" d={flightPath} pathLength="1" />

        <g className="flight-path-plane" transform="translate(520 22)">
          {!shouldReduceMotion ? (
            <animateMotion
              dur="10s"
              rotate="auto"
              repeatCount="indefinite"
              calcMode="spline"
              keyTimes="0;1"
              keySplines="0.45 0 0.55 1"
            >
              <mpath href="#flight-path-route" />
            </animateMotion>
          ) : null}
          <path
            className="flight-path-plane-outline"
            d="M 0 0 L 32 -4 L 52 -16 L 47 -3 L 70 0 L 47 3 L 52 16 L 32 4 Z"
          />
          <path className="flight-path-plane-detail" d="M 31 -3 L 47 0 L 31 3" />
        </g>
      </svg>
    </div>
  )
}
