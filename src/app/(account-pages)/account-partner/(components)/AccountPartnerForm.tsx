import { Formik, Form } from 'formik';
import { ButtonPrimary } from '@/shared/Buttons';
import { FormikCheckbox, FormikFile, FormikInput, FormikPasswordInput, FormikPhoneNumberInput } from '@/shared/FormInputs';
import { useUserStore } from '@/stores/user-store';
import { SignUpPartnerSchema } from '@/components/authorization/components/SignUpPartner';

export default function AccountPartnerForm() {
  //const user = useUserStore((state) => state.user);
  //const updateUserState = useUserStore((state) => state.updateUserState);
  // const phoneValidationPattern = /\+38 \(0\d{2}\) \d{3}-\d{2}-\d{2}/;

  return (
    <Formik
      initialValues={{
        companyName: '',
        taxNumber: '',
        documents: undefined,
        email: '',
        phone: '',
        password: '',
        termsAccepted: false
      }}
      validationSchema={SignUpPartnerSchema}
      onSubmit={(values, { setSubmitting }) => {
        // trim values
        const castValues = SignUpPartnerSchema.cast(values);

        console.log("UPDATE =", castValues);
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className='grid grid-cols-1 gap-7 w-full max-w-xl mt-10 md:mt-0 md:pl-16'>
           <FormikInput
            name='companyName'
            placeholder='Enter your company name'
            title='Company name'
            error={errors.companyName}
            touched={touched.companyName}
          />
          {/* ---- */}
          <FormikInput
            name='taxNumber'
            placeholder='Enter your tax number'
            title='Tax number'
            error={errors.taxNumber}
            touched={touched.taxNumber}
          />
          {/* ---- */}
          <FormikFile 
            name='documents'
            label='Upload your passport and company registration'
            multiple
            error={errors.documents}
            touched={touched.documents}
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
          {/* ---- */}
          <FormikCheckbox
            name='termsAccepted'
            label='I agree with the partners agreement'
            error={errors.termsAccepted}
            touched={touched.termsAccepted}
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
