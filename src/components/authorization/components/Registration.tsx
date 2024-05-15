import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { ButtonPrimary } from '@/shared/Buttons';
import {
  FormikInput,
  FormikPhoneNumberInput,
  FormikPasswordInput,
} from '@/shared/FormInputs';
import { singUp } from '@/api/auth';

export default function Registration({
  setIsModalOpen,
}: {
  setIsModalOpen: (isModalOpen: boolean) => void;
}) {
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
      .min(8, 'Password must be at least 8 characters')
      .max(50, 'Password must be less than 50 characters')
      .matches(/[a-z]+/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]+/, 'Password must contain at least one uppercase letter')
      .matches(/\d+/, 'Password must contain at least one number')
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
      onSubmit={(values, { setSubmitting }) => {
        // trim values
        const castValues = SignupSchema.cast(values);

        singUp({
          name: castValues.name,
          email: castValues.email,
          password: castValues.password,
        })
          .then((res) => {
            res && setIsModalOpen(false);
          })
          .finally(() => setSubmitting(false));
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className='grid grid-cols-1 gap-8'>
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
