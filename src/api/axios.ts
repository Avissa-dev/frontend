// src/api/getRoute.ts
import axios from 'axios'
import { toast } from 'react-toastify'

const getRoute = async (
  origin: [number, number],
  destination: [number, number]
) => {
  const url = 'http://127.0.0.1:5000/home'
  const params = {
    point_1: `${origin[1]} ${origin[0]}`, // Latitude Longitude
    point_2: `${destination[1]} ${destination[0]}` // Latitude Longitude
  }

  try {
    console.log('Fetching route...')
    console.log('Origin:', origin)
    console.log('Destination:', destination)

    console.log('point_1:', params.point_1)
    console.log('point_2:', params.point_2)
    const response = await axios.get(url, { params })

    // if the response.data is an empty object, throw an toast
    if (Object.keys(response.data).length === 0) {
      toast.error(
        'No se encontró una ruta para los puntos seleccionados. Por favor, intenta con otros puntos.'
      )
    }

    return response.data
  } catch (error) {
    console.error('Error fetching route:', error)
    throw error
  }
}

export default getRoute
