import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import type { NextPageWithLayout } from '@/pages/_app';
import DefaultLayout from '@/layouts/DefaultLayout';
import { Tag } from '@/components/ui/Tag';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { QuantityInput } from '@/components/ui/QuantityInput';
import { Heading } from '@/components/ui/Heading';
import { useCart as MedusaCart,  } from 'medusa-react';

import { useStore  } from '@/lib/context/store-context';

import _ from 'lodash';


const CartPage: NextPageWithLayout = () => {
  
  const { cart } = MedusaCart();
  const store = useStore();

    const updateItem = async (lineId:string, quantity:number) => {
    await store.updateItem({
      lineId,
      quantity,
    });
  };
  

  const deleteItem = (lineId: string) => {
    store.deleteItem(lineId);
  };

  const sortedCartItems = _.orderBy(cart?.items, 'variant.title', 'asc');


  return (
    <div className="grid grid-cols-12 lg:gap-x-12">
      <div className="col-span-12 lg:col-span-8 xl:col-span-9">
        <Heading className="mb-8 text-primary lg:mb-13.5" size="xl4">
          Your shopping bag ({cart?.items.length!})
        </Heading>
        <ul className="[&>li:first-child]:border-t [&>li:last-child]:border-0 [&>li:last-child]:pb-0 [&>li]:border-b [&>li]:border-gray-200 [&>li]:py-8">
          <li>
            <div className="group relative flex flex-col items-center justify-between">
              {sortedCartItems.map((item: any, index: any) => (
                <div className="m-4 flex w-full flex-row justify-between p-4">
                  <Link href="/" className="relative block flex-shrink-0">
                    <Image
                      key={index}
                      src={item.thumbnail}
                      height={144}
                      width={108}
                      alt={item.title || ''}
                    />
                  </Link>
                  <ul className="relative ml-4 inline-flex h-full w-full flex-col">
                    <li className="text-xs font-black italic lg:text-md">
                      {item.title}
                    </li>
                    <li className="text-xs2 text-gray-400 lg:text-sm">
                      {item.variant.title}
                    </li>
                    <li className="text-xs2 text-gray-400 lg:text-sm">
                      Quantity: {item.quantity}
                    </li>
                    <li className="right-0 top-0 sm:absolute">
                      <ul className="relative mt-1 flex items-center gap-2 sm:mt-0 sm:block sm:self-start">
                        <li className="text-xs font-medium lg:text-md">
                          {(item.total / 100).toFixed(2)}{' '}
                          {cart?.region?.currency_code === 'eur' ? '€' : '£'}
                        </li>
                      </ul>
                    </li>
                    <li className="mt-10 flex items-center justify-between gap-2 gap-y-4 lg:gap-x-8">
                      <QuantityInput
                        defaultValue={item.quantity}
                        maxValue={20}
                        onChange={(val) => updateItem(item.id, val)}
                        
                      />

                      <button onClick={() => deleteItem(item.id)}>
                        <Icon
                          name="trash"
                          className="transition-all hover:text-primary"
                        />
                      </button>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </li>
        </ul>
      </div>

      <div className="col-span-12 mt-6 border-t border-gray-200 pt-8 lg:col-span-4 lg:mt-9.25 lg:border-t-0 lg:pt-0 xl:col-span-3">
        <ul className="mb-10">
          <li className="mb-3.5 text-gray-400">
            <ul className="flex justify-between">
              <li>Subtotal:</li>
              <li className="text-black">
                {/* {cart?.subtotal} */}
                {(cart?.subtotal / 100).toFixed(2)}{' '}
                {cart?.region?.currency_code === 'eur' ? '€' : '£'}
              </li>
            </ul>
          </li>
          <li className="mb-6 border-b border-gray-200 pb-5.5 text-gray-400">
            <ul className="flex justify-between">
              <li>Shipping:</li>
              <li className="text-black">Free</li>
            </ul>
          </li>
          <li className="text-lg font-semibold">
            <ul className="flex justify-between">
              <li>Total:</li>
              <li>
                {/* {cart?.subtotal}  */}
                {(cart?.subtotal / 100).toFixed(2)}{' '}
                {cart?.region?.currency_code === 'eur' ? '€' : '£'}
              </li>
            </ul>
          </li>
        </ul>

        <Link href="/checkout">
          <Button size="lg" className="w-full">
            Proceed to checkout
          </Button>
        </Link>
      </div>
    </div>
  );
};

CartPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default CartPage;


