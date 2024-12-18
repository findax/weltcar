import { useTranslations } from "next-intl";

const InactiveBadge = ({
  className = 'absolute top-2 right-3 py-1 px-4 text-lg bg-gray-600 text-white rounded-full',
}: {
  className?: string;
}) => {
  const translate = useTranslations();
  return (
    <div
      className={`nc-InactiveBadge flex items-center justify-center z-10 ${className}`}
      data-nc-id='InactiveBadge'
    >
      {translate('yourCars.badge.inactive.label')}
    </div>
  );
};

export default InactiveBadge;
