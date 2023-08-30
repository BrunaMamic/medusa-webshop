import { useStore } from '@/lib/context/store-context';
import classNames from '@/utils/classNames';
import * as Dropdown from '@radix-ui/react-dropdown-menu';

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
  const {cart} = useStore()
  console.log(cart?.region);
  
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
            {selectedValue?.id.toUpperCase() ?? defaultValue?.id.toUpperCase()}
          </span>
          <span className="pl-2">
            {selectedValue?.currency.toUpperCase() ??
              defaultValue?.currency.toUpperCase()}
          </span>
        </button>
      </Dropdown.Trigger>

      <Dropdown.Content
        className="dropdown-content w-56.5"
        sideOffset={10}
        align="end"
      >
        {cart?.region?.countries.map((country:any) => (
          <Dropdown.Item
            key={country.id}
            className="dropdown-item font-black italic text-primary hover:bg-transparent"
            id={country.id}
          >
            {country.display_name}
          </Dropdown.Item>
        ))}
        {/* <Dropdown.Item
          className="dropdown-item font-black italic text-primary hover:bg-transparent"
          id="hr"
        >
          Croatia
        </Dropdown.Item>
        <Dropdown.Item className="dropdown-item hover:bg-transparent" id="de">
          Germany
        </Dropdown.Item>
        <Dropdown.Item className="dropdown-item hover:bg-transparent" id="dk">
          Denmark
        </Dropdown.Item>
        <Dropdown.Item className="dropdown-item hover:bg-transparent" id="at">
          Austria
        </Dropdown.Item>
        <Dropdown.Item className="dropdown-item hover:bg-transparent" id="nl">
          Netherlands
        </Dropdown.Item> */}
      </Dropdown.Content>
    </Dropdown.Root>
  );
};