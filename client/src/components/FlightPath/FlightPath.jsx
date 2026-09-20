import { useReducedMotion } from 'motion/react'
import './FlightPath.css'

export default function FlightPath() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="flight-path" aria-hidden="true">
      <svg className="flight-path-art" viewBox="0 0 1040 170" role="presentation" focusable="false">
        <g className="flight-path-cloud flight-path-cloud--one">
          {!shouldReduceMotion ? (
            <animateTransform
              attributeName="transform"
              type="translate"
              from="-190 36"
              to="1080 36"
              dur="16s"
              repeatCount="indefinite"
            />
          ) : null}
          <path d="M 0 8 C 0 3 4 0 9 0 C 12 -7 22 -8 27 -1 C 34 -4 42 0 42 8 Z" />
        </g>

        <g className="flight-path-cloud flight-path-cloud--two">
          {!shouldReduceMotion ? (
            <animateTransform
              attributeName="transform"
              type="translate"
              from="-470 104"
              to="800 104"
              dur="20s"
              repeatCount="indefinite"
            />
          ) : null}
          <path d="M 0 7 C 0 3 4 0 8 0 C 11 -5 19 -6 23 -1 C 29 -3 36 1 36 7 Z" />
        </g>

        <g className="flight-path-plane" transform="translate(520 85)">
          {!shouldReduceMotion ? (
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="-2 0 0; 2 0 0; -2 0 0"
              dur="4s"
              repeatCount="indefinite"
            />
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
