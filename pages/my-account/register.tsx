import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
import AuthLayout from '@/layouts/AuthLayout';
import {
  useAccount,
  checkIfCustomerExists,
} from '@/lib/context/account-context';
import { useForm, Controller } from 'react-hook-form';
import { Input } from '@/components/Input';
import { handleRegistrationClick } from '@/lib/context/account-context';
import router from 'next/router';

import { z } from 'zod';

const passwordSchema = z.string().min(3).max(10);

const MyAccountRegisterPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm();
  const account = useAccount();

  const [emailError, setEmailError] = useState('');

  const onSubmit = async (data: any) => {
    const emailExists = await checkIfCustomerExists(data.email);

    if (emailExists) {
      setEmailError('email postoji');
      return;
    }
    

    const customer = await handleRegistrationClick(
      data.firstName,
      data.lastName,
      data.email,
      data.password
    );

    if (customer) {
      account.refetchCustomer();
    }

    router.push('/my-account');
  };

  return (
    <div className="w-full max-w-sm">
      <Heading className="mb-8 !leading-[1.1] text-primary lg:mb-14" size="xl3">
        Hey gorgeous,
        <br /> welcome to red
      </Heading>

      <form className="mb-4 xl:mb-16" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 flex flex-col gap-x-6 gap-y-4 sm:flex-row lg:mb-8 lg:gap-y-8">
          <Controller
            name="firstName"
            control={control}
            rules={{
              required: 'First name is required',
              minLength: { value: 2, message: 'premalo slova' },
              maxLength: { value: 15, message: 'previse slova' },
              pattern: {
                value: /^[a-zA-Z]+$/,
                message: 'samo slova dopustena',
              },
            }}
            render={({ field }) => (
              <Input
                type="text"
                label="First name"
                wrapperClassName="flex-1"
                errorMessage={errors.firstName?.message}
                {...field}
              />
            )}
          />

          <Controller
            name="lastName"
            control={control}
            rules={{
              required: 'Last name is required',
              minLength: { value: 2, message: 'premalo slova' },
              maxLength: { value: 15, message: 'previse slova' },
              pattern: {
                value: /^[a-zA-Z]+$/,
                message: 'samo slova dopustena',
              },
            }}
            render={({ field }) => (
              <Input
                type="text"
                label="Last name"
                wrapperClassName="flex-1"
                errorMessage={errors.lastName?.message}
                {...field}
              />
            )}
          />
        </div>

        <Controller
          name="email"
          control={control}
          rules={{
            required: 'Email is required',
            maxLength: { value: 35, message: 'previse slova' },
            pattern: { value: /\S+@\S+\.\S+/, message: 'unesi pravi format' },
          }}
          render={({ field }) => (
            <Input
              type="email"
              label="Email"
              wrapperClassName="mb-4 lg:mb-8"
              errorMessage={emailError || errors.email?.message}
              {...field}
            />
            
          )}
          
        />

        <Controller
          name="password"
          control={control}
          rules={{
            required: 'Password is required',
            minLength: { value: 3, message: 'vise znakova' },
          }}
          // rules={{ required: 'Password is required', maxLength: 10, pattern: /^([@#](?=[^aeiou]{3,10}$)(?=[[:alnum:]]{3,10}$)(?=.*[A-Z]{1,}.*$).+)$/}}
          render={({ field }) => (
            <Input
              type="password"
              label="Password"
              wrapperClassName="mb-4 lg:mb-8"
              {...field}
            />
          )}
        />

        <Controller
          name="passConf"
          control={control}
          rules={{
            required: 'Password is required',
            validate: (value) =>
              value === watch('password') || 'Passwords do not match',
          }}
          // rules={{ required: 'Password conf is required', maxLength: 10, pattern: /^([@#](?=[^aeiou]{3,10}$)(?=[[:alnum:]]{3,10}$)(?=.*[A-Z]{1,}.*$).+)$/}}
          render={({ field }) => (
            <Input
              type="password"
              label="Confirm Password"
              wrapperClassName="mb-8"
              {...field}
              errorMessage={errors.passConf?.message}
              // errorMessage={!passwordsMatch ? 'Passwords do not match.' : ''}
            />
          )}
        />

        <Button size="lg" className="w-full" type="submit">
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
  );
};

MyAccountRegisterPage.getLayout = function getLayout(page: React.ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default MyAccountRegisterPage;
