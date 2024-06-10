import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { ButtonCircle } from '@/shared/Buttons';
import { FormikInput } from '@/shared/FormInputs';

export default function SearchForm({
  handleSearchChange,
}: {
  handleSearchChange: (value: string) => void;
}) {
  const SearchSchema = Yup.object().shape({
    search: Yup.string()
      .trim()
      .min(2, 'Name is too short')
      .max(20, 'Name is too long')
      .required(''),
  });

  return (
    <Formik
      initialValues={{
        search: '',
      }}
      validationSchema={SearchSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        // same shape as initial values
        const castValues = SearchSchema.cast(values);

        handleSearchChange(castValues.search);
        setSubmitting(false);
        resetForm();
      }}
    >
      {({ errors, touched }) => (
        <Form className='py-7 relative w-full'>
          <FormikInput
            name='search'
            type='text'
            placeholder='Search by car name'
            rounded='rounded-full'
            sizeClass='h-12 px-5 py-3'
            error={errors.search}
            touched={touched.search}
          />
          <ButtonCircle
            type='submit'
            className='absolute transform top-1/2 -translate-y-1/2 right-1.5'
            size='w-10 h-10'
          >
            <i className='las la-search text-xl'></i>
          </ButtonCircle>
        </Form>
      )}
    </Formik>
  );
}
