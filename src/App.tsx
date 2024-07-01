// App.tsx
import { Sidebar } from './components/Sidebar'
import { Map } from './components/Map'
import 'leaflet/dist/leaflet.css'
import { useRef, useState } from 'react'
import getRoute from './api/axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Properties } from './components/ResultCard' // Importa la interfaz correctamente

function App() {
  const [origin, setOrigin] = useState<[number, number] | null>(null)
  const [destination, setDestination] = useState<[number, number] | null>(null)
  const [routeData, setRouteData] = useState<Properties[]>([])
  const [focusedInput, setFocusedInput] = useState<'origin' | 'destination' | null>(null)

  const originRef = useRef<HTMLInputElement>(null)
  const destinationRef = useRef<HTMLInputElement>(null)

  const handleGetRoute = async () => {
    if (origin && destination) {
      try {
        const data = await getRoute(origin, destination)
        const formattedData: Properties[] = data.map((item: any) => ({
          bus_number: item.properties.bus_number,
          route: item.properties.route, // Verifica si este campo existe
          route_class: item.properties.route_class, // Verifica si este campo existe
          route_type: item.properties.route_type, // Verifica si este campo existe
          route_1: item.properties.route_1,
          route_1_class: item.properties.route_1_class,
          route_1_type: item.properties.route_1_type,
          route_2: item.properties.route_2,
          route_2_class: item.properties.route_2_class,
          route_2_type: item.properties.route_2_type,
          route_3: item.properties.route_3, // Verifica si este campo existe
          route_3_class: item.properties.route_3_class, // Verifica si este campo existe
          route_3_type: item.properties.route_3_type, // Verifica si este campo existe
        }))
        setRouteData(formattedData)
      } catch (error) {
        console.error('Error fetching route:', error)
      }
    } else {
      toast.error('Por favor, selecciona un origen y un destino')
      console.warn('Both origin and destination must be set')
    }
  }

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
      <ToastContainer />
      <Sidebar
        setFocusedInput={setFocusedInput}
        originRef={originRef}
        destinationRef={destinationRef}
        onGetRoute={handleGetRoute}
        data={routeData}
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
