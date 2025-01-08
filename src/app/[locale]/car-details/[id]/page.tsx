import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CarDetails from './(components)/CarDetails';

async function fetchCarData(id: string) {
  try {
    const headers: Record<string, string> = {
      cache: 'no-store',
      'Accept-Language': 'de',
    };
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/cars/view/${id}`, {
      headers
    },);
    if (!response.ok) {
      throw new Error('Car data not found');
    }
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching car data for ID: ${id}`, error);
    return null;
  }
}

export async function generateMetadata({
  params,
}:{
  params: { id: string };
  // searchParams: { [key: string]: string | string[] | undefined };
}): Promise<Metadata> {
  const resMetadata = await fetchCarData(params.id)

  if (!resMetadata) {
    return {
      title: 'Car Not Found - WeltCar',
      description: 'The requested car could not be found.',
    };
  }

  const { brand, model, specification, year } = resMetadata;

  return {
    title: `${brand} ${model} ${specification} ${year} - Elite Car for Sale | Global Delivery Available | WeltCar`,
    description: `Purchase the ${brand} ${model} ${specification} ${year} and experience unparalleled luxury and performance. We offer global delivery, including services to Germany, Switzerland, Dubai, and China. Explore detailed specifications and exclusive features.`,
  };

}

export const revalidate = 180;

export default async function CarDetailsPage({
  params
} : {
  params: { id: string };
}) {
  const data = await fetchCarData(params.id);
  
  if(!data) return notFound();
  
  return <CarDetails carId={params.id} />;
}
