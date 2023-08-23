import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
import AuthLayout from '@/layouts/AuthLayout';
import { useCreateCustomer } from 'medusa-react';
import { Input } from '@/components/Input';
import { useAccount } from '@/lib/context/account-context';

import { handleRegistrationClick } from '@/lib/context/account-context';
import router from 'next/router';

const MyAccountRegisterPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const account = useAccount();

  console.log(account.customer);
  return (
    <div className="w-full max-w-sm">
      <Heading className="mb-8 !leading-[1.1] text-primary lg:mb-14" size="xl3">
        Hey gorgeous,
        <br /> welcome to red
      </Heading>

      <form className="mb-4 xl:mb-16">
        <div className="mb-4 flex flex-col gap-x-6 gap-y-4 sm:flex-row lg:mb-8 lg:gap-y-8">
          <Input
            type="text"
            label="First name"
            wrapperClassName="flex-1"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <Input
            type="text"
            label="Last name"
            wrapperClassName="flex-1"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <Input
          type="email"
          label="Email"
          className="mb-4 lg:mb-8"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          label="Password"
          className="mb-4 lg:mb-8"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Input type="password" label="Confirm Password" className="mb-8" />

        <Button
          size="lg"
          className="w-full"
          onPress={async () => {
            const customer = await handleRegistrationClick(
              firstName,
              lastName,
              email,
              password
            );

            if (customer) {
              account.refetchCustomer()
            };
            router.push("/my-account")
          }}
        >
          Register
        </Button>
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
  )
};

MyAccountRegisterPage.getLayout = function getLayout(page: React.ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default MyAccountRegisterPage;
