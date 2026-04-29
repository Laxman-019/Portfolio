import { SectionHeader } from './Skills'

const projects = [
  {
    num:      '01 / FEATURED',
    title:    'Gaming Website',
    desc:     'Full-stack gaming platform built with React and Firebase. Features interactive game components, Firebase Authentication, Firestore database integration, responsive design, and smooth performance.',
    stack:    ['React.js', 'Firebase', 'Firestore', 'Auth'],
    link:     'https://ladgames.online',
    linkLabel:'Visit Site',
    github:   'https://github.com/Laxman-019',  
  },
  {
    num:      '02 / BACKEND',
    title:    'Employee Management System',
    desc:     'Java-based EMS with full CRUD operations. Features a dynamic UI, Oracle SQL integration for secure database management, and modular architecture with optimized query handling.',
    stack:    ['Java', 'Oracle SQL', 'CRUD'],
    link:     null,
    linkLabel: null,
    github:   'https://github.com/Laxman-019/Employee-Management-System',  
  },
  {
    num:      '03 / AI',
    title:    'AI Chatbot',
    desc:     'Intelligent chatbot powered by Gemini API with session-based conversation memory. Built with Python and Streamlit, enabling real-time intelligent responses in a clean UI.',
    stack:    ['Python', 'Streamlit', 'Gemini API'],
    link:     'https://laxman-chatbot.streamlit.app/',
    linkLabel:'Visit Site',
    github:   'https://github.com/Laxman-019/ChatBot',  
  },
]

export default function Projects() {
  return (
    <section id="projects" className="bg-[#080d1a]">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-20 py-24">
        <SectionHeader tag="What I've Built" title="Projects" />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <ProjectCard key={i} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project: p, index }) {
  return (
    <div
      className="project-card reveal group relative bg-[#0c1428] border border-[rgba(0,210,255,0.12)]
                 p-6 sm:p-8 flex flex-col overflow-hidden
                 transition-all duration-300 hover:border-[rgba(0,210,255,0.4)]
                 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_40px_rgba(0,210,255,0.06)]"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
     
      <div
        className="absolute bottom-0 right-0 w-20 h-20 pointer-events-none
                   transition-all duration-300 group-hover:w-40 group-hover:h-40"
        style={{ background: 'radial-gradient(circle at 100% 100%, rgba(0,210,255,0.1), transparent 70%)' }}
      />

     
      <p className="font-mono text-[10px] text-[#00d2ff] tracking-[0.2em] opacity-70 mb-4">
        {p.num}
      </p>

     
      <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[#e8eef8] leading-tight mb-4">
        {p.title}
      </h3>

    
      <p className="text-muted text-sm leading-relaxed flex-1 mb-6">
        {p.desc}
      </p>

     
      <div className="flex flex-wrap gap-2 mb-5">
        {p.stack.map(t => (
          <span
            key={t}
            className="font-mono text-[10px] text-[#00d2ff] bg-[rgba(0,210,255,0.07)]
                       border border-[rgba(0,210,255,0.2)] px-2.5 py-1 tracking-wider"
          >
            {t}
          </span>
        ))}
      </div>

      
      <div className="flex items-center gap-4 mt-auto pt-2 border-t border-[rgba(0,210,255,0.08)]">

        
        {p.link && (
          <a
            href={p.link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#00d2ff]
                       tracking-widest uppercase transition-all duration-200 hover:gap-3"
          >
            {p.linkLabel} →
          </a>
        )}

      
        {p.github && (
          <a
            href={p.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-[11px] text-muted
                       tracking-widest uppercase transition-all duration-200
                       hover:text-[#00d2ff] ml-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14" height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577
                       0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755
                       -1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236
                       1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466
                       -1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176
                       0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405
                       2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23
                       1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22
                       0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295
                       24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub
          </a>
        )}
      </div>
    </div>
  )
}