'use client';

import { useEffect, useState } from 'react';
import LoadingSpinner from '@/shared/LoadingSpinner';
import Modal from '@/shared/Modal';
import Authorization from '@/components/authorization/Authorization';
import ImagesHeader from '../../../car-details/[id]/(components)/ImagesHeader';
import Title from '../../../car-details/[id]/(components)/Title';
import Documents from '../../../car-details/[id]/(components)/Documents';
import Descriptions from '../../../car-details/[id]/(components)/Descriptions';
import PriceSidebar from '../../../car-details/[id]/(components)/PriceSidebar';
import MobileFooterSticky from '../../../car-details/[id]/(components)/MobileFooterSticky';
import ConfirmForm from '../../../car-details/[id]/(components)/ConfirmForm';
import { ICarGallery, ICarVideos } from '@/types/cardetails';
import { useUserStore } from '@/stores/user-store';
import { ICarPartnerDetails } from '@/types/partner';
import Breadcrumbs from '@/components/Breadcrumbs';
import { IUser } from '@/types/user';
import DownloadPdf from '@/app/[locale]/car-details/[id]/(components)/DownloadPdf';

interface IPages {
  pageName: string;
  pageHref: string;
};

export default function PartnerCarDetails({
  carData,
}: {
  carData: ICarPartnerDetails | null;
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
      pageName: 'Partner car-list',
      pageHref: '/partner-cars-list'
    }
  ]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isOpenDownloadPdfModal, setIsOpenDownloadPdfModal] = useState(false);
  const [isDownloadButtonClick, setIsDownloadButtonClick] = useState(false);
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
      carData.videos && setCarVideos([...carData.videos]);
      carData.is_partner_car && setIsPartnerLogo(carData.is_partner_car);
      setIsLoading(false);
    }
  }, [carData]);

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
        {carGallery.length > 0 && <ImagesHeader images={carGallery} videos={carVideos.length > 0 ? carVideos : null} />}

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
            partnerPhone={carData?.partner_phone || null}
            partnerName={carData?.partner_name || null}
            status_extra={carData?.status_extra || null}
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
    </>
  );
}
