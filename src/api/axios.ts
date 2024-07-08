import axios from 'axios';
import { toast } from 'react-toastify';

// Función para calcular la distancia en metros entre dos puntos
const calculateDistance = (point1: [number, number], point2: [number, number]) => {
  const R = 6371e3; // Radio de la Tierra en metros
  const lat1 = point1[0] * (Math.PI / 180);
  const lat2 = point2[0] * (Math.PI / 180);
  const deltaLat = (point2[0] - point1[0]) * (Math.PI / 180);
  const deltaLon = (point2[1] - point1[1]) * (Math.PI / 180);

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) *
    Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;
  return distance;
};

const getRoute = async (
  origin: [number, number],
  destination: [number, number]
) => {
  const distance = calculateDistance(origin, destination);

  if (distance < 500) {
    toast.warn('Puedes llegar caminando.');
    return null; // No continuar con la solicitud a la API
  }

  const url = 'http://127.0.0.1:5000/home';
  const params = {
    point_1: `${origin[1]} ${origin[0]}`, // Latitude Longitude
    point_2: `${destination[1]} ${destination[0]}` // Latitude Longitude
  };

  try {
    console.log('Fetching route...');
    console.log('Origin:', origin);
    console.log('Destination:', destination);

    console.log('point_1:', params.point_1);
    console.log('point_2:', params.point_2);
    const response = await axios.get(url, { params });

    // Si response.data es un objeto vacío, lanzar un toast
    if (Object.keys(response.data).length === 0) {
      toast.error(
        'No se encontró una ruta para los puntos seleccionados. Por favor, intenta con otros puntos.'
      );
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching route:', error);
    throw error;
  }
};

export default getRoute;
