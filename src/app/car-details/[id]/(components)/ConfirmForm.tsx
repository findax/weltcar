import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { ButtonPrimary } from '@/shared/Buttons';
import { FormikCheckbox } from '@/shared/FormInputs';

export default function ConfirmForm() {
  const ConfirmationSchema = Yup.object().shape({
    confirm: Yup.bool().oneOf([true], 'You need to accept the Privacy Policy'),
  });

  return (
    <>
      <Formik
        initialValues={{
          confirm: false,
        }}
        validationSchema={ConfirmationSchema}
        onSubmit={() => {
          console.log({ id: 1, email: 'user@mail.com' });
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className='w-full grid grid-cols-1 gap-7'>
            <FormikCheckbox
              name='confirm'
              label='I Agree to Privacy Policy'
              className='rounded-lg'
              error={errors.confirm}
              touched={touched.confirm}
            />

            <ButtonPrimary
              type='submit'
              disabled={isSubmitting}
              loading={isSubmitting}
              className='mt-4'
            >
              Continue
            </ButtonPrimary>
          </Form>
        )}
      </Formik>
    </>
  );
}
