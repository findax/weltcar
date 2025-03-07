import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { ButtonPrimary } from '@/shared/Buttons';
import { FormikInput, FormikPhoneNumberInput } from '@/shared/FormInputs';
import { IUser } from '@/types/user';
import { updateUser } from '@/api/user';
import { useUserStore } from '@/stores/user-store';
import { useLocale, useTranslations } from 'next-intl';
import Modal from '@/shared/Modal';
import DeleteAccountForm from '@/components/DeleteAccountForm';
import { useState } from 'react';

export default function AccountForm() {
  const translate = useTranslations();
  const locale = useLocale();
  const user = useUserStore((state) => state.user);
  const [isDeleteAcoountModalShow, setIsDeleteAcoountModalShow] = useState(false);
  const updateUserState = useUserStore((state) => state.updateUserState);
  // const phoneValidationPattern = /\+38 \(0\d{2}\) \d{3}-\d{2}-\d{2}/;

  const AccountSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .min(2, 'accountSchema.name.min')
      .max(50, 'accountSchema.name.max')
      .required('accountSchema.name.required'),
    surname: Yup.string()
      .trim()
      .min(2, 'accountSchema.surname.min')
      .max(50, 'accountSchema.surname.max'),
    city: Yup.string()
      .trim()
      .min(2, 'accountSchema.city.min')
      .max(50, 'accountSchema.city.max'),
    phone: Yup.string().trim(),
    // .matches(phoneValidationPattern, 'Invalid phone number')
  });

  const handleDeleteAccount = () => {
    setIsDeleteAcoountModalShow(true);
  }

  return (
    <>
      <Formik
        initialValues={{
          name: user?.name,
          surname: user?.surname,
          email: user?.email,
          city: user?.city,
          phone: user?.phone,
        }}
        validationSchema={AccountSchema}
        onSubmit={(values, { setSubmitting }) => {
          // trim values
          const castValues: any = AccountSchema.cast(values);
          castValues['locale'] = locale;
          updateUser(castValues)
            .then((res) => updateUserState(res as IUser))
            .finally(() => setSubmitting(false));
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className='grid grid-cols-1 gap-7 w-full max-w-xl mt-10 md:pr-32'>
            <FormikInput
              name='name'
              placeholder='accountInformation.form.firstName.placeholder'
              title='accountInformation.form.firstName.label'
              rounded='rounded-full'
              sizeClass='h-14'
              error={errors.name}
              touched={touched.name}
            />
            {/* ---- */}
            <FormikInput
              name='surname'
              placeholder='accountInformation.form.lastName.placeholder'
              title='accountInformation.form.lastName.label'
              rounded='rounded-full'
              sizeClass='h-14'
              error={errors.surname}
              touched={touched.surname}
            />
            {/* ---- */}
            <FormikInput
              name='email'
              type='email'
              placeholder='accountInformation.form.emailAddress.placeholder'
              title='accountInformation.form.emailAddress.label'
              rounded='rounded-full'
              sizeClass='h-14'
              disabled
            />
            {/* ---- */}
            <FormikInput
              name='city'
              placeholder='accountInformation.form.city.placeholder'
              title='accountInformation.form.city.label'
              rounded='rounded-full'
              sizeClass='h-14'
              error={errors.city}
              // touched={touched.city}
            />
            {/* ---- */}
            <FormikPhoneNumberInput
              title='accountInformation.form.phoneNumber.label'
              rounded='rounded-full'
              sizeClass='h-14'
              error={errors.phone}
              touched={touched.phone}
            />

            <ButtonPrimary
              type='submit'
              disabled={isSubmitting}
              loading={isSubmitting}
              className='text-base lg:text-lg w-full sm:w-40'
            >
              {translate('accountInformation.form.button.update')}
            </ButtonPrimary>

            <button 
              type='button'
              onClick={handleDeleteAccount}
              className="block text-left text-lg text-primary-600 dark:text-secondary-950"
            >
              Delete account
            </button>
          </Form>
        )}
      </Formik>


      <Modal
        title={'Delete account'}
        isModalOpen={isDeleteAcoountModalShow}
        setIsModalOpen={setIsDeleteAcoountModalShow}
        >
        <div className='w-full'>
          <p className='mb-8 text-center xl:text-lg dark:text-white text-black lg:max-w-3xl'>
            {translate('deleteAccount.modal.text.delete.description')}
          </p>
          <DeleteAccountForm 
            onClickCancel={setIsDeleteAcoountModalShow}
          />
        </div>
      </Modal>
    </>
  );
}
