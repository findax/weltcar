import { Suspense } from 'react';
import LoadingSpinner from '@/shared/LoadingSpinner';
import Catalog from './(components)/Catalog';

export default function CatalogPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Catalog />
    </Suspense>
  );
}
