'use client';

import { useEffect, useState } from 'react';
import { getPartnerCarId } from '@/api/cars';
import PartnerCarDetails from './(components)/PartnerCarDetails';
import { ICarPartnerDetails } from '@/types/partner';
import { notFound } from 'next/navigation';
import { useLocale } from 'next-intl';

export default function PartnerCarDetailsPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const locale = useLocale();
  const [carData, setCarData] = useState<ICarPartnerDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPartnerCarId(id, locale);
        if (res) {
          setCarData(res);
        } else {
          setHasError(true);
        }
      } catch (error) {
        setHasError(true);
      } finally {
      }
    };

    fetchData();
  }, [id]);

  if ((hasError && !carData) || hasError) return notFound();

  return <PartnerCarDetails carData={carData} />
}
