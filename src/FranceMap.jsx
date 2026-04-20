import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet'

const PALETTE = [
  '#22d3ee', // cyan
  '#818cf8', // indigo
  '#f472b6', // pink
  '#34d399', // emerald
  '#fb923c', // orange
  '#a78bfa', // violet
  '#facc15', // yellow
  '#60a5fa', // blue
]

const CITIES = [
  { name: 'Paris', lat: 48.8566, lng: 2.3522 },
  { name: 'Marseille', lat: 43.2965, lng: 5.3698 },
  { name: 'Lyon', lat: 45.7640, lng: 4.8357 },
  { name: 'Toulouse', lat: 43.6047, lng: 1.4442 },
  { name: 'Nice', lat: 43.7102, lng: 7.2620 },
  { name: 'Nantes', lat: 47.2184, lng: -1.5536 },
  { name: 'Strasbourg', lat: 48.5734, lng: 7.7521 },
  { name: 'Bordeaux', lat: 44.8378, lng: -0.5792 },
  { name: 'Lille', lat: 50.6292, lng: 3.0573 },
  { name: 'Rennes', lat: 48.1173, lng: -1.6778 },
  { name: 'Reims', lat: 49.2583, lng: 4.0317 },
  { name: 'Saint-Étienne', lat: 45.4397, lng: 4.3872 },
  { name: 'Toulon', lat: 43.1242, lng: 5.9280 },
  { name: 'Le Havre', lat: 49.4944, lng: 0.1079 },
  { name: 'Grenoble', lat: 45.1885, lng: 5.7245 },
  { name: 'Dijon', lat: 47.3220, lng: 5.0415 },
  { name: 'Angers', lat: 47.4784, lng: -0.5632 },
  { name: 'Nîmes', lat: 43.8367, lng: 4.3601 },
  { name: 'Villeurbanne', lat: 45.7716, lng: 4.8800 },
  { name: 'Le Mans', lat: 48.0061, lng: 0.1996 },
  { name: 'Clermont-Ferrand', lat: 45.7772, lng: 3.0870 },
  { name: 'Brest', lat: 48.3904, lng: -4.4861 },
  { name: 'Tours', lat: 47.3941, lng: 0.6848 },
  { name: 'Amiens', lat: 49.8941, lng: 2.2958 },
  { name: 'Limoges', lat: 45.8336, lng: 1.2611 },
  { name: 'Perpignan', lat: 42.6886, lng: 2.8948 },
  { name: 'Metz', lat: 49.1193, lng: 6.1757 },
  { name: 'Besançon', lat: 47.2380, lng: 6.0243 },
  { name: 'Caen', lat: 49.1829, lng: -0.3707 },
  { name: 'Orléans', lat: 47.9029, lng: 1.9039 },
  { name: 'Rouen', lat: 49.4432, lng: 1.0993 },
  { name: 'Mulhouse', lat: 47.7508, lng: 7.3359 },
  { name: 'Montpellier', lat: 43.6108, lng: 3.8767 },
  { name: 'Nancy', lat: 48.6921, lng: 6.1844 },
  { name: 'Avignon', lat: 43.9493, lng: 4.8055 },
  { name: 'Poitiers', lat: 46.5802, lng: 0.3404 },
  { name: 'Pau', lat: 43.2951, lng: -0.3708 },
  { name: 'La Rochelle', lat: 46.1591, lng: -1.1520 },
  { name: 'Calais', lat: 50.9513, lng: 1.8587 },
  { name: 'Bayonne', lat: 43.4929, lng: -1.4748 },
]

export { CITIES }

export default function FranceMap({ selectedCity, children }) {
  return (
    <MapContainer
      center={[46.5, 2.3]}
      zoom={6}
      style={{ width: '100%', height: '100%', borderRadius: 16 }}
      scrollWheelZoom={false}
      dragging={false}
      doubleClickZoom={false}
      zoomControl={false}
      attributionControl={false}
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />

      {CITIES.map((city, i) => {
        const isSelected = selectedCity?.name === city.name
        const color = PALETTE[i % PALETTE.length]
        return (
          <CircleMarker
            key={city.name}
            center={[city.lat, city.lng]}
            radius={isSelected ? 11 : 6}
            pathOptions={{
              color: isSelected ? '#ffffff' : color,
              fillColor: isSelected ? '#f87171' : color,
              fillOpacity: isSelected ? 1 : 0.9,
              weight: isSelected ? 3 : 1.5,
            }}
          >
            <Tooltip direction="top" offset={[0, -6]} opacity={0.9}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12 }}>
                {city.name}
              </span>
            </Tooltip>
          </CircleMarker>
        )
      })}

      {children}
    </MapContainer>
  )
}
