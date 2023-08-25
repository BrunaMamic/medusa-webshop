import * as React from 'react';

import type { NextPageWithLayout } from '@/pages/_app';
import AccountLayout from '@/layouts/AccountLayout';
import { Button, ButtonIcon } from '@/components/ui/Button';
import * as Dialog from '@/components/ui/Dialog';
import { Heading } from '@/components/ui/Heading';
import { Icon } from '@/components/ui/Icon';
import { Input } from '@/components/Input';
import { SelectCountry } from '@/components/SelectCountry';
import { useAccount } from '@/lib/context/account-context';
import { useState } from 'react';
import { sortBy } from 'lodash';

import { useForm, Controller } from 'react-hook-form';
import { Country } from '@medusajs/medusa';
import { useStore } from '@/lib/context/store-context';

const MyAccountPage: NextPageWithLayout = () => {
  const [address, setAddress] = useState();
  const [details, setDetails] = useState();
  const [postalCode, setPostalCode] = useState();
  const [city, setCity] = useState();

  const [updatedAddress1, setUpdatedAddress1] = useState();
  const [updatedAddress2, setUpdatedAddress2] = useState('');
  const [updatedPostalCode, setUpdatedPostalCode] = useState('');
  const [updatedCity, setUpdatedCity] = useState('');

  const account = useAccount();
  const { cart } = useStore();

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    watch,
  } = useForm();

  const [selectedCountry, setSelectedCountry] = React.useState<
    Country | undefined
  >();

  const handleCountryChange = (country: Country) => {
    setSelectedCountry(country);
  };

  const onSubmit = async (data: any) => {
    const response = await account.updateCustomerInfo(
      data.firstName,
      data.lastName,
      data.phone?.toString() || data.phone
    );

    if (response) {
      account.refetchCustomer();
    }
  };

  const handleAddAddress = handleSubmit(async (data) => {
    
    const newAddress = {
      first_name: account.customer?.first_name,
      last_name: account.customer?.last_name,
      address_1: data.address,
      address_2: data.details,
      city: data.city,
      country_code: selectedCountry?.iso_2,
      postal_code: data.postalCode,
      phone: account.customer?.phone,
      company: 'Wyman LLC',
      province: 'Georgia',
    };
  
    const response = await account.addAddress(newAddress);
    account.refetchCustomer();
  });

  const handleUpdateAddress = async (
    address_id: string,
    updatedAddress: any
  ) => {
    const existingAddress = account.customer?.shipping_addresses.find(
      (address) => address.id === address_id
    );

    const response = await account.updateAddress(
      address_id,
      updatedAddress.address_1 || existingAddress?.address_1,
      updatedAddress.address_2 || existingAddress?.address_2,
      updatedAddress.country_code?.iso_2 || existingAddress?.country_code,
      updatedAddress.city || existingAddress?.city,
      updatedAddress.postal_code || existingAddress?.postal_code
    );
    
    setUpdatedAddress1(undefined);
    setUpdatedAddress2('');
    setUpdatedPostalCode('');
    setUpdatedCity('')
  };

  const handleDeleteAddress = async (addressId: any) => {
    const updatedCustomer = await account.deleteAddress(addressId);
    if (updatedCustomer) {
      console.log('deleted');
      account.refetchCustomer();
    }
  };

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
                <li className="text-sm text-black">
                  {account.customer.first_name} {account.customer.last_name}
                </li>
              </ul>

              <ul className="flex-1">
                <li className="mb-0.5 text-xs2 text-gray-400">Number</li>
                <li className="break-all text-sm text-black">
                  {account.customer.phone}
                </li>
              </ul>
            </div>

            <Dialog.Root>
              <Dialog.Trigger asChild>
                <Button variant="secondary" className="self-start">
                  Change
                </Button>
              </Dialog.Trigger>
              <Dialog.Overlay />
              <form onSubmit={handleSubmit(onSubmit)}>
                <Dialog.Content>
                  <Dialog.Title>Personal information</Dialog.Title>
                  <div className="mb-4 flex w-full gap-x-4 lg:mb-8 lg:gap-x-6">
                    <Controller
                      name="firstName"
                      control={control}
                      rules={{
                        minLength: { value: 2, message: 'premalo slova' },
                        maxLength: { value: 15, message: 'previse slova' },
                        pattern: {
                          value: /^[a-zA-Z]+$/,
                          message: 'samo slova dopustena',
                        },
                      }}
                      render={({ field }: any) => (
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
                        minLength: { value: 2, message: 'premalo slova' },
                        maxLength: { value: 15, message: 'previse slova' },
                        pattern: {
                          value: /^[a-zA-Z]+$/,
                          message: 'samo slova dopustena',
                        },
                      }}
                      render={({ field }: any) => (
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
                    name="phone"
                    control={control}
                    rules={{
                      maxLength: { value: 10, message: 'previse brojeva' },
                      pattern: {
                        value:
                          /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                        message: 'krivi format broja mobitela',
                      },
                    }}
                    render={({ field }: any) => (
                      <Input
                        type="text"
                        label="Phone"
                        wrapperClassName="mb-4 lg:mb-10"
                        errorMessage={errors.phone?.message}
                        {...field}
                      />
                    )}
                  />

                  <div className="flex justify-between">
                    <Dialog.Close asChild>
                      <Button
                        variant="primary"
                        aria-label="Save changes"
                        type="submit"
                      >
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
              </form>
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
                {account.customer.email}
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
          {account.customer &&
            account.customer.shipping_addresses.length === 0 && <p>nema</p>}

          {account.customer &&
            sortBy(account.customer.shipping_addresses, 'created_at').map(
              (address: any) => (
                <div
                  key={address.id}
                  className="mb-10 flex flex-wrap items-start justify-between gap-8 rounded-sm border border-gray-200 p-4"
                >
                  <Icon name="user" className="shrink-0" />

                  <div className="mr-auto flex-1 self-start">
                    <div className="mb-8 flex gap-8">
                      <ul className="flex-1">
                        <li className="mb-0.5 text-xs2 text-gray-400">
                          Country
                        </li>
                        <li className="text-sm text-black">
                          {
                            cart?.region?.countries.find(
                              (country: any) =>
                                country?.iso_2 === address?.country_code
                            )?.display_name
                          }
                        </li>
                      </ul>

                      <ul className="flex-1">
                        <li className="mb-0.5 text-xs2 text-gray-400">
                          Address
                        </li>
                        <li className="text-sm text-black">
                          {address.address_1}
                        </li>
                      </ul>
                    </div>
                    <ul className="mb-8 flex-1 gap-4">
                      <li className="mb-0.5 text-xs2 text-gray-400">
                        Apartment, suite, etc. (Optional)
                      </li>
                      <li className="text-sm text-black">
                        {address.address_2}
                      </li>
                    </ul>
                    <div className="flex gap-8">
                      <ul className="flex-1">
                        <li className="mb-0.5 text-xs2 text-gray-400">
                          Postal Code
                        </li>
                        <li className="text-sm text-black">
                          {address.postal_code}
                        </li>
                      </ul>

                      <ul className="flex-1">
                        <li className="mb-0.5 text-xs2 text-gray-400">City</li>
                        <li className="text-sm text-black">{address.city}</li>
                      </ul>
                    </div>
                  </div>
                  <div className="ml-auto flex gap-x-4">
                    <ButtonIcon
                      size="lg"
                      iconName="trash"
                      variant="secondary"
                      className="mt-2"
                      onPress={() => {
                        handleDeleteAddress(address.id);
                      }}
                    />

                    <Dialog.Root>
                      <Dialog.Trigger asChild>
                        <Button
                          variant="secondary"
                          onPress={() => {
                            const country = (
                              cart?.region?.countries || []
                            ).find(
                              (country) =>
                                country.iso_2 === address.country_code
                            );
                            console.log(country);
                            setSelectedCountry(country);
                          }}
                        >
                          Change
                        </Button>
                      </Dialog.Trigger>
                      <Dialog.Overlay />

                      
                      <Dialog.Content>
                        <Dialog.Title>Change address</Dialog.Title>

                        <SelectCountry
                          selectedCountry={selectedCountry}
                          onCountryChange={handleCountryChange}
                        />

                        <Input
                          type="text"
                          label="Address"
                          wrapperClassName="flex-1 mb-4 lg:mb-8 mt-8"
                          defaultValue={address.address_1}
                          onChange={(e: any) =>
                            setUpdatedAddress1(e.target.value)
                          }
                        />
                        <Input
                          type="text"
                          label="Apartment, suite, etc. (Optional)"
                          wrapperClassName="flex-1 mb-4 lg:mb-8"
                          defaultValue={address.address_2}
                          onChange={(e) => setUpdatedAddress2(e.target.value)}
                        />
                        <div className="mb-4 flex w-full gap-x-4 lg:mb-8 lg:gap-x-6">
                          <Input
                            type="number"
                            label="Postal Code"
                            wrapperClassName="flex-1"
                            defaultValue={address.postal_code}
                            onChange={(e: any) =>
                              setUpdatedPostalCode(e.target.value)
                            }
                          />
                          <Input
                            type="text"
                            label="City"
                            wrapperClassName="flex-1"
                            defaultValue={address.city}
                            onChange={(e) => setUpdatedCity(e.target.value)}
                          />
                        </div>
                        <div className="flex justify-between">
                          <Dialog.Close asChild>
                            <Button
                              variant="primary"
                              aria-label="Save changes"
                              onPress={() => {
                                const updatedAddress = {
                                  address_1: updatedAddress1,
                                  address_2: updatedAddress2,
                                  country_code: selectedCountry,
                                  postal_code: updatedPostalCode,
                                  city: updatedCity,
                                };
                                handleUpdateAddress(address.id, updatedAddress);

                                const country = (
                                  cart?.region?.countries || []
                                ).find(
                                  (country) =>
                                    country.iso_2 === address.country_code
                                );
                                console.log(country);
                                setSelectedCountry(country);
                              }}
                            >
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
                </div>
              )
            )}

          <Dialog.Root>
            <Dialog.Trigger asChild>
              <Button variant="primary" size="lg">
                Add another address
              </Button>
            </Dialog.Trigger>
            <Dialog.Overlay />

            {/* forma ode  */}
            <form onSubmit={handleAddAddress}>
              <Dialog.Content>
                <Dialog.Title>Add address</Dialog.Title>
                <SelectCountry
                  selectedCountry={selectedCountry}
                  onCountryChange={handleCountryChange}
                />
                <Controller
                  name="address"
                  control={control}
                  defaultValue={address}
                  rules={{
                    required: 'unesi',
                  }}
                  render={({ field }: any) => (
                    <Input
                      type="text"
                      label="Address"
                      wrapperClassName="flex-1 mb-4 lg:mb-8 mt-8"
                      errorMessage={errors.address?.message}
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="details"
                  control={control}
                  defaultValue={details}
                  rules={{
                    required: 'unesi',
                  }}
                  render={({ field }: any) => (
                    <Input
                      type="text"
                      label="Apartment, suite, etc. (Optional)"
                      wrapperClassName="flex-1 mb-4 lg:mb-8"
                      errorMessage={errors.details?.message}
                      {...field}
                    />
                  )}
                />
                <div className="mb-4 flex w-full gap-x-4 lg:mb-8 lg:gap-x-6">
                  <Controller
                    name="postalCode"
                    control={control}
                    defaultValue={postalCode}
                    rules={{
                      required: 'unesi',
                    }}
                    render={({ field }: any) => (
                      <Input
                        type="number"
                        label="Postal Code"
                        wrapperClassName="flex-1"
                        errorMessage={errors.postalCode?.message}
                        {...field}
                      />
                    )}
                  />
                  <Controller
                    name="city"
                    control={control}
                    defaultValue={city}
                    rules={{
                      required: 'unesi',
                    }}
                    render={({ field }: any) => (
                      <Input
                        type="text"
                        label="City"
                        wrapperClassName="flex-1"
                        errorMessage={errors.city?.message}
                        {...field}
                      />
                    )}
                  />
                </div>
                <div className="flex justify-between">
                  <Dialog.Close asChild>
                    <Button
                      variant="primary"
                      aria-label="Save changes"
                      type="submit"
                      isDisabled={!isValid}
                      // onPress={handleAddAddress}
                    >
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
            </form>
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
    <>Not logged in</>
  );
};

MyAccountPage.getLayout = function getLayout(page: React.ReactElement) {
  return <AccountLayout>{page}</AccountLayout>;
};

export default MyAccountPage;
