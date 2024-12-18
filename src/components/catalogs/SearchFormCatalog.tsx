import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ButtonCircle } from '@/shared/Buttons';
import { FormikInput } from '@/shared/FormInputs';
import { useQueryParams } from '@/hooks/useQueryParams';

export default function SearchFormCatalog() {
  const { queryParams, handleSearchChange, resetFilters } = useQueryParams();

  const SearchSchema = Yup.object().shape({
    search: Yup.string()
      .trim()
      .min(2, 'Name is too short')
      .max(20, 'Name is too long')
      .required('Name is required'),
  });

  return (
    <Formik
      initialValues={{
        search: queryParams?.search || '',
      }}
      validationSchema={SearchSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        // trim values
        const castValues = SearchSchema.cast(values);

        handleSearchChange(castValues.search);
        setSubmitting(false);
        // resetForm();
      }}
    >
      {({ values, errors, touched }) => (
        <Form className='mb-6 relative w-full'>
          <FormikInput
            name='search'
            type='text'
            placeholder='filters.input.searchByCarName'
            rounded='rounded-full'
            sizeClass='h-12 px-5 py-3'
            error={errors.search}
            touched={touched.search}
          />
          <ButtonCircle
            type='submit'
            className='absolute transform top-1/2 -translate-y-1/2 right-1'
            size='w-10 h-10'
          >
            <i className='las la-search text-xl dark:text-black text-white'></i>
          </ButtonCircle>
          {values.search !== '' && (
            <button
              onClick={() => {
                resetFilters(!!values.search);
                values.search = '';
              }}
              className='absolute top-1/2 -translate-y-1/2 right-12 p-2 rounded-full bg-neutral-200 dark:bg-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-400'
            >
              <XMarkIcon className='w-6 h-6' color='#000' />
            </button>
          )}
        </Form>
      )}
    </Formik>
  );
}
