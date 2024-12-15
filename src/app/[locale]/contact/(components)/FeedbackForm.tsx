'use client';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  FormikInput,
  FormikPhoneNumberInput,
  FormikTextarea,
} from '@/shared/FormInputs';
import { ButtonPrimary } from '@/shared/Buttons';
import { sendFeedback } from '@/api/feedback';

export default function FeedbackForm() {
  // const phoneValidationPattern = /\+38 \(0\d{2}\) \d{3}-\d{2}-\d{2}/;

  const FeedbackSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .min(2, 'Name is too short')
      .max(50, 'Name is too long')
      .required('Name is required'),
    email: Yup.string()
      .trim()
      .email('Invalid email')
      .required('Email is required'),
    phone: Yup.string().trim(),
    // .matches(phoneValidationPattern, 'Invalid phone number')
    message: Yup.string()
      .trim()
      .min(10, 'Message is too short')
      .max(5000, 'Message is too long')
      .required('Message is required'),
  });
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        phone: '',
        message: '',
      }}
      validationSchema={FeedbackSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        // trim values
        const castValues = FeedbackSchema.cast(values);

        sendFeedback(castValues)
          .then((res) => {
            res && resetForm();
          })
          .finally(() => setSubmitting(false));
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className='grid grid-cols-1 gap-7 -mt-1'>
          <FormikInput
            name='name'
            placeholder='Enter your name'
            title='Full name'
            rounded='rounded-full'
            sizeClass='h-14'
            error={errors.name}
            touched={touched.name}
          />
          {/* ---- */}
          <FormikInput
            name='email'
            type='email'
            placeholder='example@mail.com'
            title='Email address'
            rounded='rounded-full'
            sizeClass='h-14'
            error={errors.email}
            touched={touched.email}
          />
          {/* ---- */}
          <FormikPhoneNumberInput
            title='Phone number'
            rounded='rounded-full'
            sizeClass='h-14'
            error={errors.phone}
            touched={touched.phone}
          />
          {/* ---- */}
          <FormikTextarea
            name='message'
            placeholder='Enter message'
            title='Message'
            rows={6}
            rounded='rounded-[40px]'
            error={errors.message}
            touched={touched.message}
          />

          <ButtonPrimary
            type='submit'
            disabled={isSubmitting}
            loading={isSubmitting}
            className='!text-lg mt-5 w-full sm:w-[102px]'
          >
            Send
          </ButtonPrimary>
        </Form>
      )}
    </Formik>
  );
}
