import { ReactElement, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { ButtonPrimary } from '@/shared/Buttons';
import { FormikInput, FormikPasswordInput } from '@/shared/FormInputs';
import { singIn } from '@/api/auth';
import { useUserStore } from '@/stores/user-store';
import { IUser } from '@/types/user';
import { useTranslations } from 'next-intl';
import SignUpFavorite from './SignUpFavorite';

export default function SignInFavorite({
  setIsModalOpen,
  changeCurrentPage
}: {
  changeCurrentPage: (page: ReactElement) => void;
  setIsModalOpen: (isModalOpen: boolean) => void;
}) {
  const translate = useTranslations();
  const [emailValue, setEmailValue] = useState('');

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

  const lol = `${translate('authorization.favorites.title.canAdd')} ${translate('authorization.favorites.title.only')}`;
  console.log(lol)

  return (
    <div className='w-full max-w-md mx-auto space-y-8'>
      <h3 className='font-semibold leading-9 text-[32px] text-neutral-900 dark:text-white'>
        {`${translate('authorization.favorites.title.canAdd')} ${translate('authorization.favorites.title.only')}`}
      </h3>
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
              if(res) {
                updateUserState(res as IUser);
                setIsModalOpen(false);
                window.location.reload();
              }
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
              rounded='rounded-full'
              sizeClass='h-14'
              placeholder='authorization.signIn.email.placeholder'
              title='authorization.signIn.email.title'
              error={errors.email}
              touched={touched.email}
            />
            {/* ---- */}
            <FormikPasswordInput
              rounded='rounded-full'
              sizeClass='h-14'
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

            <div className='flex gap-1 justify-center'>
              <span className='font-medium'>I don’t have an account.</span>
              <button 
                onClick={() => changeCurrentPage(<SignUpFavorite setIsModalOpen={setIsModalOpen} />)}
                className='underline underline-offset-1'
              >
                Sign up
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
