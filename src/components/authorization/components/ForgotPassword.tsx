import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import ButtonPrimary from '@/shared/ButtonPrimary';
import { FormikInput } from '@/shared/FormInpurs';

export default function ForgotPassword({ emailValue }: { emailValue: string }) {
  const forgotPasswordSchema = Yup.object().shape({
    forgotPassword: Yup.string()
      .trim()
      .email('Invalid email')
      .required('Email is required'),
  });

  return (
    <Formik
      initialValues={{
        forgotPassword: emailValue,
      }}
      validationSchema={forgotPasswordSchema}
      onSubmit={(values) => {
        // same shape as initial values
        const castValues = forgotPasswordSchema.cast(values);
        console.log(castValues);
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className='grid grid-cols-1 gap-4'>
          <FormikInput
            name='forgotPassword'
            type='email'
            placeholder='example@mail.com'
            title='Email address'
            error={errors.forgotPassword}
            touched={touched.forgotPassword}
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
