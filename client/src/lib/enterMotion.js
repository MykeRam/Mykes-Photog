export const enterAnimation = (delay = 0, duration = 0.5) => ({
  initial: { opacity: 0, y: 16, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: {
    duration,
    delay,
    ease: [0.22, 1, 0.36, 1]
  }
})
