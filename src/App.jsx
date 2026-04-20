import { useState, useRef, useCallback } from 'react'
import FranceMap, { CITIES } from './FranceMap'
import './App.css'
import './index.css'

function App() {
  const [selectedCity, setSelectedCity] = useState(null)
  const [flying, setFlying] = useState(false)
  const [dartStyle, setDartStyle] = useState(null)
  const lastCityRef = useRef(null)
  const mapRef = useRef(null)

  const throwDart = useCallback(() => {
    if (flying) return

    // pick a random city different from last
    let pool = CITIES.filter(c => c.name !== lastCityRef.current?.name)
    const city = pool[Math.floor(Math.random() * pool.length)]
    lastCityRef.current = city

    // get map container position
    const mapEl = mapRef.current
    const mapRect = mapEl?.getBoundingClientRect()

    // start dart from center of viewport
    const startX = window.innerWidth / 2
    const startY = window.innerHeight / 2

    // estimate city position on screen via map bounds
    // we'll just animate to the map center-ish and let the highlight do the rest
    const targetX = mapRect ? mapRect.left + mapRect.width / 2 : startX
    const targetY = mapRect ? mapRect.top + mapRect.height / 2 : startY

    setFlying(true)
    setDartStyle({
      left: startX,
      top: startY,
      transform: 'translate(-50%, -50%) scale(2)',
      opacity: 1,
    })

    setTimeout(() => {
      setDartStyle({
        left: targetX,
        top: targetY,
        transform: 'translate(-50%, -50%) scale(0.5)',
        opacity: 0,
        transition: 'left 700ms cubic-bezier(0.25,0.46,0.45,0.94), top 700ms cubic-bezier(0.25,0.46,0.45,0.94), transform 700ms, opacity 300ms 400ms',
      })
    }, 50)

    setTimeout(() => {
      setSelectedCity(city)
      setFlying(false)
      setDartStyle(null)
    }, 800)
  }, [flying])

  return (
    <div className="min-h-screen flex flex-col items-center" style={{ background: '#0d1b2a', position: 'relative', overflow: 'hidden' }}>

      {/* Flying dart */}
      {dartStyle && (
        <div style={{
          position: 'fixed',
          fontSize: '2rem',
          pointerEvents: 'none',
          zIndex: 9999,
          ...dartStyle,
        }}>
          🎯
        </div>
      )}

      <header className="w-full flex flex-col items-center pt-8 pb-4">
        <h1
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
            background: 'linear-gradient(90deg, #22d3ee, #818cf8, #22d3ee)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '0.05em',
            textAlign: 'center',
            animation: 'shimmer 3s linear infinite',
          }}
        >
          Solona City 3000
        </h1>
        <p style={{ color: '#94a3b8', marginTop: '0.5rem', fontSize: '1rem', letterSpacing: '0.1em' }}>
          Your next mayoral conquest awaits
        </p>
      </header>

      <main className="flex-1 w-full flex flex-col items-center px-4 pb-6">
        <div ref={mapRef} style={{ width: '100%', maxWidth: 900, height: '70vh', minHeight: 400 }}>
          <FranceMap selectedCity={selectedCity} />
        </div>

        <button
          onClick={throwDart}
          disabled={flying}
          style={{
            marginTop: '1.5rem',
            padding: '0.85rem 2.5rem',
            background: flying
              ? 'linear-gradient(135deg, #475569, #64748b)'
              : 'linear-gradient(135deg, #22d3ee, #818cf8)',
            border: 'none',
            borderRadius: 50,
            color: '#fff',
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: 700,
            fontSize: '1rem',
            letterSpacing: '0.05em',
            cursor: flying ? 'not-allowed' : 'pointer',
            boxShadow: flying ? 'none' : '0 0 24px rgba(34,211,238,0.4)',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => {
            if (flying) return
            e.currentTarget.style.transform = 'scale(1.05)'
            e.currentTarget.style.boxShadow = '0 0 36px rgba(34,211,238,0.6)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.boxShadow = flying ? 'none' : '0 0 24px rgba(34,211,238,0.4)'
          }}
        >
          {flying ? 'Flying... 🎯' : 'Throw the Dart! 🎯'}
        </button>

        {selectedCity && !flying && (
          <p style={{
            marginTop: '1rem',
            color: '#22d3ee',
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '1.1rem',
            fontWeight: 700,
            letterSpacing: '0.05em',
            animation: 'fadeIn 0.4s ease',
          }}>
            📍 {selectedCity.name}
          </p>
        )}
      </main>

      <footer style={{ padding: '1.5rem', color: '#475569', fontSize: '0.8rem' }}>
        Built with ❤️ and Claude AI
      </footer>
    </div>
  )
}

export default App
