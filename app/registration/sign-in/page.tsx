import { Button } from '@/components/ui/Button';
import { Input } from '@/components/Input';
import { Heading } from '@/components/ui/Heading';
import Link from 'next/link';

const SignIn = () => (
  <div className="w-full max-w-sm">
    <Heading className="mb-8 !leading-[1.1] text-primary lg:mb-16" size="xl3">
      Hey gorgeous,
      <br /> welcome back
    </Heading>

    <form className="mb-4 xl:mb-16">
      <Input type="email" label="Email" className="mb-4 lg:mb-8" />

      <Input type="password" label="Password" className="mb-8" />

      <Link href="/account">
        <Button size="lg" className="w-full">
          Log in
        </Button>
      </Link>
    </form>

    <p className="text-gray-400">
      Not red yet? Bro just{' '}
      <Link
        href="sign-up"
        className="relative ml-1 cursor-pointer text-primary before:absolute before:-bottom-1 before:h-[0.0625rem] before:w-full before:bg-primary hover:text-primary-900 hover:before:bg-primary-900"
      >
        sign up
      </Link>
    </p>
  </div>
);

export default SignIn;
