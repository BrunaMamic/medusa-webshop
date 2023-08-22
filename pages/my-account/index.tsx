import * as React from 'react';
import type { NextPageWithLayout } from '@/pages/_app';
import AccountLayout from '@/layouts/AccountLayout';
import { Button } from '@/components/ui/Button';
import * as Dialog from '@/components/ui/Dialog';
import { Heading } from '@/components/ui/Heading';
import { Icon } from '@/components/ui/Icon';
import { Input } from '@/components/Input';
import { SelectCountry } from '@/components/SelectCountry';
import { useAccount } from '@/lib/context/account-context';
const MyAccountPage: NextPageWithLayout = () => {
  const account = useAccount();
  return account.customer ? (
    <div>
      <Heading size="xl" className="mb-8 text-primary lg:mb-15">
        Personal & security
      </Heading>
      <ul className="[&>li:last-child]:mb-0 [&>li]:mb-16">
        <li>
          <p className="mb-6 text-md">Personal information</p>
          <div className="flex flex-wrap justify-between gap-8 rounded-sm border border-gray-200 p-4">
            <Icon name="user" />
            <div className="flex flex-1 flex-wrap gap-8">
              <ul className="flex-1">
                <li className="mb-0.5 text-xs2 text-gray-400">Name</li>
                <li className="text-sm text-black">Jovana Jerimic</li>
              </ul>
              <ul className="flex-1">
                <li className="mb-0.5 text-xs2 text-gray-400">Number</li>
                <li className="break-all text-sm text-black">-</li>
              </ul>
            </div>
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <Button variant="secondary" className="self-start">
                  Change
                </Button>
              </Dialog.Trigger>
              <Dialog.Overlay />
              <Dialog.Content>
                <Dialog.Title>Personal information</Dialog.Title>
                <div className="mb-4 flex w-full gap-x-4 lg:mb-8 lg:gap-x-6">
                  <Input
                    type="text"
                    label="First name"
                    wrapperClassName="flex-1"
                  />
                  <Input
                    type="text"
                    label="Last name"
                    wrapperClassName="flex-1"
                  />
                </div>
                <Input
                  type="phone"
                  label="Phone"
                  className="mb-4 lg:mb-10"
                  defaultValue="+385"
                />
                <div className="flex justify-between">
                  <Dialog.Close asChild>
                    <Button variant="primary" aria-label="Save changes">
                      Save changes
                    </Button>
                  </Dialog.Close>
                  <Dialog.Close asChild>
                    <Button variant="secondary" aria-label="Cancel">
                      Cancel
                    </Button>
                  </Dialog.Close>
                </div>
              </Dialog.Content>
            </Dialog.Root>
          </div>
        </li>
        <li>
          <p className="mb-6 text-md">Contact</p>
          <div className="mb-2 flex rounded-sm border border-gray-200 p-4">
            <Icon name="user" className="shrink-0" />
            <ul className="ml-8">
              <li className="mb-0.5 text-xs2 text-gray-400">Email</li>
              <li className="break-all text-sm text-black">
                jovana.jerimic@gmail.com
              </li>
            </ul>
          </div>
          <p className="text-xs2 text-gray-400">
            If you want to change your email please contact us via customer
            support.
          </p>
        </li>
        <li>
          <p className="mb-6 text-md">Address</p>
          <div className="mb-10 flex flex-wrap items-start justify-between gap-8 rounded-sm border border-gray-200 p-4">
            <Icon name="user" className="shrink-0" />
            <div className="mr-auto flex-1 self-start">
              <div className="mb-8 flex gap-8">
                <ul className="flex-1">
                  <li className="mb-0.5 text-xs2 text-gray-400">Country</li>
                  <li className="text-sm text-black">Croatia</li>
                </ul>
                <ul className="flex-1">
                  <li className="mb-0.5 text-xs2 text-gray-400">Address</li>
                  <li className="text-sm text-black">Duvanjsa 3</li>
                </ul>
              </div>
              <ul className="mb-8 flex-1 gap-4">
                <li className="mb-0.5 text-xs2 text-gray-400">
                  Apartment, suite, etc. (Optional)
                </li>
                <li className="text-sm text-black">Kat 2</li>
              </ul>
              <div className="flex gap-8">
                <ul className="flex-1">
                  <li className="mb-0.5 text-xs2 text-gray-400">Postal Code</li>
                  <li className="text-sm text-black">10000</li>
                </ul>
                <ul className="flex-1">
                  <li className="mb-0.5 text-xs2 text-gray-400">City</li>
                  <li className="text-sm text-black">Zagreb</li>
                </ul>
              </div>
            </div>
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <Button variant="secondary">Change</Button>
              </Dialog.Trigger>
              <Dialog.Overlay />
              <Dialog.Content>
                <Dialog.Title>Change address</Dialog.Title>
                <SelectCountry />
                <Input
                  type="text"
                  label="Address"
                  wrapperClassName="flex-1 mb-4 lg:mb-8 mt-8"
                />
                <Input
                  type="text"
                  label="Apartment, suite, etc. (Optional)"
                  wrapperClassName="flex-1 mb-4 lg:mb-8"
                />
                <div className="mb-4 flex w-full gap-x-4 lg:mb-8 lg:gap-x-6">
                  <Input
                    type="number"
                    label="Postal Code"
                    wrapperClassName="flex-1"
                  />
                  <Input type="text" label="City" wrapperClassName="flex-1" />
                </div>
                <div className="flex justify-between">
                  <Dialog.Close asChild>
                    <Button variant="primary" aria-label="Save changes">
                      Save changes
                    </Button>
                  </Dialog.Close>
                  <Dialog.Close asChild>
                    <Button variant="secondary" aria-label="Cancel">
                      Cancel
                    </Button>
                  </Dialog.Close>
                </div>
              </Dialog.Content>
            </Dialog.Root>
          </div>
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <Button variant="primary" size="lg">
                Add another address
              </Button>
            </Dialog.Trigger>
            <Dialog.Overlay />
            <Dialog.Content>
              <Dialog.Title>Add address</Dialog.Title>
              <SelectCountry />
              <Input
                type="text"
                label="Address"
                wrapperClassName="flex-1 mb-4 lg:mb-8 mt-8"
              />
              <Input
                type="text"
                label="Apartment, suite, etc. (Optional)"
                wrapperClassName="flex-1 mb-4 lg:mb-8"
              />
              <div className="mb-4 flex w-full gap-x-4 lg:mb-8 lg:gap-x-6">
                <Input
                  type="number"
                  label="Postal Code"
                  wrapperClassName="flex-1"
                />
                <Input type="text" label="City" wrapperClassName="flex-1" />
              </div>
              <div className="flex justify-between">
                <Dialog.Close asChild>
                  <Button variant="primary" aria-label="Save changes">
                    Add address
                  </Button>
                </Dialog.Close>
                <Dialog.Close asChild>
                  <Button variant="secondary" aria-label="Cancel">
                    Cancel
                  </Button>
                </Dialog.Close>
              </div>
            </Dialog.Content>
          </Dialog.Root>
        </li>
        <li>
          <p className="mb-6 text-md">Change password</p>
          <p className="mb-12 text-gray-500">
            Perhaps you&apos;ve scribbled your password on a scrap of paper or
            you&apos;re the type who likes to change it every now and then to
            feel safer. Or maybe you had a rough weekend, and well, we know what
            can happen on weekends ( ͡° ͜ʖ ͡°). No worries, to change your
            password, we&apos;ll send you an email. Just click on the reset
            button below.
          </p>
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <Button size="lg">Reset password</Button>
            </Dialog.Trigger>
            <Dialog.Overlay />
            <Dialog.Content>
              <Dialog.Close asChild>
                <button className="absolute right-4 top-4 text-gray-900">
                  <Icon name="x" />
                </button>
              </Dialog.Close>
              <Dialog.Title>Personal information</Dialog.Title>
              <div className="text-xs text-gray-500">
                <p>
                  We have sent an email with instructions on how to <br />
                  change the password.
                </p>
              </div>
            </Dialog.Content>
          </Dialog.Root>
        </li>
      </ul>
    </div>
  ) : (
    <p>Not logged in</p>
  );
};
MyAccountPage.getLayout = function getLayout(page: React.ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};
export default MyAccountPage;