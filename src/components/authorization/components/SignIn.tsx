import { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import ButtonPrimary from '@/shared/ButtonPrimary';
import { FormikInput, FormikPasswordInput } from '@/shared/FormInpurs';

export default function Signin() {
  const [forgotPassword, setForgotPassword] = useState(false);

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

  const forgotPasswordSchema = Yup.object().shape({
    forgotPassword: Yup.string()
      .trim()
      .email('Invalid email')
      .required('Email is required'),
  });

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          // same shape as initial values
          const castValues = LoginSchema.cast(values);
          console.log(castValues);
        }}
      >
        {({ values, errors, touched, isSubmitting }) => (
          <Form className='grid grid-cols-1 gap-7'>
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
              className='-mt-4 text-sm underline font-medium'
              onClick={() => setForgotPassword(!forgotPassword)}
            >
              {forgotPassword ? 'Cancel' : 'Forgot password?'}
            </button>
          </Form>
        )}
      </Formik>

      {forgotPassword && (
        <Formik
          initialValues={{
            forgotPassword: '',
          }}
          validationSchema={forgotPasswordSchema}
          onSubmit={(values) => {
            // same shape as initial values
            const castValues = forgotPasswordSchema.cast(values);
            console.log(castValues);
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <div className='grid grid-cols-1 gap-4'>
              <FormikInput
                name='forgotPassword'
                type='email'
                placeholder='example@mail.com'
                title='Email address'
                error={errors.forgotPassword}
                touched={touched.forgotPassword}
                // value={formData.email}
                // onChange={handleChange('email')}
              />
              <ButtonPrimary
                type='button'
                disabled={isSubmitting}
                loading={isSubmitting}
              >
                Send
              </ButtonPrimary>
            </div>
          )}
        </Formik>
      )}
    </>
  );
}
