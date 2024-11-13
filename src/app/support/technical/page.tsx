import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import api from '@/api/apiInstance';
import TechnicalDetails from './(components)/TechnocalDetails';
import { SupportData } from '@/types/support';

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/pages/support-technical`
  );
  const resMetadata = await data.json() as SupportData;

  return {
    title: resMetadata.title,
    description: resMetadata.seo_description,
    keywords: resMetadata.seo_keywords
  };
}

async function getTechnicalDetails() {
  try {
    const res = await api.get('/api/pages/support-technical');
    if (!res) return undefined;
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
}

export const revalidate = 180; // revalidate at most every 5 minutes

export default async function TechnicalSupportPage() {
  const technicalData = await getTechnicalDetails();

  if (!technicalData) return notFound();

  return <TechnicalDetails technicalData={technicalData} />;
}
