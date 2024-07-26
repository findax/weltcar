import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { ButtonPrimary } from '@/shared/Buttons';
import { FormikCheckbox, FormikFile, FormikInput, FormikPasswordInput, FormikPhoneNumberInput, FormikTextarea } from '@/shared/FormInputs';
import { useUserStore } from '@/stores/user-store';
import { SignUpPartnerSchema } from '@/components/authorization/components/SignUpPartner';

export default function PartnerCarsForm() {
  //const user = useUserStore((state) => state.user);
  //const updateUserState = useUserStore((state) => state.updateUserState);

  const PartnerCarsSchema = Yup.object().shape({
    model: Yup
      .string()
      .trim()
      .max(50, 'Model is too long')
      .required('Model is required'),
    specification: Yup
      .string()
      .trim()
      .required('Specification is required'),
    yearOfManufacture: Yup
      .string()
      .trim()
      .required('Year of manufacture is required'),
    vin: Yup
      .string()
      .trim()
      .required('VIN is required'),
    description: Yup
      .string()
      .trim()
      .max(150, 'Description is too long')
      .required('Description is required'),
    insideColor: Yup
      .string()
      .trim()
      .required('Inside color is required'),
    externalColor: Yup
      .string()
      .trim()
      .required('External color is required'),
    indexCode: Yup
      .string()
      .trim()
      .required('Index code is required'),
    commentary: Yup
      .string()
      .trim()
      .required('Commentary is required'),
  });
  return (
    <Formik
      initialValues={{
        model: '',
        specification: '',
        yearOfManufacture: '',
        vin: '',
        description: '',
        insideColor: '',
        externalColor: '',
        indexCode: '',
        commentary: ''
      }}
      validationSchema={PartnerCarsSchema}
      onSubmit={(values, { setSubmitting }) => {
        // trim values
        const castValues = PartnerCarsSchema.cast(values);

        console.log("UPDATE =", castValues);
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className='grid grid-cols-1 gap-7 w-full max-w-xl mt-10 md:mt-0 md:pl-16'>
           <FormikInput
            name='model'
            placeholder='Enter model'
            title='Model name'
            error={errors.model}
            touched={touched.model}
          />
          {/* ---- */}
          <FormikInput
            name='specification'
            placeholder='Enter specification'
            title='Specification'
            error={errors.specification}
            touched={touched.specification}
          />
          {/* ---- */}
          <FormikInput
            name='vin'
            placeholder='Enter VIN'
            title='VIN'
            error={errors.vin}
            touched={touched.vin}
          />
          {/* ---- */}
          <FormikTextarea
            name='description'
            placeholder='Description'
            title='Description'
            error={errors.description}
            touched={touched.description}
          />
          {/* ---- */}
          <FormikInput
            name='insideColor'
            placeholder='Inside color'
            title='Inside color'
            error={errors.insideColor}
            touched={touched.insideColor}
          />
          {/* ---- */}
          <FormikInput
            name='externalColor'
            placeholder='External color'
            title='External color'
            error={errors.externalColor}
            touched={touched.externalColor}
          />
          {/* ---- */}
          <FormikInput
            name='indexCode'
            placeholder='Index code'
            title='Index code'
            error={errors.indexCode}
            touched={touched.indexCode}
          />
          {/* ---- */}
          <FormikInput
            name='commentary'
            placeholder='Commentary'
            title='Commentary'
            error={errors.commentary}
            touched={touched.commentary}
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
