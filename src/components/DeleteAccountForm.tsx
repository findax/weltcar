'use client';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { ButtonPrimary } from '@/shared/Buttons';
import { FormikPasswordInput } from '@/shared/FormInputs';
import { useTranslations } from 'next-intl';
import { deleteAccount, logout } from '@/api/auth';
import { toast } from 'react-toastify';
import { getCountries } from '@/api/countries';

interface IProps {
  onClickCancel: (isBack: boolean) => void;
}

export default function DeleteAccountForm({
  onClickCancel
}:IProps) {
  const translate = useTranslations();

  const handleClickCancel = () => {
    onClickCancel(false);
  }

  const DeletePasswordSchema = Yup.object().shape({
    password: Yup.string()
      .trim()
      .required('deleteAccountSchema.password.required'),
  });

  return (
    <div className='w-full'>
      <Formik
        initialValues={{
          password: '',
        }}
        validationSchema={DeletePasswordSchema}
        onSubmit={async (values, { setSubmitting }) => {
          // trim values
          const castValues = DeletePasswordSchema.cast(values);

          const result = await deleteAccount(castValues);

          if (result) {
            toast.success(translate("deleteAccount.toast.success.delete.title"));
            logout();
          }

        }}
      >
        {({ errors, touched }) => (
          <Form className='grid grid-cols-1 gap-7 w-full max-w-lg'>
            <FormikPasswordInput
              title='deleteAccount.form.password.current.title'
              placeholder='deleteAccount.form.password.current.placeholder'
              rounded='rounded-full'
              sizeClass='h-14'
              error={errors.password}
              touched={touched.password}
            />
            <div className='flex  gap-4 justify-reverse'>
              <ButtonPrimary
                type='button'
                onClick={handleClickCancel}
                className='text-sx xs:text-base w-full'
              >
                {translate('deleteAccount.button.cancel')}
              </ButtonPrimary>
              <ButtonPrimary
                type='submit'
                className='text-xs xs:text-base w-full'
              >
                {translate('deleteAccount.button.confirm')}
              </ButtonPrimary>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
