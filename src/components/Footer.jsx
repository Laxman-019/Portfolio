export default function Footer() {
  return (
    <footer
      className="relative z-10 border-t border-[rgba(0,210,255,0.12)]
                 px-4 sm:px-8 lg:px-20 py-6
                 flex flex-col sm:flex-row items-center justify-between gap-3"
    >
      <p className="font-mono text-[11px] text-muted tracking-wider text-center sm:text-left">
        © 2025 <span className="text-[#00d2ff]">Laxman Chourasia</span> · Choudwar, Cuttack, Odisha
      </p>
      <p className="font-mono text-[11px] text-muted tracking-wider text-center sm:text-right">
        Built with <span className="text-[#00d2ff]">React</span> &amp; <span className="text-[#00d2ff]">Tailwind CSS</span>
      </p>
    </footer>
  )
}