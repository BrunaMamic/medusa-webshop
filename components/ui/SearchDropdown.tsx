import React, { useEffect, useState } from 'react';
import * as Dropdown from '@radix-ui/react-dropdown-menu';
import { Input } from '../Input';
import classNames from '@/utils/classNames';
import { Icon } from './Icon';
import { useRouter } from 'next/router';
import Medusa from '@medusajs/medusa-js';
import { useProducts } from 'medusa-react';
import { MEDUSA_BACKEND_URL } from '@/lib/config';
import { medusaClient } from '@/lib/config';

function SearchDropdown({ colorScheme, isSearchOpen, setIsSearchOpen }: any) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState<string[]>([]);
  const router = useRouter();
  const { products, isLoading } = useProducts();

  const handleValueSelect = (value: any) => {
    const handle = (products || []).find(
      (product: any) => product.title === value
    )?.handle;
    if (handle) {
      router.push(`/product/${handle}`);
      setSearchTerm('');
      setIsSearchOpen(false);
    }
  };

  const handleSearchButtonClick = () => {
    router.push({
      pathname: '/search',
      query: { title: searchTerm },
    });
    setSearchTerm('');
    setIsSearchOpen(false);
  };

  const fetchMedusaSearchResults = async (term: string) => {
    try {
      const response = await medusaClient.products.search({
        q: term,
      });
      console.log(response);

      return response.hits;
    } catch (error) {
      console.error('Error', error);
      return [];
    }
  };

  useEffect(() => {
    if (searchTerm.length > 0) {
      const debounceTimeout = setTimeout(() => {
        fetchMedusaSearchResults(searchTerm)
          .then((medusaResults) => {
            setFilteredItems(() => {
              return (medusaResults || []).map(
                (product: any) => product.title || ''
              );
            });
          })
          .catch((error) => {
            console.error('Error', error);
          });
      }, 500);

      return () => clearTimeout(debounceTimeout);
    } else {
      setFilteredItems([]);
    }
  }, [searchTerm]);

  return (
    <div className="relative flex">
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
          'transtion-opacity pointer-events-none absolute left-4 top-4 z-10 opacity-0 delay-75 xl:delay-100',
          isSearchOpen && 'pointer-events-auto opacity-100'
        )}
      >
        <Icon name="search" className="w-5" />
      </button>
      <div className="dropdown-full-width">
        <Dropdown.Root open={isSearchOpen} modal={false}>
          <Dropdown.Trigger>
            <Input
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearchButtonClick();
                }
              }}
            
              placeholder="Search"
              className={classNames(
                'rounded-sm !pl-13 !pr-9 transition-all md:!py-4 md:placeholder-shown:!py-4 lg:!py-4 lg:placeholder-shown:!py-4',
                colorScheme === 'inverted' && 'text-white'
              )}
              wrapperClassName={classNames(
                'w-0 overflow-hidden transition-width',
                isSearchOpen && 'xl:w-84 w-50'
              )}
            />
          </Dropdown.Trigger>
          <Dropdown.Content
            className="dropdown-content dropdown-content-search"
            sideOffset={0}
            align="end"
          >
            {filteredItems.map((item, index) => (
              <Dropdown.Item
                key={index}
                className="dropdown-item font-black italic text-primary hover:bg-transparent"
                onSelect={() => handleValueSelect(item)}
              >
                {item}
              </Dropdown.Item>
            ))}
          </Dropdown.Content>
        </Dropdown.Root>
      </div>
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
