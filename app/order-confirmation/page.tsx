import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
import Link from 'next/link';

const OrderConfirmation = () => {
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
            <p className="font-bold">100002</p>

            <ul className="mt-8 text-gray-600 sm:mt-16">
              <li className="mb-2">Shipping adress:</li>
              <li>Jovana Jerimic</li>
              <li>Duvanjs 3, 10000 Zagreb, Croatia</li>
              <li>+385 226 2266</li>
            </ul>
          </div>

          <div>
            <p className="mb-2">Shipment expected:</p>
            <p className="font-bold">7 Aug - 8 Aug</p>

            <ul className="mt-8 text-gray-600 sm:mt-16">
              <li className="mb-2">Payment:</li>
              <li>Jovana Jerimic</li>
              <li>**** **** **** 1111</li>
              <li>Exp: 05/26</li>
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

export default OrderConfirmation;
