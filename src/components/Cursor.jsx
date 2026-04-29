import { useEffect, useRef } from 'react'

export default function Cursor() {
  const cursorRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ mx: 0, my: 0, rx: 0, ry: 0 })

  useEffect(() => {
    const onMove = e => {
      pos.current.mx = e.clientX
      pos.current.my = e.clientY
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px'
        cursorRef.current.style.top  = e.clientY + 'px'
      }
    }
    document.addEventListener('mousemove', onMove)

    let raf
    const animate = () => {
      pos.current.rx += (pos.current.mx - pos.current.rx) * 0.12
      pos.current.ry += (pos.current.my - pos.current.ry) * 0.12
      if (ringRef.current) {
        ringRef.current.style.left = pos.current.rx + 'px'
        ringRef.current.style.top  = pos.current.ry + 'px'
      }
      raf = requestAnimationFrame(animate)
    }
    animate()

    const hover = () => {
      if (!ringRef.current) return
      ringRef.current.style.transform = 'translate(-50%,-50%) scale(1.8)'
      ringRef.current.style.borderColor = 'rgba(0,210,255,0.8)'
    }
    const unhover = () => {
      if (!ringRef.current) return
      ringRef.current.style.transform = 'translate(-50%,-50%) scale(1)'
      ringRef.current.style.borderColor = 'rgba(0,210,255,0.5)'
    }

    const targets = document.querySelectorAll('a, button, .skill-card, .project-card')
    targets.forEach(t => { t.addEventListener('mouseenter', hover); t.addEventListener('mouseleave', unhover) })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      targets.forEach(t => { t.removeEventListener('mouseenter', hover); t.removeEventListener('mouseleave', unhover) })
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="cursor hidden md:block" />
      <div ref={ringRef} className="cursor-ring hidden md:block" />
    </>
  )
}