import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CarDetails from './(components)/CarDetails';
import api from '@/api/apiInstance';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}): Promise<Metadata> {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/cars/view/${params.id}`
  );
  const resMetadata = await data.json();

  return {
    title: `${resMetadata.data.brand + ' ' + resMetadata.data.model} - Elite Car for Sale | Global Delivery Available`,
    description: `Purchase the ${resMetadata.data.brand + ' ' + resMetadata.data.model} and experience unparalleled luxury and performance. We offer global delivery, including services to Germany, Switzerland, Dubai, and China. Explore detailed specifications and exclusive features.`,
  };
}

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
