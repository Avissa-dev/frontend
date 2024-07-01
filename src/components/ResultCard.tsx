// ResultCard.tsx
import { FaBus } from 'react-icons/fa6'
import { Tag } from './Tag'
import { LiaWalkingSolid } from 'react-icons/lia'
import { FaArrowAltCircleRight } from 'react-icons/fa'

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
}

export interface ResultCardProps {
  properties: Properties;
}

export const ResultCard = ({ properties }: ResultCardProps) => {
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
  } = properties;

 if(bus_number == 1){
  console.log(properties);
  return (
    <div className="flex flex-wrap items-center w-full p-4 border-t-2 border-gray-400">
      <div className="flex flex-wrap gap-4 w-4/5">
      <Tag Icon={LiaWalkingSolid}  Color='bg-green-800'/>
        <Tag Text={`${route}`} Icon={FaBus}  Color='bg-purple-700 flex-grow'/>
        <Tag Icon={LiaWalkingSolid}  Color='bg-green-800'/>
      </div>
      <div className="flex items-center justify-center ml-auto w-1/5">
        <FaArrowAltCircleRight className="text-black text-2xl" />
      </div>
    </div>
  )
 }else if(bus_number==2){
  return (
    <div className="flex flex-wrap items-center w-full py-4 border-t-2 border-gray-400">
      <div className="flex flex-wrap gap-4 w-4/5">
        <Tag Text={`${route_1}`} Icon={FaBus} Color='bg-purple-700  min-w-[35%] flex-grow' />
        <Tag Icon={LiaWalkingSolid}  Color='bg-green-800 w-[15%]'/>
        <Tag Text={`${route_2}`} Icon={FaBus}  Color='bg-cyan-700  min-w-[35%]  '/>
      </div>
      <div className="flex items-center justify-center ml-auto w-1/5">
        <FaArrowAltCircleRight className="text-black text-2xl" />
      </div>
    </div>
  )
 }else if( bus_number== 3){
  return (
    <div className="flex flex-wrap items-center w-full p-4 border-t-2 border-gray-400">
      <div className="flex flex-wrap gap-4 w-4/5">
        <Tag Text={`Route: ${route_1}`} Icon={FaBus} />
        <Tag Text={`Class: ${route_1_class}`} Icon={LiaWalkingSolid} />
        <Tag Text={`Route: ${route_2}`} Icon={FaBus} />
        <Tag Text={`Class: ${route_2_class}`} Icon={LiaWalkingSolid} />
        <Tag Text={`Route: ${route_3}`} Icon={FaBus} />
        <Tag Text={`Class: ${route_3_class}`} Icon={LiaWalkingSolid} />
      </div>
      <div className="flex items-center justify-center ml-auto w-1/5">
        <FaArrowAltCircleRight className="text-black text-2xl" />
      </div>
    </div>
  )
 }
}
