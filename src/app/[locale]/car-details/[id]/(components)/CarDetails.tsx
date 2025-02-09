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
import { ICarDetails, ICarGallery, ICarVideos, StatusCar } from '@/types/cardetails';
import { useUserStore } from '@/stores/user-store';
import Breadcrumbs from '@/components/Breadcrumbs';
import { IUser } from '@/types/user';
import { getCarId } from '@/api/cars';
import { useLocale, useTranslations } from 'next-intl';
import { ButtonPrimary } from '@/shared/Buttons';
import { RadioButton } from '@/shared/FormInputs';
import DownloadPdf from './DownloadPdf';
import AuthorizationFavorite from '@/components/authorization/AuthorizationFavorite';

interface IPages {
  pageName: string;
  pageHref: string;
};

export default function CarDetails({
  carId,
}: {
  carId: string;
}) {
  const locale = useLocale();
  const translate = useTranslations();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isOpenDownloadPdfModal, setIsOpenDownloadPdfModal] = useState(false);
  const [isDownloadButtonClick, setIsDownloadButtonClick] = useState(false);
  const [isAuthorizationModalOpen, setIsAuthorizationModalOpen] = useState(false);
  const [carData, setCarData] = useState<ICarDetails>();
  const [isLoading, setIsLoading] = useState(true);
  const [carGallery, setCarGallery] = useState<ICarGallery[]>([]);
  const [carVideos, setCarVideos] = useState<ICarVideos[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPartnerLogo, setIsPartnerLogo] = useState(false);
  const [modalId, setModalId] = useState('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [breadcrumbsPages, setBreadcrumbsPages] = useState<IPages[]>([
    {
      pageName: 'carDetails.breadcrumbs.main',
      pageHref: '/'
    },
    {
      pageName: 'carDetails.breadcrumbs.catalog',
      pageHref: '/catalog'
    }
  ]);
  const [pdfVariants, setPdfVariants] = useState([
    {
      name: 'with',
      value: 'carDetails.downloadPdf.title.with',
      selected: false
    },
    {
      name: 'without',
      value: 'carDetails.downloadPdf.title.without',
      selected: false
    },
  ]);

  const user = useUserStore((state) => state.user);

  const downloadFile = (fileUrl: string, fileName: string) => {
    const anchor = document.createElement("a");
    anchor.href = fileUrl;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  useEffect(() => {
    getCarId(carId, locale)
      .then((carData) => {
        if(carData){
          setCarData(carData);
          setIsFavorite(carData.is_favorite);
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
          carData.videos && setCarVideos([...carData.videos]);
          carData.is_partner_car && setIsPartnerLogo(carData.is_partner_car);

        }
      })
      .finally(() => setIsLoading(false));
  }, [carId]);

  useEffect(() => {
    if (!!user && modalId === 'authorization') {
      setModalId('confirm');
      setIsModalOpen(true);
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (carData && isDownloadButtonClick) {
      const fileUrl =
        selectedOption === "without"
          ? carData.pdf_url
          : carData.pdf_url_clean;
      const fileName =
        selectedOption === "without"
          ? "file-without-price.pdf"
          : "file-with-price.pdf";

      downloadFile(fileUrl, fileName);
      setIsDownloadButtonClick(false);
    }
  },[isDownloadButtonClick])

  const handleRadioButtonChange = (name: string) => {
    setSelectedOption(name);
  };

  const handleOpenDownloadModal = () => {
    setIsOpenDownloadPdfModal(true);
  }

  const handleDownloadButton = () => {
    setIsOpenDownloadPdfModal(false);
    setIsDownloadButtonClick(true);
  }

  function handleReserve() {
    if (!!user) {
      setModalId('confirm');
    } else {
      setModalId('authorization');
    }
    setIsModalOpen(true);
  }

  const getStatusMessage = (status: string | undefined) => {
    switch (status) {
      case StatusCar.Inactive:
        return 'carDetails.button.outOfStock';
      case StatusCar.Sold:
        return 'carDetails.button.sold';
      case StatusCar.Available:
        return 'carDetails.button.reserve';
      default:
        return 'carDetails.button.reserve';
    }
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
        {carGallery && <ImagesHeader isSold={carData?.status === 'inactive'} images={carGallery} videos={carVideos.length > 0 ? carVideos : null }/>}

        <div className='relative z-10 my-11 grid grid-rows-1 grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4'>
          <div className='w-full col-span-3 lg:col-span-2 space-y-8 lg:space-y-10'>
            {carData && (
              <>
                <Title carData={carData} onDownloadCarInfo={handleOpenDownloadModal} />
                {carData.documents.length > 0 && (
                  <Documents documents={carData.documents} />
                )}
                {carData.description && (
                  <Descriptions description={carData.description} />
                )}
                <p className='sm:px-2 text-sm text-neutral-600 dark:text-neutral-300'>
                  <sup>*</sup>{translate('carDetails.vehicle.description')}
                </p>
              </>
            )}
          </div>

          <PriceSidebar
            buttonTitle={getStatusMessage(carData?.status)}
            onClick={handleReserve}
            price={carData?.price || 0}
            isSold={carData?.status === 'inactive' || carData?.status === 'sold'}
            isShowPartnerLogo={isPartnerLogo}
            partnerPhone={carData?.partner_phone || null}
            partnerName={carData?.partner_name || null}
            status_extra={carData?.status_extra || null}
            isFavorite={isFavorite}
            user={user}
            idCar={carId}
            onChangeFavorite={setIsFavorite}
            onChangeModalAuthorizationOpen={setIsAuthorizationModalOpen}
          />
        </div>
      </div>

      <MobileFooterSticky
        onClick={handleReserve}
        price={carData?.price || 0}
        isSold={carData?.status === 'inactive' || carData?.status === 'sold'}
        status_extra={carData?.status_extra || null}
        isFavorite={isFavorite}
        user={user}
        idCar={carId}
        onChangeFavorite={setIsFavorite}
        onChangeModalAuthorizationOpen={setIsAuthorizationModalOpen}
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

      {isOpenDownloadPdfModal && (
        <Modal
          maxWidth='max-w-[430px]'
          isModalOpen={isOpenDownloadPdfModal}
          setIsModalOpen={setIsOpenDownloadPdfModal}
        >
          <DownloadPdf 
            selectedOption={selectedOption} 
            pdfOptions={pdfVariants} 
            handleDownloadButton={handleDownloadButton}
            handleRadioButtonChange={handleRadioButtonChange} 
          />
        </Modal>
      )}

      {isAuthorizationModalOpen && (
        <Modal isModalOpen={isAuthorizationModalOpen} setIsModalOpen={setIsAuthorizationModalOpen}>
          <AuthorizationFavorite setIsModalOpen={setIsAuthorizationModalOpen} />
        </Modal>
      )}
    </>
  );
}
