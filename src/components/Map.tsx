import { MapContainer, TileLayer } from 'react-leaflet'

export const Map = () => {
  const position: [number, number] = [13.7036, -89.224]

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        url={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'}
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
    </MapContainer>
  )
}
