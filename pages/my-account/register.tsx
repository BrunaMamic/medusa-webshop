import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
import AuthLayout from '@/layouts/AuthLayout';
import { useCreateCustomer } from 'medusa-react';
import { Input } from '@/components/Input';

import { handleRegistration } from '@/lib/context/account-context';

const MyAccountRegisterPage = () => {
  const createCustomer = useCreateCustomer();

  const handleCreate = async () => {
    try {
      const userData = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        password: 'mysecretpassword',
      };
      await handleRegistration(userData);
      console.log('Registration successful');
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

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

        <button size="lg" className="w-full" onClick={handleCreate}>
          Register
        </button>
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
