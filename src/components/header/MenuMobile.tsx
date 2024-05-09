import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { Disclosure } from '@headlessui/react';
import { NavItemType } from '@/shared/Navigation/NavigationItem';
import Logo from '@/shared/Logo';
import { ButtonPrimary, ButtonClose } from '@/shared/Buttons';
import SocialsList from '@/shared/SocialsList';
import SwitchDarkMode from './SwitchDarkMode';
import SideMenuWrapper from '@/shared/SideMenuWrapper';
import { NAVIGATION_DEMO } from '@/data/navigation';

interface MenuMobileProps {
  className?: string;
  iconClassName?: string;
  data?: NavItemType[];
}
const MenuMobile = ({
  className = '',
  iconClassName = 'h-8 w-8',
  data = NAVIGATION_DEMO,
}: MenuMobileProps) => {
  const [isVisable, setIsVisable] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsVisable(false);
  }, [pathname]);

  const handleOpenMenu = () => setIsVisable(true);
  const handleCloseMenu = () => setIsVisable(false);

  return (
    <>
      <button
        onClick={handleOpenMenu}
        className={`self-center ml-1 focus:outline-none w-10 h-10 lg:hidden text-neutral-700 dark:text-neutral-300 ${className}`}
      >
        <Bars3Icon className={iconClassName} />
      </button>

      <SideMenuWrapper handleCloseMenu={handleCloseMenu} isVisable={isVisable}>
        <div className='overflow-y-auto w-full h-screen py-2 transition transform shadow-lg ring-1 dark:ring-neutral-700 bg-white dark:bg-neutral-900 divide-y-2 divide-neutral-100 dark:divide-neutral-800'>
          <div className='py-6 px-5'>
            <Logo />
            <div className='flex flex-col mt-5 text-neutral-700 dark:text-neutral-300 text-sm'>
              <span>
                Discover the most outstanding articles on all topics of life.
                Write your stories and share them
              </span>

              <div className='flex justify-between items-center mt-4'>
                <SocialsList itemClass='w-9 h-9 flex items-center justify-center rounded-full bg-neutral-100 text-xl dark:bg-neutral-800 dark:text-neutral-300' />
                <span className='block'>
                  <SwitchDarkMode className='bg-neutral-100 dark:bg-neutral-800' />
                </span>
              </div>
            </div>
            <span className='absolute right-2 top-2 p-1'>
              <ButtonClose onClick={handleCloseMenu} />
            </span>
          </div>
          <ul className='flex flex-col py-6 px-2 space-y-1'>
            {data.map((item, index) => (
              <Disclosure
                key={item.id}
                as='li'
                className='text-neutral-900 dark:text-white'
              >
                {item.children ? (
                  <>
                    <div
                      className='flex w-full px-4 font-medium uppercase tracking-wide text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg'
                      onClick={(e) => e.preventDefault()}
                    >
                      <span className='py-2.5 pr-3'>{item.name}</span>
                      <span className='flex-1 flex'>
                        <Disclosure.Button
                          as='span'
                          className='py-2.5 flex items-center justify-end flex-1 '
                        >
                          <ChevronDownIcon
                            className='ml-2 h-4 w-4 text-neutral-500'
                            aria-hidden='true'
                          />
                        </Disclosure.Button>
                      </span>
                    </div>
                    <Disclosure.Panel>
                      <ul className='nav-mobile-sub-menu pl-6 pb-1 text-base'>
                        {item.children?.map((i, index) => (
                          <Disclosure key={i.href + index} as='li'>
                            <Link
                              href={{
                                pathname: i.href || undefined,
                              }}
                              className='flex px-4 text-neutral-900 dark:text-neutral-200 text-sm font-medium rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 mt-0.5'
                            >
                              <span
                                className={`py-2.5 pr-3 ${!i.children ? 'block w-full' : ''}`}
                              >
                                {i.name}
                              </span>
                              {i.children && (
                                <span
                                  className='flex-1 flex'
                                  onClick={(e) => e.preventDefault()}
                                >
                                  <Disclosure.Button
                                    as='span'
                                    className='py-2.5 flex justify-end flex-1'
                                  >
                                    <ChevronDownIcon
                                      className='ml-2 h-4 w-4 text-neutral-500'
                                      aria-hidden='true'
                                    />
                                  </Disclosure.Button>
                                </span>
                              )}
                            </Link>
                          </Disclosure>
                        ))}
                      </ul>
                    </Disclosure.Panel>
                  </>
                ) : (
                  <Link
                    rel='noopener noreferrer'
                    className='flex w-full px-4 font-medium uppercase tracking-wide text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg'
                    href={item.href || '/'}
                  >
                    <span className='py-2.5 pr-3 block w-full'>
                      {item.name}
                    </span>
                  </Link>
                )}
              </Disclosure>
            ))}
          </ul>
          {/* <div className='flex items-center justify-between py-6 px-5'>
        <a
          className='inline-block'
          href='https://themeforest.net/item/chisfis-online-booking-nextjs-template/43399526'
          target='_blank'
          rel='noopener noreferrer'
        >
          <ButtonPrimary>Get Template</ButtonPrimary>
        </a>

        <LangDropdown
          className='flex'
          panelClassName='z-10 w-screen max-w-[280px] px-4 mb-3 right-3 bottom-full sm:px-0'
        />
      </div> */}
        </div>
      </SideMenuWrapper>
    </>
  );
};

export default MenuMobile;
