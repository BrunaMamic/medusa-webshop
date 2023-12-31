
import { useStore } from '@/lib/context/store-context';
import classNames from '@/utils/classNames';
import * as Dropdown from '@radix-ui/react-dropdown-menu';
import { useCart, useRegions } from 'medusa-react';
import { useEffect, useState } from 'react';

export interface RegionPickerProps extends React.PropsWithChildren {
  className?: string;
  colorScheme?: string;
  defaultValue?: { id: string; currency: string };
  selectedValue?: { id: string; currency: string };
}

export const RegionPicker: React.FC<RegionPickerProps> = ({
  className,
  colorScheme,
  defaultValue,
  selectedValue,
}) => {
  const { cart, setRegion, resetCart } = useStore();
  const {createCart, updateCart} = useCart()
  const regions = useRegions();
  const allCountries = regions.regions?.flatMap((region) => region.countries);

  const [selectedRegion, setSelectedRegion] = useState<string>(
    selectedValue?.id ?? defaultValue?.id ?? ''
  );

  const [selectedCountryName, setSelectedCountryName] = useState<string>(
    allCountries?.[0]?.iso_2 ?? ''
  );
  useEffect(() => {
    const region = localStorage.getItem('medusa_region');

    if (region) {
      const { countryCode } = JSON.parse(region);
      setSelectedCountryName(countryCode);
    } else {
      setSelectedCountryName(allCountries?.[0]?.iso_2 ?? '');
    }
  }, [regions]);

  return (
    <Dropdown.Root>
      <Dropdown.Trigger asChild>
        <button className="flex uppercase focus-visible:outline-none">
          <span
            className={classNames(
              'border-r-[0.0938rem] border-gray-900 pr-[0.5625rem]',
              { 'border-white': colorScheme === 'inverted' },
              className
            )}
          >
            {selectedCountryName ?? defaultValue?.id}
          </span>
          <span className="pl-2">
            {cart?.region?.currency_code.toUpperCase() ??
              defaultValue?.currency.toUpperCase()}
          </span>
        </button>
      </Dropdown.Trigger>

      <Dropdown.Content
        className="dropdown-content w-56.5"
        sideOffset={10}
        align="end"
      >
        {allCountries?.map((country: any) => (
          <Dropdown.Item
            key={country.id}
            className="dropdown-item font-black italic text-primary hover:bg-transparent"
            id={country.id}
            onClick={() => {
              setSelectedRegion(country.id);
              setRegion(country.region_id, country.iso_2);
              setSelectedCountryName(country.iso_2);
            }}
          >
            {country.display_name}
          </Dropdown.Item>
        ))}
      </Dropdown.Content>
    </Dropdown.Root>
  );
};