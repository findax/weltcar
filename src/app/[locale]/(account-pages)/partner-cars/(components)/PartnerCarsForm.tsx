import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { ButtonPrimary } from '@/shared/Buttons';
import { FormikFile, FormikInput, FormikInputCarSelector, FormikInputSelector, FormikTextarea } from '@/shared/FormInputs';
import { SUPPORTED_FORMATS } from '@/components/authorization/components/SignUpPartner';
import { File } from 'buffer';
import { ICarPartnerDetails, ICarPartnerToRequest, ICarPartnerToRequestUpdate, ICountries, IModels, IPartnerFileList, IPartnerPhotoList, IPartnerResponse } from '@/types/partner';
import { createPartnerCar, getPartnerModels, updatePartnerCar } from '@/api/cars';
import { useEffect, useState } from 'react';
import { getCountries } from '@/api/countries';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import Modal from '@/shared/Modal';
import { IoMdClose } from "react-icons/io";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Route } from 'next';
import { toast } from 'react-toastify';
import { useLocale, useTranslations } from 'next-intl';

const ModelSchema = Yup.object().shape({
  id: Yup.number().required('partnerCarsSchema.model.idRequired'),
  brand_name: Yup.string().trim().required('partnerCarsSchema.model.brandRequired'),
  model_name: Yup.string().trim().required('partnerCarsSchema.model.modelRequired'),
});

const CountrySchema = Yup.object().shape({
  id: Yup.number().required('partnerCarsSchema.country.idRequired'),
  name: Yup.string().trim().required('partnerCarsSchema.country.nameRequired'),
});

interface IProps {
  partner: IPartnerResponse;
  partnerCar?: ICarPartnerDetails;
}

