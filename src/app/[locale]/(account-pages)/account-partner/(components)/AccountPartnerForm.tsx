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
import { useLocale, useTranslations } from 'next-intl';

export default function AccountPartnerForm({ partner }:{ partner: IPartnerResponse }) {
  const translate = useTranslations();
  const locale = useLocale();
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
      .min(2, 'accountPartnerSchema.companyName.min')
      .max(50, 'accountPartnerSchema.companyName.max')
      .required('accountPartnerSchema.companyName.required'),
    taxNumber: Yup
      .string()
      .trim()
      .required('accountPartnerSchema.taxNumber.required'),
    documents: Yup.array()
    .of(
      Yup.mixed<File>()
        .test('fileType', 'accountPartnerSchema.documents.unsuported', (value) => {
          return value && SUPPORTED_FORMATS.includes(value.type);
        })
        .required('accountPartnerSchema.documents.required')
    ),
    email: Yup.string()
      .trim()
      .email('accountPartnerSchema.email.invalid')
      .required('accountPartnerSchema.email.required'),
    phone: Yup.string()
      .trim()
      // .matches(phoneValidationPattern, 'Invalid phone number')
      .required('accountPartnerSchema.phone.required')
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
          <p className='inline-block text-sm font-medium text-neutral-800 dark:text-neutral-200 mb-1'>{translate('accountPartner.form.uploadedFiles.label')}</p>
          <div className='flex flex-col gap-1 block w-full border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-1150 rounded-2xl text-sm font-normal px-4 py-3'>
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
        }, locale)
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
        <Form className='grid grid-cols-1 gap-7 w-full max-w-xl mt-10 md:pr-32'>
           <FormikInput
            disabled={partner?.is_verified}
            name='companyName'
            placeholder='accountPartner.form.companyName.placeholder'
            title='accountPartner.form.companyName.label'
            rounded='rounded-full'
            sizeClass='h-14'
            error={errors.companyName}
            touched={touched.companyName}
          />
          {/* ---- */}
          <FormikInput
            disabled={partner?.is_verified}
            name='taxNumber'
            placeholder='accountPartner.form.taxNumber.placeholder'
            title='accountPartner.form.taxNumber.label'
            rounded='rounded-full'
            sizeClass='h-14'
            error={errors.taxNumber}
            touched={touched.taxNumber}
          />
          {/* ---- */}
          <FormikFile 
            accept="image/jpeg, image/png"
            disabled={partner?.is_verified}
            initialValues={initialValues}
            name='documents'
            label='accountPartner.form.uploadDocuments.label'
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
            placeholder='accountPartner.form.emailAddress.placeholder'
            title='accountPartner.form.emailAddress.label'
            rounded='rounded-full'
            sizeClass='h-14'
            error={errors.email}
            touched={touched.email}
          />
          {/* ---- */}
          <FormikPhoneNumberInput
            disabled={partner?.is_verified}
            title='accountPartner.form.phoneNumber.label'
            rounded='rounded-full'
            sizeClass='h-14'
            error={errors.phone}
            touched={touched.phone}
          />

          { !partner.is_verified &&
            <ButtonPrimary
              type='submit'
              disabled={isSubmitting}
              loading={isSubmitting}
              className='text-base lg:text-lg w-full sm:w-40'
            >
              {translate('accountPartner.form.buttn.update')}
            </ButtonPrimary>
          }
        </Form>
      )}
    </Formik>
  );
}
