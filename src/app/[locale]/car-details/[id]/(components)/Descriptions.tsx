import { useTranslations } from "next-intl";

export default function CarDescriptions({
  description,
}: {
  description: string;
}) {
  const translate = useTranslations();
  return (
    <div className='detailsSection__wrap sm:bg-white dark:bg-neutral-900'>
      <h2 className='text-2xl font-semibold'>{translate('carDetails.description.title')}</h2>
      <div
        className='markdown-styles whitespace-pre-wrap text-neutral-600 dark:text-neutral-300'
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
}
