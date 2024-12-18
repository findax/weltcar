import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { ButtonPrimary } from '@/shared/Buttons';
import { FormikInput, FormikPhoneNumberInput } from '@/shared/FormInputs';
import { IUser } from '@/types/user';
import { updateUser } from '@/api/user';
import { useUserStore } from '@/stores/user-store';
import { useTranslations } from 'next-intl';

export default function AccountForm() {
  const translate = useTranslations();
  const user = useUserStore((state) => state.user);
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

  return (
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
        const castValues = AccountSchema.cast(values);
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
        </Form>
      )}
    </Formik>
  );
}
