'use client';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FormikInput } from '@/shared/FormInputs';
import { ButtonCircle } from '@/shared/Buttons';
import { sendSubscribeEmail } from '@/api/subscribe';

export default function SubscribeForm() {
  const SubscribeSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .email('Invalid email')
      .required('Email is required'),
  });
  return (
    <Formik
      initialValues={{
        email: '',
      }}
      validationSchema={SubscribeSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        // trim values
        const castValues = SubscribeSchema.cast(values);

        sendSubscribeEmail(castValues)
          .then(() => resetForm())
          .finally(() => setSubmitting(false));
      }}
    >
      {({ errors, touched }) => (
        <Form className='relative w-full'>
          <FormikInput
            name='email'
            type='email'
            placeholder='example@mail.com'
            rounded='rounded-full'
            sizeClass='h-12 px-0 py-3 p-0 h-12'
            error={errors.email}
            touched={touched.email}
          />
          {/* <ButtonCircle
            type='submit'
            className='absolute transform top-1/2 -translate-y-1/2 right-1'
            size='w-10 h-10'
          >
            <i className='las la-arrow-right text-xl'></i>
          </ButtonCircle> */}
        </Form>
      )}
    </Formik>
  );
}
