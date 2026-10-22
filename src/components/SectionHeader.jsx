export default function SectionHeader({ title, intro }) {
  return (
    <div className="mb-12 max-w-2xl">
      <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
        {title}
      </h2>
      {intro && <p className="mt-4 text-lg leading-relaxed text-muted">{intro}</p>}
    </div>
  )
}