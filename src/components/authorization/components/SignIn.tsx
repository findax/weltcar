import { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { ButtonPrimary } from '@/shared/Buttons';
import { FormikInput, FormikPasswordInput } from '@/shared/FormInputs';
import ForgotPassword from './ForgotPassword';
import { singIn } from '@/api/auth';

export default function Signin({
  setIsModalOpen,
}: {
  setIsModalOpen: (isModalOpen: boolean) => void;
}) {
  const [isOpenForgotPassword, setIsOpenForgotPassword] = useState(false);
  const [emailValue, setEmailValue] = useState('');

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

  return (
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

      {isOpenForgotPassword && <ForgotPassword emailValue={emailValue} />}
    </>
  );
}
