import { useEffect, useRef } from 'react'

export default function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let W, H, raf
    const particles = []

    const resize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    class Particle {
      reset() {
        this.x = Math.random() * W
        this.y = Math.random() * H
        this.r = Math.random() * 1.5 + 0.3
        this.vx = (Math.random() - 0.5) * 0.3
        this.vy = (Math.random() - 0.5) * 0.3
        this.life = 0
        this.maxLife = 300 + Math.random() * 400
        this.color = Math.random() > 0.6 ? '0,210,255' : '124,58,237'
      }
      constructor() { this.reset() }
      update() {
        this.x += this.vx; this.y += this.vy; this.life++
        if (this.life > this.maxLife || this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset()
      }
      draw() {
        const a = Math.sin((this.life / this.maxLife) * Math.PI) * 0.6
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${this.color},${a})`
        ctx.fill()
      }
    }

    for (let i = 0; i < 100; i++) particles.push(new Particle())

    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(0,210,255,0.025)'
      ctx.lineWidth   = 1
      for (let x = 0; x < W; x += 80) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke() }
      for (let y = 0; y < H; y += 80) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke() }
    }

    const connect = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d  = Math.sqrt(dx * dx + dy * dy)
          if (d < 100) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(0,210,255,${0.08 * (1 - d / 100)})`
            ctx.lineWidth   = 0.5
            ctx.stroke()
          }
        }
      }
    }

    const loop = () => {
      ctx.clearRect(0, 0, W, H)
      drawGrid()
      particles.forEach(p => { p.update(); p.draw() })
      connect()
      raf = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0 opacity-40 pointer-events-none"
    />
  )
}