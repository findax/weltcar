'use client';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FormikInput } from '@/shared/FormInputs';
import { ButtonCircle, ButtonPrimary } from '@/shared/Buttons';
import { sendSubscribeEmail } from '@/api/subscribe';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';

interface IProps {
  isButtonShowCircle?: boolean;
  isButtonShowClassic?: boolean;
}

export default function SubscribeForm({
  isButtonShowCircle = false,
  isButtonShowClassic = false
}: IProps) {
  const translate = useTranslations();
  const SubscribeSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .email('subscribeSchema.email.invalid')
      .required('subscribeSchema.email.required'),
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
            placeholder='joinOurNewsletter.placeholder'
            rounded='rounded-full'
            sizeClass='px-0 py-3 p-0 h-14'
            error={errors.email}
            touched={touched.email}
          />
          {isButtonShowCircle && <ButtonCircle
            type='submit'
            className='absolute transform top-1/2 -translate-y-1/2 right-1'
            size='w-10 h-10'
          >
            <ChevronRightIcon className='w-8 ml-0.5 text-white dark:text-black' />
          </ButtonCircle>}
          
          {isButtonShowClassic && <ButtonPrimary 
            className='mt-5 sm:mt-8 w-full sm:w-fit' 
            type='submit'
          >
            {translate('joinOurNewsletter.button.sendEmail')}
          </ButtonPrimary>}
        </Form>
      )}
    </Formik>
  );
}
