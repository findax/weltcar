'use client';

import Image from 'next/image';
import bgImg from '@/images/bg-cars/bg-car-3.webp';
import PartnerCarsForm from './(components)/PartnerCarsForm';
import { ProtectedRoute, UserRole } from '@/utils/protectedRoute';
import { useEffect, useState } from 'react';
import { getPartner } from '@/api/partner';
import { ICarPartnerDetails, IPartnerResponse } from '@/types/partner';
import ErrorComponent from '@/components/ErrorComponent';
import LoadingSpinner from '@/shared/LoadingSpinner';
import { getPartnerCarId } from '@/api/cars';
import { useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';


const PartnerCarsPage = () => {
  const translate = useTranslations();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const id = searchParams.get('id');
  const [isFirstLoading, setFirstLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [partner, setPartner] = useState<IPartnerResponse>();
  const [partnerCar, setPartnerCar] = useState<ICarPartnerDetails>();

  useEffect(() => {
    const fetchData = async () => {
      setFirstLoading(true);
      try {
        if (!id) {
          const partner = await getPartner(locale);
          setPartner(partner as IPartnerResponse);
        } else {
          const [partner, partnerCar] = await Promise.all([
            getPartner(locale),
            getPartnerCarId(id as string, locale),
          ]);
          setPartner(partner as IPartnerResponse);
          setPartnerCar(partnerCar as ICarPartnerDetails);
        }
      } catch (error) {
        setError(true);
      } finally {
        setFirstLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return isFirstLoading ? (
    <div className='h-[calc(100vh-76px)] flex justify-center items-center'>
      <div className='-mt-[76px]'>
        <LoadingSpinner className='w-12' />
      </div>
    </div>
  ) : isError ? (
    <div className='h-[calc(100vh-76px)] flex justify-center items-center'>
      <ErrorComponent />
    </div>
  ) : (
    <ProtectedRoute role={UserRole.partner}>
      <div className='relative space-y-6 md:space-y-8 lg:min-h-[350px]'>
        {/* HEADING */}
        <h2 className='text-3xl font-semibold'>{translate('accountPartnerCars.title')}</h2>
        <div className='flex flex-col md:flex-row'>
          {partner && <PartnerCarsForm partnerCar={partnerCar} partner={partner} />}
        </div>
        <Image
          className='hidden md:block absolute inset-0 top-1/2 -translate-y-1/2 object-contain w-full opacity-[0.06] -z-10'
          src={bgImg}
          alt='car background image'
          priority
        />
      </div>
    </ProtectedRoute>
  );
};

export default PartnerCarsPage;
