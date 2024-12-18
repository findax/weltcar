'use client';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { ButtonPrimary } from '@/shared/Buttons';
import { FormikPasswordInput } from '@/shared/FormInputs';
import { updateUserPassword } from '@/api/user';
import { useUserStore } from '@/stores/user-store';
import { IUser } from '@/types/user';
import { useTranslations } from 'next-intl';

const PasswordPage = () => {
  const translate = useTranslations();
  const updateUserState = useUserStore((state) => state.updateUserState);

  const UpdatePasswordSchema = Yup.object().shape({
    password: Yup.string()
      .trim()
      .min(8, 'updatePassSchema.password.min')
      .max(50, 'updatePassSchema.password.max')
      .matches(/[a-z]+/, 'updatePassSchema.password.matchesLow')
      .matches(/[A-Z]+/, 'updatePassSchema.password.matchesUp')
      .matches(/\d+/, 'updatePassSchema.password.matchesNumb')
      .required('updatePassSchema.password.required'),
    new_password: Yup.string()
      .trim()
      .min(8, 'updatePassSchema.newPassword.min')
      .max(50, 'updatePassSchema.newPassword.max')
      .matches(/[a-z]+/, 'updatePassSchema.newPassword.matchesLow')
      .matches(/[A-Z]+/, 'updatePassSchema.newPassword.matchesUp')
      .matches(/\d+/, 'updatePassSchema.newPassword.matchesNumb')
      .required('updatePassSchema.newPassword.required'),
    confirm_password: Yup.string()
      .oneOf([Yup.ref('new_password'), ''], 'updatePassSchema.confirm.oneOf')
      .required('updatePassSchema.confirm.required'),
  });

  return (
    <div className='relative min-h-[900px] space-y-8 sm:space-y-12 lg:min-h-[500px]'>
      {/* HEADING */}
      <h2 className='text-2xl lg:text-4xl font-bold'>{translate('passwordInformation.title')}</h2>
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
              title='passwordInformation.form.current.title'
              placeholder='passwordInformation.form.current.placeholder'
              rounded='rounded-full'
              sizeClass='h-14'
              error={errors.password}
              touched={touched.password}
            />
            {/* ---- */}
            <FormikPasswordInput
              title='passwordInformation.form.new.title'
              name='new_password'
              placeholder='passwordInformation.form.new.placeholder'
              rounded='rounded-full'
              sizeClass='h-14'
              error={errors.new_password}
              touched={touched.new_password}
            />
            {/* ---- */}
            <FormikPasswordInput
              title='passwordInformation.form.confirm.title'
              name='confirm_password'
              placeholder='passwordInformation.form.confirm.placeholder'
              rounded='rounded-full'
              sizeClass='h-14'
              error={errors.confirm_password}
              touched={touched.confirm_password}
            />

            <ButtonPrimary
              type='submit'
              disabled={isSubmitting}
              loading={isSubmitting}
              className='text-base lg:text-lg w-full sm:w-56'
            >
              {translate('passwordInformation.button.update')}
            </ButtonPrimary>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PasswordPage;
