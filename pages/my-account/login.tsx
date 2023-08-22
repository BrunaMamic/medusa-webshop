import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import type { NextPageWithLayout } from '@/pages/_app';
import AuthLayout from '@/layouts/AuthLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/Input';
import { Heading } from '@/components/ui/Heading';
import { checkIfCustomerExists, handleLogin } from '@/lib/context/account-context';

const MyAccountLoginPage: NextPageWithLayout = () => {
  const [email, setEmail] = React.useState("")
  const router = useRouter()

  return (
    <div className="w-full max-w-sm">
      <Heading className="mb-8 !leading-[1.1] text-primary lg:mb-16" size="xl3">
        Hey gorgeous,
        <br /> welcome back
      </Heading>
      <form className="mb-4 xl:mb-16">
        <Input type="email" label="Email" className="mb-4 lg:mb-8" onChange={(value) => setEmail(value.target.value)} />
        <Input type="password" label="Password" className="mb-8" />
        <Button onPress={async () => {
          const exists = await checkIfCustomerExists(email)
          if (exists) {
            handleLogin();
            router.push("/my-account")
          }
        }} size="lg" className="w-full">
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