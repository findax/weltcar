export default function GalleryTitle({
  brand,
  year
}: {
  brand: string;
  year: string;
}) {
  return (
    <div className="pt-5">
      <h2 className='flex justify-between text-2xl sm:text-3xl lg:text-4xl font-semibold'>
        <span className='mr-4'>{brand}</span>
        <span>{year}</span>
      </h2>
    </div>
  );
}
