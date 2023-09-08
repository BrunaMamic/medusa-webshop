import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { NextPageWithLayout } from '@/pages/_app';
import AuthLayout from '@/layouts/AuthLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/Input';
import { Heading } from '@/components/ui/Heading';
import { useAccount } from '@/lib/context/account-context';

import { useForm, Controller } from 'react-hook-form';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

const MyAccountLoginPage: NextPageWithLayout = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const account = useAccount();

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm();


  const router = useRouter();

  React.useEffect(() => {
    if (account.customer) {
      router.push('/my-account');
    }
  }, [account]);

  // const onSubmit = async (data: any) => {
  //   setEmailError('');
  //   setPasswordError('');

  //   const customerExists = await checkIfCustomerExists(data.email);

  //   if (!customerExists) {
  //     setEmailError('Email is not registered');
  //     return;
  //   }

  //   const response = await account.handleLogin(data.email, data.password);

  //   if (response.customer) {
  //     account.refetchCustomer();
  //     console.log('', response.customer);
  //   } else if (response.error?.field === 'email') {
  //     setEmailError(response.error.message);
  //   } else if (response.error?.field === 'password') {
  //     setPasswordError(response.error.message);
  //   }
  // };

  const onSubmit = async (data: any) => {
    setLoading(true);
  
    const customer = await account.handleLogin(data.email, data.password);
    
    setLoading(false);
  
    if (customer) {
      account.refetchCustomer();
      console.log('Logged in:', customer);
    }
  };

  return (
    <div className="w-full max-w-sm">
      <Heading className="mb-8 !leading-[1.1] text-primary lg:mb-16" size="xl3">
        Hey gorgeous,
        <br /> welcome back
      </Heading>
      <form className="mb-4 xl:mb-16" onSubmit={handleSubmit(onSubmit)}>
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
              errorMessage={errors.email?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: 'Password is required' }}
          render={({ field }) => (
            <Input
              type="password"
              label="Password"
              wrapperClassName="mb-8"
              errorMessage={errors.password?.message}
              {...field}
            />
          )}
        />

        <Button
          // onPress={() => account.handleLogin(email, password)}
          type='submit'
          size="lg"
          className="w-full"
          disabled={loading}
          isLoading={loading ? true : false}
        >
          Log in
        </Button>
      </form>
      <p className="text-gray-400">
        Not red yet? Bro just{' '}
        <Link
          href="/my-account/register"
          className="relative ml-1 cursor-pointer text-primary before:absolute before:-bottom-1 before:h-[0.0625rem] before:w-full before:bg-primary hover:text-primary-900 hover:before:bg-primary-900"
        >
          sign up
        </Link>
      </p>
    </div>
  );
};
MyAccountLoginPage.getLayout = function getLayout(page: React.ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};
export default MyAccountLoginPage;
