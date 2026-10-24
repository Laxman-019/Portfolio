import { useEffect, useState } from 'react'
import { FaLastfm } from 'react-icons/fa'

export default function LastPlayed() {
  const [track, setTrack] = useState(null)

  useEffect(() => {
    let alive = true
    const load = async () => {
      try {
        const r = await fetch('/api/lastfm')
        if (!r.ok) return
        const d = await r.json()
        if (alive) setTrack(d.track)
      } catch {
        /* keep whatever we had */
      }
    }
    load()
    const id = setInterval(load, 30000)
    return () => {
      alive = false
      clearInterval(id)
    }
  }, [])

  if (!track) return null

  return (
    <a
      href={track.url}
      target="_blank"
      rel="noreferrer"
      className="inline-flex max-w-full items-center gap-2 rounded-full border border-line bg-canvas/60 px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent/60"
    >
      <FaLastfm aria-hidden="true" className="shrink-0 text-accent" />
      {track.nowPlaying && (
        <span aria-hidden="true" className="pulse-soft size-1.5 shrink-0 rounded-full bg-accent" />
      )}
      <span className="shrink-0">{track.nowPlaying ? 'Now playing' : 'Last played'} —</span>
      <span className="truncate font-semibold text-ink">
        {track.artist} · {track.name}
      </span>
    </a>
  )
}