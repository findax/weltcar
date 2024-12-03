'use client';

import { useEffect, useState } from 'react';
import LoadingSpinner from '@/shared/LoadingSpinner';
import Modal from '@/shared/Modal';
import Authorization from '@/components/authorization/Authorization';
import ImagesHeader from './ImagesHeader';
import Title from './Title';
import Documents from './Documents';
import Descriptions from './Descriptions';
import PriceSidebar from './PriceSidebar';
import MobileFooterSticky from './MobileFooterSticky';
import ConfirmForm from './ConfirmForm';
import { ICarDetails, ICarGallery, ICarVideos } from '@/types/cardetails';
import { useUserStore } from '@/stores/user-store';
import Breadcrumbs from '@/components/Breadcrumbs';
import { IUser } from '@/types/user';

interface IPages {
  pageName: string;
  pageHref: string;
};

export default function CarDetails({
  carData,
}: {
  carData: ICarDetails | undefined;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [carGallery, setCarGallery] = useState<ICarGallery[]>([]);
  const [carVideos, setCarVideos] = useState<ICarVideos[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPartnerLogo, setIsPartnerLogo] = useState(false);
  const [modalId, setModalId] = useState('');
  const [breadcrumbsPages, setBreadcrumbsPages] = useState<IPages[]>([
    {
      pageName: 'Main',
      pageHref: '/'
    },
    {
      pageName: 'Catalog',
      pageHref: '/catalog'
    }
  ]);

  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (carData) {
      const modifiedPhotosArray = [...carData.photos].map((item, index) => ({
        id: index,
        url: item.original,
      }));
      setCarGallery(modifiedPhotosArray);
      const carTitle = `${carData.brand} ${carData.model}`
      setBreadcrumbsPages((prevPages) => {
        const isTitleExists = prevPages.some(
          (page) => page.pageName === carTitle
        );

        if (!isTitleExists) {
          return [...prevPages, { pageName: carTitle, pageHref: '' }];
        }
        return prevPages;
      });
      setIsLoading(false);
      carData.videos && setCarVideos([...carData.videos]);
      carData.is_partner_car && setIsPartnerLogo(carData.is_partner_car);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!!user && modalId === 'authorization') {
      setModalId('confirm');
      setIsModalOpen(true);
    }
  }, [isModalOpen]);

  function handleReserve() {
    if (!!user) {
      setModalId('confirm');
    } else {
      setModalId('authorization');
    }
    setIsModalOpen(true);
  }

  return isLoading ? (
    <div className='h-[calc(100vh-76px)] flex justify-center items-center'>
      <div className='-mt-[76px]'>
        <LoadingSpinner className='w-12' />
      </div>
    </div>
  ) : (
    <>
      <div className='container'>
        <div className='mt-8'>
          <Breadcrumbs pages={breadcrumbsPages} />
        </div>
        {carGallery.length > 0 && <ImagesHeader images={carGallery} videos={carVideos.length > 0 ? carVideos : null }/>}

        <div className='relative z-10 my-11 grid grid-rows-1 grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4'>
          <div className='w-full col-span-3 lg:col-span-2 space-y-8 lg:space-y-10'>
            {carData && (
              <>
                <Title carData={carData} />
                {carData.documents.length > 0 && (
                  <Documents documents={carData.documents} />
                )}
                {carData.description && (
                  <Descriptions description={carData.description} />
                )}
                <p className='sm:px-2 text-sm text-neutral-600 dark:text-neutral-300'>
                  <sup>*</sup>Vehicle specifications and configurations may vary
                  slightly due to potential discrepancies in the description.
                </p>
              </>
            )}
          </div>

          <PriceSidebar
            onClick={handleReserve}
            price={carData?.price || 0}
            isSold={carData?.status === 'sold'}
            isShowPartnerLogo={isPartnerLogo}
            userData={user ? user : null}
          />
        </div>
      </div>

      <MobileFooterSticky
        onClick={handleReserve}
        price={carData?.price || 0}
        isSold={carData?.status === 'sold'}
      />

      {modalId === 'confirm' && (
        <Modal
          maxWidth='max-w-3xl'
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        >
          <ConfirmForm
            carId={carData?.id || ''}
            setIsModalOpen={setIsModalOpen}
          />
        </Modal>
      )}

      {modalId === 'authorization' && (
        <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
          <Authorization setIsModalOpen={setIsModalOpen} />
        </Modal>
      )}
    </>
  );
}
