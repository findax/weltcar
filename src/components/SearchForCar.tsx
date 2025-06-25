'use client';

import { CarBrand, CarModel } from '@/api';
import { ButtonPrimary } from '@/shared/Buttons';
import Combobox from '@/shared/Combobox';
import { NextRoute } from '@/types/routers';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
interface SearchForCarProps {
  carBrands: CarBrand[];
}

const SearchForCar = ({ carBrands }: SearchForCarProps) => {
  const translate = useTranslations('welcome');
  const locale = useLocale();
  const [selectedMark, setSelectedMark] = useState<CarBrand | null>(null);
  const [selectedModel, setSelectedModel] = useState<CarModel | null>(null);

  const searchParams = new URLSearchParams();

  if (selectedMark?.id) {
    searchParams.set('brands', selectedMark.id.toString());
  }

  if (selectedModel?.id) {
    searchParams.set('models', selectedModel.id.toString());
  }

  const href = `/${locale}/catalog?${searchParams}` as NextRoute;

  const handleMarkChange = (mark: CarBrand) => {
    setSelectedMark(mark);
    setSelectedModel(null);
  };

  return (
    <div className='w-full flex max-md:flex-wrap lg:flex-wrap gap-x-8 gap-y-4 '>
      <div className='w-full flex max-xs:flex-wrap  lg:flex-wrap gap-4'>
        <Combobox
          placeholder={translate('select.brand')}
          options={carBrands}
          value={selectedMark}
          onChange={handleMarkChange}
          getOptionKey={(val) => val.id}
          getOptionLabel={(val) => val.name}
        />
        <Combobox
          placeholder={translate('select.model')}
          options={selectedMark?.models || []}
          value={selectedModel}
          onChange={setSelectedModel}
          getOptionKey={(val) => val.id}
          getOptionLabel={(val) => val.name}
          disabled={!selectedMark?.models?.length}
        />
      </div>

      <ButtonPrimary
        className='w-full sm:w-fit rounded-lg whitespace-nowrap'
        href={href}
      >
        {translate('button.startSearch')}
      </ButtonPrimary>
    </div>
  );
};

export default SearchForCar;
