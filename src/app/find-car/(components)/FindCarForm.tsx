'use client';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  FormikInput,
  FormikInputSelector,
  FormikPhoneNumberInput,
  FormikTextarea,
} from '@/shared/FormInputs';
import { ButtonPrimary } from '@/shared/Buttons';
import { findCar } from '@/api/cars';
import { FindCarProps } from '@/types/car';
import Modal from '@/shared/Modal';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const EngineTypesSchema = Yup.object().shape({
  id: Yup.number().required('ID is required'),
  name: Yup.string().trim().required('Engine types is required'),
});

const RequestTimeSchema = Yup.object().shape({
  id: Yup.number().required('ID is required'),
  name: Yup.string().trim().required('Request time is required'),
});

export default function FindCarForm() {
  const [isSeuccessRequest, setIsSuccessRequest] = useState(false);

  const phoneValidationPattern = /\+?[\d]+/;

  const engineTypes = [
    {
      "id": 1,
      "name": "Gas"
    },
    {
      "id": 2,
      "name": "Diesel"
    },
    {
      "id": 3,
      "name": "Electrical"
    },
    {
      "id": 4,
      "name": "Hybrid"
    }
  ]

  const requestTime = [
    {
      "id": 1,
      "name": "Immediate"
    },
    {
      "id": 2,
      "name": "Month"
    },
    {
      "id": 3,
      "name": "Ready to wait"
    }
  ]

  const FindCarSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .min(2, 'Name is too short')
      .max(50, 'Name is too long')
      .required('Name is required'),
    email: Yup.string()
      .trim()
      .email('Invalid email')
      .required('Email is required'),
    phone: Yup.string()
      .trim()
      .matches(phoneValidationPattern, 'Invalid phone number')
      .required('Email is required'),
    brand: Yup.string()
      .trim()
      .min(2, 'Brand name is too short')
      .max(50, 'Brand name is too long')
      .required('Brand name is required'),
    model: Yup.string()
      .trim()
      .min(2, 'Model name is too short')
      .max(255, 'Model name is too long')
      .required('Model name is required'),
    color: Yup.string()
      .trim()
      .min(2, 'Color name is too short')
      .max(255, 'Color name is too long')
      .required('Color name is required'),
    specification: Yup.string()
      .trim()
      .min(2, 'Specification is too short')
      .max(255, 'Specification is too long'),
    additional: Yup.string()
      .trim()
      .min(2, 'Additional details is too short')
      .max(5000, 'Additional details is too long'),
    comment: Yup.string()
      .trim()
      .min(10, 'Comment is too short')
      .max(5000, 'Comment is too long'),
    engineType: EngineTypesSchema.required('Engine type is required'),
    requestTime: RequestTimeSchema.required('Request time is required'),
  });

  const returnFindCarDataToRequest = (data: any) => {
    const { engineType, requestTime, ...newValues } = data;
    const valuesToRequest = {...newValues};
    valuesToRequest['engineType'] = data.engineType.name
    valuesToRequest['requestTime'] = data.requestTime.name
    return valuesToRequest;
  }
  return (
    <>
      <Formik
        initialValues={{
          name: '',
          email: '',
          phone: '',
          brand: '',
          model: '',
          color: '',
          specification: '',
          additional: '',
          comment: '',
          engineType: {
            id: '',
            name: ''
          },
          requestTime: {
            id: '',
            name: ''
          },
        }}
        validationSchema={FindCarSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          // trim values
          const castValues = FindCarSchema.cast(values);

          const data = returnFindCarDataToRequest(castValues);
          findCar(data as FindCarProps)
            .then((res) => {
              res && (resetForm(), setIsSuccessRequest(true));
            })
            .finally(() => setSubmitting(false));
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className='grid grid-cols-1 gap-7 -mt-1'>
            <FormikInput
              name='name'
              placeholder='Anthony Rother'
              title='Full name'
              rounded='rounded-full'
              sizeClass='h-14'
              error={errors.name}
              touched={touched.name}
            />
            {/* ---- */}
            <FormikInput
              name='email'
              type='email'
              placeholder='some@email.com'
              title='Email address'
              rounded='rounded-full'
              sizeClass='h-14'
              error={errors.email}
              touched={touched.email}
            />
            {/* ---- */}
            <FormikPhoneNumberInput
              title='Phone number'
              rounded='rounded-full'
              sizeClass='h-14'
              error={errors.phone}
              touched={touched.phone}
            />
            {/* ---- */}
            <FormikInput
              name='brand'
              placeholder='Toyota'
              title='Brand'
              sizeClass='h-14'
              rounded='rounded-full'
              error={errors.brand}
              touched={touched.brand}
            />
            {/* ---- */}
            <FormikInput
              name='model'
              placeholder='Prius'
              title='Model'
              sizeClass='h-14'
              rounded='rounded-full'
              error={errors.model}
              touched={touched.model}
            />
            {/* ---- */}
            <FormikInput
              name='color'
              placeholder='Black magenta'
              title='Color'
              sizeClass='h-14'
              rounded='rounded-full'
              error={errors.color}
              touched={touched.color}
            />
            {/* ---- */}
            <FormikInput
              name='specification'
              placeholder='R44'
              title='Specification'
              sizeClass='h-14'
              rounded='rounded-full'
              error={errors.specification}
              touched={touched.specification}
            />
            {/* ---- */}
            <FormikTextarea
              name='additional'
              placeholder='Enter additional details'
              title='Additional'
              rows={3}
              rounded='rounded-[40px]'
              error={errors.additional}
              touched={touched.additional}
            />
            {/* ---- */}
            <FormikTextarea
              name='comment'
              placeholder='Enter comment'
              title='Comment'
              rows={3}
              rounded='rounded-[40px]'
              error={errors.comment}
              touched={touched.comment}
            />
            {/* ---- */}
            <FormikInputSelector 
              name='engineType'
              placeholder='Enter engine type'
              title='Engine Type'
              options={engineTypes}
              rounded='rounded-full'
              sizeClass='h-14'
              error={errors.engineType?.name}
              touched={touched.engineType?.name}
            />
            {/* ---- */}
            <FormikInputSelector 
              name='requestTime'
              placeholder='Enter request time'
              title='Request Time'
              options={requestTime}
              rounded='rounded-full'
              sizeClass='h-14'
              error={errors.requestTime?.name}
              touched={touched.requestTime?.name}
            />

            <ButtonPrimary
              type='submit'
              disabled={isSubmitting}
              loading={isSubmitting}
              className='!text-lg mt-5 w-[102px]'
            >
              Send
            </ButtonPrimary>
          </Form>
        )}
      </Formik>
        
      <Modal 
        title='Thank you!' 
        isModalOpen={isSeuccessRequest} 
        setIsModalOpen={setIsSuccessRequest}
      >
        <div className='text-center space-y-10'>
          <InformationCircleIcon className='block mx-auto w-24 h-24 text-yellow-500' />
          <p className='px-3 text-md font-semibold'>
            Thank you, your request has been accepted. Soon it will be processed.
          </p>
        </div>
      </Modal>
    </>
  );
}
