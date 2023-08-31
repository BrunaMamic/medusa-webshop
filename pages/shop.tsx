import * as React from 'react';
import * as Dropdown from '@radix-ui/react-dropdown-menu';

import type { NextPageWithLayout } from '@/pages/_app';
import DefaultLayout from '@/layouts/DefaultLayout';
import { Heading } from '@/components/ui/Heading';
import { Product } from '@/components/Product';
import { Icon } from '@/components/ui/Icon';

import { useEffect } from "react";
import { useCart, useProducts } from "medusa-react";
import Link from 'next/link';
import _ from 'lodash';

const sortingOptions = [
  'Whatever',
  'Newest',
  'Lowest price',
  'Highest price',
  'Discount',
];

const sortingFunctions = {
  'Newest': (items: any) => {
    return _.orderBy(items, 'createdAt', 'desc');
  },
  'Lowest price': (items: any) => {
    return _.orderBy(items, (item) => {
      const prices = item.variants.map((variant: any) => variant.prices[0]?.amount);
      return Math.min(...prices);
    });
  },
  'Highest price': (items: any) => {
    return _.orderBy(items, (item) => {
      const prices = item.variants.map((variant: any) => variant.prices[0]?.amount);
      return Math.max(...prices);
    });
  },
  'Discount': (items: any) => {
    return _.orderBy(items, (item) => {
      if (item.discount && item.variants[0]?.prices[0]?.amount) {
        const discountPercentage = (item.discount / item.variants[0]?.prices[0]?.amount) * 100;
        return -discountPercentage; // Use negative to sort in descending order
      }
      return 0;
    });
  },
  'Whatever': (items: any) => {
    return items; // Default sorting logic
  },
};

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
        {/* <Dropdown.Item className="dropdown-item font-black italic text-primary">
          Whatever
        </Dropdown.Item>
        <Dropdown.Item className="dropdown-item">Newest</Dropdown.Item>
        <Dropdown.Item className="dropdown-item">Lowest price</Dropdown.Item>
        <Dropdown.Item className="dropdown-item">Highest price</Dropdown.Item>
        <Dropdown.Item className="dropdown-item">Discount</Dropdown.Item> */}
      </Dropdown.Content>
    </Dropdown.Root>
  );
};

const ShopPage: NextPageWithLayout = () => {
  const { products, isLoading } = useProducts();
  console.log("Products:", products);
  const {cart} = useCart()

  const [selectedFilter, setSelectedFilter] = React.useState('Whatever');

  // const priceEur = cart?.region?.currency_code === 'eur' ? 1 : 1
  // const priceUsd = cart?.region?.currency_code === 'usd' ? 1 : 0
  // console.log(priceEur);
  
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
          
        {products?.map((product: any) => (
          <Product
            key={product.id}
            className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"
            title={product.title}
            priceEur={product.variants[0].prices[0].amount}
            priceUsd={product.variants[0].prices[1].amount}
            discount={product.discount}
            discountedPrice={product.discountedPrice}
            collection={product.collection?.handle}
            src={product.images[0]?.url}
            height={3200}
            width={2400}
            alt={product.title}
            linkTo={`/product/${product.handle}`}
            />
        ))}
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
