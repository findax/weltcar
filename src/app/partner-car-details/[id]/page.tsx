'use client';

import { useEffect, useState } from 'react';
import { getPartnerCarId } from '@/api/cars';
import PartnerCarDetails from './(components)/PartnerCarDetails';
import { ICarPartner } from '@/types/partner';
import { notFound } from 'next/navigation';

export default function PartnerCarDetailsPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const [carData, setCarData] = useState<ICarPartner | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPartnerCarId(id);
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
