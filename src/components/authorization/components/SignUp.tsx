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

export default function SignUp({
  isDispatched,
  setIsModalOpen,
  setIsDispatched,
}: {
  isDispatched: boolean,
  setIsModalOpen: (isModalOpen: boolean) => void;
  setIsDispatched: (isDispatched: boolean) => void;
}) {
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
      .min(2, 'Name is too short')
      .max(50, 'Name is too long')
      .required('Name is required'),
    email: Yup.string()
      .trim()
      .email('Invalid email')
      .required('Email is required'),
    phone: Yup.string()
      .trim()
      // .matches(phoneValidationPattern, 'Invalid phone number')
      .required('Phone number is required'),
    password: Yup.string()
      .trim()
      .min(8, 'Password must be at least 8 characters')
      .max(50, 'Password must be less than 50 characters')
      .matches(/[a-z]+/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]+/, 'Password must contain at least one uppercase letter')
      .matches(/\d+/, 'Password must contain at least one number')
      .required('Password is required'),
    termsAccepted: Yup.boolean()
      .oneOf([true], 'You must accept the terms and conditions of the privacy policy')
      .required('You must accept the terms and conditions of the privacy policy'),
  });

  useEffect(() => {
    isDispatchedPartner && setIsDispatched(true);
  },[isDispatchedPartner])
  
  return isSuccess ? (
    <div className='pt-4 flex justify-center items-center'>
      <div className='text-center space-y-10'>
        <InformationCircleIcon className='block mx-auto w-24 h-24 text-yellow-500' />
        <p className='px-6 text-2xl font-semibold'>
          Please, check your email to confirm registration!
        </p>
        <ButtonPrimary onClick={() => setIsModalOpen(false)}>
          Got it!
        </ButtonPrimary>
      </div>
    </div>
  ) : (
    <>
    <div style={{ display: `${isDispatchedPartner ? 'none' : 'display'}`}} className='flex text-sm w-full justify-center'>
      <p>I`am a customer</p>
      <SwitchAuthorizationPage 
        className='mx-2'
        isClientSwitch={isCustomer} 
        onChange={handleChangeClient}
      />
      <p>I`am a partner</p>
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
                placeholder='Enter your name'
                title='Name'
                error={errors.name}
                touched={touched.name}
              />
              {/* ---- */}
              <FormikInput
                name='email'
                type='email'
                placeholder='example@mail.com'
                title='Email address'
                error={errors.email}
                touched={touched.email}
              />
              {/* ---- */}
              <FormikPhoneNumberInput
                title='Phone number'
                error={errors.phone}
                touched={touched.phone}
              />
              {/* ---- */}
              <FormikPasswordInput
                title='Password'
                placeholder='Enter your password'
                error={errors.password}
                touched={touched.password}
              />

              <FormikCheckbox
                name='termsAccepted'
                label='I agree with the privacy policy'
                href={termsAcceptedLink}
                error={errors.termsAccepted}
                touched={touched.termsAccepted}
              />

              <ButtonPrimary
                type='submit'
                disabled={isSubmitting}
                loading={isSubmitting}
              >
                Continue
              </ButtonPrimary>
            </Form>
          )}
          </Formik>
        )
    }
    </>
  );
}
