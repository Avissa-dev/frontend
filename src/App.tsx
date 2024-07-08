import { Sidebar } from './components/Sidebar'
import { Map } from './components/Map'
import 'leaflet/dist/leaflet.css'
import { useRef, useState, useEffect } from 'react'
import getRoute from './api/axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Properties, RouteData } from './components/ResultCard'
import { Feature, Geometry, LineString } from 'geojson'
import { ClipLoader } from 'react-spinners' // Importar el spinner

const colors = ['#e580ff', '#000000', '#FFFFFF', '#F033FF', '#FF33F0']; // Colores alternativos para las rutas

function App() {
  const [origin, setOrigin] = useState<[number, number] | null>(null)
  const [destination, setDestination] = useState<[number, number] | null>(null)
  const [routeData, setRouteData] = useState<RouteData[]>([])
  const [focusedInput, setFocusedInput] = useState<'origin' | 'destination' | null>(null)
  const [selectedRoutes, setSelectedRoutes] = useState<Feature<Geometry>[]>([])
  const [loading, setLoading] = useState(false) // Estado de carga

  const originRef = useRef<HTMLInputElement>(null)
  const destinationRef = useRef<HTMLInputElement>(null)

  const handleGetRoute = async () => {
    if (origin && destination) {
      setLoading(true) // Iniciar el spinner
      try {
        const data = await getRoute(origin, destination)
        const formattedData: RouteData[] = data.map((item: any) => ({
          properties: {
            bus_number: item.properties.bus_number,
            route: item.properties.route,
            route_class: item.properties.route_class,
            route_type: item.properties.route_type,
            route_1: item.properties.route_1,
            route_1_class: item.properties.route_1_class,
            route_1_type: item.properties.route_1_type,
            route_2: item.properties.route_2,
            route_2_class: item.properties.route_2_class,
            route_2_type: item.properties.route_2_type,
            route_3: item.properties.route_3,
            route_3_class: item.properties.route_3_class,
            route_3_type: item.properties.route_3_type,
            coordinates: item.geometry.coordinates,
          },
          coordinates: item.geometry.coordinates,
        }))
        setRouteData(formattedData)
        console.log('Route data fetched and formatted:', formattedData)
      } catch (error) {
        console.error('Error fetching route:', error)
      } finally {
        setLoading(false) // Detener el spinner
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

  const handleRouteSelect = (coordinates: [number, number][][] | [number, number][]) => {
    setSelectedRoutes([]); // Clear the existing routes before adding new ones

    const normalizedCoordinates = Array.isArray(coordinates[0][0]) ? coordinates : [coordinates];

    const multiLineFeatures: Feature<Geometry>[] = normalizedCoordinates.map((line, index) => ({
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: line,
      } as LineString,
      properties: {
        color: colors[index % colors.length], // Alternar colores
      },
    }));
    
    setTimeout(() => {
      setSelectedRoutes(multiLineFeatures);
    }, 0); // Delay setting the routes to force a re-render
    
    console.log('Routes selected:', multiLineFeatures);
  };

  const handleClean = () => {
    setOrigin(null);
    setDestination(null);
    setRouteData([]);
    setSelectedRoutes([]);
    if (originRef.current) originRef.current.value = '';
    if (destinationRef.current) destinationRef.current.value = '';
  };

  useEffect(() => {
    if (selectedRoutes.length > 0) {
      console.log('Selected routes changed:', selectedRoutes);
    }
  }, [selectedRoutes]);

  return (
    <div className="flex h-screen">
      <ToastContainer />
      <Sidebar
        setFocusedInput={setFocusedInput}
        originRef={originRef}
        destinationRef={destinationRef}
        onGetRoute={handleGetRoute}
        onClean={handleClean}
        data={routeData.map(rd => rd.properties)}
        onRouteSelect={handleRouteSelect}
        loading={loading} // Pasar el estado de carga al Sidebar
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
        selectedRoutes={selectedRoutes}
      />
    </div>
  )
}

export default App
