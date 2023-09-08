import * as React from 'react';
import Image from 'next/image';

import type { NextPageWithLayout } from '@/pages/_app';
import AccountLayout from '@/layouts/AccountLayout';
import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';
import { Icon } from '@/components/ui/Icon';
import { Heading } from '@/components/ui/Heading';
import * as Dialog from '@/components/ui/Dialog';
import { useRouter } from 'next/router';
import { useCart, useOrder } from 'medusa-react';
import { useEffect, useState } from 'react';
import Medusa from '@medusajs/medusa-js';
import { MEDUSA_BACKEND_URL } from '@/lib/config';
import { useAccount } from '@/lib/context/account-context';
import { usePathname } from 'next/navigation';
import { Order } from '@medusajs/medusa';
import { getPriceByCurrency } from '@/utils/getPriceByCurrency';

const OrderReturnModal: React.FC = () => {
  const [returnModalStep, setReturnModalStep] = React.useState<
    false | 'form' | 'success'
  >(false);

  const pathname = usePathname();
  const { customer } = useAccount();
  const [order, setOrder] = useState<any>();

  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  const fetchOrder = async (displayId: string, email: string) => {
    const response = await medusa.orders.lookupOrder({
      display_id: parseInt(displayId, 10),
      email,
      expand: 'billing_address,shipping_address,items,region',
    });

    if (response.order.id) {
      setOrder(response.order);
    }
  };
  useEffect(() => {
    const orderDisplayId = pathname?.replace('/my-account/orders/', '');
    if (
      orderDisplayId &&
      typeof orderDisplayId === 'string' &&
      customer?.email
    ) {
      fetchOrder(orderDisplayId, customer.email);
    }
  }, [pathname]);

  const handleCreateReturn = async () => {
    try {
      const returnRequest = {
        order_id: order.id,
        items: selectedItems.map((selectedItem) => ({
          item_id: selectedItem.id,
          quantity: selectedItem.quantity,
        })),
        // return_shipping: {
        //   option_id: order.shipping_method?.[0]?.shipping_option_id,
        // },
      };
      const { return: createdReturn } = await medusa.returns.create(
        returnRequest
      );
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCheckboxChange = (itemId: string) => {
    if (selectedItems.some((item) => item.id === itemId)) {
      setSelectedItems(selectedItems.filter((item) => item.id !== itemId));
    } else {
      setSelectedItems([
        ...selectedItems,
        order.items.find((item: any) => item.id === itemId),
      ]);
    }
  };

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
          <Button
            variant="secondary"
            isDisabled={order?.fulfillment_status !== 'shipped'}
          >
            Return
          </Button>
        </Dialog.Trigger>
        <Dialog.Overlay />
        <Dialog.Content containerSize="lg" className="p-0">
          <Dialog.Title className="sticky top-0 z-10 mb-6 bg-white px-6 pb-4 pt-6">
            Select items you liked to return.
          </Dialog.Title>
          <div className="px-6">
            <ul className="mb-8 [&>li:last-child]:mb-0 [&>li:last-child]:border-b-0 [&>li:last-child]:pb-0 [&>li]:mb-4 [&>li]:border-b [&>li]:border-gray-100 [&>li]:pb-4">
              {order?.items?.map((item: any) => (
                <li key={item.id} className="relative flex justify-between">
                  <input
                    type="checkbox"
                    name="returnItem"
                    id="returnItem2"
                    className="absolute right-0 mt-1 h-4 w-4 shrink-0 cursor-pointer appearance-none border border-gray-400 transition-all checked:border-gray-900 checked:bg-gray-900 checked:before:absolute checked:before:left-[0.1875rem] checked:before:top-[0.1875rem] checked:before:h-[0.3125rem] checked:before:w-2 checked:before:-rotate-45 checked:before:border-b-2 checked:before:border-l-2 checked:before:border-gray-10 checked:before:content-[''] hover:border-primary hover:checked:bg-primary focus-visible:outline-0"
                    checked={selectedItems.some(
                      (selectedItem) => selectedItem.id === item.id
                    )}
                    onChange={() => handleCheckboxChange(item.id)}
                  />
                  <Image
                    src={item.thumbnail}
                    height={200}
                    width={150}
                    alt={item.title}
                    className="mr-8"
                  />
                  <div className="flex flex-1 flex-wrap justify-between gap-4 sm:flex-row">
                    <ul className="relative mr-auto whitespace-nowrap text-xs [&>li:last-child]:mb-0 [&>li]:mb-1">
                      <li className="text-sm text-black">{item.title}</li>
                      <li className="text-gray-400">
                        {/* Color:{' '} */}
                        <span className="ml-1 text-black">
                          {item.variant.title}
                        </span>
                      </li>
                      {/* <li className="text-gray-400">
                    Size:{' '}
                    <span className="ml-1 text-black">{item.variant.size}</span>
                  </li> */}
                      <li className="bottom-0 text-gray-400 sm:absolute">
                        Quantity:{' '}
                        <span className="ml-1 text-black">{item.quantity}</span>
                      </li>
                    </ul>
                    <span className="mt-auto block self-end">
                      {'€'} {(item.total / 100).toFixed(2)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="sticky bottom-0 bg-white px-6 pb-6">
            <div className="w-full border-t border-gray-100 pt-4" />
            <div className="flex justify-between">
              <Button
                variant="primary"
                onPress={() => {
                  setReturnModalStep('success');
                  handleCreateReturn();
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

const medusa = new Medusa({ baseUrl: MEDUSA_BACKEND_URL, maxRetries: 3 });

const MyAccountOrderSinglePage: NextPageWithLayout = () => {
  const pathname = usePathname();
  const [order, setOrder] = useState<Order>();
  const { customer } = useAccount();
  const { cart } = useCart();

  const fetchOrder = async (displayId: string, email: string) => {
    const response = await medusa.orders.lookupOrder({
      display_id: parseInt(displayId, 10),
      email,
      expand: 'billing_address,shipping_address,items,region',
    });

    if (response.order.id) {
      setOrder(response.order);
    }
  };
  
  useEffect(() => {
    const orderDisplayId = pathname?.replace('/my-account/orders/', '');

    if (
      orderDisplayId &&
      typeof orderDisplayId === 'string' &&
      customer?.email
    ) {
      fetchOrder(orderDisplayId, customer.email);
    }
  }, [pathname, order]);

  return (
    <div>
      <Heading className="mb-5 text-primary" size="xl">
        Order:
        <span className="ml-3 text-lg font-light not-italic text-black lg:ml-6">
          {order?.display_id}
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
              <Tag
                icon="package"
                // hasBorder={
                //   order?.fulfillment_status === 'not_fulfilled' ? true : false
                // }
                disabled={
                  order?.fulfillment_status === 'not_fulfilled' ||
                  order?.fulfillment_status === 'partially_fulfilled'
                    ? false
                    : true
                }
              >
                Packing
              </Tag>
            </li>
            <li className='after:absolute after:-left-4 after:top-3.5 after:h-[0.0625rem] after:w-4 after:bg-gray-100 after:content-[""]'>
              <Tag
                icon="truck"
                // hasBorder={
                //   order?.fulfillment_status !== 'shipped' ? true : false
                // }
                disabled={
                  order?.fulfillment_status === 'fulfilled' ||
                  order?.fulfillment_status === 'canceled'
                    ? false
                    : true
                }
              >
                Delivering
              </Tag>
            </li>
            <li>
              <Tag
                icon="check"
                // hasBorder={
                //   order?.fulfillment_status === 'shipped' ? true : false
                // }
                disabled={
                  order?.fulfillment_status === 'shipped' ||
                  order?.fulfillment_status === 'returned' ||
                  order?.fulfillment_status === 'partially_returned'
                    ? false
                    : true
                }
              >
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

        {order?.created_at && (
          <span className="block">
            {new Date(order.created_at).toLocaleDateString()}
          </span>
        )}
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
            <li>
              {order?.shipping_address?.first_name}{' '}
              {order?.shipping_address?.last_name}
            </li>
            <li>{order?.shipping_address?.address_1}</li>
            <li>
              {order?.shipping_address?.postal_code}{' '}
              {order?.shipping_address?.city}
            </li>
            <li>
              {
                cart?.region?.countries.find(
                  (country: any) =>
                    country?.iso_2 === order?.shipping_address?.country_code
                )?.display_name
              }
            </li>
            {/* opet ovo isto */}
            <li>{order?.shipping_address?.phone}</li>
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
            <li>
              {order?.billing_address?.first_name}{' '}
              {order?.billing_address?.last_name}
            </li>
            <li>{order?.billing_address?.address_1}</li>
            <li>
              {order?.billing_address?.postal_code}{' '}
              {order?.billing_address?.city}
            </li>
            <li>
              {
                cart?.region?.countries.find(
                  (country: any) =>
                    country?.iso_2 === order?.billing_address?.country_code
                )?.display_name
              }
            </li>

            <li>{order?.billing_address?.phone}</li>
          </ul>
        </div>
      </div>

      <ul className="mb-4 rounded-sm border border-gray-200 p-2 [&>li:last-child]:mb-0 [&>li:last-child]:before:hidden [&>li]:relative [&>li]:mb-4 [&>li]:p-2 [&>li]:before:absolute [&>li]:before:-bottom-2 [&>li]:before:left-0 [&>li]:before:h-[0.0625rem] [&>li]:before:w-full [&>li]:before:bg-gray-100 [&>li]:before:content-['']">
        {order?.items?.map((item: any) => (
          <li
            key={item.id}
            className="group relative flex flex-wrap justify-between gap-8 bg-gray-30"
          >
            <Image
              src={item.thumbnail}
              height={200}
              width={150}
              alt={item.title}
            />
            <div className="flex flex-1 flex-wrap justify-between gap-4 sm:flex-row">
              <ul className="relative mr-auto whitespace-nowrap text-xs [&>li:last-child]:mb-0 [&>li]:mb-1">
                <li className="text-sm text-black">{item.title}</li>
                <li className="text-gray-400">
                  {/* Color:{' '} */}
                  <span className="ml-1 text-black">{item.variant.title}</span>
                </li>
                {/* <li className="text-gray-400">
                    Size:{' '}
                    <span className="ml-1 text-black">{item.variant.size}</span>
                  </li> */}
                <li className="bottom-0 text-gray-400 sm:absolute">
                  Quantity:{' '}
                  <span className="ml-1 text-black">{item.quantity}</span>
                </li>
              </ul>
              <div className="flex justify-between gap-4 sm:h-full sm:flex-col">
                {/* {order.fulfillment_status === 'returned' ? <Tag variant="informative">{(order.fulfillment_status).toUpperCase()}</Tag>: <Tag variant="informative">{(order.status).toUpperCase()}</Tag>} */}
                <Tag variant="informative">
                  {item.returned_quantity === null
                    ? order.fulfillment_status?.toUpperCase()
                    : order.fulfillment_status?.toUpperCase()}
                </Tag>

                <span className="mt-auto block self-end">
                  {(item.total / 100).toFixed(2)}
                  {order.region?.currency_code === 'eur' ? '€' : '$'}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mb-4 flex flex-wrap justify-between gap-20 rounded-sm border border-gray-200 p-4">
        <div>
          <div className="mb-4 flex items-center">
            <Icon name="credit-card" className="h-4 w-4" />

            <span className="ml-4 mr-auto block text-gray-400">Payment</span>
          </div>

          <div className="flex items-start">
            {/* <Image
              src={'/images/content/visa.png'}
              height={24}
              width={34}
              alt="Visa"
            /> */}

            <ul className="ml-4 [&>li:last-child]:mb-0 [&>li]:mb-2">
              <li>
                {order?.shipping_address?.first_name}{' '}
                {order?.shipping_address?.last_name}
              </li>
              <li>CASH</li>
            </ul>
          </div>
        </div>

        <ul className="flex-1 sm:w-1/3 sm:flex-none [&>li:last-child]:mb-0 [&>li]:mb-1">
          <li>
            <ul className="flex justify-between gap-20">
              <li className="text-gray-400">Subtotal</li>
              <li>
                {(order?.subtotal! / 100).toFixed(2)}{' '}
                {order?.region?.currency_code === 'eur' ? '€' : '£'}
              </li>
            </ul>
          </li>
          <li>
            <ul className="flex justify-between gap-20">
              <li className="text-red-700"> Discount</li>
              <li className="text-red-700">
                {' '}
                -{(order?.discount_total! / 100).toFixed(2)}{' '}
                {order?.region?.currency_code === 'eur' ? '€' : '£'}
              </li>
            </ul>
          </li>
          <li className="!mb-6">
            <ul className="flex justify-between gap-20">
              <li className="text-gray-400">Shipping</li>
              <li>
                {(order?.shipping_total! / 100).toFixed(2)}{' '}
                {order?.region?.currency_code === 'eur' ? '€' : '£'}
              </li>
            </ul>
          </li>
          <li>
            <ul className="flex justify-between gap-20 text-lg">
              <li>Total</li>
              <li>
                {(order?.total! / 100).toFixed(2)}

                {order?.region?.currency_code === 'eur' ? '€' : '£'}
              </li>
            </ul>
          </li>
          <li className="text-gray-400">
            Including {order?.tax_total}{' '}
            {order?.region?.currency_code === 'eur' ? '€' : '£'} tax
          </li>
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
