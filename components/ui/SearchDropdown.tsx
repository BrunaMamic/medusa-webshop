import React, { useState } from 'react';
import * as Dropdown from '@radix-ui/react-dropdown-menu';
import { Input } from '../Input';
import classNames from '@/utils/classNames';
import { Icon } from './Icon';
import { useRouter } from 'next/router';
import { useProducts } from 'medusa-react';

function SearchDropdown({ colorScheme, isSearchOpen, setIsSearchOpen }: any) {
  const [selectedValue, setSelectedValue] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const { products, isLoading } = useProducts();

  console.log(searchTerm, !!searchTerm);

  const handleValueSelect = (value: any) => {
    setSelectedValue(value);
    setSearchTerm(value);
  };

  const handleSearchButtonClick = () => {
    router.push({
      pathname: '/search',
      query: { title: searchTerm },
    });
  };

  const filteredItems = products
    ?.filter((product: any) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map((product) => product.title);

  return (
    <div className="relative flex">
      <Input
        placeholder="Search"
        className={classNames(
          'rounded-sm !pl-13 !pr-9 transition-all md:!py-4 md:placeholder-shown:!py-4 lg:!py-4 lg:placeholder-shown:!py-4',
          colorScheme === 'inverted' && 'text-white'
        )}
        wrapperClassName={classNames(
          'w-0 overflow-hidden transition-width',
          isSearchOpen && 'xl:w-84 w-50'
        )}
        label={''}
        value={searchTerm}
        onInput={(e: any) => setSearchTerm(e.target.value)}
      />
      <Dropdown.Root open={!!searchTerm} modal={false}>
        <Dropdown.Trigger/>
        {searchTerm && filteredItems!.length > 0 && (
          <Dropdown.Content className="dropdown-content w-56.5">
            {filteredItems?.map((item, index) => (
              <Dropdown.Item
                key={index}
                className="dropdown-item font-black italic text-primary hover:bg-transparent"
                onSelect={() => handleValueSelect(item)}
              >
                {item}
              </Dropdown.Item>
            ))}
          </Dropdown.Content>
        )}
      </Dropdown.Root>

      <button
        className={classNames(
          'absolute right-4 top-4 transition-opacity',
          isSearchOpen && 'opacity-0'
        )}
        onClick={() => setIsSearchOpen(true)}
      >
        <Icon name="search" />
      </button>
      <button
        className={classNames(
          'pointer-events-none absolute right-4 top-4 opacity-0 transition-opacity',
          isSearchOpen && 'pointer-events-auto opacity-100'
        )}
        onClick={() => setIsSearchOpen(false)}
      >
        <Icon name="x" />
      </button>

      <button
        className={classNames(
          'pointer-events-none absolute left-4 top-4 z-10 opacity-0 transition-opacity delay-75 xl:delay-100',
          isSearchOpen && 'pointer-events-auto opacity-100'
        )}
        onClick={handleSearchButtonClick}
      >
        <Icon name="search" className="w-5" />
      </button>
    </div>
  );
}

export default SearchDropdown;
