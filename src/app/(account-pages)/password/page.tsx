'use client';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { ButtonPrimary } from '@/shared/Buttons';
import { FormikPasswordInput } from '@/shared/FormInputs';
import { updateUserPassword } from '@/api/user';
import Image from 'next/image';
import bgImg from '@/images/bg-cars/bg-car-4.webp';
import { useUserStore } from '@/stores/user-store';
import { IUser } from '@/types/user';

const PasswordPage = () => {
  const updateUserState = useUserStore((state) => state.updateUserState);

  const UpdatePasswordSchema = Yup.object().shape({
    password: Yup.string()
      .trim()
      .min(8, 'Password must be at least 8 characters')
      .max(50, 'Password must be less than 50 characters')
      .matches(/[a-z]+/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]+/, 'Password must contain at least one uppercase letter')
      .matches(/\d+/, 'Password must contain at least one number')
      .required('Password is required'),
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

  return (
    <div className='relative space-y-6 sm:space-y-8 lg:min-h-[500px]'>
      {/* HEADING */}
      <h2 className='text-3xl font-semibold'>Update your password</h2>
      <div className='w-14 border-b border-neutral-300 dark:border-neutral-700'></div>
      <Formik
        initialValues={{
          password: '',
          new_password: '',
          confirm_password: '',
        }}
        validationSchema={UpdatePasswordSchema}
        onSubmit={(values, { setSubmitting }) => {
          // trim values
          const castValues = UpdatePasswordSchema.cast(values);

          updateUserPassword({
            password: castValues.confirm_password,
          })
            .then((res) => updateUserState(res as IUser))
            .finally(() => setSubmitting(false));
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className='grid grid-cols-1 gap-7 w-full max-w-lg'>
            <FormikPasswordInput
              title='Current password'
              placeholder='Enter your password'
              error={errors.password}
              touched={touched.password}
            />
            {/* ---- */}
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

      <Image
        className='hidden md:block absolute inset-0 top-1/2 -translate-y-1/2 object-contain w-full opacity-[0.10] dark:opacity-[0.08] -z-10'
        src={bgImg}
        alt='car background image'
        priority
      />
    </div>
  );
};

export default PasswordPage;
