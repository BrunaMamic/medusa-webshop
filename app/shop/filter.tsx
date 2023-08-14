'use client';

import * as Dropdown from '@radix-ui/react-dropdown-menu';
import { Icon } from '@/components/ui/Icon';

export const ShopFilter = () => {
  return (
    <Dropdown.Root>
      <Dropdown.Trigger asChild>
        <button className="dropdown-trigger text-gray-300 transition-all hover:text-black">
          <div className="flex text-sm">
            <p>Sort by:</p>

            <Icon
              name="chevron-down"
              className="ml-2 transition-all [&>path]:stroke-gray-300"
            />
          </div>

          <p className="text-sm font-black italic">Whatever</p>
        </button>
      </Dropdown.Trigger>

      <Dropdown.Content
        className="dropdown-content w-56.5"
        sideOffset={24}
        align="end"
      >
        <Dropdown.Item className="dropdown-item font-black italic text-primary">
          Whatever
        </Dropdown.Item>
        <Dropdown.Item className="dropdown-item">Newest</Dropdown.Item>
        <Dropdown.Item className="dropdown-item">Lowest price</Dropdown.Item>
        <Dropdown.Item className="dropdown-item">Highest price</Dropdown.Item>
        <Dropdown.Item className="dropdown-item">Discount</Dropdown.Item>
      </Dropdown.Content>
    </Dropdown.Root>
  );
};
