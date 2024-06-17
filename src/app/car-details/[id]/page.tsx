import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CarDetails from './(components)/CarDetails';
import api from '@/api/apiInstance';

export const metadata: Metadata = {
  title: 'WeltCar - Car Details',
};

async function getCarDetails(id: string) {
  try {
    const res = await api.get(`/api/cars/view/${id}`);
    if (!res) return undefined;
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
}

export const revalidate = 180; // revalidate at most every 5 minutes

export default async function CarDetailsPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const carData = await getCarDetails(id);

  if (!carData) return notFound();

  return <CarDetails carData={carData} />;
}
