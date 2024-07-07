// Sidebar.tsx
import { FaLocationDot, FaRegCircleDot } from 'react-icons/fa6'
import { Button } from './Button'
import { Input } from './Input'
import { ResultCard, Properties } from './ResultCard'
import { RefObject } from 'react'
import { useEffect } from 'react'

interface SidebarProps {
  setFocusedInput: (input: 'origin' | 'destination') => void
  originRef: RefObject<HTMLInputElement>
  destinationRef: RefObject<HTMLInputElement>
  onGetRoute: () => void
  data: Properties[]
  onRouteSelect: (coordinates: [number, number][][]) => void // Consistente con App.tsx
}

export const Sidebar = ({
  setFocusedInput,
  originRef,
  destinationRef,
  onGetRoute,
  data,
  onRouteSelect
}: SidebarProps) => {
  useEffect(() => {
    console.log('Sidebar data:', data)
  }, [data])

  return (
    <div className="w-2/6 h-screen p-4 flex flex-col overflow-y-auto">
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
      <h3 className=" font-montserrat font-bold text-sm mt-5 mb-1 tracking-widest">
        DESTINO
      </h3>
      <Input
        text={'Hasta'}
        Icon={FaLocationDot}
        inputRef={destinationRef}
        onFocus={() => setFocusedInput('destination')}
      />
      <div className="self-center mt-6">
        <Button onClick={onGetRoute} />
      </div>
      <h3 className=" font-montserrat font-bold text-sm mt-5 mb-1 tracking-widest">
        RESULTADOS
      </h3>
      <div className="mt-6">
        {data.length > 0 ? (
          data.map((properties, index) => (
            <ResultCard key={index} properties={properties} onRouteSelect={onRouteSelect} />
          ))
        ) : (
          <p>No hay resultados</p>
        )}
      </div>
    </div>
  )
}
