'use client';

import * as React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import * as Dialog from '@/components/ui/Dialog';
import { Icon } from '@/components/ui/Icon';

export const ReturnModal: React.FC = () => {
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
        <Dialog.Content containerSize="lg">
          <Dialog.Title>Select items you liked to return.</Dialog.Title>
          <ul className="mb-8 [&>li:last-child]:mb-0 [&>li]:mb-4 [&>li]:border-b [&>li]:border-gray-100 [&>li]:pb-4">
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
          </ul>
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
