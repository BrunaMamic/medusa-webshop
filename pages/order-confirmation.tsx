import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import type { NextPageWithLayout } from '@/pages/_app';
import DefaultLayout from '@/layouts/DefaultLayout';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
import { useStore } from '@/lib/context/store-context';
import { useRouter } from 'next/router';

import { MEDUSA_BACKEND_URL, medusaClient } from '../lib/config';
import Medusa from '@medusajs/medusa-js';
import { Order } from '@medusajs/medusa';
import { useEffect, useState } from 'react';

const medusa = new Medusa({ baseUrl: MEDUSA_BACKEND_URL, maxRetries: 3 });

const OrderConfirmationPage: NextPageWithLayout = () => {
  const { cart } = useStore();
  const router = useRouter();
  const { id } = router.query as { id: string };
  
  const [orderData, setOrderData] = useState<Order | undefined>(undefined);

  useEffect(() => {
    medusa.orders.retrieve(id)
      .then(({ order }:any) => {
        console.log('Order Data:', order);
        setOrderData(order);
      })
      .catch((error) => {
        console.error('Error', error);
      });
  }, [id]);
  
  return (
    <main className="grid-cols-12 px-4 py-10 md:px-24 lg:grid lg:px-0 lg:pb-50 lg:pt-19">
      <span className="col-span-3" />

      <div className="col-span-6">
        <Heading className="mb-14 text-primary" size="xl4">
          Thank you for your order!
        </Heading>

        <div className="mb-16 text-md">
          <p className="mb-6">
            Thank you for your purchase! We are pleased to confirm that your
            order has been successfully placed and will be processed shortly.
          </p>

          <p>
            We have sent you the receipt and order details via{' '}
            <span className="font-bold">e-mail.</span>
          </p>
        </div>

        <div className="mb-16 flex flex-col justify-between gap-20 sm:flex-row">
          <div>
            <p className="mb-2">Your order number is:</p>
            <p className="font-bold">{orderData?.display_id}</p>

            <ul className="mt-8 text-gray-600 sm:mt-16">
              <li className="mb-2">Shipping adress:</li>
              {orderData?.shipping_address.address_1},{' '}<br/>
              {orderData?.shipping_address.postal_code}{' '}
              {orderData?.shipping_address.city},{' '}
              {
                orderData?.region?.countries?.find(
                  (country: any) =>
                    country?.iso_2 === orderData?.shipping_address?.country_code
                )?.display_name
              }
              {orderData?.shipping_address.country_code}
            </ul>
          </div>

          <div>
            <p className="mb-2">Shipment expected:</p>
            <p className="font-bold">7 Aug - 8 Aug</p>

            <ul className="mt-8 text-gray-600 sm:mt-16">
              <li className="mb-2">Payment:</li>
              <li>{orderData?.shipping_address.first_name}{' '}
              {orderData?.shipping_address.last_name}{' '}</li>
              <li>CASH</li>
            </ul>
          </div>
        </div>

        <Link href="/">
          <Button size="lg" className="w-full">
            Go back to home page
          </Button>
        </Link>
      </div>
    </main>
  );
};

OrderConfirmationPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default OrderConfirmationPage;
