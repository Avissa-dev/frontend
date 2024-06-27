import { Sidebar } from './components/Sidebar'
import { Map } from './components/Map'
import 'leaflet/dist/leaflet.css'
import { useRef, useState } from 'react'
import getRoute from './api/axios'

function App() {
  const [origin, setOrigin] = useState<[number, number] | null>(null)
  const [destination, setDestination] = useState<[number, number] | null>(null)
  const [routeData, setRouteData] = useState(null)
  const [focusedInput, setFocusedInput] = useState<
    'origin' | 'destination' | null
  >(null)

  const originRef = useRef<HTMLInputElement>(null)
  const destinationRef = useRef<HTMLInputElement>(null)

  // const handleSetLocation = (location: [number, number]) => {
  //   setLocation(location)
  //   const [lat, lng] = location

  //   if (focusedInput === 'origin' && originRef.current) {
  //     originRef.current.value = `${lat}, ${lng}`
  //   } else if (focusedInput === 'destination' && destinationRef.current) {
  //     destinationRef.current.value = `${lat}, ${lng}`
  //   }
  // }

  const handleGetRoute = async () => {
    if (origin && destination) {
      try {
        const data = await getRoute(origin, destination)
        setRouteData(data)
      } catch (error) {
        console.error('Error fetching route:', error)
      }
    } else {
      console.warn('Both origin and destination must be set')
    }
  }

  console.log('Route data:', routeData)

  const handleMapDoubleClick = (location: [number, number]) => {
    const [lat, lng] = location
    if (focusedInput === 'origin' && originRef.current) {
      setOrigin(location)
      originRef.current.value = `${lng} ${lat}`
    } else if (focusedInput === 'destination' && destinationRef.current) {
      setDestination(location)
      destinationRef.current.value = `${lng} ${lat}`
    }
  }

  return (
    <div className="flex h-screen">
      <Sidebar
        setFocusedInput={setFocusedInput}
        originRef={originRef}
        destinationRef={destinationRef}
        onGetRoute={handleGetRoute}
      />
      <Map
        setOrigin={location => {
          setOrigin(location)
          if (originRef.current) {
            const [lat, lng] = location
            originRef.current.value = `${lng} ${lat}`
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
