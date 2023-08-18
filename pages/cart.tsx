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
import { useCart as MedusaCart, useDeleteLineItem } from 'medusa-react';

const CartPage: NextPageWithLayout = () => {
  const { cart } = MedusaCart();
  console.log(cart?.region.currency_code);
  if(cart?.region.currency_code === 'eur'){
    console.log('€');
  }
  

  const deleteLineItem = useDeleteLineItem(cart?.id!)

  const deleteItem = (lineId: string) => {
    deleteLineItem.mutate(
      { lineId },
      {
        onSuccess: () => {
          console.log('Item deleted');
        },
      }
    );
  };
  
  return (
    <div className="grid grid-cols-12 lg:gap-x-12">
      <div className="col-span-12 lg:col-span-8 xl:col-span-9">
        <Heading className="mb-8 text-primary lg:mb-13.5" size="xl4">
          Your shopping bag
        </Heading>
        <ul className="[&>li:first-child]:border-t [&>li:last-child]:border-0 [&>li:last-child]:pb-0 [&>li]:border-b [&>li]:border-gray-200 [&>li]:py-8">
          <li>
            <div className="group relative flex items-center justify-between flex-col">
              {cart?.items.map((item: any, index: any) => (
                <div className="flex flex-row justify-between w-full m-4 p-4">
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
                      {item.metadata.color} / {item.metadata.size}
                    </li>
                    <li className="text-xs2 text-gray-400 lg:text-sm">
                      Quantity: {item.quantity}
                    </li>
                    <li className="right-0 top-0 sm:absolute">
                      <ul className="relative mt-1 flex items-center gap-2 sm:mt-0 sm:block sm:self-start">
                        <li className="text-xs font-medium lg:text-md">
                          {item.total} £
                        </li>
                      </ul>
                    </li>
                    <li className="mt-10 flex items-center justify-between gap-2 gap-y-4 lg:gap-x-8">
                      <QuantityInput defaultValue={item.quantity} maxValue={20} />

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
              <li className="text-black">{cart?.subtotal}  {cart?.region.currency_code === 'eur' ? '€' : '£'}</li>
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
              <li>{cart?.subtotal} {cart?.region.currency_code === 'eur' ? '€' : '£'}</li>
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
