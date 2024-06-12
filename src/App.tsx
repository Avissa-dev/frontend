import { Sidebar } from './components/Sidebar'
import { Map } from './components/Map'
import 'leaflet/dist/leaflet.css'
import { useRef, useState } from 'react'

function App() {
  const [location, setLocation] = useState<[number, number] | null>(null)
  const [focusedInput, setFocusedInput] = useState<
    'origin' | 'destination' | null
  >(null)

  const originRef = useRef<HTMLInputElement>(null)
  const destinationRef = useRef<HTMLInputElement>(null)

  const handleSetLocation = (location: [number, number]) => {
    setLocation(location)
    const [lat, lng] = location

    if (focusedInput === 'origin' && originRef.current) {
      originRef.current.value = `${lat}, ${lng}`
    } else if (focusedInput === 'destination' && destinationRef.current) {
      destinationRef.current.value = `${lat}, ${lng}`
    }
  }

  return (
    <div className="flex h-screen">
      <Sidebar
        setFocusedInput={setFocusedInput}
        originRef={originRef}
        destinationRef={destinationRef}
      />
      <Map setLocation={handleSetLocation} location={location} />
    </div>
  )
}

export default App
