import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import ButtonPrimary from '@/shared/ButtonPrimary';
import {
  FormikInput,
  FormikPhoneNumberInput,
  FormikPasswordInput,
} from '@/shared/FormInputs';

export default function Registration() {
  // const phoneValidationPattern = /\+38 \(0\d{2}\) \d{3}-\d{2}-\d{2}/;

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .min(2, 'Name is too short')
      .max(50, 'Name is too long')
      .required('Name is required'),
    email: Yup.string()
      .trim()
      .email('Invalid email')
      .required('Email is required'),
    phone: Yup.string()
      .trim()
      // .matches(phoneValidationPattern, 'Invalid phone number')
      .required('Phone number is required'),
    password: Yup.string()
      .trim()
      .min(4, 'Password is too short')
      .max(50, 'Password is too long')
      .required('Password is required'),
  });

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        phone: '',
        password: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={(values) => {
        // same shape as initial values
        const castValues = SignupSchema.cast(values);
        console.log(castValues);
      }}
    >
      {({ values, errors, touched, isSubmitting }) => (
        <Form className='grid grid-cols-1 gap-7'>
          <FormikInput
            name='name'
            placeholder='Enter your name'
            title='Name'
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
          <FormikPhoneNumberInput
            title='Phone number'
            error={errors.phone}
            touched={touched.phone}
          />
          {/* ---- */}
          <FormikPasswordInput
            title='Password'
            placeholder='Enter your password'
            error={errors.password}
            touched={touched.password}
          />

          <ButtonPrimary
            type='submit'
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            Continue
          </ButtonPrimary>
        </Form>
      )}
    </Formik>
  );
}
