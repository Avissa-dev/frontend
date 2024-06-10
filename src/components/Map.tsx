import { MapContainer, TileLayer } from 'react-leaflet'

export const Map = () => {
  const position: [number, number] = [13.7036, -89.224]

  return (
       <MapContainer
      center={position}
      zoom={13}
      className='h-screen w-full'
    >
       <TileLayer
                    url="https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                    maxZoom={20}
                    subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                />
    </MapContainer> 
  )
}
