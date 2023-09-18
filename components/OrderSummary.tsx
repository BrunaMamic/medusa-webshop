// OrderSummary.js
import React, { useState } from 'react';
import { Input } from './Input';
import Link from 'next/link';
import { Button } from './ui/Button';
import { Tag } from './ui/Tag';
import Image from 'next/image';
import { Icon } from './ui/Icon';
import { Heading } from './ui/Heading';
import classNames from '@/utils/classNames';
import { useCart } from 'medusa-react';
import { MEDUSA_BACKEND_URL } from '@/lib/config';
import Medusa from '@medusajs/medusa-js';
import * as Dialog from '@/components/ui/Dialog';

const medusa = new Medusa({ baseUrl: MEDUSA_BACKEND_URL, maxRetries: 3 });

const OrderSummary = ({ setCardAdded }: any) => {
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountButtonClicked, setDiscountButtonClicked] =
    React.useState(false);

  const [invalidDiscount, setInvalidDiscount] = useState(false);

  const [checkoutVisible, setCheckoutVisible] = React.useState(false);
  const { cart } = useCart();

  const handleApplyDiscount = async () => {    
    try {
      await medusa.carts.update(cart?.id || '', {
        discounts: [{ code: discountCode }],
      });
      console.log(discountApplied);
      

      setDiscountApplied(true);
      setInvalidDiscount(false);
    } catch (error) {
      console.error('Error applying discount:', error);
      setDiscountApplied(false);
      setInvalidDiscount(true);
    }
  };
  return (
    <>
      <li className="flex items-center justify-between bg-white px-4 pb-5 pt-4 lg:hidden">
        <Link href="/" className="inline-block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="95"
            height="36"
            viewBox="0 0 95 36"
            className="w-15.5 lg:w-auto"
            fill="none"
          >
            <g fill="#1E2DA0" clipPath="url(#a)">
              <path d="M58.596 36h-26.75L38.104.11h26.75L62.75 12.073H50.067l-.221 1.053h12.738l-1.661 9.415H48.24l-.222 1.108h12.683l-2.105 12.35ZM66.184.11h14.677c10.357 0 14.843 5.04 13.126 14.899l-1.218 6.923c-.554 3.157-1.385 5.705-2.603 7.865C87.84 33.95 83.74 36 76.264 36H59.926L66.184.11Zm12.351 11.52L76.43 24.036h.056c1.052 0 1.384-.276 1.717-2.27l1.384-8.031c.333-1.772.222-2.105-.941-2.105h-.111ZM35.502 7.089c-.388-2.437-1.717-4.32-4.265-5.539C30.13.997 28.745.61 27.084.387A31.326 31.326 0 0 0 22.93.11H6.536L.277 36h14.4l1.883-10.69c.887 0 1.219.111 1.053 1.607-.056.221-.056.498-.111.83l-1.052 5.871L16.062 36h14.4l.332-1.828 1.163-6.535.111-.499c.83-4.763.222-6.812-3.6-7.643 2.437-.554 4.32-1.662 5.594-3.877.61-1.108 1.108-2.492 1.385-4.154.221-1.606.276-3.101.055-4.375Zm-14.954 6.203c-.166.83-.443 1.385-.83 1.661a1.323 1.323 0 0 1-.776.277h-.665l.665-3.766h.61c.332 0 .553.111.72.277.332.277.442.886.276 1.55Z" />
            </g>
            <defs>
              <clipPath id="a">
                <path fill="#fff" d="M0 0h94.708v36H0z" />
              </clipPath>
            </defs>
          </svg>
        </Link>

        <div>
          <Heading size="md" className="text-primary">
            Checkout
          </Heading>
        </div>
      </li>

      <li
        className={classNames(
          'hidden px-4 pb-8 lg:!block lg:px-12 lg:pt-31 xl:px-24',
          {
            '!block': checkoutVisible,
          }
        )}
      >
        <div className="mb-8 flex justify-between text-xs lg:mb-16 lg:text-sm">
          <span className="block">Order — {cart?.items.length} items</span>

          <button
            className="relative transition-all before:absolute before:bottom-0 before:left-0 before:w-full before:border-b before:border-gray-900 before:content-[''] hover:font-black hover:before:border-b-2"
            onClick={() => setCardAdded(false)}
          >
            Edit cart
          </button>
        </div>

        {cart?.items.map((item: any, index: any) => (
          <div
            key={index}
            className="group mb-8 flex gap-x-2 gap-y-4 lg:gap-x-4"
          >
            <Link href="/" className="relative block flex-shrink-0">
              <Image
                src={item.thumbnail || ''}
                height={144}
                width={108}
                className="min-w-[5.625rem] object-cover sm:w-auto"
                alt={item.title || ''}
              />
              {discountApplied ? (
                <Tag variant="discount" className="absolute bottom-2 right-2">
                  {`-${cart.discounts[0]?.rule.value}%`}
                </Tag>
              ) : (
                ''
              )}
            </Link>

            <ul className="relative inline-flex h-full w-full flex-col">
              <li className="text-xs font-black italic lg:text-md">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs sm:text-md">{item.title}</p>
                  <ul className="relative items-center gap-2 text-xs sm:mt-0 sm:block sm:self-start">
                    <li className="font-bold text-red-700 sm:text-md">
                      {discountApplied
                        ? `${
                            (item?.original_total! -
                              item?.raw_discount_total!) /
                            100
                          }
                        ${cart?.region?.currency_code === 'eur' ? '€' : '£'}`
                        : `${item?.original_total! / 100} ${
                            cart?.region?.currency_code === 'eur' ? '€' : '£'
                          }`}
                    </li>
                    <li className="absolute -bottom-6 right-0 font-light text-gray-400 line-through sm:text-sm">
                      {discountApplied
                        ? `${item?.original_total! / 100}
                        ${cart?.region?.currency_code === 'eur' ? '€' : '£'}`
                        : ''}
                    </li>
                  </ul>
                </div>
              </li>
              <li className="text-xs2 text-gray-400 lg:text-sm">
                {item.variant.title}
              </li>
              <li className="text-xs2 text-gray-400 lg:text-sm">
                {item.quantity}
              </li>
            </ul>
          </div>
        ))}

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:gap-8">
          <Input
            type="text"
            visualSize="sm"
            label="Discount code"
            wrapperClassName="flex-1"
            className="rounded-sm"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            disabled={discountApplied}
          />

          <Button size="lg" variant="tertiary" onPress={handleApplyDiscount}>
            Apply
          </Button>

          {/* {invalidDiscount && (
              <p className="text-red-700">
                Invalid discount code. Please try again.
              </p>
            )} */}

          <Dialog.Root open={invalidDiscount}>
            <Dialog.Overlay />
            <Dialog.Content>
              <Dialog.Close asChild>
                <button
                  className="absolute right-4 top-4 text-gray-900"
                  onClick={() => setInvalidDiscount(false)}
                >
                  <Icon name="x" />
                </button>
              </Dialog.Close>
              <Dialog.Title>Invalid Discount Code</Dialog.Title>
              <div className="text-xs text-gray-500">
                <p>
                  The discount code you entered is invalid. Please try again.
                </p>
              </div>
            </Dialog.Content>
          </Dialog.Root>
        </div>

        <ul className="w-full [&>li:last-child]:mb-0 [&>li]:mb-2">
          <li>
            <ul className="flex justify-between pr-2 text-xs sm:text-sm">
              <li>Subtotal</li>
              <li>
                {(cart?.subtotal! / 100).toFixed(2)}{' '}
                {cart?.region?.currency_code === 'eur' ? '€' : '£'}
              </li>
            </ul>
            <ul className="flex justify-between pr-2 text-xs sm:text-sm">
              {discountApplied && (
                <>
                  <li>Discount</li>
                  <li>
                    {cart?.discount_total &&
                      (cart?.discount_total / 100).toFixed(2)}{' '}
                    {cart?.region?.currency_code === 'eur' ? '€' : '£'}
                  </li>
                </>
              )}
            </ul>
          </li>

          <li className="!mb-6">
            <ul className="flex justify-between pr-2 text-xs sm:text-sm">
              <li>Shipping</li>
              <li>
                {((cart?.shipping_methods?.[0]?.price || 0) / 100).toFixed(2)}{' '}
                {cart?.region?.currency_code === 'eur' ? '€' : '£'}
              </li>
            </ul>
          </li>
          <li>
            <ul className="flex justify-between text-md lg:text-lg">
              <li>Total</li>
              <li>
                {' '}
                {(cart?.subtotal! -
                  cart?.discount_total! +
                  cart?.shipping_total!) /
                  100}{' '}
                {cart?.region?.currency_code === 'eur' ? '€' : '£'}
              </li>
            </ul>
          </li>
          <li className="text-xs text-gray-400 sm:text-sm">
            Including 11.25 tax
          </li>
        </ul>
      </li>
    </>
  );
};

export default OrderSummary;