export default function PartnerCarsForm({
  partner,
  partnerCar
}:IProps) {
  const translate = useTranslations();
  const router = useRouter();
  const locale = useLocale();
  const [car, setCar] = useState<ICarPartnerDetails | null>(partnerCar ? partnerCar : null);
  const [responseCarId, setResponseCarId] = useState<string>();
  const [countries, setCountries] = useState<ICountries>([]);
  const [models, setModels] = useState<IModels>([]);
  const [attachedPhotos, setAttachedPhotos] = useState<IPartnerPhotoList[] | null>(partnerCar ? partnerCar.photos : null);
  const [attachedDocuments, setAttachedDocuments] = useState<IPartnerFileList[] | null>(partnerCar ? partnerCar.documents : null);
  const [initialValueDefault, setInitialValueDefault] = useState({
    model: {
      id: '',
      brand_name: '',
      model_name: '',
    },
    specification: '',
    year: '',
    vin: '',
    price: '',
    photos: undefined,
    description: '',
    innerColor: '',
    outerColor: '',
    documents: undefined,
    country: {
      id: '',
      name: ''
    },
    postCode: '',
    commentary: ''
  });
  const [initialValueFilled, setInitialValueFilled] = useState({
    model: {
      id: car?.model_id,
      brand_name: car?.brand,
      model_name: car?.model,
    },
    specification: car?.specification,
    year: car?.year,
    vin: car?.vin,
    price: car?.price,
    photos: undefined,
    description: car?.description,
    innerColor: car?.inner_color_name,
    outerColor: car?.outer_color_name,
    documents: undefined,
    country: {
      id: car?.country.id,
      name: car?.country.name
    },
    postCode: car?.post_code,
    commentary: car?.contractor_comment
  });
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const PartnerCarsSchema = Yup.object().shape({
    model: ModelSchema.required('partnerCarsSchema.model.required'),
    specification: Yup
      .string()
      .trim()
      .required('partnerCarsSchema.specification.required'),
    year: Yup
      .string()
      .trim()
      .required('partnerCarsSchema.year.required'),
    vin: Yup
      .string()
      .trim()
      .required('partnerCarsSchema.vin.required'),
    price: Yup
      .string()
      .trim()
      .required("partnerCarsSchema.price.required"),
    photos: car
    ? (Yup.array()
        .of(
          Yup.mixed<File>()
            .test('fileType', 'partnerCarsSchema.photos.unsupported', (value) => {
              return value && SUPPORTED_FORMATS.includes(value.type);
            })
            .required('partnerCarsSchema.photos.required')
        )
        .max(20, 'partnerCarsSchema.photos.max')
      )
    : (Yup.array()
        .of(
          Yup.mixed<File>()
            .test('fileType', 'partnerCarsSchema.photosTwo.unsupported', (value) => {
              return value && SUPPORTED_FORMATS.includes(value.type);
            })
            .required('partnerCarsSchema.photosTwo.required')
        )
        .max(20, 'partnerCarsSchema.photosTwo.max')
        .required('partnerCarsSchema.photosTwo.unsupported')
      ),
    description: Yup
      .string()
      .trim()
      .max(50000, 'partnerCarsSchema.description.max')
      .required('partnerCarsSchema.description.required'),
    innerColor: Yup
      .string()
      .trim()
      .required('partnerCarsSchema.innerColor.required'),
    outerColor: Yup
      .string()
      .trim()
      .required('partnerCarsSchema.outerColor.required'),
    documents: Yup.array()
      .of(
        Yup.mixed<File>()
          .test('fileType', 'partnerCarsSchema.documents.unsupported', (value) => {
            return value && SUPPORTED_FORMATS.includes(value.type);
          })
          .required('partnerCarsSchema.documents.required')
      )
      .max(20, 'partnerCarsSchema.documents.max'),
    country: CountrySchema.required('partnerCarsSchema.country.required'),
    postCode: Yup
      .string()
      .trim()
      .required('partnerCarsSchema.postCode.required'),
    commentary: Yup
      .string()
      .trim()
      .max(1000, 'partnerCarsSchema.commentary.required')
  });

  const handleDeleteAttachedPhotos = (event: React.MouseEvent<HTMLButtonElement>, photo: IPartnerPhotoList) => {
    event.preventDefault();
    if(attachedPhotos && attachedPhotos.length > 0) {
      const newArrayAttachedPhotos = [...attachedPhotos];
      const filteredPhotos = newArrayAttachedPhotos.filter((currentPhoto) => currentPhoto.original !== photo.original);
      if(filteredPhotos.length > 0){
        setAttachedPhotos(filteredPhotos);
      } else {
        setAttachedPhotos(null);
      }
    }
  }

  const renderAttachedPhotos = () => {
    if(attachedPhotos && attachedPhotos.length > 0) {
      return (
        <div>
          <p className='inline-block text-sm font-medium text-neutral-800 dark:text-neutral-200 mb-1'>{translate('accountPartnerCars.form.attachedPhotos.label')}</p>
          <div className='flex flex-col gap-1 block w-full border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal px-4 py-3'>
            {attachedPhotos.map((photo) => (
              <div key={photo.id} className='relative flex items-center w-fit rounded-2xl px-1 py-2'>
                <img
                  src={photo.thumb}
                  className='h-[70px] w-[70px] rounded-lg'
                  alt="photo"
                />
                <button
                  onClick={(event) => handleDeleteAttachedPhotos(event, photo)}
                  className='absolute bg-white dark:bg-neutral-900 top-0 right-0 ml-1 p-1 border rounded-full'>
                    <IoMdClose/>
                  </button>
              </div>
            ))}
          </div>
        </div>
      )
    } else {
      return null;
    }
  }

  const handleDeleteAttachedDocuments = (event: React.MouseEvent<HTMLButtonElement>, document: IPartnerFileList) => {
    event.preventDefault();
    if(attachedDocuments && attachedDocuments.length > 0) {
      const newArrayAttachedDocuments = [...attachedDocuments];
      const filteredDocuments = newArrayAttachedDocuments.filter((currentDoc) => currentDoc.file_name !== document.file_name);
      if(filteredDocuments.length > 0){
        setAttachedDocuments(filteredDocuments);
      } else {
        setAttachedDocuments(null);
      }
    }
  }

  const renderAttachedDocuments = () => {
    if(attachedDocuments && attachedDocuments.length > 0) {
      return (
        <div>
          <p className='inline-block text-sm font-medium text-neutral-800 dark:text-neutral-200 mb-1'>{translate('accountPartnerCars.form.attachedDocuments.label')}</p>
          <div className='flex flex-col gap-1 block w-full border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal px-4 py-3'>
            {attachedDocuments.map((document) => (
              <div key={document.file_name} className='flex items-center w-fit border rounded-2xl px-3 py-2'>
                <Link href={document.url as Route} target='_blank'>
                  <p className="text-neutral-500">{document.file_name}</p>
                </Link>
                <button onClick={(event) => handleDeleteAttachedDocuments(event, document)} className='ml-1'><IoMdClose/></button>
              </div>
            ))}
          </div>
        </div>
      )
    } else {
      return null;
    }
  }

  const handleModalUpdateOpen = () => {
    setIsUpdateModalOpen(true);
  }

  const handleModalCreateOpen = () => {
    setIsCreateModalOpen(true);
  }

  const handleCheckFetch = (car: ICarPartnerDetails | null, values: any, setSubmitting = (isSubmitting: boolean) => {}, resetForm = () => {}) => {
    if(car){
      const attachedPhotosToRequest = attachedPhotos?.map((attachedPhoto) => attachedPhoto.id);
      const attachedDocumentsToRequest = attachedDocuments?.map((attachedDocument) => attachedDocument.id);

      const carDataToRequest: ICarPartnerToRequestUpdate = {
        model_id: values.model.id.toString(),
        specification: values.specification,
        year: Number(values.year),
        vin: values.vin,
        price: values.price,
        inner_color_hex: values.innerColor,
        inner_color_name: values.innerColor,
        outer_color_hex: values.outerColor,
        outer_color_name: values.outerColor,
        contractor_comment: values.commentary ? values.commentary : '',
        country: values.country.id,
        post_code: values.postCode,
        description: values.description,
        photos: values.photos ? values.photos : [],
        documents: values.documents ? values.documents : [],
        attached_photos: attachedPhotosToRequest ? [...attachedPhotosToRequest] : [],
        attached_documents: attachedDocumentsToRequest ? [...attachedDocumentsToRequest] : [],
      };

      updatePartnerCar(carDataToRequest, car.id, locale)
        .then((data) => {
          if(data && !data.message){
            setCar(data);
            setAttachedDocuments(data.documents);
            setAttachedPhotos(data.photos);
            setSubmitting(false);
            handleModalUpdateOpen();
            toast.success('Thank you, your update has been accepted.')
          }else {
            setSubmitting(false);
          }
        })

    } else {
      const carDataToRequest: ICarPartnerToRequest = {
        model_id: values.model.id.toString(),
        specification: values.specification,
        year: Number(values.year),
        vin: values.vin,
        price: values.price,
        inner_color_hex: values.innerColor,
        inner_color_name: values.innerColor,
        outer_color_hex: values.outerColor,
        outer_color_name: values.outerColor,
        contractor_comment: values.commentary ? values.commentary : '',
        country: values.country.id,
        post_code: values.postCode,
        description: values.description,
        photos: values.photos,
        documents: values.documents ? values.documents : []
      };

      createPartnerCar(carDataToRequest, locale)
        .then((data) => {
          if(data && !data.message){
            setResponseCarId(data.id);
            setSubmitting(false);
            resetForm()
            handleModalCreateOpen();
            toast.success('Thank you, your request has been accepted.')
          }else {
            setSubmitting(false);
          }
        })
    }
  }

  const handleKeyPressNumber = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!/^[0-9]$/.test(event.key)) {
      event.preventDefault();
    }
  };

  const handleRedirectOnEdit = () => {
    responseCarId && router.push(`/partner-cars-list`)
  }

  useEffect(() => {
    Promise.all([getCountries(locale), getPartnerModels(locale)])
      .then(([countriesData, modelsData]) => {
        if(countriesData && modelsData){
          setCountries(countriesData);
          setModels(modelsData);
        }
      })
  },[]);

  useEffect(() => {
    if(car){
      setInitialValueFilled({
        model: {
          id: car?.model_id,
          brand_name: car?.brand,
          model_name: car?.model,
        },
        specification: car?.specification,
        year: car?.year,
        vin: car?.vin,
        price: car?.price.toString(),
        photos: undefined,
        description: car?.description,
        innerColor: car?.inner_color_name,
        outerColor: car?.outer_color_name,
        documents: undefined,
        country: {
          id: car?.country.id,
          name: car?.country.name
        },
        postCode: car?.post_code,
        commentary: car?.contractor_comment
      });
    }
  }, [car]);

  useEffect(() => {
    if(partnerCar) {
      setCar(partnerCar)
      setInitialValueFilled({
        model: {
          id: partnerCar?.model_id,
          brand_name: partnerCar?.brand,
          model_name: partnerCar?.model,
        },
        specification: partnerCar?.specification,
        year: partnerCar?.year,
        vin: partnerCar?.vin,
        price: partnerCar?.price.toString(),
        photos: undefined,
        description: partnerCar?.description,
        innerColor: partnerCar?.inner_color_name,
        outerColor: partnerCar?.outer_color_name,
        documents: undefined,
        country: {
          id: partnerCar?.country.id,
          name: partnerCar?.country.name
        },
        postCode: partnerCar?.post_code,
        commentary: partnerCar?.contractor_comment
      })
      setAttachedPhotos(partnerCar.photos);
      setAttachedDocuments(partnerCar.documents)
    }
  },[partnerCar])

  return (
    <>
      <Formik
        //enableReinitialize
        initialValues={ car ? initialValueFilled : initialValueDefault}
        validationSchema={PartnerCarsSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          // trim values
          const castValues = PartnerCarsSchema.cast(values);

          handleCheckFetch(car, castValues, setSubmitting, resetForm);

        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className='grid grid-cols-1 gap-7 w-full max-w-xl mt-10 md:mt-0 md:pl-16'>
            <FormikInputCarSelector
              disabled={car?.is_verified}
              name='model'
              placeholder='accountPartnerCars.form.modelName.placeholder'
              title='accountPartnerCars.form.modelName.label'
              options={models}
              error={errors.model?.brand_name}
              touched={touched.model?.brand_name}
            />
            {/* ---- */}
            <FormikInput
              disabled={car?.is_verified}
              name='specification'
              placeholder='accountPartnerCars.form.specification.placeholder'
              title='accountPartnerCars.form.specification.label'
              error={errors.specification}
              touched={touched.specification}
            />
            {/* ---- */}
            <FormikInput
              disabled={car?.is_verified}
              onKeyPress={handleKeyPressNumber}
              name='year'
              placeholder='accountPartnerCars.form.year.placeholder'
              title='accountPartnerCars.form.year.label'
              error={errors.year}
              touched={touched.year}
            />
            {/* ---- */}
            <FormikInput
              disabled={car?.is_verified}
              name='vin'
              placeholder='accountPartnerCars.form.vin.placeholder'
              title='accountPartnerCars.form.vin.label'
              error={errors.vin}
              touched={touched.vin}
            />
            {/* ---- */}
            <FormikInput
              onKeyPress={handleKeyPressNumber}
              name='price'
              placeholder='accountPartnerCars.form.price.placeholder'
              title='accountPartnerCars.form.price.label'
              error={errors.price}
              touched={touched.price}
            />
            {/* ---- */}
            <FormikFile
              disabled={car?.is_verified}
              variant='photo'
              initialValues={ car ? initialValueFilled : null}
              name='photos'
              label='accountPartnerCars.form.uploadPhotos.label'
              multiple
              error={errors.photos}
              touched={touched.photos}
            />
            {renderAttachedPhotos()}
            {/* ---- */}
            <FormikTextarea
              disabled={car?.is_verified}
              rows={4}
              name='description'
              placeholder='accountPartnerCars.form.description.placeholder'
              title='accountPartnerCars.form.description.label'
              rounded='rounded-[40px]'
              error={errors.description}
              touched={touched.description}
            />
            {/* ---- */}
            <FormikInput
              disabled={car?.is_verified}
              name='outerColor'
              placeholder='accountPartnerCars.form.externalColor.placeholder'
              title='accountPartnerCars.form.externalColor.label'
              error={errors.outerColor}
              touched={touched.outerColor}
            />
            {/* ---- */}
            <FormikInput
              disabled={car?.is_verified}
              name='innerColor'
              placeholder='accountPartnerCars.form.insideColor.placeholder'
              title='accountPartnerCars.form.insideColor.label'
              error={errors.innerColor}
              touched={touched.innerColor}
            />
            {/* ---- */}
            <FormikFile
              disabled={car?.is_verified}
              initialValues={ car ? initialValueFilled : null}
              name='documents'
              label='accountPartnerCars.form.uploadDocuments.label'
              multiple
              error={errors.documents}
              touched={touched.documents}
            />
            {renderAttachedDocuments()}
            {/* ---- */}
            <div className='flex gap-2'>
              <div className='w-full'>
                <FormikInputSelector
                  disabled={car?.is_verified}
                  name='country'
                  placeholder='accountPartnerCars.form.carLocation.placeholder'
                  title='accountPartnerCars.form.carLocation.label'
                  options={countries}
                  error={errors.country?.name}
                  touched={touched.country?.name}
                />
              </div>
              {/* ---- */}
              <div className='w-full'>
                <FormikInput
                  disabled={car?.is_verified}
                  name='postCode'
                  placeholder='accountPartnerCars.form.postCode.placeholder'
                  title='accountPartnerCars.form.postCode.label'
                  error={errors.postCode}
                  touched={touched.postCode}
                />
              </div>
            </div>
            {/* ---- */}
            <FormikTextarea
              disabled={car?.is_verified}
              rows={4}
              name='commentary'
              placeholder='accountPartnerCars.form.commentary.placeholder'
              title='accountPartnerCars.form.commentary.label'
              rounded='rounded-[40px]'
              error={errors.commentary}
              touched={touched.commentary}
            />


            <ButtonPrimary
              type='submit'
              disabled={!!partner.is_verified ? isSubmitting : true}
              loading={isSubmitting}
            >
              {translate('accountPartnerCars.form.button.continue')}
            </ButtonPrimary>
          </Form>
        )}
      </Formik>

      <Modal
        title={translate('accountPartnerCars.modal.thankYou.label')}
        isModalOpen={isCreateModalOpen ? isCreateModalOpen : isUpdateModalOpen}
        setIsModalOpen={ isCreateModalOpen ? setIsCreateModalOpen : setIsUpdateModalOpen }
        handleChange={ isCreateModalOpen ? handleRedirectOnEdit : undefined }
      >
        {isCreateModalOpen
          ? (
              <div className='text-center space-y-10'>
                <InformationCircleIcon className='block mx-auto w-24 h-24 text-yellow-500' />
                <p className='px-3 text-md font-semibold'>
                  {translate('accountPartnerCars.modal.thankYouRequest.title')}
                </p>
              </div>
            )
          :  (
              <div className='text-center space-y-10'>
                <InformationCircleIcon className='block mx-auto w-24 h-24 text-yellow-500' />
                <p className='px-3 text-md font-semibold'>
                  {translate('accountPartnerCars.modal.thankYouUpdate.title')}
                </p>
              </div>
            )
        }
      </Modal>
    </>
  );
}
