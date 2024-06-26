import { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { ButtonPrimary } from '@/shared/Buttons';
import {
  FormikInput,
  FormikPhoneNumberInput,
  FormikPasswordInput,
} from '@/shared/FormInputs';
import { singUp } from '@/api/auth';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

export default function SignUp({
  setIsModalOpen,
}: {
  setIsModalOpen: (isModalOpen: boolean) => void;
}) {
  const [isSuccess, setIsSuccess] = useState(false);
  // const phoneValidationPattern = /\+38 \(0\d{2}\) \d{3}-\d{2}-\d{2}/;

  const SignUpSchema = Yup.object().shape({
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
  });

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
        name: '',
        email: '',
        phone: '',
        password: '',
      }}
      validationSchema={SignUpSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        // trim values
        const castValues = SignUpSchema.cast(values);

        singUp(castValues)
          .then((res) => {
            res && (setIsSuccess(true), resetForm(), setSubmitting(false));
          })
          .finally(() => setSubmitting(false));
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className='grid grid-cols-1 gap-8'>
          <FormikInput
            name='name'
            placeholder='Enter your name'
            title='Name'
            error={errors.name}
            touched={touched.name}
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

          <ButtonPrimary
            type='submit'
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            Continue
          </ButtonPrimary>
        </Form>
      )}
    </Formik>
  );
}
