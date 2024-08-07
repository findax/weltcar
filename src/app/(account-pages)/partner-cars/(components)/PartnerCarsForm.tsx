import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { ButtonPrimary } from '@/shared/Buttons';
import { FormikFile, FormikInput, FormikInputCarSelector, FormikInputSelector, FormikTextarea } from '@/shared/FormInputs';
import { SUPPORTED_FORMATS } from '@/components/authorization/components/SignUpPartner';
import { File } from 'buffer';
import { ICarPartner, ICarPartnerToRequest, ICarPartnerToRequestUpdate, ICountries, IModels, IPartnerFileList, IPartnerPhotoList, IPartnerResponse } from '@/types/partner';
import { createPartnerCar, getPartnerModels, updatePartnerCar } from '@/api/cars';
import { useEffect, useState } from 'react';
import { getCountries } from '@/api/countries';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import Modal from '@/shared/Modal';
import { IoMdClose } from "react-icons/io";

const ModelSchema = Yup.object().shape({
  id: Yup.number().required('ID is required'),
  brand_name: Yup.string().trim().required('Brand name is required'),
  model_name: Yup.string().trim().required('Model name is required'),
});

const CountrySchema = Yup.object().shape({
  id: Yup.number().required('ID is required'),
  name: Yup.string().trim().required('Country is required'),
});

interface IProps {
  partner: IPartnerResponse;
  partnerCar?: ICarPartner;
}

