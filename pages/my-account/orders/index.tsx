import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import type { NextPageWithLayout } from '@/pages/_app';
import AccountLayout from '@/layouts/AccountLayout';
import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';
import { Heading } from '@/components/ui/Heading';
import router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { MEDUSA_BACKEND_URL, medusaClient } from '../../../lib/config';
import Medusa from '@medusajs/medusa-js';
import { useAccount } from '@/lib/context/account-context';

const medusa = new Medusa({ baseUrl: MEDUSA_BACKEND_URL, maxRetries: 3 });

const MyAccountOrdersPage: NextPageWithLayout = () => {
  const [orders, setOrders] = useState([]);
  const account = useAccount();
  console.log(account?.customer?.id);
  const customerId = account?.customer?.id;

  const getAllOrders = () => {
    medusa.customers
      .listOrders()
      .then(({ orders }) => {
        console.log(orders);
        setOrders(orders as any);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  };

  useEffect(() => {
    getAllOrders();
  }, [account]);

  return (
    <div>
      <Heading className="mb-8 text-primary lg:mb-15">My orders</Heading>

      {/* <p>You haven’t order anything yet.</p> */}

      <ul className="[&>li:last-child]:mb-0 [&>li]:mb-4">
        {orders.map((order: any) => (
          <li key={order?.id} className="rounded-sm border border-gray-200 p-4">
            <div className="mb-8 flex flex-wrap items-start justify-between gap-6">
              <ul>
                <li className="mb-2 text-md text-primary">
                  Order:{' '}
                  <span className="ml-1 text-black">{order.display_id}</span>
                </li>
                <li className="text-xs text-gray-400">
                  Order date:{' '}
                  <span className="ml-2 text-black">
                    {new Date(order.created_at).toLocaleDateString()}
                  </span>
                </li>
              </ul>
              <ul className="flex [&>li:last-child]:mr-0 [&>li]:mr-4">
                <div className="flex p-2">
                  {order.items
                    .filter(
                      (item: any, index: number) =>
                        index ===
                        order.items.findIndex(
                          (i: any) => item.title === i.title
                        )
                    )
                    .map((item: any) => (
                      <li key={item.id}>
                        <Image
                          src={item.thumbnail}
                          height={150}
                          width={100}
                          alt={item.title}
                        />
                      </li>
                    ))}
                </div>
              </ul>
            </div>
            <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <Tag icon="package">Packing</Tag>
                <p className="text-xs2 text-gray-400">
                  Estimate delivery:{' '}
                  <span className="ml-1 text-black">29 June 2023</span>
                </p>
              </div>
              <Link href={`/my-account/orders/${order.id}`}>
                <Button variant="secondary">Check status</Button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

MyAccountOrdersPage.getLayout = function getLayout(page: React.ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};

export default MyAccountOrdersPage;
