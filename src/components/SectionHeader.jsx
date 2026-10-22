export default function SectionHeader({ title, intro }) {
  return (
    <div className="mb-8 max-w-2xl sm:mb-12">
      <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-5xl">
        {title}
      </h2>
      {intro && <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{intro}</p>}
    </div>
  )
}