export default function PartnerCarsForm({ 
  partner,
  partnerCar
}:IProps) {
  const [car, setCar] = useState<ICarPartner | null>(partnerCar ? partnerCar : null);
  const [isSuccess, setIsSuccess] = useState(false);
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

  const PartnerCarsSchema = Yup.object().shape({
    model: ModelSchema.required('Model is required'),
    specification: Yup
      .string()
      .trim()
      .required('Specification is required'),
    year: Yup
      .string()
      .trim()
      .required('Year is required'),
    vin: Yup
      .string()
      .trim()
      .required('VIN is required'),
    price: Yup
      .string()
      .trim()
      .required("Price is required"),
    photos: car 
    ? (Yup.array()
        .of(
          Yup.mixed<File>()
            .test('fileType', 'Unsupported file type', (value) => {
              return value && SUPPORTED_FORMATS.includes(value.type);
            })
            .required('Photo is required')
        )
        .max(20, 'Photo is too long')
      )
    : (Yup.array()
        .of(
          Yup.mixed<File>()
            .test('fileType', 'Unsupported file type', (value) => {
              return value && SUPPORTED_FORMATS.includes(value.type);
            })
            .required('Photo is required')
        )
        .max(20, 'Photo is too long')
        .required('Photo is required')
      ),
    description: Yup
      .string()
      .trim()
      .max(500, 'Description is too long')
      .required('Description is required'),
    innerColor: Yup
      .string()
      .trim()
      .required('Inside color is required'),
    outerColor: Yup
      .string()
      .trim()
      .required('Outer color is required'),
    documents: car 
    ? (Yup.array()
        .of(
          Yup.mixed<File>()
            .test('fileType', 'Unsupported file type', (value) => {
              return value && SUPPORTED_FORMATS.includes(value.type);
            })
            .required('Document is required')
        )
        .max(20, 'Document is too long')
      )
    : (Yup.array()
        .of(
          Yup.mixed<File>()
            .test('fileType', 'Unsupported file type', (value) => {
              return value && SUPPORTED_FORMATS.includes(value.type);
            })
            .required('Document is required')
        )
        .max(20, 'Document is too long')
        .required('Documents is required')
      ),
    country: CountrySchema.required('Country is required'),
    postCode: Yup
      .string()
      .trim()
      .required('Index code is required'),
    commentary: Yup
      .string()
      .trim()
      .max(1000, 'Model is too long')
      .required('Commentary is required'),
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
    if(attachedPhotos) {
      return (
        <div>
          <p className='inline-block text-sm font-medium text-neutral-800 dark:text-neutral-200 mb-1'>Uploaded Files</p>
          <div className='flex flex-col gap-1 block w-full border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal px-4 py-3'>
            {attachedPhotos.map((photo) => (
              <div key={photo.id} className='flex items-center w-fit border rounded-2xl px-3 py-2'>
                <p className="text-neutral-500">{photo.original.split('/').pop()}</p>
                <button onClick={(event) => handleDeleteAttachedPhotos(event, photo)} className='ml-1'><IoMdClose/></button>
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
    if(attachedDocuments) {
      return (
        <div>
          <p className='inline-block text-sm font-medium text-neutral-800 dark:text-neutral-200 mb-1'>Uploaded Files</p>
          <div className='flex flex-col gap-1 block w-full border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal px-4 py-3'>
            {attachedDocuments.map((document) => (
              <div key={document.file_name} className='flex items-center w-fit border rounded-2xl px-3 py-2'>
                <p className="text-neutral-500">{document.file_name}</p>
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

  const handleCheckFetch = (car: ICarPartner | null, values: any, setSubmitting = (isSubmitting: boolean) => {}) => {
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
        contractor_comment: values.commentary,
        country: values.country.id,
        post_сode: values.postCode,
        description: values.description,
        photos: values.photos ? values.photos : [],
        documents: values.documents ? values.documents : [],
        attached_photos: attachedPhotosToRequest ? [...attachedPhotosToRequest] : [],
        attached_documents: attachedDocumentsToRequest ? [...attachedDocumentsToRequest] : [],
      };

      updatePartnerCar(carDataToRequest, car.id)
        .then((data) => {
          if(data){
            console.log(data)
            setCar(data);
            setAttachedDocuments(data.documents);
            setAttachedPhotos(data.photos);
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
        contractor_comment: values.commentary,
        country: values.country.id,
        post_сode: values.postCode,
        description: values.description,
        photos: values.photos,
        documents: values.documents
      };

      createPartnerCar(carDataToRequest)
        .then((data) => {
          if(data){
            setSubmitting(false);
          }
        })
        .finally(() => {
          setIsSuccess(true);
        })
    }
  }

  useEffect(() => {
    Promise.all([getCountries(), getPartnerModels()])
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

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={ car ? initialValueFilled : initialValueDefault}
        validationSchema={PartnerCarsSchema}
        onSubmit={(values, { setSubmitting }) => {
          // trim values
          const castValues = PartnerCarsSchema.cast(values);
          
          handleCheckFetch(car, castValues, setSubmitting);

        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className='grid grid-cols-1 gap-7 w-full max-w-xl mt-10 md:mt-0 md:pl-16'>
            <FormikInputCarSelector 
              name='model'
              placeholder='Chose model'
              title='Model name'
              options={models}
              error={errors.model?.brand_name}
              touched={touched.model?.brand_name}
            />
            {/* ---- */}
            <FormikInput
              name='specification'
              placeholder='Enter specification'
              title='Specification'
              error={errors.specification}
              touched={touched.specification}
            />
            {/* ---- */}
            <FormikInput
              name='year'
              placeholder='Enter year'
              title='Year of manufacture'
              error={errors.year}
              touched={touched.year}
            />
            {/* ---- */}
            <FormikInput
              name='vin'
              placeholder='Enter VIN'
              title='VIN'
              error={errors.vin}
              touched={touched.vin}
            />
            {/* ---- */}
            <FormikInput
              name='price'
              placeholder='Enter price'
              title='Price'
              error={errors.price}
              touched={touched.price}
            />
            {/* ---- */}
            <FormikFile 
              initialValues={ car ? initialValueFilled : null}
              name='photos'
              label='Upload your car photo'
              multiple
              error={errors.photos}
              touched={touched.photos}
            />
            {renderAttachedPhotos()}
            {/* ---- */}
            <FormikTextarea
              rows={4}
              name='description'
              placeholder='Description'
              title='Description'
              error={errors.description}
              touched={touched.description}
            />
            {/* ---- */}
            <FormikInput
              name='innerColor'
              placeholder='Inside color'
              title='Inside color'
              error={errors.innerColor}
              touched={touched.innerColor}
            />
            {/* ---- */}
            <FormikInput
              name='outerColor'
              placeholder='External color'
              title='External color'
              error={errors.outerColor}
              touched={touched.outerColor}
            />
            {/* ---- */}
            <FormikFile 
              initialValues={ car ? initialValueFilled : null}
              name='documents'
              label='Upload your documents'
              multiple
              error={errors.documents}
              touched={touched.documents}
            />
            {renderAttachedDocuments()}
            {/* ---- */}
            <FormikInputSelector 
              name='country'
              placeholder='Chose country'
              title='Country'
              options={countries}
              error={errors.country?.name}
              touched={touched.country?.name}
            />
            {/* ---- */}
            <FormikInput
              name='postCode'
              placeholder='Post code'
              title='Post code'
              error={errors.postCode}
              touched={touched.postCode}
            />
            {/* ---- */}
            <FormikTextarea
              rows={4}
              name='commentary'
              placeholder='Commentary'
              title='Commentary'
              error={errors.commentary}
              touched={touched.commentary}
            />


            <ButtonPrimary
              type='submit'
              disabled={isSubmitting}
              //disabled={partner.is_verified ? isSubmitting : true}
              loading={isSubmitting}
            >
              Continue
            </ButtonPrimary>
          </Form>
        )}
      </Formik>
      <Modal 
        title='Thank you!' 
        isModalOpen={isSuccess} 
        setIsModalOpen={setIsSuccess}
      >
        <div className='text-center space-y-10'>
          <InformationCircleIcon className='block mx-auto w-24 h-24 text-yellow-500' />
          <p className='px-3 text-2xl font-semibold'>
            Thank you, your request has been accepted. Soon it will be processed and the car will appear on the website. If there is not enough information, our manager will contact you.
          </p>
        </div>
      </Modal>
    </>
  );
}
