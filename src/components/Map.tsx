import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet'
import { LocateButton } from './LocateButton'
import L from 'leaflet'

interface MapProps {
  setLocation: (location: [number, number]) => void
  location: [number, number] | null
  onMapDoubleClick: (location: [number, number]) => void
}

export const Map = ({ setLocation, location, onMapDoubleClick }: MapProps) => {
  const position: [number, number] = [13.7036, -89.224]

  const defaultIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png',
    shadowSize: [41, 41]
  })

  const MapDoubleClickHandler = () => {
    useMapEvents({
      dblclick: e => {
        const { lat, lng } = e.latlng
        onMapDoubleClick([lat, lng])
      }
    })
    return null
  }

  return (
    <MapContainer center={position} zoom={13} className="h-screen w-full">
      <TileLayer
        url="https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
        maxZoom={20}
        subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
      />
      <LocateButton setLocation={setLocation} />
      <MapDoubleClickHandler />
      {location && <Marker position={location} icon={defaultIcon} />}
    </MapContainer>
  )
}
