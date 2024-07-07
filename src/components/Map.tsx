import { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer, GeoJSON, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Feature, MultiLineString, GeoJsonObject } from 'geojson';

interface MapProps {
  setOrigin: (location: [number, number]) => void;
  setDestination: (location: [number, number]) => void;
  origin: [number, number] | null;
  destination: [number, number] | null;
  onMapDoubleClick: (location: [number, number]) => void;
  selectedRoute: Feature<MultiLineString> | null;
}

export const Map = ({ setOrigin, origin, destination, onMapDoubleClick, selectedRoute }: MapProps) => {
  const position: [number, number] = [13.7036, -89.224];
  const [lineStrings, setLineStrings] = useState<Feature<MultiLineString>[]>([]);

  useEffect(() => {
    if (selectedRoute) {
      setLineStrings([selectedRoute]);
      console.log('Map received selectedRoute:', [selectedRoute]);
    } else {
      setLineStrings([]);
    }
  }, [selectedRoute]);

  const defaultIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png',
    shadowSize: [41, 41]
  });

  const MapDoubleClickHandler = () => {
    useMapEvents({
      dblclick: e => {
        const { lat, lng } = e.latlng;
        onMapDoubleClick([lat, lng]);
      }
    });
    return null;
  };

  const colors = ['#e580ff', '#000000', '#FF5733', '#33FF57', '#3357FF'];

  const getStyle = (index: number) => ({
    color: colors[index % colors.length],
    weight: 5,
    opacity: 0.8
  });

  return (
    <MapContainer center={position} zoom={13} className="h-screen w-full">
      <TileLayer
        url="https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
        maxZoom={20}
        subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
      />
      <MapDoubleClickHandler />
      {origin && <Marker position={origin} icon={defaultIcon} />}
      {destination && <Marker position={destination} icon={defaultIcon} />}
      {lineStrings.map((line, lineIndex) =>
        (line.geometry.coordinates as [number, number][][]).map((subLine, subLineIndex) => (
          <GeoJSON
            key={`${lineIndex}-${subLineIndex}`}
            data={{
              type: 'Feature',
              geometry: {
                type: 'LineString',
                coordinates: subLine
              },
              properties: {}
            } as GeoJsonObject}
            style={() => getStyle(subLineIndex)}
          />
        ))
      )}
    </MapContainer>
  );
};
