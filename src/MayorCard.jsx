import { useEffect, useState } from 'react'
import MAYORS from './mayorData'

export default function MayorCard({ city }) {
  const [photo, setPhoto] = useState(null)
  const [loading, setLoading] = useState(true)

  const mayor = MAYORS[city?.name]

  useEffect(() => {
    if (!mayor) return
    setLoading(true)
    setPhoto(null)
    fetch(`https://fr.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(mayor.wiki)}`)
      .then(r => r.json())
      .then(data => setPhoto(data?.thumbnail?.source ?? null))
      .catch(() => setPhoto(null))
      .finally(() => setLoading(false))
  }, [mayor?.wiki])

  if (!city || !mayor) return null

  return (
    <div style={{
      marginTop: '1.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(34,211,238,0.2)',
      borderRadius: 16,
      padding: '1rem 1.5rem',
      animation: 'fadeIn 0.4s ease',
      maxWidth: 400,
    }}>
      <div style={{
        width: 72,
        height: 72,
        borderRadius: '50%',
        overflow: 'hidden',
        border: '3px solid #22d3ee',
        flexShrink: 0,
        background: '#1e293b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {loading ? (
          <span style={{ fontSize: '1.5rem' }}>⏳</span>
        ) : photo ? (
          <img src={photo} alt={mayor.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <span style={{ fontSize: '2rem' }}>👤</span>
        )}
      </div>

      <div style={{ textAlign: 'left' }}>
        <p style={{ color: '#94a3b8', fontSize: '0.75rem', marginBottom: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Maire actuel·le
        </p>
        <p style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '1rem', margin: 0 }}>
          {mayor.name}
        </p>
        <p style={{ color: '#22d3ee', fontSize: '0.85rem', margin: 0, fontStyle: 'italic' }}>
          {city.name}
        </p>
      </div>
    </div>
  )
}
