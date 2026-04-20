import { useState } from 'react'
import FranceMap from './FranceMap'
import './App.css'
import './index.css'

function App() {
  const [selectedCity, setSelectedCity] = useState(null)

  return (
    <div className="min-h-screen flex flex-col items-center" style={{ background: '#0d1b2a' }}>
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
        <div style={{ width: '100%', maxWidth: 900, height: '70vh', minHeight: 400 }}>
          <FranceMap selectedCity={selectedCity} />
        </div>

        <button
          onClick={() => {}}
          style={{
            marginTop: '1.5rem',
            padding: '0.85rem 2.5rem',
            background: 'linear-gradient(135deg, #22d3ee, #818cf8)',
            border: 'none',
            borderRadius: 50,
            color: '#fff',
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: 700,
            fontSize: '1rem',
            letterSpacing: '0.05em',
            cursor: 'pointer',
            boxShadow: '0 0 24px rgba(34,211,238,0.4)',
            transition: 'transform 0.15s, box-shadow 0.15s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'scale(1.05)'
            e.currentTarget.style.boxShadow = '0 0 36px rgba(34,211,238,0.6)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.boxShadow = '0 0 24px rgba(34,211,238,0.4)'
          }}
        >
          Throw the Dart! 🎯
        </button>
      </main>

      <footer style={{ padding: '1.5rem', color: '#475569', fontSize: '0.8rem' }}>
        Built with ❤️ and Claude AI
      </footer>
    </div>
  )
}

export default App
