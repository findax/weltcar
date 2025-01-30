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
import { Route } from 'next';
import { singUpPartner } from '@/api/auth';
import { useTranslations } from 'next-intl';

export const SUPPORTED_FORMATS = ['image/png','image/jpeg','image/jpg'];

export default function SignUpPartner({
  setIsModalOpen,
  setIsDispatched,
}: {
  setIsModalOpen: (isModalOpen: boolean) => void;
  setIsDispatched: (isDispatched: boolean) => void;
}) {
  const translate = useTranslations();
  const [isSuccess, setIsSuccess] = useState(false);
  const termsAcceptedLink = 'https://weltcar.de/partner-agreement' as Route<string>;
  // const phoneValidationPattern = /\+38 \(0\d{2}\) \d{3}-\d{2}-\d{2}/;

  const SignUpPartnerSchema = Yup.object().shape({
    company_name: Yup
      .string()
      .trim()
      .min(2, 'signUpPartnerSchema.companyName.min')
      .max(50, 'signUpPartnerSchema.companyName.max')
      .required('signUpPartnerSchema.companyName.required'),
    tax_number: Yup
      .string()
      .trim()
      .required('signUpPartnerSchema.tax.required'),
    files: Yup.array()
      .of(
        Yup.mixed<File>()
          .test('fileType', 'signUpPartnerSchema.files.unsupported', (value) => {
            return value && SUPPORTED_FORMATS.includes(value.type);
          })
          .required('signUpPartnerSchema.files.fRequired')
      )
      .required('signUpPartnerSchema.files.required'),
    email: Yup.string()
      .trim()
      .email('signUpPartnerSchema.email.invalid')
      .required('signUpPartnerSchema.email.required'),
    phone: Yup.string()
      .trim()
      // .matches(phoneValidationPattern, 'Invalid phone number')
      .required('signUpPartnerSchema.phone.required'),
    password: Yup.string()
      .trim()
      .min(8, 'signUpPartnerSchema.password.min')
      .max(50, 'signUpPartnerSchema.password.max')
      .matches(/[a-z]+/, 'signUpPartnerSchema.password.matchesLow')
      .matches(/[A-Z]+/, 'signUpPartnerSchema.password.matchesUp')
      .matches(/\d+/, 'signUpPartnerSchema.password.matchesNumb')
      .required('signUpPartnerSchema.password.required'),
    termsAccepted: Yup.boolean()
      .oneOf([true], 'signUpPartnerSchema.term.oneOf')
      .required('signUpPartnerSchema.term.required'),
  });

  return isSuccess ? (
    <div className='pt-4 flex justify-center items-center'>
      <div className='text-center space-y-10'>
        <InformationCircleIcon className='block mx-auto w-24 h-24 text-yellow-500' />
        <p className='px-6 text-2xl font-semibold'>
          {translate('authorization.signUp.confirmReg.title')}
        </p>
        <ButtonPrimary onClick={() => setIsModalOpen(false)}>
          {translate('authorization.signUp.confirmReg.title')}
        </ButtonPrimary>
      </div>
    </div>
  ) : (
    <Formik
      initialValues={{
        company_name: '',
        tax_number: '',
        files: undefined,
        email: '',
        phone: '',
        password: '',
        termsAccepted: false
      }}
      validationSchema={SignUpPartnerSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        // trim values
        const castValues = SignUpPartnerSchema.cast(values);

        const {
          company_name, 
          tax_number, 
          files, 
          email, 
          phone, 
          password
        } = castValues

        singUpPartner({
          company_name, 
          tax_number, 
          files, 
          email, 
          phone, 
          password })
          .then((res) => {
            res && (setIsSuccess(true), resetForm(), setSubmitting(false), setIsDispatched(true));
          })
          .finally(() => (setSubmitting(false), setIsDispatched(true)));
        }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className='grid grid-cols-1 gap-6'>
          <FormikInput
            rounded='rounded-full'
            sizeClass='h-14'
            name='company_name'
            placeholder='authorization.signUp.company.placeholder'
            title='authorization.signUp.company.title'
            error={errors.company_name}
            touched={touched.company_name}
          />
          {/* ---- */}
          <FormikInput
            rounded='rounded-full'
            sizeClass='h-14'
            name='tax_number'
            placeholder='authorization.signUp.taxNumber.placeholder'
            title='authorization.signUp.taxNumber.title'
            error={errors.tax_number}
            touched={touched.tax_number}
          />
          {/* ---- */}
          <FormikFile 
            name='files'
            label='authorization.signUp.files.label'
            multiple
            error={errors.files}
            touched={touched.files}
          />
          {/* ---- */}
          <FormikInput
            rounded='rounded-full'
            sizeClass='h-14'
            name='email'
            type='email'
            placeholder='authorization.signUp.email.placeholder'
            title='authorization.signUp.email.title'
            error={errors.email}
            touched={touched.email}
          />
          {/* ---- */}
          <FormikPhoneNumberInput
            rounded='rounded-full'
            sizeClass='h-14'
            title='authorization.signUp.phone.title'
            error={errors.phone}
            touched={touched.phone}
          />
          {/* ---- */}
          <FormikPasswordInput
            rounded='rounded-full'
            sizeClass='h-14'
            title='authorization.signUp.password.title'
            placeholder='authorization.signUp.password.placeholder'
            error={errors.password}
            touched={touched.password}
          />
          {/* ---- */}
          <FormikCheckbox
            name='termsAccepted'
            label='authorization.signUp.termAccept.label'
            href={termsAcceptedLink}
            error={errors.termsAccepted}
            touched={touched.termsAccepted}
          />

          <ButtonPrimary
            type='submit'
            disabled={isSubmitting}
            loading={isSubmitting}
            className='mt-4'
          >
            {translate('authorization.signUp.button.continue')}
          </ButtonPrimary>
        </Form>
      )}
    </Formik>
  );
}
