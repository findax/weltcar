'use client';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { ButtonPrimary } from '@/shared/Buttons';
import { FormikPasswordInput } from '@/shared/FormInputs';
import { updateUserPassword } from '@/api/user';
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
    <div className='relative min-h-[900px] space-y-8 sm:space-y-12 lg:min-h-[500px]'>
      {/* HEADING */}
      <h2 className='text-2xl lg:text-4xl font-bold'>Update your password</h2>
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
              rounded='rounded-full'
              sizeClass='h-14'
              error={errors.password}
              touched={touched.password}
            />
            {/* ---- */}
            <FormikPasswordInput
              title='New password'
              name='new_password'
              placeholder='Enter new password'
              rounded='rounded-full'
              sizeClass='h-14'
              error={errors.new_password}
              touched={touched.new_password}
            />
            {/* ---- */}
            <FormikPasswordInput
              title='Confirm password'
              name='confirm_password'
              placeholder='Confirm password'
              rounded='rounded-full'
              sizeClass='h-14'
              error={errors.confirm_password}
              touched={touched.confirm_password}
            />

            <ButtonPrimary
              type='submit'
              disabled={isSubmitting}
              loading={isSubmitting}
              className='text-base lg:text-lg w-56'
            >
              Update password
            </ButtonPrimary>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PasswordPage;
