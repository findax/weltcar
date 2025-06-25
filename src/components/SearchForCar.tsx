'use client';

import { Button, ButtonPrimary } from '@/shared/Buttons';
import Combobox from '@/shared/Combobox';
import { useLocale } from 'next-intl';
import { useState } from 'react';

type CarMark = {
  id: string;
  name: string;
};

const marks: CarMark[] = [
  { id: '1', name: 'Audi' },
  { id: '2', name: 'BMW' },
  { id: '3', name: 'Mercedes Benz' },
];

type CarModel = {
  id: string;
  name: string;
};

const models: CarModel[] = [
  { id: '1', name: 'AA1' },
  { id: '2', name: 'SDSE 21' },
  { id: '3', name: 'Cllskd dds' },
];

interface IProps {
  translate: any;
}

const SearchForCar = ({ translate }: IProps) => {
  const locale = useLocale();
  const [selectedMark, setSelectedMark] = useState<CarMark | null>(null);
  const [selectedModel, setSelectedModel] = useState<CarModel | null>(null);

  const handleMarkChange = (mark: CarMark) => {
    setSelectedMark(mark);
    setSelectedModel(null);
  };

  return (
    <div className='w-full flex max-md:flex-wrap lg:flex-wrap gap-x-8 gap-y-4 '>
      <div className='w-full flex max-xs:flex-wrap  lg:flex-wrap gap-4'>
        <Combobox
          placeholder='Select Mark'
          options={marks}
          value={selectedMark}
          onChange={handleMarkChange}
          getOptionKey={(val) => val.id}
          getOptionLabel={(val) => val.name}
        />
        <Combobox
          placeholder='Select Model'
          options={models}
          value={selectedModel}
          onChange={setSelectedModel}
          getOptionKey={(val) => val.id}
          getOptionLabel={(val) => val.name}
          disabled={!selectedMark}
        />
      </div>

      <ButtonPrimary
        className='w-full sm:w-fit rounded-lg whitespace-nowrap'
        href={`/${locale}/catalog`}
      >
        {translate('welcome.button.startSearch')}
      </ButtonPrimary>
    </div>
  );
};

export default SearchForCar;
