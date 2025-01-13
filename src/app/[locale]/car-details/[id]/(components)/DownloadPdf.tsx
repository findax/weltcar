import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { ButtonPrimary } from '@/shared/Buttons';
import { FormikCheckbox, RadioButton } from '@/shared/FormInputs';
import { createOrder } from '@/api/user';
import { useTranslations } from 'next-intl';
import { PdfVariant } from '@/types/cardetails';

export default function DownloadPdf({
  pdfOptions,
  selectedOption,
  handleRadioButtonChange,
  handleDownloadButton,
}: {
  pdfOptions: PdfVariant[];
  selectedOption: string | null;
  handleRadioButtonChange: (name: string) => void;
  handleDownloadButton: () => void;
}) {
  const translate = useTranslations();

  return (
    <div className='flex flex-col'>
      <h3 className='text-3xl text-neutral-900 dark:text-white text-center font-semibold'>
        {translate('carDetails.downloadPdf.title.how')}
        <br />
        {translate('carDetails.downloadPdf.title.to')}
      </h3>
      <div className='flex flex-col py-9 gap-5 '>
        {pdfOptions.map((pdfOption) => (
          <div 
            key={pdfOption.name}
            className='flex items-center'
          >
            <RadioButton 
              name={pdfOption.name}
              label={pdfOption.value}
              onChange={() => handleRadioButtonChange(pdfOption.name)}
              checked={selectedOption === pdfOption.name}
            />
          </div>
        ))}
      </div>
      <ButtonPrimary
        fontSize='md:text-lg'
        className='font-medium'
        onClick={handleDownloadButton}
      >
        {translate('carDetails.downloadPdf.button')}
      </ButtonPrimary>
    </div>
  );
}
