// ResultCard.tsx
import { FaBus } from 'react-icons/fa6';
import { Tag } from './Tag';
import { LiaWalkingSolid } from 'react-icons/lia';
import { FaArrowAltCircleRight } from 'react-icons/fa';

export interface Properties {
  bus_number: number;
  route: string;
  route_class: string;
  route_type: string;
  route_1: string;
  route_1_class: string;
  route_1_type: string;
  route_2: string;
  route_2_class: string;
  route_2_type: string;
  route_3: string;
  route_3_class: string;
  route_3_type: string;
  coordinates: [number, number][][]; // Ajuste para las coordenadas
}

export interface RouteData {
  properties: Properties;
  coordinates: [number, number][][]; 
}

export interface ResultCardProps {
  properties: Properties;
  onRouteSelect: (coordinates: [number, number][][]) => void; // Ajuste para las coordenadas
}

export const ResultCard = ({ properties, onRouteSelect }: ResultCardProps) => {
  const {
    bus_number,
    route,
    route_class,
    route_type,
    route_1,
    route_1_class,
    route_1_type,
    route_2,
    route_2_class,
    route_2_type,
    route_3,
    route_3_class,
    route_3_type,
    coordinates, // Asegúrate de desestructurar las coordenadas
  } = properties;

  const handleSetRoute = (event: React.MouseEvent) => {
    event.stopPropagation(); // Detiene la propagación del evento
    console.log('Route set:', coordinates);
    onRouteSelect(coordinates); // Llama al manejador de selección de ruta
  };

  switch (bus_number) {
    case 1:
      return (
        <div className="flex flex-wrap items-center w-full p-4 border-t-2 border-gray-400">
          <div className="flex flex-wrap gap-4 w-4/5">
            <Tag Icon={LiaWalkingSolid} Color='bg-green-800' />
            <Tag Text={`${route}`} Icon={FaBus} Color='bg-purple-700 flex-grow' />
            <Tag Icon={LiaWalkingSolid} Color='bg-green-800' />
          </div>
          <button className="flex items-center justify-center ml-auto w-1/5" onClick={handleSetRoute}>
            <FaArrowAltCircleRight className="text-black text-2xl" />
          </button>
        </div>
      )
    case 2:
      return (
        <div className="flex flex-wrap items-center w-full py-4 border-t-2 border-gray-400">
          <div className="flex flex-wrap gap-4 w-4/5">
            <Tag Text={`${route_1}`} Icon={FaBus} Color='bg-purple-700 min-w-[35%] flex-grow' />
            <Tag Icon={LiaWalkingSolid} Color='bg-green-800 w-[15%]' />
            <Tag Text={`${route_2}`} Icon={FaBus} Color='bg-cyan-700 min-w-[35%]' />
          </div>
          <button className="flex items-center justify-center ml-auto w-1/5" onClick={handleSetRoute}>
            <FaArrowAltCircleRight className="text-black text-2xl" />
          </button>
        </div>
      )
    case 3:
      return (
        <div className="flex flex-wrap items-center w-full p-4 border-t-2 border-gray-400">
          <div className="flex flex-wrap gap-4 w-4/5">
            <Tag Text={`${route_1}`} Icon={FaBus} Color='bg-purple-700 min-w-[35%] flex-grow' />
            <Tag Icon={LiaWalkingSolid} Color='bg-green-800 w-[15%]' />
            <Tag Text={`${route_2}`} Icon={FaBus} Color='bg-cyan-700 min-w-[35%] flex-grow' />
            <Tag Icon={LiaWalkingSolid} Color='bg-green-800 w-[15%]' />
            <Tag Text={`${route_3}`} Icon={FaBus} Color='bg-red-700 min-w-[35%] flex-grow' />
            <Tag Icon={LiaWalkingSolid} Color='bg-green-800 w-[15%]' />
          </div>
          <button className="flex items-center justify-center ml-auto w-1/5" onClick={handleSetRoute}>
            <FaArrowAltCircleRight className="text-black text-2xl" />
          </button>
        </div>
      )
    default:
      return (
        <p>No hay resultados</p>
      )
  }
};
