import { Sidebar } from './components/Sidebar';
import { Map } from './components/Map';
import 'leaflet/dist/leaflet.css';
import { useRef, useState } from 'react';
import getRoute from './api/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Properties, RouteData } from './components/ResultCard';
import { Feature, MultiLineString } from 'geojson';

function App() {
  const [origin, setOrigin] = useState<[number, number] | null>(null);
  const [destination, setDestination] = useState<[number, number] | null>(null);
  const [routeData, setRouteData] = useState<RouteData[]>([]);
  const [focusedInput, setFocusedInput] = useState<'origin' | 'destination' | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<Feature<MultiLineString> | null>(null);

  const originRef = useRef<HTMLInputElement>(null);
  const destinationRef = useRef<HTMLInputElement>(null);

  const handleGetRoute = async () => {
    if (origin && destination) {
      try {
        const data = await getRoute(origin, destination);
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
        }));
        setRouteData(formattedData);
        console.log('Route data fetched and formatted:', formattedData);
      } catch (error) {
        console.error('Error fetching route:', error);
      }
    } else {
      toast.error('Por favor, selecciona un origen y un destino');
      console.warn('Both origin and destination must be set');
    }
  };

  const handleMapDoubleClick = (location: [number, number]) => {
    const [lat, lng] = location;
    if (focusedInput === 'origin' && originRef.current) {
      setOrigin(location);
      originRef.current.value = `${lng} ${lat}`;
    } else if (focusedInput === 'destination' && destinationRef.current) {
      setDestination(location);
      destinationRef.current.value = `${lng} ${lat}`;
    }
  };

  const handleRouteSelect = (coordinates: [number, number][][]) => {
    setSelectedRoute(null); // Clear selected route
    setTimeout(() => { // Ensure state updates before setting new value
      const validCoordinates = coordinates.filter(
        (line) => Array.isArray(line) && line.every((coord) => Array.isArray(coord) && coord.length === 2 && typeof coord[0] === 'number' && typeof coord[1] === 'number')
      );

      const multiLineFeature: Feature<MultiLineString> = {
        type: 'Feature',
        geometry: {
          type: 'MultiLineString',
          coordinates: validCoordinates,
        },
        properties: {},
      };
      setSelectedRoute(multiLineFeature);
      console.log('Routes selected:', multiLineFeature);
    }, 0);
  };

  return (
    <div className="flex h-screen">
      <ToastContainer />
      <Sidebar
        setFocusedInput={setFocusedInput}
        originRef={originRef}
        destinationRef={destinationRef}
        onGetRoute={handleGetRoute}
        data={routeData.map((rd) => rd.properties)}
        onRouteSelect={handleRouteSelect}
      />
      <Map
        setOrigin={(location) => {
          setOrigin(location);
          if (originRef.current) {
            const [lat, lng] = location;
            originRef.current.value = `${lng} ${lat}`;
          }
        }}
        setDestination={setDestination}
        origin={origin}
        destination={destination}
        onMapDoubleClick={handleMapDoubleClick}
        selectedRoute={selectedRoute}
      />
    </div>
  );
}

export default App;
