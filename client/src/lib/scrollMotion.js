const sectionScrollDurationMs = 1200
export let cancelSectionScroll = () => {}

export function scrollToPosition(targetTop, behavior = 'smooth') {
  cancelSectionScroll()
  const top = Math.min(
    Math.max(0, targetTop),
    Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
  )
  const start = window.scrollY
  const distance = top - start

  if (behavior !== 'smooth' || Math.abs(distance) < 1) {
    window.scrollTo({ top, behavior: 'instant' })
    return
  }

  let frameId = 0
  const startedAt = performance.now()
  const cancel = () => {
    window.cancelAnimationFrame(frameId)
    window.removeEventListener('wheel', cancel)
    window.removeEventListener('touchstart', cancel)
    window.removeEventListener('pointerdown', cancel)
    window.removeEventListener('keydown', onKeyDown)
    window.removeEventListener('resize', cancel)
    cancelSectionScroll = () => {}
  }
  const onKeyDown = (event) => {
    if (
      ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' ', 'Escape', 'Tab'].includes(
        event.key
      )
    ) {
      cancel()
    }
  }
  const step = (now) => {
    const progress = Math.min((now - startedAt) / sectionScrollDurationMs, 1)
    const eased = progress < 0.5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2
    window.scrollTo({ top: start + distance * eased, behavior: 'instant' })
    if (progress < 1) frameId = window.requestAnimationFrame(step)
    else cancel()
  }

  cancelSectionScroll = cancel
  window.addEventListener('wheel', cancel, { passive: true })
  window.addEventListener('touchstart', cancel, { passive: true })
  window.addEventListener('pointerdown', cancel, { passive: true })
  window.addEventListener('keydown', onKeyDown)
  window.addEventListener('resize', cancel)
  frameId = window.requestAnimationFrame(step)
}
