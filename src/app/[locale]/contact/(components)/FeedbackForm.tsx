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

interface IProps {
  translate: any;
}

export default function FeedbackForm({
  translate
}: IProps) {
  // const phoneValidationPattern = /\+38 \(0\d{2}\) \d{3}-\d{2}-\d{2}/;

  const FeedbackSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .min(2, 'feedbackSchema.name.min')
      .max(50, 'feedbackSchema.name.max')
      .required('feedbackSchema.name.required'),
    email: Yup.string()
      .trim()
      .email('feedbackSchema.email.invalid')
      .required('feedbackSchema.email.required'),
    phone: Yup.string().trim(),
    // .matches(phoneValidationPattern, 'Invalid phone number')
    message: Yup.string()
      .trim()
      .min(10, 'feedbackSchema.message.min')
      .max(5000, 'feedbackSchema.message.max')
      .required('feedbackSchema.message.required'),
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
            placeholder='contact.form.fullName.placeholder'
            title='contact.form.fullName.label'
            rounded='rounded-full'
            sizeClass='h-14'
            error={errors.name}
            touched={touched.name}
          />
          {/* ---- */}
          <FormikInput
            name='email'
            type='email'
            placeholder='contact.form.emailAddress.placeholder'
            title='contact.form.emailAddress.label'
            rounded='rounded-full'
            sizeClass='h-14'
            error={errors.email}
            touched={touched.email}
          />
          {/* ---- */}
          <FormikPhoneNumberInput
            title='contact.form.phoneNumber.label'
            rounded='rounded-full'
            sizeClass='h-14'
            error={errors.phone}
            touched={touched.phone}
          />
          {/* ---- */}
          <FormikTextarea
            name='message'
            placeholder='contact.form.message.placeholder'
            title='contact.form.message.label'
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
            {translate('contact.form.button.send')}
          </ButtonPrimary>
        </Form>
      )}
    </Formik>
  );
}
