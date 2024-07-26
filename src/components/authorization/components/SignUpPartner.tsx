import { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { ButtonPrimary } from '@/shared/Buttons';
import {
  FormikInput,
  FormikPhoneNumberInput,
  FormikPasswordInput,
  FormikCheckbox,
  FormikFile,
} from '@/shared/FormInputs';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { File } from 'buffer';

export const SignUpPartnerSchema = Yup.object().shape({
  companyName: Yup
    .string()
    .trim()
    .min(2, 'Company name is too short')
    .max(50, 'Company name is too long')
    .required('Company name is required'),
  taxNumber: Yup
    .string()
    .trim()
    .required('Tax number is required'),
  documents: Yup.array()
  .of(
    Yup.mixed<File>()
      .test('fileType', 'Unsupported file type', (value) => {
        const SUPPORTED_FORMATS = ['image/png','image/jpeg','image/jpg', 'application/pdf'];
        return value && SUPPORTED_FORMATS.includes(value.type);
      })
      .required('Document is required')
  )
  .required('Documents is required'),
  email: Yup.string()
    .trim()
    .email('Invalid email')
    .required('Email is required'),
  phone: Yup.string()
    .trim()
    // .matches(phoneValidationPattern, 'Invalid phone number')
    .required('Phone number is required'),
  password: Yup.string()
    .trim()
    .min(8, 'Password must be at least 8 characters')
    .max(50, 'Password must be less than 50 characters')
    .matches(/[a-z]+/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]+/, 'Password must contain at least one uppercase letter')
    .matches(/\d+/, 'Password must contain at least one number')
    .required('Password is required'),
  termsAccepted: Yup.boolean()
    .oneOf([true], 'You must accept the terms and conditions of the partner agreement')
    .required('You must accept the terms and conditions of the partner agreement'),
});

export default function SignUpPartner({
  setIsModalOpen,
}: {
  setIsModalOpen: (isModalOpen: boolean) => void;
}) {
  const [isSuccess, setIsSuccess] = useState(false);
  // const phoneValidationPattern = /\+38 \(0\d{2}\) \d{3}-\d{2}-\d{2}/;

  return isSuccess ? (
    <div className='pt-4 flex justify-center items-center'>
      <div className='text-center space-y-10'>
        <InformationCircleIcon className='block mx-auto w-24 h-24 text-yellow-500' />
        <p className='px-6 text-2xl font-semibold'>
          Please, check your email to confirm registration!
        </p>
        <ButtonPrimary onClick={() => setIsModalOpen(false)}>
          Got it!
        </ButtonPrimary>
      </div>
    </div>
  ) : (
    <Formik
      initialValues={{
        companyName: '',
        taxNumber: '',
        documents: undefined,
        email: '',
        phone: '',
        password: '',
        termsAccepted: false
      }}
      validationSchema={SignUpPartnerSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        // trim values
        const castValues = SignUpPartnerSchema.cast(values);

        console.log("SUBMITED FORM =", castValues)
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className='grid grid-cols-1 gap-8'>
          <FormikInput
            name='companyName'
            placeholder='Enter your company name'
            title='Company name'
            error={errors.companyName}
            touched={touched.companyName}
          />
          {/* ---- */}
          <FormikInput
            name='taxNumber'
            placeholder='Enter your tax number'
            title='Tax number'
            error={errors.taxNumber}
            touched={touched.taxNumber}
          />
          {/* ---- */}
          <FormikFile 
            name='documents'
            label='Upload your passport and company registration'
            multiple
            error={errors.documents}
            touched={touched.documents}
          />
          {/* ---- */}
          <FormikInput
            name='email'
            type='email'
            placeholder='example@mail.com'
            title='Email address'
            error={errors.email}
            touched={touched.email}
          />
          {/* ---- */}
          <FormikPhoneNumberInput
            title='Phone number'
            error={errors.phone}
            touched={touched.phone}
          />
          {/* ---- */}
          <FormikPasswordInput
            title='Password'
            placeholder='Enter your password'
            error={errors.password}
            touched={touched.password}
          />
          {/* ---- */}
          <FormikCheckbox
            name='termsAccepted'
            label='I agree with the partners agreement'
            error={errors.termsAccepted}
            touched={touched.termsAccepted}
          />

          <ButtonPrimary
            type='submit'
            disabled={isSubmitting}
            loading={isSubmitting}
            className='mt-4'
          >
            Continue
          </ButtonPrimary>
        </Form>
      )}
    </Formik>
  );
}
