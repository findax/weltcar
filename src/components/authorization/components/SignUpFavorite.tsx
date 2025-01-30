import { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { ButtonPrimary } from '@/shared/Buttons';
import {
  FormikInput,
  FormikPhoneNumberInput,
  FormikPasswordInput,
  FormikCheckbox,
} from '@/shared/FormInputs';
import { singUp } from '@/api/auth';
import { Route } from 'next';
import { useTranslations } from 'next-intl';

export default function SignUpFavorite({
  setIsModalOpen,
}: {
  setIsModalOpen: (isModalOpen: boolean) => void;
}) {
  const translate = useTranslations();
  // const phoneValidationPattern = /\+38 \(0\d{2}\) \d{3}-\d{2}-\d{2}/;
  const termsAcceptedLink = "https://weltcar.de/privacy-policy" as Route<string>

  const SignUpSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .min(2, 'signUpSchema.name.min')
      .max(50, 'signUpSchema.name.max')
      .required('signUpSchema.name.required'),
    email: Yup.string()
      .trim()
      .email('signUpSchema.email.invalid')
      .required('signUpSchema.email.required'),
    phone: Yup.string()
      .trim()
      // .matches(phoneValidationPattern, 'Invalid phone number')
      .required('signUpSchema.phone.required'),
    password: Yup.string()
      .trim()
      .min(8, 'signUpSchema.password.min')
      .max(50, 'signUpSchema.password.max')
      .matches(/[a-z]+/, 'signUpSchema.password.matchesLow')
      .matches(/[A-Z]+/, 'signUpSchema.password.matchesUp')
      .matches(/\d+/, 'signUpSchema.password.matchesNumb')
      .required('signUpSchema.password.required'),
    termsAccepted: Yup.boolean()
      .oneOf([true], 'signUpSchema.term.oneOf')
      .required('signUpSchema.term.required'),
  });

  return (
    <>
      <h3 className='font-semibold mb-8 flex flex-col items-center gap-4 text-[32px] text-neutral-900 dark:text-white'>
        <span>{translate('authorization.favorites.title.signUp')}</span>
      </h3>
      <Formik
        initialValues={{
          name: '',
          email: '',
          phone: '',
          password: '',
          termsAccepted: false
        }}
        validationSchema={SignUpSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          // trim values
          const castValues = SignUpSchema.cast(values);

          singUp(castValues)
            .then((res) => {
              res && (resetForm(), setSubmitting(false));
            })
            .finally(() => (setSubmitting(false)));
        }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className='grid grid-cols-1 gap-8'>
          <FormikInput
            name='name'
            rounded='rounded-full'
            sizeClass='h-14'
            placeholder='authorization.signUp.customer.name.placeholder'
            title='authorization.signUp.customer.name.title'
            error={errors.name}
            touched={touched.name}
          />
          {/* ---- */}
          <FormikInput
            name='email'
            type='email'
            rounded='rounded-full'
            sizeClass='h-14'
            placeholder='authorization.signUp.customer.email.placeholder'
            title='authorization.signUp.customer.email.title'
            error={errors.email}
            touched={touched.email}
          />
          {/* ---- */}
          <FormikPhoneNumberInput
            rounded='rounded-full'
            sizeClass='h-14'
            title='authorization.signUp.customer.phone.title'
            error={errors.phone}
            touched={touched.phone}
          />
          {/* ---- */}
          <FormikPasswordInput
            rounded='rounded-full'
            sizeClass='h-14'
            title='authorization.signUp.customer.password.placeholder'
            placeholder='authorization.signUp.customer.password.placeholder'
            error={errors.password}
            touched={touched.password}
          />

          <FormikCheckbox
            name='termsAccepted'
            label='authorization.signUp.customer.termAccept.label'
            href={termsAcceptedLink}
            error={errors.termsAccepted}
            touched={touched.termsAccepted}
          />

          <ButtonPrimary
            type='submit'
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            {translate('authorization.signUp.customer.button.continue')}
          </ButtonPrimary>
        </Form>
      )}
      </Formik>
    </>
  );
}
