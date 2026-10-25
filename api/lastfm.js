const PLACEHOLDER = '2a96cbd8b46e442fc41c2b86b821562f'

const pickCover = images => {
  const url =
    images?.find(i => i.size === 'extralarge')?.['#text'] ||
    images?.find(i => i.size === 'large')?.['#text'] ||
    ''
  return url && !url.includes(PLACEHOLDER) ? url.replace('http://', 'https://') : null
}

export default async function handler(req, res) {
  const { LASTFM_API_KEY, LASTFM_USER } = process.env
  if (!LASTFM_API_KEY || !LASTFM_USER) {
    return res.status(500).json({ error: 'Missing env vars' })
  }

  try {
    const url = new URL('https://ws.audioscrobbler.com/2.0/')
    url.search = new URLSearchParams({
      method: 'user.getrecenttracks',
      user: LASTFM_USER,
      api_key: LASTFM_API_KEY,
      format: 'json',
      limit: '1',
    })

    const r = await fetch(url)
    if (!r.ok) throw new Error('Last.fm request failed')
    const data = await r.json()
    const t = data.recenttracks?.track?.[0]

    res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=60')
    if (!t) return res.status(200).json({ track: null })

    res.status(200).json({
      track: {
        name: t.name,
        artist: t.artist['#text'],
        url: t.url,
        cover: pickCover(t.image),
        nowPlaying: t['@attr']?.nowplaying === 'true',
        playedAt: t.date?.uts ? Number(t.date.uts) : null,
      },
    })
  } catch {
    res.status(502).json({ error: 'Could not reach Last.fm' })
  }
}