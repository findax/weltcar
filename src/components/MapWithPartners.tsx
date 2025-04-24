'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { getPartnerMapLocation } from '@/api/maps';
import { IMapPartnerData } from '@/types/partner';
import { useThemeMode } from '@/hooks/useThemeMode';
import { PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline'
import Link from 'next/link';


delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
});

const PartnersMap = () => {
  const { isDarkMode } = useThemeMode();
  const [partnersLocation, setPartnersLocation] = useState<IMapPartnerData>();
  
  const getParsedPosition = (pos: string): [number, number] | null => {
    if (!pos) return null;
    const coords = pos.split(',').map(Number);
    if (coords.length !== 2 || coords.some(isNaN)) return null;
    return coords as [number, number];
  };

  const renderPhoneList = (phones: string) => {
    return phones.split(',').map((phone, index) => (
      <div key={index} className='flex items-center gap-1'>
        <PhoneIcon height={18} width={18} />
        <Link
          className='inline-block text-neutral-500 dark:text-neutral-400 hover:underline'
          href={`tel:${phone}`}
        >
          {phone}
        </Link>
        {/* <span className='block' key={index}></span> */}
      </div>
    ));
  }
  
  useEffect(() => {
    import('leaflet');
  }, []);

  useEffect(() => {
    getPartnerMapLocation()
      .then((data) => {
        if(data) {
          setPartnersLocation(data);
        }
      })
      .finally()
  }, []);

  return (
    <MapContainer
      center={[52.52, 13.405]}
      zoom={7}
      scrollWheelZoom={false}
      className='w-full h-[300px] md:h-[500px]'
      style={{ borderRadius: '20px' }}
    >
      <TileLayer
         url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {partnersLocation?.objects.map((partner, index) => {
        const parsedPosition = getParsedPosition(partner.position);
        if (!parsedPosition) return null;

        return (
          <Marker  key={index} position={parsedPosition}>
            <Popup>
              <div>
                <span 
                  className='font-medium'
                  style={{
                    color: isDarkMode ? '#DFE172' : '#006684',
                    fontWeight: '500px'
                  }}
                >{partner.name}</span>
                <div className='flex flex-col gap-1 font-medium mt-1'>
                  <div className='flex gap-1 items-center'>
                    <MapPinIcon height={18} width={18} className='mr-1' />
                    <span>{partner.address}</span>
                  </div>
                  <div className='flex flex-col gap-1'>
                    {renderPhoneList(partner.phones)}
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
      )})}
    </MapContainer>
  );
};

export default PartnersMap;
