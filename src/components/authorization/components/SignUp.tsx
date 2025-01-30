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
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import SwitchAuthorizationPage from './SwitchAuthorizationPage';
import SignUpPartner from './SignUpPartner';
import { Route } from 'next';
import { useTranslations } from 'next-intl';

export default function SignUp({
  isDispatched,
  setIsModalOpen,
  setIsDispatched,
}: {
  isDispatched: boolean,
  setIsModalOpen: (isModalOpen: boolean) => void;
  setIsDispatched: (isDispatched: boolean) => void;
}) {
  const translate = useTranslations();
  const [isDispatchedPartner, setIsDispatchedPartner] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCustomer, setIsCustomer] = useState(false);
  // const phoneValidationPattern = /\+38 \(0\d{2}\) \d{3}-\d{2}-\d{2}/;
  const termsAcceptedLink = "https://weltcar.de/privacy-policy" as Route<string>

  const handleChangeClient = (isClientSwitch: boolean) => {
    setIsCustomer(isClientSwitch);
  }

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

  useEffect(() => {
    isDispatchedPartner && setIsDispatched(true);
  },[isDispatchedPartner])
  
  return isSuccess ? (
    <div className='pt-4 flex justify-center items-center'>
      <div className='text-center space-y-10'>
        <InformationCircleIcon className='block mx-auto w-24 h-24 text-yellow-500' />
        <p className='px-6 text-2xl font-semibold'>
          {translate('authorization.signUp.confirmReg.title')}
        </p>
        <ButtonPrimary onClick={() => setIsModalOpen(false)}>
          {translate('authorization.signUp.button.gotIt')}
        </ButtonPrimary>
      </div>
    </div>
  ) : (
    <>
      <div style={{ display: `${isDispatchedPartner ? 'none' : 'display'}`}} className='flex text-sm w-full justify-center'>
        <button onClick={ () => handleChangeClient(false)}>{translate('authorization.signUp.button.customer')}</button>
        <SwitchAuthorizationPage 
          className='mx-2'
          isClientSwitch={isCustomer} 
          onChange={handleChangeClient}
        />
        <button onClick={() => handleChangeClient(true)}>{translate('authorization.signUp.button.partner')}</button>
      </div>
      {isCustomer 
        ? (
            <SignUpPartner 
              setIsDispatched={setIsDispatchedPartner}
              setIsModalOpen={setIsModalOpen} />
          )
        : (
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
                    res && (setIsSuccess(true), resetForm(), setSubmitting(false), setIsDispatched(true));
                  })
                  .finally(() => (setSubmitting(false), setIsDispatched(true)));
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
          )
      }
    </>
  );
}
