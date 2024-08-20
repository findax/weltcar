import { Formik, Form } from 'formik';
import { ButtonPrimary } from '@/shared/Buttons';
import { FormikCheckbox, FormikFile, FormikInput, FormikPasswordInput, FormikPhoneNumberInput } from '@/shared/FormInputs';
import * as Yup from 'yup';
import { SUPPORTED_FORMATS } from '@/components/authorization/components/SignUpPartner';
import { IPartnerFileList, IPartnerResponse } from '@/types/partner';
import { updatePartner } from '@/api/partner';
import { File } from 'buffer';
import { useEffect, useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { Route } from 'next';
import Link from 'next/link';

export default function AccountPartnerForm({ partner }:{ partner: IPartnerResponse }) {
  const [partnerUser, setPartnerUser] = useState(partner ? partner : null);
  const [attachedFiles, setAttachedFiles] = useState<IPartnerFileList[] | null>(partner ? partner.files : null);
  const [initialValues, setInitialValues] = useState({
    companyName: partner?.name,
    taxNumber: partner?.tax_number,
    documents: undefined,
    email: partner?.email,
    phone: partner?.phone
  });

  useEffect(() => {
    if(partnerUser){
      setInitialValues({
        companyName: partnerUser.name,
        taxNumber: partnerUser.tax_number,
        documents: undefined,
        email: partnerUser.email,
        phone: partnerUser.phone
      });
    }
  }, [partnerUser]);
  // const phoneValidationPattern = /\+38 \(0\d{2}\) \d{3}-\d{2}-\d{2}/;

  const AccountPartnerSchema = Yup.object().shape({
    companyName: Yup
      .string()
      .trim()
      .min(2, 'Company name is too short')
      .max(50, 'Company name is too long')
      .required('Company name is required'),
    taxNumber: Yup
      .string()
      .trim()
      .required('Tax number is required'),
    documents: Yup.array()
    .of(
      Yup.mixed<File>()
        .test('fileType', 'Unsupported file type', (value) => {
          return value && SUPPORTED_FORMATS.includes(value.type);
        })
        .required('Document is required')
    ),
    email: Yup.string()
      .trim()
      .email('Invalid email')
      .required('Email is required'),
    phone: Yup.string()
      .trim()
      // .matches(phoneValidationPattern, 'Invalid phone number')
      .required('Phone number is required')
  });

  const handleDeleteAttachedFiles = (event: React.MouseEvent<HTMLButtonElement>, file: IPartnerFileList) => {
    event.preventDefault();
    if(attachedFiles && attachedFiles.length > 0) {
      const newArrayAttachedFiles = [...attachedFiles];
      const filteredFiles = newArrayAttachedFiles.filter((currentfile) => currentfile.file_name !== file.file_name);
      if(filteredFiles.length > 0){
        setAttachedFiles(filteredFiles);
      } else {
        setAttachedFiles(null);
      }
    }
  }

  const renderAttachedFiles = () => {
    if(attachedFiles && attachedFiles.length > 0) {
      return (
        <div>
          <p className='inline-block text-sm font-medium text-neutral-800 dark:text-neutral-200 mb-1'>Uploaded Files</p>
          <div className='flex flex-col gap-1 block w-full border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal px-4 py-3'>
            {attachedFiles.map((file) => (
              <div key={file.file_name} className='flex items-center w-fit border rounded-2xl px-3 py-2'>
              <Link href={file.url as Route } target='_blank'>
                <p className="text-neutral-500">{file.file_name}</p>
              </Link>
              <button disabled={partner.is_verified} onClick={(event) => handleDeleteAttachedFiles(event, file)} className='ml-1'><IoMdClose/></button>
            </div>
            ))}
          </div>
        </div>
      )
    } else {
      return null;
    }
  }

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={AccountPartnerSchema}
      onSubmit={(values, { setSubmitting }) => {
        // trim values
        const castValues = AccountPartnerSchema.cast(values);

        const attachedFilesToRequest = attachedFiles?.map((attachedFile) => attachedFile.id);
        const { companyName, email, phone, documents, taxNumber, } = castValues;
        updatePartner({
          name: companyName,
          email,
          phone,
          tax_number: taxNumber,
          files: documents,
          attached_files: attachedFilesToRequest ? [...attachedFilesToRequest] : []
        })
        .then((res) => {
          if(res){
            setPartnerUser(res);
            setAttachedFiles(res.files);
            setSubmitting(false);
          }
        })
        .finally(() => setSubmitting(false));
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className='grid grid-cols-1 gap-7 w-full max-w-xl mt-10 md:mt-0 md:pl-16'>
           <FormikInput
            disabled={partner?.is_verified}
            name='companyName'
            placeholder='Enter your company name'
            title='Company name'
            error={errors.companyName}
            touched={touched.companyName}
          />
          {/* ---- */}
          <FormikInput
            disabled={partner?.is_verified}
            name='taxNumber'
            placeholder='Enter your tax number'
            title='Tax number'
            error={errors.taxNumber}
            touched={touched.taxNumber}
          />
          {/* ---- */}
          <FormikFile 
            disabled={partner?.is_verified}
            initialValues={initialValues}
            name='documents'
            label='Upload your passport and company registration'
            multiple
            error={errors.documents}
            touched={touched.documents}
          />
          {renderAttachedFiles()}
          {/* ---- */}
          <FormikInput
            disabled={partner?.is_verified}
            name='email'
            type='email'
            placeholder='example@mail.com'
            title='Email address'
            error={errors.email}
            touched={touched.email}
          />
          {/* ---- */}
          <FormikPhoneNumberInput
            disabled={partner?.is_verified}
            title='Phone number'
            error={errors.phone}
            touched={touched.phone}
          />

          { !partner.is_verified &&
            <ButtonPrimary
              type='submit'
              disabled={isSubmitting}
              loading={isSubmitting}
            >
              Update info
            </ButtonPrimary>
          }
        </Form>
      )}
    </Formik>
  );
}
