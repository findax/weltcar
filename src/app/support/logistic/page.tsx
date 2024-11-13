import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import api from '@/api/apiInstance';
import { SupportData } from '@/types/support';
import LogisticDetails from './{components)/LogisticDetails';

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/pages/support-logistic`
  );
  const resMetadata = await data.json() as SupportData;

  return {
    title: resMetadata.title,
    description: resMetadata.seo_description,
    keywords: resMetadata.seo_keywords
  };
}

async function getLogisticDetails() {
  try {
    const res = await api.get('/api/pages/support-logistic');
    if (!res) return undefined;
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
}

export const revalidate = 180;

export default async function TechnicalSupportPage() {
  const logisticData = await getLogisticDetails();

  if (!logisticData) return notFound();

  return <LogisticDetails logisticData={logisticData} />;
}
