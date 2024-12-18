import { useTranslations } from "next-intl";

const DeletedBadge = ({
  className = 'absolute top-2 right-3 py-1 px-4 text-lg bg-gray-600 text-white rounded-full',
}: {
  className?: string;
}) => {
  const translate = useTranslations();
  return (
    <div
      className={`nc-DeletedBadge flex items-center justify-center z-10 ${className}`}
      data-nc-id='DeletedBadge'
    >
      {translate('yourCars.badge.deleted.label')}
    </div>
  );
};

export default DeletedBadge;
