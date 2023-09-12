import * as React from 'react';
import * as Dropdown from '@radix-ui/react-dropdown-menu';

import type { NextPageWithLayout } from '@/pages/_app';
import DefaultLayout from '@/layouts/DefaultLayout';
import { Heading } from '@/components/ui/Heading';
import { Product } from '@/components/Product';
import { Icon } from '@/components/ui/Icon';

import { useEffect, useState } from "react";
import { useCart, useProducts } from "medusa-react";
import _ from 'lodash';
import { getPriceByCurrency } from '@/utils/getPriceByCurrency';
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';

const sortingOptions = [
  'Whatever',
  'Newest',
  'Lowest price',
  'Highest price',
  'Discount',
];

const ShopFilter = ({
  selectedFilter,
  setSelectedFilter,
}: {
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
}) => {
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
          <p className="text-sm font-black italic">{selectedFilter}</p>
        </button>
      </Dropdown.Trigger>

      <Dropdown.Content
        className="dropdown-content w-56.5"
        sideOffset={24}
        align="end"
      >
        {sortingOptions.map((option) => (
          <Dropdown.Item
            key={option}
            className="dropdown-item font-black italic text-primary"
            onClick={() => setSelectedFilter(option)}
          >
            {option}
          </Dropdown.Item>
        ))}
      </Dropdown.Content>
    </Dropdown.Root>
  );
};

const ShopPage: NextPageWithLayout = () => {
  const { products, isLoading } = useProducts();
  const {cart} = useCart()
  const [selectedFilter, setSelectedFilter] = React.useState('Whatever');
  const [filteredProducts, setFilteredProducts] = React.useState(products);

  const applySorting = (filter: string) => {
    if (filter === 'Whatever') {
      setFilteredProducts([...(products || [])]);
    } else {
      const sortedProducts = [...(products || [])];
      sortedProducts.sort((a, b) => {
        switch (filter) {
          // case 'Newest':
          //   return b.created_at?.localeCompare(a.created_at);
          case 'Lowest price':
            return (
              a.variants[0]?.prices[0]?.amount - b.variants[0]?.prices[0]?.amount
            );
          case 'Highest price':
            return (
              b.variants[0]?.prices[0]?.amount - a.variants[0]?.prices[0]?.amount
            ); 
          case 'Discount':
            // const discountA = a.discount || 0;
            // const discountB = b.discount || 0;
            // return discountB - discountA;
          default:
            return 0; 
        }
      });
      setFilteredProducts(sortedProducts);
    }
  };

  useEffect(() => {
    applySorting(selectedFilter);
  }, [selectedFilter, products]);

  return (
    <>
      <main className="px-4 py-10 lg:px-24 lg:pb-39.5 lg:pt-17">
        <div className="relative mb-10 flex items-center justify-between lg:mb-19">
          <Heading size="xl6" className="text-primary">
            Shop
          </Heading>

          <ShopFilter selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}/>
        </div>

        <div className="grid grid-cols-12 gap-y-8 md:gap-x-12">
          
        {filteredProducts?.map((product: PricedProduct) => {
          if (!filteredProducts) {
            return null;
          }
          const calculatedPrice = getPriceByCurrency(
            product.variants[0].prices,
            cart?.region?.currency_code || '', 1
          );

            return (
              <Product
                key={product.id}
                className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"
                title={product.title || ""}
                calculatedPrice={calculatedPrice}
                src={product.images?.[0]?.url || ""}
                collection={product.collection?.handle || ""}
                height={3200}
                width={2400}
                alt={product.title || ""}
                linkTo={`/product/${product.handle}`}
              />
            );
          })}
        </div>

        <button className="relative mx-auto mt-9 block transition-all before:absolute before:bottom-0 before:left-0 before:w-full before:border-b before:border-gray-900 before:content-[''] hover:font-black hover:before:border-b-2">
          There is more
        </button>
      </main>
    </>
  );
};

ShopPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default ShopPage;
