import { FaLocationDot, FaRegCircleDot } from 'react-icons/fa6';
import { Button } from './Button';
import { Input } from './Input';
import { ResultCard, Properties } from './ResultCard';
import { RefObject, useState, useEffect } from 'react';
import { PiBroomBold } from 'react-icons/pi';
import { PulseLoader } from 'react-spinners'; // Importar el spinner

interface SidebarProps {
  setFocusedInput: (input: 'origin' | 'destination') => void;
  originRef: RefObject<HTMLInputElement>;
  destinationRef: RefObject<HTMLInputElement>;
  onGetRoute: () => void;
  data: Properties[];
  onRouteSelect: (coordinates: [number, number][][], index: number) => void; // Consistente con App.tsx
  loading: boolean; // Añadir estado de carga
  onClean: () => void; // Añadir función de limpieza
}

export const Sidebar = ({
  setFocusedInput,
  originRef,
  destinationRef,
  onGetRoute,
  data,
  onRouteSelect,
  loading,
  onClean,
}: SidebarProps) => {
  const [selectedRouteIndex, setSelectedRouteIndex] = useState<number | null>(null);

  useEffect(() => {
    console.log('Sidebar data:', data);
  }, [data]);

  const handleRouteSelect = (coordinates: [number, number][][], index: number) => {
    setSelectedRouteIndex(index);
    onRouteSelect(coordinates, index);
  };

  return (
    <div className="w-2/6 h-screen p-1 flex flex-col overflow-y-auto">
      <div className='px-3'>
        <h1 className="font-montserrat font-black text-2xl text-center mt-4">
          Ubícate con Avissa
        </h1>
        <h3 className="font-montserrat font-bold text-sm mt-5 mb-1 tracking-widest">
          ORIGEN
        </h3>
        <Input
          text={'Desde'}
          Icon={FaRegCircleDot}
          inputRef={originRef}
          onFocus={() => setFocusedInput('origin')}
        />
        <h3 className="font-montserrat font-bold text-sm mt-5 mb-1 tracking-widest">
          DESTINO
        </h3>
        <Input
          text={'Hasta'}
          Icon={FaLocationDot}
          inputRef={destinationRef}
          onFocus={() => setFocusedInput('destination')}
        />
        <div className="self-center justify-center mt-6 flex flex-row gap-2">
          <Button onClick={onGetRoute} text='Calcular Ruta' color="bg-[#4361EE]" />
          {data.length > 0 && (
            <Button onClick={onClean} text={<PiBroomBold />} color="bg-[#D51E43] text-xl font-bold" />
          )}
        </div>
        <h3 className="font-montserrat font-bold text-sm mt-5  tracking-widest">
          RESULTADOS
        </h3>
      </div>

      {loading && (
        <div className="self-center mt-4">
          <PulseLoader color="#4A90E2" loading={loading} size={10} />
        </div>
      )}
      <div className="mt-3">
        {data.length > 0 ? (
          data.map((properties, index) => (
            <ResultCard
              key={index}
              properties={properties}
              onRouteSelect={(coordinates) => handleRouteSelect(coordinates, index)}
              isSelected={index === selectedRouteIndex} // Pasar el estado seleccionado
            />
          ))
        ) : (
          <p>Aún no hay resultados</p>
        )}
      </div>
    </div>
  );
};
