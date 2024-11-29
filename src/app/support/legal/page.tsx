import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import api from '@/api/apiInstance';
import LegalDetails from './(components)/LegalDetails';

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/pages/support-legal`
  );
  const resMetadata = await data.json();
  
  return {
    title: resMetadata.data.seo_title,
    keywords: resMetadata.data.seo_keywords ,
    description: resMetadata.data.seo_description,
  };
}

async function getLegalDetails() {
  try {
    const res = await api.get('/api/pages/support-legal');
    if (!res) return undefined;
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
}

export const revalidate = 180;

export default async function TechnicalSupportPage() {
  const legalData = await getLegalDetails();

  if (!legalData) return notFound();

  return <LegalDetails legalData={legalData} />;
}
