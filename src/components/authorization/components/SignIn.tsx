import { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { ButtonPrimary } from '@/shared/Buttons';
import { FormikInput, FormikPasswordInput } from '@/shared/FormInputs';
import ForgotPassword from './ForgotPassword';
import { singIn } from '@/api/auth';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { useUserStore } from '@/stores/user-store';
import { IUser } from '@/types/user';
import { useTranslations } from 'next-intl';

export default function SignIn({
  setIsModalOpen,
}: {
  setIsModalOpen: (isModalOpen: boolean) => void;
}) {
  const translate = useTranslations();
  const [isOpenForgotPassword, setIsOpenForgotPassword] = useState(false);
  const [emailValue, setEmailValue] = useState('');
  const [isResetingPassword, setIsResetingPassword] = useState(false);

  const updateUserState = useUserStore((state) => state.updateUserState);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .email('loginSchema.email.invalid')
      .required('loginSchema.email.required'),
    password: Yup.string()
      .trim()
      .min(8, 'loginSchema.password.min')
      .max(50, 'loginSchema.password.max')
      .matches(/[a-z]+/, 'loginSchema.password.matchesLow')
      .matches(/[A-Z]+/, 'loginSchema.password.matchesUp')
      .matches(/\d+/, 'loginSchema.password.matchesNumb')
      .required('loginSchema.password.required'),
  });

  const handleFormChange = (data: { name: string; value: string }) => {
    data.name === 'email' && setEmailValue(data.value);
  };

  return isResetingPassword ? (
    <div className='pt-4 flex justify-center items-center'>
      <div className='text-center space-y-10'>
        <InformationCircleIcon className='block mx-auto w-24 h-24 text-yellow-500' />
        <p className='px-6 text-2xl font-semibold'>
          {translate('authorization.signIn.resetPass.title')}
        </p>
        <ButtonPrimary onClick={() => setIsModalOpen(false)}>
          {translate('authorization.signIn.button.gotIt')}
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

          singIn(castValues)
            .then((res) => {
              res && (updateUserState(res as IUser), setIsModalOpen(false));
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
              placeholder='authorization.signIn.email.placeholder'
              title='authorization.signIn.email.title'
              error={errors.email}
              touched={touched.email}
            />
            {/* ---- */}
            <FormikPasswordInput
              title='authorization.signIn.password.title'
              placeholder='authorization.signIn.password.placeholder'
              error={errors.password}
              touched={touched.password}
            />

            <ButtonPrimary
              type='submit'
              disabled={isSubmitting}
              loading={isSubmitting}
            >
              {translate('authorization.signIn.button.continue')}
            </ButtonPrimary>

            <button
              type='button'
              className='-mt-2 text-sm underline font-medium'
              onClick={() => setIsOpenForgotPassword(!isOpenForgotPassword)}
            >
              {isOpenForgotPassword ? translate('authorization.signIn.button.cancel') : translate('authorization.signIn.button.forgot')}
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
