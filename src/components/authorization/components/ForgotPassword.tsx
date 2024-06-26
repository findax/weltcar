import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { ButtonPrimary } from '@/shared/Buttons';
import { FormikInput } from '@/shared/FormInputs';
import { sendForgotPassword } from '@/api/auth';

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
      .email('Invalid email')
      .required('Email is required'),
  });

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
            placeholder='example@mail.com'
            title='Email address'
            error={errors.email}
            touched={touched.email}
          />

          <ButtonPrimary
            type='submit'
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            Send
          </ButtonPrimary>
        </Form>
      )}
    </Formik>
  );
}
