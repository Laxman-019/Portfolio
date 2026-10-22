import { profile } from '../data/content'

export default function Footer() {
  return (
    <footer className="border-t border-line px-5 py-8 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-sm text-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} <span className="text-ink">{profile.name}</span> · {profile.location}
        </p>
        <p>Built with React and Tailwind CSS</p>
      </div>
    </footer>
  )
}