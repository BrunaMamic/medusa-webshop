import * as React from 'react';
import Image from 'next/image';

import type { NextPageWithLayout } from '@/pages/_app';
import AccountLayout from '@/layouts/AccountLayout';
import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';
import { Icon } from '@/components/ui/Icon';
import { Heading } from '@/components/ui/Heading';
import * as Dialog from '@/components/ui/Dialog';

const OrderReturnModal: React.FC = () => {
  const [returnModalStep, setReturnModalStep] = React.useState<
    false | 'form' | 'success'
  >(false);

  return (
    <>
      <Dialog.Root
        open={returnModalStep === 'form'}
        onOpenChange={(open) => {
          setReturnModalStep((val) => {
            if (val === 'success') {
              return val;
            }

            return open ? 'form' : false;
          });
        }}
      >
        <Dialog.Trigger asChild>
          <Button variant="secondary">Return</Button>
        </Dialog.Trigger>
        <Dialog.Overlay />
        <Dialog.Content containerSize="lg" className="p-0">
          <Dialog.Title className="sticky top-0 z-10 mb-6 bg-white px-6 pb-4 pt-6">
            Select items you liked to return.
          </Dialog.Title>
          <div className="px-6">
            <ul className="mb-8 [&>li:last-child]:mb-0 [&>li:last-child]:border-b-0 [&>li:last-child]:pb-0 [&>li]:mb-4 [&>li]:border-b [&>li]:border-gray-100 [&>li]:pb-4">
              <li className="relative flex justify-between">
                <input
                  type="checkbox"
                  name="returnItem"
                  id="returnItem2"
                  className="absolute right-0 mt-1 h-4 w-4 shrink-0 cursor-pointer appearance-none border border-gray-400 transition-all checked:border-gray-900 checked:bg-gray-900 checked:before:absolute checked:before:left-[0.1875rem] checked:before:top-[0.1875rem] checked:before:h-[0.3125rem] checked:before:w-2 checked:before:-rotate-45 checked:before:border-b-2 checked:before:border-l-2 checked:before:border-gray-10 checked:before:content-[''] hover:border-primary hover:checked:bg-primary focus-visible:outline-0"
                />

                <Image
                  src="/images/content/red-t-shirt.jpg"
                  height={200}
                  width={150}
                  alt="White T-shirt"
                  className="mr-8"
                />

                <ul className="relative mr-auto text-xs">
                  <li className="text-sm text-black">Sweat absorbent</li>
                  <li className="text-gray-400">
                    Color: <span className="ml-1 text-black">White</span>
                  </li>
                  <li className="text-gray-400">
                    Size: <span className="ml-1 text-black">S</span>
                  </li>
                  <li className="absolute bottom-0 text-gray-400">
                    Quantity: <span className="ml-1 text-black">1</span>
                  </li>
                </ul>

                <span className="block self-end">€30</span>
              </li>

              <li className="relative flex justify-between">
                <input
                  type="checkbox"
                  name="returnItem"
                  id="returnItem2"
                  className="absolute right-0 mt-1 h-4 w-4 shrink-0 cursor-pointer appearance-none border border-gray-400 transition-all checked:border-gray-900 checked:bg-gray-900 checked:before:absolute checked:before:left-[0.1875rem] checked:before:top-[0.1875rem] checked:before:h-[0.3125rem] checked:before:w-2 checked:before:-rotate-45 checked:before:border-b-2 checked:before:border-l-2 checked:before:border-gray-10 checked:before:content-[''] hover:border-primary hover:checked:bg-primary focus-visible:outline-0"
                />

                <Image
                  src="/images/content/red-t-shirt.jpg"
                  height={200}
                  width={150}
                  alt="White T-shirt"
                  className="mr-8"
                />

                <ul className="relative mr-auto text-xs">
                  <li className="text-sm text-black">Sweat absorbent</li>
                  <li className="text-gray-400">
                    Color: <span className="ml-1 text-black">White</span>
                  </li>
                  <li className="text-gray-400">
                    Size: <span className="ml-1 text-black">L</span>
                  </li>
                  <li className="absolute bottom-0 text-gray-400">
                    Quantity: <span className="ml-1 text-black">1</span>
                  </li>
                </ul>

                <span className="block self-end">€30</span>
              </li>

              <li className="relative flex justify-between">
                <input
                  type="checkbox"
                  name="returnItem"
                  id="returnItem3"
                  className="absolute right-0 mt-1 h-4 w-4 shrink-0 cursor-pointer appearance-none border border-gray-400 transition-all checked:border-gray-900 checked:bg-gray-900 checked:before:absolute checked:before:left-[0.1875rem] checked:before:top-[0.1875rem] checked:before:h-[0.3125rem] checked:before:w-2 checked:before:-rotate-45 checked:before:border-b-2 checked:before:border-l-2 checked:before:border-gray-10 checked:before:content-[''] hover:border-primary hover:checked:bg-primary focus-visible:outline-0"
                />

                <Image
                  src="/images/content/red-t-shirt.jpg"
                  height={200}
                  width={150}
                  alt="White T-shirt"
                  className="mr-8"
                />

                <ul className="relative mr-auto text-xs">
                  <li className="text-sm text-black">Sweat absorbent</li>
                  <li className="text-gray-400">
                    Color: <span className="ml-1 text-black">White</span>
                  </li>
                  <li className="text-gray-400">
                    Size: <span className="ml-1 text-black">M</span>
                  </li>
                  <li className="absolute bottom-0 text-gray-400">
                    Quantity: <span className="ml-1 text-black">1</span>
                  </li>
                </ul>

                <span className="block self-end">€30</span>
              </li>

              <li className="relative flex justify-between">
                <input
                  type="checkbox"
                  name="returnItem"
                  id="returnItem4"
                  className="absolute right-0 mt-1 h-4 w-4 shrink-0 cursor-pointer appearance-none border border-gray-400 transition-all checked:border-gray-900 checked:bg-gray-900 checked:before:absolute checked:before:left-[0.1875rem] checked:before:top-[0.1875rem] checked:before:h-[0.3125rem] checked:before:w-2 checked:before:-rotate-45 checked:before:border-b-2 checked:before:border-l-2 checked:before:border-gray-10 checked:before:content-[''] hover:border-primary hover:checked:bg-primary focus-visible:outline-0"
                />

                <Image
                  src="/images/content/red-t-shirt.jpg"
                  height={200}
                  width={150}
                  alt="White T-shirt"
                  className="mr-8"
                />

                <ul className="relative mr-auto text-xs">
                  <li className="text-sm text-black">Sweat absorbent</li>
                  <li className="text-gray-400">
                    Color: <span className="ml-1 text-black">White</span>
                  </li>
                  <li className="text-gray-400">
                    Size: <span className="ml-1 text-black">XL</span>
                  </li>
                  <li className="absolute bottom-0 text-gray-400">
                    Quantity: <span className="ml-1 text-black">1</span>
                  </li>
                </ul>

                <span className="block self-end">€30</span>
              </li>

              <li className="relative flex justify-between">
                <input
                  type="checkbox"
                  name="returnItem"
                  id="returnItem4"
                  className="absolute right-0 mt-1 h-4 w-4 shrink-0 cursor-pointer appearance-none border border-gray-400 transition-all checked:border-gray-900 checked:bg-gray-900 checked:before:absolute checked:before:left-[0.1875rem] checked:before:top-[0.1875rem] checked:before:h-[0.3125rem] checked:before:w-2 checked:before:-rotate-45 checked:before:border-b-2 checked:before:border-l-2 checked:before:border-gray-10 checked:before:content-[''] hover:border-primary hover:checked:bg-primary focus-visible:outline-0"
                />

                <Image
                  src="/images/content/red-t-shirt.jpg"
                  height={200}
                  width={150}
                  alt="White T-shirt"
                  className="mr-8"
                />

                <ul className="relative mr-auto text-xs">
                  <li className="text-sm text-black">Sweat absorbent</li>
                  <li className="text-gray-400">
                    Color: <span className="ml-1 text-black">White</span>
                  </li>
                  <li className="text-gray-400">
                    Size: <span className="ml-1 text-black">XL</span>
                  </li>
                  <li className="absolute bottom-0 text-gray-400">
                    Quantity: <span className="ml-1 text-black">1</span>
                  </li>
                </ul>

                <span className="block self-end">€30</span>
              </li>
            </ul>
          </div>
          <div className="sticky bottom-0 bg-white px-6 pb-6">
            <div className="w-full border-t border-gray-100 pt-4" />
            <div className="flex justify-between">
              <Button
                variant="primary"
                onPress={() => {
                  setReturnModalStep('success');
                }}
              >
                Return
              </Button>
              <Dialog.Close asChild>
                <Button variant="secondary" aria-label="Cancel">
                  Cancel
                </Button>
              </Dialog.Close>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Root>
      <Dialog.Root
        open={returnModalStep === 'success'}
        onOpenChange={(open) => {
          setReturnModalStep(open ? 'success' : false);
        }}
      >
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Close asChild>
            <button className="absolute right-4 top-4 text-gray-900">
              <Icon name="x" />
            </button>
          </Dialog.Close>
          <Dialog.Title>
            We received your return and it is getting processed
          </Dialog.Title>
          <div className="text-xs text-gray-500">
            <p>
              We have sent an email with instructions on how to <br />
              change the password.
            </p>
          </div>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};

const MyAccountOrderSinglePage: NextPageWithLayout = () => {
  return (
    <div>
      <Heading className="mb-5 text-primary" size="xl">
        Order:
        <span className="ml-3 text-lg font-light not-italic text-black lg:ml-6">
          00000000001
        </span>
      </Heading>

      <div className="mb-4 rounded-sm border border-gray-200 p-4">
        <p className="mb-4 text-gray-400">
          Estimate delivery{' '}
          <span className="ml-2 text-black">1 — 3 Jul, 2023</span>
        </p>

        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
          <ul className="flex flex-wrap gap-y-2 [&>li:first-child]:ml-0 [&>li:last-child]:before:-left-4 [&>li]:relative [&>li]:ml-4 [&>li]:before:absolute [&>li]:before:-right-4 [&>li]:before:top-3.5 [&>li]:before:h-[0.0625rem] [&>li]:before:w-4 [&>li]:before:bg-gray-100 [&>li]:before:content-['']">
            <li className="before:bg-primary">
              <Tag icon="package" hasBorder>
                Packing
              </Tag>
            </li>
            <li className='after:absolute after:-left-4 after:top-3.5 after:h-[0.0625rem] after:w-4 after:bg-gray-100 after:content-[""]'>
              <Tag icon="truck" disabled>
                Delivering
              </Tag>
            </li>
            <li>
              <Tag icon="check" disabled>
                Delivered
              </Tag>
            </li>
          </ul>

          <Button variant="secondary">Check status</Button>
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between rounded-sm border border-gray-200 p-4">
        <Icon name="calendar" className="h-4 w-4" />

        <span className="ml-4 mr-auto block text-gray-400">Order date</span>

        <span className="block">29 June, 2023</span>
      </div>

      <div className="mb-4 flex flex-wrap gap-4">
        <div className="flex flex-1 flex-col items-start justify-between rounded-sm border border-gray-200 p-4 sm:flex-row">
          <div className="flex gap-4">
            <Icon name="map-pin" className="mt-1.5 h-4 w-4" />

            <span className="block text-gray-400">
              Delivery
              <br /> address
            </span>
          </div>

          <ul className="sm:text-end [&>li:last-child]:mb-0 [&>li]:mb-1">
            <li>Jovana Jerimic</li>
            <li>Duvanjs 3</li>
            <li>10000 Zagreb</li>
            <li>Croata</li>
            <li>+385 226 2266</li>
          </ul>
        </div>

        <div className="flex flex-1 flex-col items-start justify-between gap-6 rounded-sm border border-gray-200 p-4 sm:flex-row">
          <div className="flex gap-4">
            <Icon name="receipt" className="mt-1.5 h-4 w-4" />

            <span className="block text-gray-400">
              Billing
              <br /> address
            </span>
          </div>

          <ul className="sm:text-end [&>li:last-child]:mb-0 [&>li]:mb-1">
            <li>Jovana Jerimic</li>
            <li>Duvanjs 3</li>
            <li>10000 Zagreb</li>
            <li>Croata</li>
            <li>+385 226 2266</li>
          </ul>
        </div>
      </div>

      <ul className="mb-4 rounded-sm border border-gray-200 p-2 [&>li:last-child]:mb-0 [&>li:last-child]:before:hidden [&>li]:relative [&>li]:mb-4 [&>li]:p-2 [&>li]:before:absolute [&>li]:before:-bottom-2 [&>li]:before:left-0 [&>li]:before:h-[0.0625rem] [&>li]:before:w-full [&>li]:before:bg-gray-100 [&>li]:before:content-['']">
        <li className="group relative flex flex-wrap justify-between gap-8">
          <Image
            src="/images/content/red-t-shirt.jpg"
            height={200}
            width={150}
            alt="White T-shirt"
          />

          <div className="flex flex-1 flex-wrap justify-between gap-4 sm:flex-row">
            <ul className="relative mr-auto whitespace-nowrap text-xs [&>li:last-child]:mb-0 [&>li]:mb-1">
              <li className="text-sm text-black">Sweat absorbent</li>
              <li className="text-gray-400">
                Color: <span className="ml-1 text-black">White</span>
              </li>
              <li className="text-gray-400">
                Size: <span className="ml-1 text-black">S</span>
              </li>
              <li className="bottom-0 text-gray-400 sm:absolute">
                Quantity: <span className="ml-1 text-black">1</span>
              </li>
            </ul>

            <span className="mt-auto block self-end">€30</span>
          </div>
        </li>

        <li className="group relative flex flex-wrap justify-between gap-8 bg-gray-30">
          <Image
            src="/images/content/red-t-shirt.jpg"
            height={200}
            width={150}
            alt="White T-shirt"
          />

          <div className="flex flex-1 flex-col flex-wrap justify-between gap-4 sm:flex-row">
            <ul className="relative mr-auto whitespace-nowrap text-xs  [&>li:last-child]:mb-0 [&>li]:mb-1">
              <li className="text-sm text-black">Sweat absorbent</li>
              <li className="text-gray-400">
                Color: <span className="ml-1 text-black">White</span>
              </li>
              <li className="text-gray-400">
                Size: <span className="ml-1 text-black">L</span>
              </li>
              <li className="bottom-0 text-gray-400 sm:absolute">
                Quantity: <span className="ml-1 text-black">1</span>
              </li>
            </ul>

            <div className="flex justify-between gap-4 sm:h-full sm:flex-col">
              <Tag variant="informative">Returned</Tag>

              <span className="mt-auto block self-end">€30</span>
            </div>
          </div>
        </li>

        <li className="group relative flex flex-wrap justify-between gap-8">
          <Image
            src="/images/content/red-t-shirt.jpg"
            height={200}
            width={150}
            alt="White T-shirt"
          />

          <div className="flex flex-1 flex-wrap justify-between gap-4 sm:flex-row">
            <ul className="relative mr-auto whitespace-nowrap text-xs  [&>li:last-child]:mb-0 [&>li]:mb-1">
              <li className="text-sm text-black">Sweat absorbent</li>
              <li className="text-gray-400">
                Color: <span className="ml-1 text-black">White</span>
              </li>
              <li className="text-gray-400">
                Size: <span className="ml-1 text-black">M</span>
              </li>
              <li className="bottom-0 text-gray-400 sm:absolute">
                Quantity: <span className="ml-1 text-black">1</span>
              </li>
            </ul>

            <div className="flex justify-between gap-4 sm:h-full sm:flex-col">
              <span className="mt-auto block self-end">€30</span>
            </div>
          </div>
        </li>

        <li className="group relative flex flex-wrap justify-between gap-8 bg-gray-30">
          <Image
            src="/images/content/red-t-shirt.jpg"
            height={200}
            width={150}
            alt="White T-shirt"
          />

          <div className="flex flex-1 flex-col flex-wrap justify-between gap-4 sm:flex-row">
            <ul className="relative mr-auto whitespace-nowrap text-xs  [&>li:last-child]:mb-0 [&>li]:mb-1">
              <li className="text-sm text-black">Sweat absorbent</li>
              <li className="text-gray-400">
                Color: <span className="ml-1 text-black">White</span>
              </li>
              <li className="text-gray-400">
                Size: <span className="ml-1 text-black">XL</span>
              </li>
              <li className="bottom-0 text-gray-400 sm:absolute">
                Quantity: <span className="ml-1 text-black">1</span>
              </li>
            </ul>

            <div className="flex justify-between gap-4 sm:h-full sm:flex-col">
              <Tag variant="informative">Returned</Tag>

              <span className="mt-auto block self-end">€30</span>
            </div>
          </div>
        </li>
      </ul>

      <div className="mb-4 flex flex-wrap justify-between gap-20 rounded-sm border border-gray-200 p-4">
        <div>
          <div className="mb-4 flex items-center">
            <Icon name="credit-card" className="h-4 w-4" />

            <span className="ml-4 mr-auto block text-gray-400">Payment</span>
          </div>

          <div className="flex items-start">
            <Image
              src={'/images/content/visa.png'}
              height={24}
              width={34}
              alt="Visa"
            />

            <ul className="ml-4 [&>li:last-child]:mb-0 [&>li]:mb-2">
              <li>Jovana Jerimic</li>
              <li>**** **** **** 1111</li>
              <li>Exp: 05/26</li>
            </ul>
          </div>
        </div>

        <ul className="flex-1 sm:w-1/3 sm:flex-none [&>li:last-child]:mb-0 [&>li]:mb-1">
          <li>
            <ul className="flex justify-between gap-20">
              <li className="text-gray-400">Subtotal</li>
              <li>€120</li>
            </ul>
          </li>
          <li className="!mb-6">
            <ul className="flex justify-between gap-20">
              <li className="text-gray-400">Shipping</li>
              <li>€15</li>
            </ul>
          </li>
          <li>
            <ul className="flex justify-between gap-20 text-lg">
              <li>Total</li>
              <li>€135</li>
            </ul>
          </li>
          <li className="text-gray-400">Including 11.25 tax</li>
        </ul>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-6 rounded-sm border border-gray-200 p-4">
        <div>
          <div className="mb-9 flex items-center">
            <Icon name="undo" className="h-4 w-4" />

            <span className="ml-4 mr-auto block text-gray-400">Returns</span>
          </div>

          <p className="text-xs text-gray-500">
            Fit not right or it doesn&apos;t go with your ascetic? No worries,
            we have 30 day return policy.
          </p>
        </div>

        <OrderReturnModal />
      </div>
    </div>
  );
};

MyAccountOrderSinglePage.getLayout = function getLayout(
  page: React.ReactElement
) {
  return <AccountLayout>{page}</AccountLayout>;
};

export default MyAccountOrderSinglePage;
