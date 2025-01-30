import { useTranslations } from 'next-intl';
import { ReactNode } from 'react';

interface IProps {
  title: string;
  ico: ReactNode;
  titleStyle?: string;
  className?: string
  handleOpenModal: () => void;
}

export default function BtnDetails({ 
  title,
  ico,
  titleStyle = '',
  className,
  handleOpenModal
}: IProps) {
  const translate = useTranslations();
  const onChange = () => {
    handleOpenModal();
  }

  return (
    <div
      className={`px-1.5 py-1 md:px-4 md:py-2 rounded-xl bg-neutral-100 text-neutral-500 cursor-pointer hover:bg-neutral-200 z-10 ${className}`}
      onClick={onChange}
    >
      {ico}

      <span className={`ml-1 md:ml-2 text-neutral-800 text-[10px] md:text-base font-medium ${titleStyle}`}>
        {translate(title)}
      </span>
    </div>
  );
}
