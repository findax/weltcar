'use client';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FormikInput, FormikTextarea } from '@/shared/FormInputs';
import { ButtonPrimary } from '@/shared/Buttons';

export default function MessageForm() {
  const MessageSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .min(2, 'Name is too short')
      .max(50, 'Name is too long')
      .required('Name is required'),
    email: Yup.string()
      .trim()
      .email('Invalid email')
      .required('Email is required'),
    message: Yup.string()
      .trim()
      .min(10, 'Message is too short')
      .required('Message is required'),
  });
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        message: '',
      }}
      validationSchema={MessageSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        // same shape as initial values
        const castValues = MessageSchema.cast(values);
        console.log(castValues);

        // resetForm();
        // setSubmitting(false);
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className='grid grid-cols-1 gap-8 -mt-1'>
          <FormikInput
            name='name'
            placeholder='Enter your name'
            title='Full name'
            error={errors.name}
            touched={touched.name}
          />
          {/* ---- */}
          <FormikInput
            name='email'
            type='email'
            placeholder='example@mail.com'
            title='Email address'
            error={errors.email}
            touched={touched.email}
          />
          {/* ---- */}
          <FormikTextarea
            name='message'
            title='Message'
            rows={6}
            error={errors.message}
            touched={touched.message}
          />

          <ButtonPrimary
            type='submit'
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            Send Message
          </ButtonPrimary>
        </Form>
      )}
    </Formik>
  );
}
