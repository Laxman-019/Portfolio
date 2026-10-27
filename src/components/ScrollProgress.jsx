import { useEffect, useRef } from 'react'


export default function ScrollProgress() {
  const bar = useRef(null)

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const el = document.documentElement
      const max = el.scrollHeight - el.clientHeight
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      if (bar.current) bar.current.style.transform = `scaleX(${progress})`
    }


    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-70 hidden h-[3px] md:block">
      <div
        ref={bar}
        style={{ transform: 'scaleX(0)' }}
        className="h-full origin-left bg-linear-to-r from-accent-deep to-accent will-change-transform"
      />
    </div>
  )
}