import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { ButtonPrimary } from '@/shared/Buttons';
import { FormikInput, FormikPhoneNumberInput } from '@/shared/FormInputs';
import { IUser } from '@/types/user';
import { updateUser } from '@/api/user';

export default function AccountForm({ user }: { user: IUser }) {
  // const phoneValidationPattern = /\+38 \(0\d{2}\) \d{3}-\d{2}-\d{2}/;

  const AccountSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .min(2, 'Name is too short')
      .max(50, 'Name is too long')
      .required('Name is required'),
    last_name: Yup.string()
      .trim()
      .min(2, 'Surname is too short')
      .max(50, 'Surname is too long'),
    city: Yup.string()
      .trim()
      .min(2, 'City name is too short')
      .max(50, 'City name is too long'),
    phone: Yup.string().trim(),
    // .matches(phoneValidationPattern, 'Invalid phone number')
  });

  return (
    <Formik
      initialValues={{
        name: user.name,
        last_name: user.surname,
        email: user.email,
        city: user.city,
        phone: user.phone,
      }}
      validationSchema={AccountSchema}
      onSubmit={(values, { setSubmitting }) => {
        // trim values
        const castValues = AccountSchema.cast(values);
        console.log(castValues);

        updateUser({
          name: castValues.name,
          last_name: castValues.last_name,
          email: user.email,
          phone: castValues.phone,
          city: castValues.city,
        })
          .then((res) => {
            console.log(res);
          })
          .finally(() => setSubmitting(false));
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className='flex-grow mt-10 md:mt-0 md:pl-16 max-w-xl space-y-7'>
          <FormikInput
            name='name'
            placeholder='Enter your name'
            title='First name'
            error={errors.name}
            touched={touched.name}
          />
          {/* ---- */}
          <FormikInput
            name='surname'
            placeholder='Enter your surname'
            title='Last name'
            error={errors.last_name}
            touched={touched.last_name}
          />
          {/* ---- */}
          <FormikInput
            name='email'
            type='email'
            placeholder='example@mail.com'
            title='Email address'
            disabled
          />
          {/* ---- */}
          <FormikInput
            name='city'
            placeholder='Enter your city'
            title='City'
            error={errors.city}
            touched={touched.city}
          />
          {/* ---- */}
          <FormikPhoneNumberInput
            title='Phone number'
            error={errors.phone}
            touched={touched.phone}
          />

          <ButtonPrimary
            type='submit'
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            Update info
          </ButtonPrimary>
        </Form>
      )}
    </Formik>
  );
}