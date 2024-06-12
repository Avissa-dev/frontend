import { FaLocationArrow } from 'react-icons/fa6'
import { useMap } from 'react-leaflet'

interface LocateButtonProps {
  setLocation: (location: [number, number]) => void
}
export const LocateButton = ({ setLocation }: LocateButtonProps) => {
  const map = useMap()

  const handleLocate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords
          map.flyTo([latitude, longitude], 18)
          setLocation([latitude, longitude])
        },
        error => {
          console.error('Error getting location: ', error)
        }
      )
    } else {
      console.error('Geolocation is not supported by this browser.')
    }
  }
  return (
    <button
      onClick={handleLocate}
      className="absolute bottom-4 right-4 z-[1000] bg-white p-3 rounded-full shadow-lg"
      title="Locate me"
    >
      <FaLocationArrow className="text-blue-500 text-xl" />
    </button>
  )
}
