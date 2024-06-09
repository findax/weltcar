'use client';

import { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import ErrorComponent from '@/components/ErrorComponent';
import { FormikPasswordInput } from '@/shared/FormInputs';
import { ButtonPrimary } from '@/shared/Buttons';
import { restorePassword } from '@/api/auth';

export default function RefreshPasswordPage() {
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [code, setCode] = useState('');

  useEffect(() => {
    const code = window.location.href.split('/').pop();
    code && setCode(code);
  }, []);

  const UpdatePasswordSchema = Yup.object().shape({
    new_password: Yup.string()
      .trim()
      .min(8, 'Password must be at least 8 characters')
      .max(50, 'Password must be less than 50 characters')
      .matches(/[a-z]+/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]+/, 'Password must contain at least one uppercase letter')
      .matches(/\d+/, 'Password must contain at least one number')
      .required('Password is required'),
    confirm_password: Yup.string()
      .oneOf([Yup.ref('new_password'), ''], 'Passwords must match')
      .required('Confirm password is required'),
  });

  return isError ? (
    <div className='w-full h-[calc(100vh-76px)] flex justify-center items-center'>
      <ErrorComponent />
    </div>
  ) : isSuccess ? (
    <div className='w-full h-[calc(100vh-76px)] flex justify-center items-center'>
      <div className='text-center space-y-10'>
        <CheckCircleIcon className='block mx-auto w-24 h-24 text-green-500' />
        <p className='px-6 text-2xl font-semibold'>
          Your password has been updated successfully!
        </p>
        <ButtonPrimary href='/catalog'>Choose your car</ButtonPrimary>
      </div>
    </div>
  ) : (
    <div className='container h-[calc(100vh-76px)] py-16 xl:py-28 relative space-y-6 sm:space-y-8'>
      <h2 className='text-3xl font-semibold'>Update your password</h2>
      <div className='w-14 border-b border-neutral-300 dark:border-neutral-700'></div>
      <Formik
        initialValues={{
          new_password: '',
          confirm_password: '',
        }}
        validationSchema={UpdatePasswordSchema}
        onSubmit={(values, { setSubmitting }) => {
          // trim values
          const castValues = UpdatePasswordSchema.cast(values);

          restorePassword({
            code: code,
            password: castValues.confirm_password,
          })
            .then((res) => {
              if (res) {
                setIsSuccess(true);
              } else {
                setIsError(true);
              }
            })
            .finally(() => setSubmitting(false));
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className='max-w-xl space-y-8'>
            <FormikPasswordInput
              title='New password'
              name='new_password'
              placeholder='Enter new password'
              error={errors.new_password}
              touched={touched.new_password}
            />
            {/* ---- */}
            <FormikPasswordInput
              title='Confirm password'
              name='confirm_password'
              placeholder='Confirm password'
              error={errors.confirm_password}
              touched={touched.confirm_password}
            />

            <ButtonPrimary
              type='submit'
              disabled={isSubmitting}
              loading={isSubmitting}
            >
              Update password
            </ButtonPrimary>
          </Form>
        )}
      </Formik>
    </div>
  );
}
