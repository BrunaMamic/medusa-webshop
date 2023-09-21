import * as React from 'react';
import { useEffect, useState } from 'react'; // Import useEffect and useState
import Image from 'next/image';
import axios from 'axios'; // Import Axios

import type { NextPageWithLayout } from '@/pages/_app';
import AccountLayout from '@/layouts/AccountLayout';
import { Button, ButtonIcon } from '@/components/ui/Button';
import * as Dialog from '@/components/ui/Dialog';
import { Heading } from '@/components/ui/Heading';
import { Input } from '@/components/Input';
import { useAccount } from '@/lib/context/account-context';
import { medusaClient } from '@/lib/config';

const MyAccountPaymentMethodsPage: NextPageWithLayout = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const account = useAccount();

  const handleListOrders = async () => {
    if (account.customer) {
      await medusaClient.customers
        .listOrders()
        .then(({ orders, limit, offset, count }) => {
          console.log(orders);
        });
    }
  };
  handleListOrders()

  useEffect(() => {
    axios
      .get(`http://localhost:9000/store/customer-payment-methods/${account.customer?.id}`)
      .then((response) => {
        const { paymentMethods } = response.data;
        setPaymentMethods(paymentMethods);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []); 

  return (
    <div>
      <div>
        {paymentMethods.map((paymentMethod:any, index) => (
          <div key={index}>
            <p>{paymentMethod.last4}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

MyAccountPaymentMethodsPage.getLayout = function getLayout(
  page: React.ReactElement
) {
  return <AccountLayout>{page}</AccountLayout>;
};

export default MyAccountPaymentMethodsPage;
