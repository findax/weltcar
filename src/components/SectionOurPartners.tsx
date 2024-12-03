import Image from 'next/image';
import logisticsImg from '@/images/bg-partners/logistic.jpeg';
import legalImg from '@/images/bg-partners/legal.png';
import technicalImg from '@/images/bg-partners/technical.jpeg';
import { ButtonPrimary } from '@/shared/Buttons';
import { Route } from 'next';

const PARTNERS = [
  {
    partnerImg: logisticsImg,
    title: "Car Logistics",
    subTitle: "We handle the logistics of cars, containers, and more, whether via auto transport or air freight. Let us take care of your logistics needs with precision and care.",
    href: '/support/logistic'
  },
  {
    partnerImg: legalImg,
    title: "Legal Assistance",
    subTitle: "Our legal experts are here to assist with all your business-related legal inquiries and issues. Reach out to us for professional support and reliable advice.",
    href: '/support/legal'
  },
  {
    partnerImg: technicalImg,
    title: "IT Support",
    subTitle: "We provide expert support in custom website and ERP development, ensuring your digital platforms run smoothly. Our team is ready to solve any technical challenges.",
    href: '/support/technical'
  }
]
const OurPartners = () => {
  return (
    <div className={`nc-OurPartners relative`}>
      <h2 className='text-3xl md:text-4xl xl:text-5xl text-center font-bold text-neutral-1050 dark:text-white'>Our Partners</h2>
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
              <h3 className='text-lg lg:text-2xl font-bold text-neutral-1050 md:text-2xl dark:text-white'>{partner.title}</h3>
              <span className='block lg:text-lg text-neutral-500 text-base dark:text-neutral-400'>{partner.subTitle}</span>
            </div>
            <ButtonPrimary className='mt-5 sm:mt-8 w-full sm:w-fit' href={`${partner.href as Route<string>}`}>
              Learn More
            </ButtonPrimary>
          </div>
        ))}
      </div>

    </div>
  );
};

export default OurPartners;
