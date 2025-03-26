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
import { useUserStore } from '@/stores/user-store';
import { useLocale } from 'next-intl';

const EngineTypesSchema = Yup.object().shape({
  id: Yup.number().required('findCarSchema.engine.idRequired'),
  name: Yup.string().trim().required('findCarSchema.engine.typeRequired'),
});

const RequestTimeSchema = Yup.object().shape({
  id: Yup.number().required('findCarSchema.request.idRequired'),
  name: Yup.string().trim().required('findCarSchema.request.typeRequired'),
});

interface IProps {
  translate: any;
}

export default function FindCarForm({
  translate
}: IProps) {
  const [isSeuccessRequest, setIsSuccessRequest] = useState(false);
  const user = useUserStore((state) => state.user);
  const locale = useLocale();
  const phoneValidationPattern = /^\+\d{1,3} \d{3} \d{7}$/;
  const emailValidationPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const initialValueDefault = {
    name: '',
    email: '',
    phone: '',
    brand: '',
    model: '',
    color: '',
    specification: '',
    additional: '',
    engineType: {
      id: '',
      name: ''
    },
    requestTime: {
      id: '',
      name: ''
    },
  }
  const initialValueFilled = {
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    brand: '',
    model: '',
    color: '',
    specification: '',
    additional: '',
    engineType: {
      id: '',
      name: ''
    },
    requestTime: {
      id: '',
      name: ''
    },
  }

  const engineTypes = [
    {
      "id": 1,
      "name": "findCar.form.engineType.petrol.value",
      "value": "petrol"
    },
    {
      "id": 2,
      "name": "findCar.form.engineType.diesel.value",
      "value": "diesel"
    },
    {
      "id": 3,
      "name": "findCar.form.engineType.electrical.value",
      "value": "electrical"
    },
    {
      "id": 4,
      "name": "findCar.form.engineType.hybrid.value",
      "value": "hybrid"
    }
  ]

  const requestTime = [
    {
      "id": 1,
      "name": "findCar.form.requestTime.immediate.value",
      "value": "immediate"
    },
    {
      "id": 2,
      "name": "findCar.form.requestTime.month.value",
      "value": "month"
    },
    {
      "id": 3,
      "name": "findCar.form.requestTime.readyToWait.value",
      "value": "ready_to_wait"
    }
  ]

  const FindCarSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .min(2, 'findCarSchema.name.min')
      .max(50, 'findCarSchema.name.max')
      .required('findCarSchema.name.required'),
    email: Yup.string()
      .trim()
      .matches(emailValidationPattern, 'findCarSchema.email.invalid')
      .required('findCarSchema.email.required'),
    phone: Yup.string()
      .trim()
      .matches(phoneValidationPattern, 'findCarSchema.phone.matches')
      .required('findCarSchema.phone.required'),
    brand: Yup.string()
      .trim()
      .min(2, 'findCarSchema.brand.min')
      .max(50, 'findCarSchema.brand.max')
      .required('findCarSchema.brand.required'),
    model: Yup.string()
      .trim()
      .min(2, 'findCarSchema.model.min')
      .max(255, 'findCarSchema.model.max')
      .required('findCarSchema.model.required'),
    color: Yup.string()
      .trim()
      .min(2, 'findCarSchema.color.min')
      .max(255, 'findCarSchema.color.max')
      .required('findCarSchema.color.required'),
    specification: Yup.string()
      .trim()
      .min(2, 'findCarSchema.specification.min')
      .max(255, 'findCarSchema.specification.max'),
    additional: Yup.string()
      .trim()
      .min(2, 'findCarSchema.additional.min')
      .max(5000, 'findCarSchema.additional.max'),
    engineType: EngineTypesSchema.required('findCarSchema.engine.required'),
    requestTime: RequestTimeSchema.required('findCarSchema.request.required'),
  });

  const returnFindCarDataToRequest = (data: any) => {
    const { engineType, requestTime, ...newValues } = data;
    const valuesToRequest = {...newValues};
    valuesToRequest['engineType'] = data.engineType.value;
    valuesToRequest['requestTime'] = data.requestTime.value;
    valuesToRequest['locale'] = locale;
    return valuesToRequest;
  }
  return (
    <>
      <Formik
        initialValues={user ? initialValueFilled : initialValueDefault}
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
          <Form className='grid grid-cols-1 md:grid-cols-3 gap-7 -mt-1'>
            <FormikInput
              name='name'
              placeholder='Anthony Rother'
              title='findCar.form.fullName.label'
              rounded='rounded-full'
              sizeClass='h-14 !text-base'
              error={errors.name}
              touched={touched.name}
            />
            {/* ---- */}
            <FormikInput
              name='email'
              type='email'
              placeholder='findCar.form.emailAddress.placeholder'
              title='findCar.form.emailAddress.label'
              rounded='rounded-full'
              sizeClass='h-14 !text-base'
              error={errors.email}
              touched={touched.email}
            />
            {/* ---- */}
            <FormikPhoneNumberInput
              title='findCar.form.phoneNumber.label'
              rounded='rounded-full'
              sizeClass='h-14 !text-base'
              error={errors.phone}
              touched={touched.phone}
            />
            {/* ---- */}
            <FormikInput
              name='brand'
              placeholder='Lamborghini'
              title='findCar.form.brand.label'
              sizeClass='h-14 !text-base'
              rounded='rounded-full'
              error={errors.brand}
              touched={touched.brand}
            />
            {/* ---- */}
            <FormikInput
              name='model'
              placeholder='Urus'
              title='findCar.form.model.label'
              sizeClass='h-14 !text-base'
              rounded='rounded-full'
              error={errors.model}
              touched={touched.model}
            />
            {/* ---- */}
            <FormikInput
              name='specification'
              placeholder='R44'
              title='findCar.form.specification.label'
              sizeClass='h-14 !text-base'
              rounded='rounded-full'
              error={errors.specification}
              touched={touched.specification}
            />
            {/* ---- */}
            <FormikInputSelector
              name='engineType'
              placeholder='findCar.form.engineType.placeholder'
              title='findCar.form.engineType.label'
              options={engineTypes}
              rounded='rounded-full'
              sizeClass='h-14 !text-base'
              error={errors.engineType?.name}
              touched={touched.engineType?.name}
            />
            {/* ---- */}
            <FormikInput
              name='color'
              placeholder='findCar.form.color.placeholder'
              title='findCar.form.color.label'
              sizeClass='h-14 !text-base'
              rounded='rounded-full'
              error={errors.color}
              touched={touched.color}
            />
            {/* ---- */}
            <FormikInputSelector
              name='requestTime'
              placeholder='findCar.form.requestTime.placeholder'
              title='findCar.form.requestTime.label'
              options={requestTime}
              rounded='rounded-full'
              sizeClass='h-14 !text-base'
              error={errors.requestTime?.name}
              touched={touched.requestTime?.name}
            />
            {/* ---- */}
            <div className='w-full md:absolute md:-bottom-[14px] md:left-0'>
              <FormikTextarea
                name='additional'
                placeholder='findCar.form.additional.placeholder'
                title='findCar.form.additional.label'
                rows={5}
                rounded='rounded-[40px]'
                sizeClass='!text-base'
                error={errors.additional}
                touched={touched.additional}
              />
            </div>

            <div className='md:absolute md:-bottom-[95px] md:right-0 md:w-[32%] flex items-end'>
              <ButtonPrimary
                type='submit'
                disabled={isSubmitting}
                loading={isSubmitting}
                className='!text-base w-full'
                sizeClass='!h-14 items-center'
              >
                {translate('findCar.form.button.send')}
              </ButtonPrimary>
            </div>
          </Form>
        )}
      </Formik>

      <Modal
        title='findCar.modal.title'
        isModalOpen={isSeuccessRequest}
        setIsModalOpen={setIsSuccessRequest}
      >
        <div className='text-center space-y-10'>
          <InformationCircleIcon className='block mx-auto w-24 h-24 text-yellow-500' />
          <p className='px-3 text-md font-semibold'>
            {translate('findCar.modal.description')}
          </p>
        </div>
      </Modal>
    </>
  );
}
