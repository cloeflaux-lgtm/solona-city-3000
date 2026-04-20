import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, CircleMarker, Tooltip, GeoJSON } from 'react-leaflet'

const REGION_COLORS = {
  'Île-de-France':              '#ef4444',
  'Hauts-de-France':            '#f97316',
  'Grand Est':                  '#eab308',
  'Normandie':                  '#22c55e',
  'Bretagne':                   '#06b6d4',
  'Pays de la Loire':           '#3b82f6',
  'Centre-Val de Loire':        '#8b5cf6',
  'Bourgogne-Franche-Comté':    '#ec4899',
  'Nouvelle-Aquitaine':         '#14b8a6',
  'Occitanie':                  '#f59e0b',
  'Auvergne-Rhône-Alpes':       '#84cc16',
  'Provence-Alpes-Côte d\'Azur': '#6366f1',
  'Corse':                      '#f43f5e',
}

const CITIES = [
  { name: 'Paris',             lat: 48.8566,  lng: 2.3522,   region: 'Île-de-France' },
  { name: 'Marseille',         lat: 43.2965,  lng: 5.3698,   region: 'Provence-Alpes-Côte d\'Azur' },
  { name: 'Lyon',              lat: 45.7640,  lng: 4.8357,   region: 'Auvergne-Rhône-Alpes' },
  { name: 'Toulouse',          lat: 43.6047,  lng: 1.4442,   region: 'Occitanie' },
  { name: 'Nice',              lat: 43.7102,  lng: 7.2620,   region: 'Provence-Alpes-Côte d\'Azur' },
  { name: 'Nantes',            lat: 47.2184,  lng: -1.5536,  region: 'Pays de la Loire' },
  { name: 'Strasbourg',        lat: 48.5734,  lng: 7.7521,   region: 'Grand Est' },
  { name: 'Bordeaux',          lat: 44.8378,  lng: -0.5792,  region: 'Nouvelle-Aquitaine' },
  { name: 'Lille',             lat: 50.6292,  lng: 3.0573,   region: 'Hauts-de-France' },
  { name: 'Rennes',            lat: 48.1173,  lng: -1.6778,  region: 'Bretagne' },
  { name: 'Reims',             lat: 49.2583,  lng: 4.0317,   region: 'Grand Est' },
  { name: 'Saint-Étienne',     lat: 45.4397,  lng: 4.3872,   region: 'Auvergne-Rhône-Alpes' },
  { name: 'Toulon',            lat: 43.1242,  lng: 5.9280,   region: 'Provence-Alpes-Côte d\'Azur' },
  { name: 'Le Havre',          lat: 49.4944,  lng: 0.1079,   region: 'Normandie' },
  { name: 'Grenoble',          lat: 45.1885,  lng: 5.7245,   region: 'Auvergne-Rhône-Alpes' },
  { name: 'Dijon',             lat: 47.3220,  lng: 5.0415,   region: 'Bourgogne-Franche-Comté' },
  { name: 'Angers',            lat: 47.4784,  lng: -0.5632,  region: 'Pays de la Loire' },
  { name: 'Nîmes',             lat: 43.8367,  lng: 4.3601,   region: 'Occitanie' },
  { name: 'Villeurbanne',      lat: 45.7716,  lng: 4.8800,   region: 'Auvergne-Rhône-Alpes' },
  { name: 'Le Mans',           lat: 48.0061,  lng: 0.1996,   region: 'Pays de la Loire' },
  { name: 'Clermont-Ferrand',  lat: 45.7772,  lng: 3.0870,   region: 'Auvergne-Rhône-Alpes' },
  { name: 'Brest',             lat: 48.3904,  lng: -4.4861,  region: 'Bretagne' },
  { name: 'Tours',             lat: 47.3941,  lng: 0.6848,   region: 'Centre-Val de Loire' },
  { name: 'Amiens',            lat: 49.8941,  lng: 2.2958,   region: 'Hauts-de-France' },
  { name: 'Limoges',           lat: 45.8336,  lng: 1.2611,   region: 'Nouvelle-Aquitaine' },
  { name: 'Perpignan',         lat: 42.6886,  lng: 2.8948,   region: 'Occitanie' },
  { name: 'Metz',              lat: 49.1193,  lng: 6.1757,   region: 'Grand Est' },
  { name: 'Besançon',          lat: 47.2380,  lng: 6.0243,   region: 'Bourgogne-Franche-Comté' },
  { name: 'Caen',              lat: 49.1829,  lng: -0.3707,  region: 'Normandie' },
  { name: 'Orléans',           lat: 47.9029,  lng: 1.9039,   region: 'Centre-Val de Loire' },
  { name: 'Rouen',             lat: 49.4432,  lng: 1.0993,   region: 'Normandie' },
  { name: 'Mulhouse',          lat: 47.7508,  lng: 7.3359,   region: 'Grand Est' },
  { name: 'Montpellier',       lat: 43.6108,  lng: 3.8767,   region: 'Occitanie' },
  { name: 'Nancy',             lat: 48.6921,  lng: 6.1844,   region: 'Grand Est' },
  { name: 'Avignon',           lat: 43.9493,  lng: 4.8055,   region: 'Provence-Alpes-Côte d\'Azur' },
  { name: 'Poitiers',          lat: 46.5802,  lng: 0.3404,   region: 'Nouvelle-Aquitaine' },
  { name: 'Pau',               lat: 43.2951,  lng: -0.3708,  region: 'Nouvelle-Aquitaine' },
  { name: 'La Rochelle',       lat: 46.1591,  lng: -1.1520,  region: 'Nouvelle-Aquitaine' },
  { name: 'Calais',            lat: 50.9513,  lng: 1.8587,   region: 'Hauts-de-France' },
  { name: 'Bayonne',           lat: 43.4929,  lng: -1.4748,  region: 'Nouvelle-Aquitaine' },
]

export { CITIES }

function regionStyle(feature) {
  const name = feature.properties.nom
  const color = REGION_COLORS[name] ?? '#94a3b8'
  return {
    fillColor: color,
    fillOpacity: 0.45,
    color: '#ffffff',
    weight: 1.5,
  }
}

export default function FranceMap({ selectedCity, children }) {
  const [regionsGeo, setRegionsGeo] = useState(null)

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}regions.geojson`)
      .then(r => r.json())
      .then(setRegionsGeo)
      .catch(err => console.error('GeoJSON fetch failed:', err))
  }, [])

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
      <TileLayer url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png" />

      {regionsGeo && (
        <GeoJSON key="regions" data={regionsGeo} style={regionStyle} />
      )}

      {CITIES.map(city => {
        const isSelected = selectedCity?.name === city.name
        const color = REGION_COLORS[city.region] ?? '#94a3b8'
        return (
          <CircleMarker
            key={city.name}
            center={[city.lat, city.lng]}
            radius={isSelected ? 11 : 6}
            pathOptions={{
              color: '#ffffff',
              fillColor: isSelected ? '#ffffff' : color,
              fillOpacity: 1,
              weight: isSelected ? 3 : 2,
            }}
          >
            <Tooltip direction="top" offset={[0, -6]} opacity={0.95}>
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
