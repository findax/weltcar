import { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { ButtonPrimary } from '@/shared/Buttons';
import { FormikInput, FormikPasswordInput } from '@/shared/FormInputs';
import ForgotPassword from './ForgotPassword';

export default function Signin() {
  const [isOpenForgotPassword, setIsOpenForgotPassword] = useState(false);
  const [emailValue, setEmailValue] = useState('');

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .email('Invalid email')
      .required('Email is required'),
    password: Yup.string()
      .trim()
      .min(4, 'Password is too short')
      .max(50, 'Password is too long')
      .required('Password is required'),
  });

  const handleFormChange = (data: { name: string; value: string }) => {
    data.name === 'email' && setEmailValue(data.value);
  };

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={LoginSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          // same shape as initial values
          const castValues = LoginSchema.cast(values);
          console.log(castValues);

          resetForm();
          // setSubmitting(false);
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form
            className='grid grid-cols-1 gap-8'
            onChange={(e: any) => handleFormChange(e.target)}
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
              // className='mt-4'
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

      {isOpenForgotPassword && <ForgotPassword emailValue={emailValue} />}
    </>
  );
}
