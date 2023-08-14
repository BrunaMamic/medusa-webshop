import * as React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';
import { Icon } from '@/components/ui/Icon';
import { Heading } from '@/components/ui/Heading';
import { ReturnModal } from './return-modal';

const OrderPage = () => {
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

        <ReturnModal />
      </div>
    </div>
  );
};

export default OrderPage;
