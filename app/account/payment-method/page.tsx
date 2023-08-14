'use client';

import Image from 'next/image';
import { Button, ButtonIcon } from '@/components/ui/Button';
import * as Dialog from '@/components/ui/Dialog';
import { Heading } from '@/components/ui/Heading';
import { Input } from '@/components/Input';

const PaymentMethodPage = () => {
  return (
    <div>
      <Heading className="mb-8 text-primary lg:mb-15" size="xl">
        Payment methods
      </Heading>

      <p className="text-md">Credit and debit cards</p>

      <div className="mt-6 flex flex-wrap items-start justify-between gap-6 rounded-sm border border-gray-200 p-4">
        <div className="flex items-start">
          <Image
            src={'/images/content/visa.png'}
            height={24}
            width={34}
            alt="Visa"
          />

          <ul className="ml-14">
            <li>Jovana Jerimic</li>
            <li>**** **** **** 1111</li>
            <li>Exp: 05/26</li>
          </ul>
        </div>

        <div className="flex items-start">
          <ButtonIcon size="lg" iconName="trash" variant="secondary" />

          <Button size="lg" variant="secondary" className="ml-3">
            Change
          </Button>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-start justify-between gap-6 rounded-sm border border-gray-200 p-4">
        <div className="flex items-start">
          <Image
            src={'/images/content/visa.png'}
            height={24}
            width={34}
            alt="Visa"
          />

          <ul className="[&>li]:mb- ml-14 [&>li:last-child]:mb-0">
            <li>Jovana Jerimic</li>
            <li>**** **** **** 1111</li>
            <li>Exp: 05/26</li>
          </ul>
        </div>

        <div className="flex items-start">
          <ButtonIcon size="lg" iconName="trash" variant="secondary" />

          <Button size="lg" variant="secondary" className="ml-3">
            Change
          </Button>
        </div>
      </div>

      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button size="lg" className="mt-10">
            Add another card
          </Button>
        </Dialog.Trigger>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Title>Add credit or debit card</Dialog.Title>
          <Input
            type="text"
            label="Name on card"
            wrapperClassName="mb-4 lg:mb-8"
          />
          <Input
            type="number"
            label="Card number"
            wrapperClassName="mb-4 lg:mb-8"
          />
          <div className="mb-4 flex w-full gap-x-4 lg:mb-8 lg:gap-x-6">
            <Input type="number" label="MM/YY" wrapperClassName="flex-1" />
            <Input type="number" label="CVC" wrapperClassName="flex-1" />
          </div>
          <div className="flex justify-between">
            <Dialog.Close asChild>
              <Button variant="primary" aria-label="Save changes">
                Add card
              </Button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <Button variant="secondary" aria-label="Cancel">
                Cancel
              </Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default PaymentMethodPage;
