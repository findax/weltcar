import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import api from '@/api/apiInstance';
import { SupportData } from '@/types/support';
import LegalDetails from './(components)/LegalDetails';

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/pages/support-legal`
  );
  const resMetadata = await data.json() as SupportData;
  console.log(resMetadata)
  return {
    title: resMetadata.title,
    description: resMetadata.seo_description,
    keywords: resMetadata.seo_keywords
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
