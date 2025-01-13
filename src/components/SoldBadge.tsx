import { useTranslations } from "next-intl";

interface IProps {
  className?: string;
}

const SoldBadge = ({
  className = 'absolute top-2 right-3 py-1 px-4 text-2xl bg-gray-600 text-white rounded-full',
}: IProps) => {
  const translate = useTranslations()
  return (
    <div
      className={`nc-SoldBadge flex items-center justify-center z-10 ${className}`}
      data-nc-id='SoldBadge'
    >
      {translate('badge.sold.label')}
    </div>
  );
};

export default SoldBadge;
