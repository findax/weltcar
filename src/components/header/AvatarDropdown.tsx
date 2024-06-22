import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Avatar from '@/shared/Avatar';
import SwitchDarkMode2 from '@/shared/SwitchDarkMode2';
import Link from 'next/link';
import {
  UserIcon,
  ClipboardDocumentListIcon,
  HeartIcon,
  LightBulbIcon,
  LifebuoyIcon,
  ArrowLeftStartOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { logout } from '@/api/auth';
import { useUserStore } from '@/stores/user-store';

export default function AvatarDropdown({
  className = '',
}: {
  className?: string;
}) {
  const user = useUserStore((state) => state.user);

  return (
    <Menu as='div' className={`AvatarDropdown relative flex ${className}`}>
      {({ open, close }) => (
        <>
          <Menu.Button
            className={`self-center w-10 h-10 md:w-12 md:h-12 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none flex items-center justify-center`}
          >
            <Avatar
              containerClassName='flex-col'
              sizeClass='w-8 h-8 sm:w-9 sm:h-9'
              userName={user?.name}
            />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter='transition ease-out duration-200'
            enterFrom='opacity-0 translate-y-1'
            enterTo='opacity-100 translate-y-0'
            leave='transition ease-in duration-150'
            leaveFrom='opacity-100 translate-y-0'
            leaveTo='opacity-0 translate-y-1'
          >
            <Menu.Items className='absolute z-10 w-screen max-w-[260px] px-4 top-full -right-10 sm:right-0 sm:px-0'>
              <div className='overflow-hidden rounded-2xl shadow-lg ring-1 ring-black ring-opacity-5'>
                <div className='relative grid grid-cols-1 gap-6 bg-white dark:bg-neutral-800 py-7 px-6'>
                  <div className='flex items-center space-x-3'>
                    <Avatar sizeClass='w-12 h-12' userName={user?.name} />

                    <div className='flex-grow overflow-hidden'>
                      <h4 className='font-semibold overflow-hidden text-ellipsis'>
                        {user?.name} {user?.surname}
                      </h4>
                      <p className='text-xs mt-0.5 text-ellipsis'>
                        {user?.city}
                      </p>
                    </div>
                  </div>

                  <div className='w-full border-b border-neutral-200 dark:border-neutral-700' />

                  {/* ------------------ 1 --------------------- */}
                  <Link
                    href={'/account'}
                    className='flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50'
                    onClick={close}
                  >
                    <div className='flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300'>
                      <UserIcon className='w-7' />
                    </div>
                    <div className='ml-4'>
                      <p className='font-medium'>My Account</p>
                    </div>
                  </Link>

                  <Link
                    href={'/orders'}
                    className='flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50'
                    onClick={close}
                  >
                    <div className='flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300'>
                      <ClipboardDocumentListIcon className='w-7' />
                    </div>
                    <div className='ml-4'>
                      <p className='font-medium'>My orders</p>
                    </div>
                  </Link>

                  {/* <Link
                    href={'/favorites'}
                    className='flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50'
                    onClick={close}
                  >
                    <div className='flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300'>
                      <HeartIcon className='w-7' />
                    </div>
                    <div className='ml-4'>
                      <p className='font-medium '>{'Wishlist'}</p>
                    </div>
                  </Link> */}

                  <div className='w-full border-b border-neutral-200 dark:border-neutral-700' />

                  {/* ------------------ 2 --------------------- */}
                  <div className='flex items-center justify-between p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50'>
                    <div className='flex items-center'>
                      <div className='flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300'>
                        <LightBulbIcon className='w-7' />
                      </div>
                      <div className='ml-4'>
                        <p className='font-medium'>Dark theme</p>
                      </div>
                    </div>
                    <SwitchDarkMode2 />
                  </div>

                  {/* <Link
                    href={'/contact'}
                    className='flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50'
                    onClick={close}
                  >
                    <div className='flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300'>
                      <LifebuoyIcon className='w-7' />
                    </div>
                    <div className='ml-4'>
                      <p className='font-medium'>Help</p>
                    </div>
                  </Link> */}

                  <button
                    type='button'
                    className='flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50'
                    onClick={() => logout()}
                  >
                    <div className='flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300'>
                      <ArrowLeftStartOnRectangleIcon className='w-7' />
                    </div>
                    <div className='ml-4'>
                      <p className='font-medium'>Log out</p>
                    </div>
                  </button>
                </div>
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}
