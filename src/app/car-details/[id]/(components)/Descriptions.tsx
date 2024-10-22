export default function CarDescriptions({
  description,
}: {
  description: string;
}) {
  return (
    <div className='detailsSection__wrap sm:bg-white dark:bg-neutral-900'>
      <h2 className='text-2xl font-semibold'>Car descriptions</h2>
      <div
        className='markdown-styles text-neutral-600 dark:text-neutral-300'
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
}
