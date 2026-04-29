export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center px-4 sm:px-8 lg:px-20
                 pt-28 pb-12 overflow-hidden"
    >
     
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                   w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #00d2ff 0%, transparent 70%)' }}
      />

      <div className="relative max-w-5xl w-full">
      
        <p className="animate-fade-up-1 font-mono text-xs text-[#00d2ff] tracking-[0.2em] uppercase
                      mb-5 flex items-center gap-3">
          <span className="inline-block w-10 h-px bg-[#00d2ff]" />
          B.Tech CSE · Full-Stack Developer
        </p>

       
        <h1
          className="glitch animate-fade-up-2 font-display font-extrabold leading-none
                     tracking-tight text-[clamp(3rem,10vw,7.5rem)]"
          data-text="Laxman Chourasia"
        >
          <span className="block text-[#e8eef8]">Laxman</span>
          <span
            className="block"
            style={{
              background: 'linear-gradient(120deg,#00d2ff,#7c3aed)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Chourasia
          </span>
        </h1>

        
        <p className="animate-fade-up-3 text-muted text-base sm:text-lg leading-relaxed
                      max-w-xl mt-6">
          I build digital experiences — from interactive web apps and AI chatbots
          to full-stack platforms. Exploring data science and shipping products that matter.
        </p>

        
        <div className="animate-fade-up-4 flex flex-wrap gap-4 mt-8">
          <a
            href="#projects"
            className="btn-clip bg-[#00d2ff] text-black font-mono font-bold text-xs
                       tracking-widest uppercase px-8 py-3.5 transition-all duration-200
                       hover:bg-white hover:-translate-y-0.5"
          >
            View Projects
          </a>
          <a
            href="mailto:lxmnchourasia@gmail.com"
            className="border border-[rgba(0,210,255,0.25)] text-[#e8eef8] font-mono text-xs
                       tracking-widest uppercase px-8 py-3.5 transition-all duration-200
                       hover:border-[#00d2ff] hover:text-[#00d2ff] hover:-translate-y-0.5"
          >
            Get in Touch
          </a>
        </div>

       
        <div
          className="animate-fade-up-5 flex flex-wrap gap-8 sm:gap-12 mt-12 pt-8
                     border-t border-[rgba(0,210,255,0.12)]"
        >
          {[
            { num: '3+', label: 'Projects Built' },
            { num: '5+', label: 'Technologies' },
            { num: '2026', label: 'Graduating' },
          ].map(s => (
            <div key={s.label}>
              <div className="font-display text-3xl sm:text-4xl font-extrabold text-[#00d2ff]">
                {s.num}
              </div>
              <div className="font-mono text-xs text-muted tracking-wider mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        
        <div className="absolute bottom-4 right-0 hidden lg:flex flex-col items-center gap-2 opacity-40">
          <span className="font-mono text-[10px] tracking-widest text-muted -rotate-90 mb-4">SCROLL</span>
          <div className="w-px h-16 bg-gradient-to-b from-[#00d2ff] to-transparent" />
        </div>
      </div>
    </section>
  )
}