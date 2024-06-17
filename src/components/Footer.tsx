import Link from 'next/link';
import Logo from '@/shared/Logo';
import SocialsList1 from '@/shared/SocialsList1';
import SubscribeForm from './SubscribeForm';

export default function Footer() {
  return (
    <footer className='nc-Footer relative bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-700'>
      <div className='container'>
        <div className='py-24 lg:py-28'>
          <div className='grid grid-cols-12 gap-y-14 gap-x-6 px-3 xl:px-0'>
            <div className='-mt-3 col-span-12 md:col-span-6 xl:col-span-3'>
              <Logo />
              <p className='mt-2 mb-6 text-neutral-600 dark:text-neutral-400'>
                WeltCar - Your Gateway to
                <br />
                Luxury Automotive Excellence
              </p>
              <SocialsList1 className='flex items-center space-x-3 md:space-x-0 md:flex-col md:space-y-2.5 md:items-start' />
            </div>
            <div className='col-span-12 md:col-span-6 xl:col-span-3 space-y-6'>
              <h4 className='text-2xl font-semibold'>Quick Link</h4>
              <ul className='flex flex-col gap-2'>
                <li>
                  <Link
                    href='/catalog'
                    className='text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                  >
                    Catalog
                  </Link>
                </li>
                <li>
                  <Link
                    href='/about'
                    className='text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href='/contact'
                    className='text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className='col-span-12 md:col-span-6 xl:col-span-3 space-y-6'>
              <h4 className='text-2xl font-semibold'>Contact</h4>
              <ul className='flex flex-col gap-6'>
                <li className='flex items-center gap-4'>
                  {/* <i className='las la-map-marker-alt text-xl p-2 rounded-full border border-neutral-200 dark:border-neutral-700'></i> */}
                  📍{' '}
                  <Link
                    className='text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                    href='https://www.google.com/maps?q=FinDax+GmbH,+Theodor-Fontane-Stra%C3%9Fe+2,+22848+Norderstedt,+Germany&ftid=0x47b229e490544979:0x29213d5a4a4d551b&entry=gps&lucs=,94224825,94227247,94227248,94222042,47071704,47069508,94214172,94218641,94203019,47084304,94208458,94208447&g_ep=CAISDTYuMTE5LjEuNjYwNTAYACCenQoqbCw5NDIyNDgyNSw5NDIyNzI0Nyw5NDIyNzI0OCw5NDIyMjA0Miw0NzA3MTcwNCw0NzA2OTUwOCw5NDIxNDE3Miw5NDIxODY0MSw5NDIwMzAxOSw0NzA4NDMwNCw5NDIwODQ1OCw5NDIwODQ0N0ICRUU%3D&g_st=com.google.maps.preview.copy'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Theodor-Fontane-Straße 2,
                    <br />
                    22848 Norderstedt
                  </Link>
                </li>
                <li className='flex items-center gap-4'>
                  {/* <i className='las la-envelope-open text-xl p-2 rounded-full border border-neutral-200 dark:border-neutral-700'></i> */}
                  ✉️{' '}
                  <Link
                    className='text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                    href='mailto:info@findax.eu'
                  >
                    info@findax.eu
                  </Link>
                </li>
                <li className='flex items-center gap-4'>
                  {/* <i className='las la-phone-volume text-xl p-2 rounded-full border border-neutral-200 dark:border-neutral-700'></i> */}
                  📞{' '}
                  <Link
                    className='text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                    href='tel:+4915902465256'
                  >
                    +49 1590 2465256
                  </Link>
                </li>
                <li>
                  <Link
                    className='inline-flex items-center py-1.5 text-xl border border-primary-200 dark:border-neutral-700 rounded-full bg-primary-100/30 dark:bg-neutral-800 hover:bg-primary-100 dark:hover:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                    href='https://wa.me/&#x2B;4915902465256'
                    target='_blank'
                    rel='noreferrer noopener'
                  >
                    <svg
                      xmlns='https://www.w3.org/2000/svg'
                      viewBox='0 0 175.216 175.552'
                      className='w-9 mx-2.5'
                    >
                      <defs>
                        <linearGradient
                          id='b'
                          x1='85.915'
                          x2='86.535'
                          y1='32.567'
                          y2='137.092'
                          gradientUnits='userSpaceOnUse'
                        >
                          <stop offset='0' stopColor='#57d163' />
                          <stop offset='1' stopColor='#23b33a' />
                        </linearGradient>
                        <filter
                          id='a'
                          width='1.115'
                          height='1.114'
                          x='-.057'
                          y='-.057'
                          colorInterpolationFilters='sRGB'
                        >
                          <feGaussianBlur stdDeviation='3.531' />
                        </filter>
                      </defs>
                      <path
                        fill='#b3b3b3'
                        d='m54.532 138.45 2.235 1.324c9.387 5.571 20.15 8.518 31.126 8.523h.023c33.707 0 61.139-27.426 61.153-61.135.006-16.335-6.349-31.696-17.895-43.251A60.75 60.75 0 0 0 87.94 25.983c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.312-6.179 22.558zm-40.811 23.544L24.16 123.88c-6.438-11.154-9.825-23.808-9.821-36.772.017-40.556 33.021-73.55 73.578-73.55 19.681.01 38.154 7.669 52.047 21.572s21.537 32.383 21.53 52.037c-.018 40.553-33.027 73.553-73.578 73.553h-.032c-12.313-.005-24.412-3.094-35.159-8.954zm0 0'
                        filter='url(#a)'
                      />
                      <path
                        fill='#fff'
                        d='m12.966 161.238 10.439-38.114a73.42 73.42 0 0 1-9.821-36.772c.017-40.556 33.021-73.55 73.578-73.55 19.681.01 38.154 7.669 52.047 21.572s21.537 32.383 21.53 52.037c-.018 40.553-33.027 73.553-73.578 73.553h-.032c-12.313-.005-24.412-3.094-35.159-8.954z'
                      />
                      <path
                        fill='url(#linearGradient1780)'
                        d='M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.312-6.179 22.559 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.518 31.126 8.524h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.929z'
                      />
                      <path
                        fill='url(#b)'
                        d='M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.313-6.179 22.558 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.517 31.126 8.523h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.928z'
                      />
                      <path
                        fill='#fff'
                        fillRule='evenodd'
                        d='M68.772 55.603c-1.378-3.061-2.828-3.123-4.137-3.176l-3.524-.043c-1.226 0-3.218.46-4.902 2.3s-6.435 6.287-6.435 15.332 6.588 17.785 7.506 19.013 12.718 20.381 31.405 27.75c15.529 6.124 18.689 4.906 22.061 4.6s10.877-4.447 12.408-8.74 1.532-7.971 1.073-8.74-1.685-1.226-3.525-2.146-10.877-5.367-12.562-5.981-2.91-.919-4.137.921-4.746 5.979-5.819 7.206-2.144 1.381-3.984.462-7.76-2.861-14.784-9.124c-5.465-4.873-9.154-10.891-10.228-12.73s-.114-2.835.808-3.751c.825-.824 1.838-2.147 2.759-3.22s1.224-1.84 1.836-3.065.307-2.301-.153-3.22-4.032-10.011-5.666-13.647'
                      />
                    </svg>
                    <span className='mr-6'>+49 1590 2465256</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className='col-span-12 md:col-span-6 xl:col-span-3 space-y-6'>
              <h4 className='text-2xl font-semibold'>Newsletter</h4>
              <p className='text-neutral-600 dark:text-neutral-400'>
                Subscribe our newsletter to get our latest update & news
              </p>
              <SubscribeForm />
            </div>
          </div>
        </div>
        <div className='py-8 border-t border-neutral-200 dark:border-neutral-700'>
          <div className='grid grid-cols-12 gap-4 text-sm'>
            <div className='col-span-12 lg:col-span-6'>
              <p className='text-center lg:text-start text-neutral-500 dark:text-neutral-400'>
                Copyright &copy; {new Date().getFullYear()} WeltCar
              </p>
            </div>
            <div className='col-span-12 lg:col-span-6'>
              <ul className='flex items-center flex-wrap gap-6 justify-center lg:justify-end'>
                <li>
                  <Link
                    href='/privacy-policy'
                    className='text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href='/legal-notice'
                    className='text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                  >
                    Legal Notice
                  </Link>
                </li>
                <li>
                  <Link
                    href='/cookie-policy'
                    className='text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
