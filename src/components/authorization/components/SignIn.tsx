import { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { ButtonPrimary } from '@/shared/Buttons';
import { FormikInput, FormikPasswordInput } from '@/shared/FormInputs';
import ForgotPassword from './ForgotPassword';
import { singIn } from '@/api/auth';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

export default function SignIn({
  setIsModalOpen,
}: {
  setIsModalOpen: (isModalOpen: boolean) => void;
}) {
  const [isOpenForgotPassword, setIsOpenForgotPassword] = useState(false);
  const [emailValue, setEmailValue] = useState('');
  const [isResetingPassword, setIsResetingPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .email('Invalid email')
      .required('Email is required'),
    password: Yup.string()
      .trim()
      .min(8, 'Password must be at least 8 characters')
      .max(50, 'Password must be less than 50 characters')
      .matches(/[a-z]+/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]+/, 'Password must contain at least one uppercase letter')
      .matches(/\d+/, 'Password must contain at least one number')
      .required('Password is required'),
  });

  const handleFormChange = (data: { name: string; value: string }) => {
    data.name === 'email' && setEmailValue(data.value);
  };

  return isResetingPassword ? (
    <div className='pt-4 flex justify-center items-center'>
      <div className='text-center space-y-10'>
        <InformationCircleIcon className='block mx-auto w-24 h-24 text-yellow-500' />
        <p className='px-6 text-2xl font-semibold'>
          Please, check your email to reset your password!
        </p>
        <ButtonPrimary onClick={() => setIsModalOpen(false)}>
          Got it!
        </ButtonPrimary>
      </div>
    </div>
  ) : (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={LoginSchema}
        onSubmit={(values, { setSubmitting }) => {
          // trim values
          const castValues = LoginSchema.cast(values);

          singIn({
            email: castValues.email,
            password: castValues.password,
          })
            .then((res) => {
              res && setIsModalOpen(false);
            })
            .finally(() => setSubmitting(false));
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form
            className='grid grid-cols-1 gap-8'
            onChange={(e: React.FormEvent<HTMLFormElement>) =>
              handleFormChange(e.target as HTMLInputElement)
            }
          >
            <FormikInput
              name='email'
              type='email'
              placeholder='example@mail.com'
              title='Email address'
              error={errors.email}
              touched={touched.email}
            />
            {/* ---- */}
            <FormikPasswordInput
              title='Password'
              placeholder='Enter your password'
              error={errors.password}
              touched={touched.password}
            />

            <ButtonPrimary
              type='submit'
              disabled={isSubmitting}
              loading={isSubmitting}
            >
              Continue
            </ButtonPrimary>

            <button
              type='button'
              className='-mt-2 text-sm underline font-medium'
              onClick={() => setIsOpenForgotPassword(!isOpenForgotPassword)}
            >
              {isOpenForgotPassword ? 'Cancel' : 'Forgot password?'}
            </button>
          </Form>
        )}
      </Formik>

      {isOpenForgotPassword && (
        <ForgotPassword
          emailValue={emailValue}
          setIsResetingPassword={setIsResetingPassword}
        />
      )}
    </>
  );
}
