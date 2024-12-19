import Image from 'next/image';
import logisticsImg from '@/images/bg-partners/logistic.jpeg';
import legalImg from '@/images/bg-partners/legal.png';
import technicalImg from '@/images/bg-partners/technical.jpeg';
import { ButtonPrimary } from '@/shared/Buttons';
import { Route } from 'next';
import { NextRoute } from '@/types/routers';

const PARTNERS = [
  {
    partnerImg: logisticsImg,
    title: "partners.carLogistics.title",
    subTitle: "partners.carLogistics.description",
    href: '/support/logistic'
  },
  {
    partnerImg: legalImg,
    title: "partners.legalAssistance.title",
    subTitle: "partners.legalAssistance.description",
    href: '/support/legal'
  },
  {
    partnerImg: technicalImg,
    title: "partners.itSupport.title",
    subTitle: "partners.itSupport.description",
    href: '/support/technical'
  }
];

interface IProps {
  translate: any;
};

const OurPartners = ({ 
  translate
}: IProps) => {
  return (
    <div className={`nc-OurPartners relative`}>
      <h2 className='text-3xl md:text-4xl xl:text-5xl text-center font-bold text-neutral-1050 dark:text-white'>{translate('partners.title')}</h2>
      <div className='grid lg:grid-cols-3 gap-5 mt-16'>
        {PARTNERS.map((partner, index) => (
          <div key={index} className='p-7 lg:p-10 bg-white dark:bg-neutral-950 rounded-[25px] space-y-6'>
            <div className='h-[211px] xsS:h-[270px] sm:h-[350px] md:h-[400px] lg:h-[190px] xl:h-[240px]'>
              <Image
                src={partner.partnerImg}
                alt={partner.title}
                className='h-full w-full rounded-[20px]'
              />
            </div>
            <div className='flex flex-col gap-4'>
              <h3 className='text-lg lg:text-2xl font-bold text-neutral-1050 md:text-2xl dark:text-white'>{translate(partner.title)}</h3>
              <span className='block lg:text-lg text-neutral-500 text-base dark:text-neutral-400'>{translate(partner.subTitle)}</span>
            </div>
            <ButtonPrimary className='mt-5 sm:mt-8 w-full sm:w-fit' href={partner.href as NextRoute }>
              {translate('partners.button.forAll')}
            </ButtonPrimary>
          </div>
        ))}
      </div>

    </div>
  );
};

export default OurPartners;
