import * as React from 'react';
import * as Dropdown from '@radix-ui/react-dropdown-menu';
import classNames from '@/utils/classNames';
import { baseClasses, labelBaseClasses } from '@/components/Input';
import { Icon } from '@/components/ui/Icon';

export interface SelectCountryProps {
  errorMessage?: string;
  disabled?: boolean;
}

export const SelectCountry: React.FC<SelectCountryProps> = ({
  errorMessage,
  disabled,
}) => {
  return (
    <div className="dropdown-full-width">
      <Dropdown.Root>
        <Dropdown.Trigger asChild disabled={disabled}>
          <button className="dropdown-trigger w-full">
            <div className="relative z-20 w-full">
              <div
                className={classNames(
                  'relative cursor-pointer !pb-1.5 !pt-4.5 text-start lg:!pb-3 lg:!pt-7',
                  { '!border-red-700': Boolean(errorMessage) },
                  baseClasses
                )}
              >
                Croatia
              </div>

              <span
                className={classNames(
                  'left-2.5 top-1 lg:left-4.5 lg:top-3',
                  { 'text-gray-200': disabled },
                  labelBaseClasses
                )}
              >
                Country
              </span>

              <Icon
                name="chevron-down"
                className="pointer-events-none absolute right-4 top-3 transition-all lg:top-5"
              />
            </div>
          </button>
        </Dropdown.Trigger>

        <Dropdown.Content
          className="dropdown-content relative"
          sideOffset={0}
          align="end"
        >
          <Dropdown.Item className="dropdown-item font-black italic text-primary">
            Croatia
          </Dropdown.Item>
          <Dropdown.Item className="dropdown-item">Germany</Dropdown.Item>
          <Dropdown.Item className="dropdown-item">Denmark</Dropdown.Item>
          <Dropdown.Item className="dropdown-item">Austria</Dropdown.Item>
          <Dropdown.Item className="dropdown-item">Netherlands</Dropdown.Item>
        </Dropdown.Content>
      </Dropdown.Root>

      {Boolean(errorMessage) && (
        <span className="pt-2 text-xs2 text-red-700">{errorMessage}</span>
      )}
    </div>
  );
};
