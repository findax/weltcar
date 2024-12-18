import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { ButtonPrimary } from '@/shared/Buttons';
import { FormikCheckbox } from '@/shared/FormInputs';
import { createOrder } from '@/api/user';
import { useTranslations } from 'next-intl';

export default function ConfirmForm({
  carId,
  setIsModalOpen,
}: {
  carId: string;
  setIsModalOpen: (isModalOpen: boolean) => void;
}) {
  const ConfirmationSchema = Yup.object().shape({
    confirm: Yup.bool().oneOf([true], 'confirmSchema.confirm.oneOf'),
  });

  const translate = useTranslations();

  return (
    <Formik
      initialValues={{
        confirm: false,
      }}
      validationSchema={ConfirmationSchema}
      onSubmit={(value, { setSubmitting }) => {
        createOrder(carId)
          .then((res) => res && setIsModalOpen(false))
          .finally(() => setSubmitting(false));
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className='w-full grid grid-cols-1 gap-7'>
          <FormikCheckbox
            name='confirm'
            label="I agree to the Privacy Policy and Company's Policy and confirm that by clicking the 'Continue and Reserve' button, I am confirming my intention to purchase the car and my readiness to make a prepayment."
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
            {translate('carDetails.confirm.button')}
          </ButtonPrimary>
        </Form>
      )}
    </Formik>
  );
}
