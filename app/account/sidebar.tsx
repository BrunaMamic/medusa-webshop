'use client';

import classNames from '@/utils/classNames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heading } from '@/components/ui/Heading';

export const Sidebar = () => {
  const pathname = usePathname();
  const activeItemClasses = 'font-black text-primary italic';

  return (
    <div className="block w-full whitespace-nowrap bg-gray-50 lg:sticky lg:top-0 lg:h-screen lg:w-auto lg:px-10 lg:pb-16 lg:pt-23 xl:px-23">
      <Heading className="mb-8 hidden text-primary lg:block xl:mb-12" size="xl">
        My account
      </Heading>

      <ul className="flex justify-between gap-x-8 gap-y-6 overflow-auto px-4 py-6 lg:flex-col lg:px-0">
        <li
          className={classNames(
            pathname === '/account/personal-and-security' && activeItemClasses
          )}
        >
          <Link href="/account/personal-and-security">Personal & security</Link>
        </li>
        <li
          className={classNames(
            pathname === '/account/payment-method' && activeItemClasses
          )}
        >
          <Link href="/account/payment-method">Payment method</Link>
        </li>
        <li
          className={classNames(
            pathname.startsWith('/account/my-orders') && activeItemClasses
          )}
        >
          <Link href="/account/my-orders">My orders</Link>
        </li>
        <li className="bottom-37 cursor-pointer lg:absolute">
          <Link href="/">Log out</Link>
        </li>
      </ul>
    </div>
  );
};
