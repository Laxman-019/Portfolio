import { useEffect, useRef } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ParticleCanvas from './components/ParticleCanvas'
import Cursor from './components/Cursor'

export default function App() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io  = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), 100)
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.1 })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <>
      <Cursor />
      <ParticleCanvas />

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <GlowDivider />
          <Skills />
          <GlowDivider />
          <Experience />
          <GlowDivider />
          <Projects />
          <GlowDivider />
          <Education />
          <GlowDivider />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}

function GlowDivider() {
  return (
    <div
      className="w-full h-px opacity-40"
      style={{ background: 'linear-gradient(to right, transparent, #00d2ff, transparent)' }}
    />
  )
}