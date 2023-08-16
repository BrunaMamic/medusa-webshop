import * as React from 'react';
import Link from 'next/link';

import type { NextPageWithLayout } from '@/pages/_app';
import AuthLayout from '@/layouts/AuthLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/Input';
import { Heading } from '@/components/ui/Heading';

const MyAccountRegisterPage: NextPageWithLayout = () => {
  return (
    <div className="w-full max-w-sm">
      <Heading className="mb-8 !leading-[1.1] text-primary lg:mb-14" size="xl3">
        Hey gorgeous,
        <br /> welcome to red
      </Heading>

      <form className="mb-4 xl:mb-16">
        <div className="mb-4 flex flex-col gap-x-6 gap-y-4 sm:flex-row lg:mb-8 lg:gap-y-8">
          <Input type="text" label="First name" wrapperClassName="flex-1" />

          <Input type="text" label="Last name" wrapperClassName="flex-1" />
        </div>

        <Input type="email" label="Email" className="mb-4 lg:mb-8" />

        <Input type="password" label="Password" className="mb-4 lg:mb-8" />

        <Input type="password" label="Confirm Password" className="mb-8" />

        <Link href="/my-account">
          <Button size="lg" className="w-full">
            Register
          </Button>
        </Link>
      </form>

      <p className="text-gray-400">
        Already red? No worrier, just{' '}
        <Link
          href="/my-account/login"
          className="relative ml-1 cursor-pointer text-primary before:absolute before:-bottom-1 before:h-[0.0625rem] before:w-full before:bg-primary hover:text-primary-900 hover:before:bg-primary-900"
        >
          log in
        </Link>
      </p>
    </div>
  );
};

MyAccountRegisterPage.getLayout = function getLayout(page: React.ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default MyAccountRegisterPage;
