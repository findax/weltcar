'use client';

import { Fragment, useRef, useState } from 'react';
import { Combobox as HeadlessCombobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

type ComboboxProps<T> = {
  options: T[];
  value: T | null;
  onChange: (value: T) => void;
  getOptionLabel: (option: T) => string;
  getOptionKey?: (option: T) => string | number;
  placeholder?: string;
  noResultsText?: string;
  disabled?: boolean;
};

function Combobox<T>({
  options,
  value,
  onChange,
  getOptionLabel,
  getOptionKey = (opt) => String(opt),
  placeholder = 'Select...',
  noResultsText = 'Nothing found.',
  disabled = false,
}: ComboboxProps<T>) {
  const [query, setQuery] = useState('');

  const buttonRef = useRef<HTMLButtonElement>(null);

  const filteredOptions =
    query === ''
      ? options
      : options.filter((opt) =>
          getOptionLabel(opt)
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  return (
    <HeadlessCombobox value={value} onChange={onChange} disabled={disabled}>
      {({ open }) => (
        <div className='relative w-full'>
          <div
            className={`relative w-full cursor-default overflow-hidden rounded-full bg-white dark:bg-neutral-1150 border border-neutral-200 dark:border-neutral-1100 text-left shadow-md sm:text-sm
          ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-100' : 'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300'}
        `}
          >
            <HeadlessCombobox.Input
              className='w-full border-none py-2 pl-7 pr-10 text-sm leading-5 text-gray-900 dark:text-neutral-200 placeholder:text-neutral-500 focus:ring-0 bg-transparent h-[52px]'
              displayValue={(item: T) => (item ? getOptionLabel(item) : '')}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={placeholder}
              onClick={() => {
                if (buttonRef.current && !open) {
                  buttonRef.current.click();
                }
              }}
            />
            <HeadlessCombobox.Button
              ref={buttonRef}
              className='absolute inset-y-0 right-0 flex items-center pr-3'
            >
              <span className='text-gray-400 text-sm'>
                {open ? (
                  <ChevronUpIcon className='h-5 w-5' />
                ) : (
                  <ChevronDownIcon className='h-5 w-5' />
                )}
              </span>
            </HeadlessCombobox.Button>
          </div>
          {!disabled && (
            <Transition
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
              afterLeave={() => setQuery('')}
            >
              <HeadlessCombobox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto bg-white dark:bg-neutral-1150 border border-neutral-200 dark:border-neutral-1100 rounded-2xl py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm'>
                {filteredOptions.length === 0 && query !== '' ? (
                  <div className='relative cursor-default select-none px-4 py-2 dark:text-black dark:bg-neutral-1100 bg-neutral-100'>
                    {noResultsText}
                  </div>
                ) : (
                  filteredOptions.map((option) => (
                    <HeadlessCombobox.Option
                      key={getOptionKey(option)}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? 'dark:text-black dark:bg-neutral-1100 bg-neutral-100'
                            : ''
                        }`
                      }
                      value={option}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            {getOptionLabel(option)}
                          </span>
                          {selected && (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active
                                  ? 'dark:text-white text-black'
                                  : 'text-teal-600'
                              }`}
                            >
                              <CheckIcon
                                className='h-5 w-5'
                                aria-hidden='true'
                              />
                            </span>
                          )}
                        </>
                      )}
                    </HeadlessCombobox.Option>
                  ))
                )}
              </HeadlessCombobox.Options>
            </Transition>
          )}
        </div>
      )}
    </HeadlessCombobox>
  );
}

export default Combobox;
