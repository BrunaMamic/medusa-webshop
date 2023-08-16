import * as React from 'react';
import * as Dropdown from '@radix-ui/react-dropdown-menu';

import type { NextPageWithLayout } from '@/pages/_app';
import DefaultLayout from '@/layouts/DefaultLayout';
import { Heading } from '@/components/ui/Heading';
import { Product } from '@/components/Product';
import { Icon } from '@/components/ui/Icon';

import { useEffect } from "react";
import { useProducts } from "medusa-react";
import Link from 'next/link';

const ShopFilter = () => {
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

const ShopPage: NextPageWithLayout = () => {
  const { products, isLoading } = useProducts();

  // useEffect(() => {
  //   console.log("Products:", products);
  // }, [products]);

  console.log("Products:", products);

  return (
    <>
      <main className="px-4 py-10 lg:px-24 lg:pb-39.5 lg:pt-17">
        <div className="relative mb-10 flex items-center justify-between lg:mb-19">
          <Heading size="xl6" className="text-primary">
            Shop
          </Heading>

          <ShopFilter />
        </div>

        <div className="grid grid-cols-12 gap-y-8 md:gap-x-12">
          
          {products?.map((product:any) => (
            <Product
              key={product.id}
              className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"
              title={product.title}
              price={product.price}
              discount={product.discount}
              discountedPrice={product.discountedPrice}
              collection={product.collection?.handle}
              src={product.images[0]?.url}
              height={3200}
              width={2400}
              alt={product.title}
              linkTo={`/product/${product.id}`}
            />
          ))}
        </div>

        {/* <div className="grid grid-cols-12 gap-y-8 md:gap-x-12">
          <Product
            className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"
            title="Black Sweatshirt"
            price={30}
            collection="fresh"
            src="/images/content/item-fresh-bag-white.png"
            height={3200}
            width={2400}
            alt="Black sweatshirt"
            linkTo="/product/black-sweatshirt"
          />

          <Product
            className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"
            title="Black Sweatshirt"
            discount={50}
            price={30}
            discountedPrice={15}
            collection="matz"
            src="/images/content/item-fresh-bag-white.png"
            height={3200}
            width={2400}
            alt="Black sweatshirt"
            linkTo="/product/black-sweatshirt"
          />

          <Product
            className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"
            title="Black Sweatshirt"
            discount={50}
            price={30}
            discountedPrice={15}
            collection="base"
            src="/images/content/item-fresh-bag-white.png"
            height={3200}
            width={2400}
            alt="Black sweatshirt"
            linkTo="/product/black-sweatshirt"
          />

          <Product
            className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"
            title="Black Sweatshirt"
            discount={50}
            price={30}
            discountedPrice={15}
            collection="fresh"
            src="/images/content/item-fresh-bag-white.png"
            height={3200}
            width={2400}
            alt="Black sweatshirt"
            linkTo="/product/black-sweatshirt"
          />
        </div> */}

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
