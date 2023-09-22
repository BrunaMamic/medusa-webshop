import * as React from 'react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import type { NextPageWithLayout } from '@/pages/_app';
import AccountLayout from '@/layouts/AccountLayout';
import { Button, ButtonIcon } from '@/components/ui/Button';
import * as Dialog from '@/components/ui/Dialog';
import { Heading } from '@/components/ui/Heading';
import { Input } from '@/components/Input';
import { useAccount } from '@/lib/context/account-context';
import { medusaClient } from '@/lib/config';

const MyAccountPaymentMethodsPage: NextPageWithLayout = () => {
  const [paymentMethods, setPaymentMethods] = useState([] as any[]);   
  const account = useAccount();
  

  useEffect(() => {
    let paymentMethodIds: {}[] = []; 
    
    const handleListOrders = async () => {
      if (account.customer) {
        const response = await medusaClient.customers.listOrders();
        const orders = response.orders;
        console.log(orders);
  
        for (const order of orders) {
          if (order?.payments[0].data.payment_method) {
            const paymentMethodId = order.payments[0].data.payment_method;
            paymentMethodIds.push(paymentMethodId);
            console.log(paymentMethodId);
          }
        }
        console.log(paymentMethodIds);
        
        axios
          .post(`http://localhost:9000/store/customer-payment-methods/${account.customer?.metadata.stripe_id}`, {
            paymentMethodIds: paymentMethodIds, 
          })
          .then((response) => {
            console.log(response.data);
            
            const paymentMethods = response.data.paymentMethod;

            setPaymentMethods(paymentMethods);
        
            console.log(paymentMethods);
            
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }
    };
  
    handleListOrders();
  }, [account.customer]);

  return (
    <div>
      <Heading className="mb-8 text-primary lg:mb-15" size="xl">
        Payment methods
      </Heading>

      <p className="text-md">Credit and debit cards</p>

      {paymentMethods?.map((paymentMethod, index) => (
        <div
          key={index}
          className="mt-6 flex flex-wrap items-start justify-between gap-6 rounded-sm border border-gray-200 p-4"
        >
          <div className="flex items-start">
            {/* Use paymentMethod data here */}
            <Image
              src={`/images/content/${paymentMethod.brand}.png`}
              height={24}
              width={34}
              alt={paymentMethod.brand}
            />

            <ul className="ml-14">
              <li>{account.customer?.first_name} {account.customer?.last_name}</li>
              <li>**** **** **** {paymentMethod.last4}</li>
              <li>Exp: {paymentMethod.experation}</li>
            </ul>
          </div>

          <div className="flex items-start">
            <ButtonIcon size="lg" iconName="trash" variant="secondary" />

            <Button size="lg" variant="secondary" className="ml-3">
              Change
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};


MyAccountPaymentMethodsPage.getLayout = function getLayout(
  page: React.ReactElement
) {
  return <AccountLayout>{page}</AccountLayout>;
};

export default MyAccountPaymentMethodsPage;
