import { Sidebar } from './components/Sidebar'
import { Map } from './components/Map'
import 'leaflet/dist/leaflet.css'
import { useRef, useState } from 'react'

function App() {
  const [origin, setOrigin] = useState<[number, number] | null>(null);
  const [destination, setDestination] = useState<[number, number] | null>(null);
  const [focusedInput, setFocusedInput] = useState<'origin' | 'destination' | null>(null);

  const originRef = useRef<HTMLInputElement>(null);
  const destinationRef = useRef<HTMLInputElement>(null);

  // const handleSetLocation = (location: [number, number]) => {
  //   setLocation(location)
  //   const [lat, lng] = location

  //   if (focusedInput === 'origin' && originRef.current) {
  //     originRef.current.value = `${lat}, ${lng}`
  //   } else if (focusedInput === 'destination' && destinationRef.current) {
  //     destinationRef.current.value = `${lat}, ${lng}`
  //   }
  // }

  const handleMapDoubleClick = (location: [number, number]) => {
    const [lat, lng] = location;
    if (focusedInput === 'origin' && originRef.current) {
      setOrigin(location);
      originRef.current.value = `${lat}, ${lng}`;
    } else if (focusedInput === 'destination' && destinationRef.current) {
      setDestination(location);
      destinationRef.current.value = `${lat}, ${lng}`;
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        setFocusedInput={setFocusedInput}
        originRef={originRef}
        destinationRef={destinationRef}
      />
      <Map
        setOrigin={(location) => {
          setOrigin(location);
          if (originRef.current) {
            const [lat, lng] = location;
            originRef.current.value = `${lat}, ${lng}`;
          }
        }}
        setDestination={setDestination}
        origin={origin}
        destination={destination}
        onMapDoubleClick={handleMapDoubleClick}
      />
    </div>
  )
}

export default App
