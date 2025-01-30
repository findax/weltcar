import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { ButtonPrimary } from '@/shared/Buttons';
import { FormikInput } from '@/shared/FormInputs';
import { sendForgotPassword } from '@/api/auth';
import { useTranslations } from 'next-intl';

export default function ForgotPassword({
  emailValue,
  setIsResetingPassword,
}: {
  emailValue: string;
  setIsResetingPassword: (isResetingPassword: boolean) => void;
}) {
  const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .email('forgotPasswordSchema.email.invalid')
      .required('forgotPasswordSchema.email.required'),
  });
  const translate = useTranslations();

  return (
    <Formik
      initialValues={{
        email: emailValue,
      }}
      validationSchema={forgotPasswordSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        // trim values
        const castValues = forgotPasswordSchema.cast(values);

        sendForgotPassword(castValues)
          .then((res) => {
            res && (setIsResetingPassword(true), resetForm());
          })
          .finally(() => setSubmitting(false));
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className='grid grid-cols-1 gap-4'>
          <FormikInput
            name='email'
            type='email'
            rounded='rounded-full'
            sizeClass='h-14'
            placeholder='forgotPassword.email.placeholder'
            title='forgotPassword.email.title'
            error={errors.email}
            touched={touched.email}
          />

          <ButtonPrimary
            type='submit'
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            {translate('forgotPassword.button.send')}
          </ButtonPrimary>
        </Form>
      )}
    </Formik>
  );
}
