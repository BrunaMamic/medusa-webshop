import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import type { NextPageWithLayout } from '@/pages/_app';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/Input';
import classNames from '@/utils/classNames';
import { Icon } from '@/components/ui/Icon';
import { Heading } from '@/components/ui/Heading';
import { Tag } from '@/components/ui/Tag';
import { SelectCountry } from '@/components/SelectCountry';
import {
  Cart,
  Country,
  ShippingMethod,
  ShippingOption,
  StorePostCartsCartReq,
} from '@medusajs/medusa';
import { useAccount } from '@/lib/context/account-context';
import { useStore } from '@/lib/context/store-context';
import { useCart, useRegions } from 'medusa-react';
import { AddressPayload } from '@medusajs/types';
import { useEffect, useMemo, useState } from 'react';

import { MEDUSA_BACKEND_URL } from '@/lib/config';
import Medusa from '@medusajs/medusa-js';
import { PricedShippingOption } from '@medusajs/medusa/dist/types/pricing';
import { useRouter } from 'next/router';
import BillingAddressFormComponent from '@/components/BillingAddressForm';
import DeliveryAddressFields from '@/components/DeliveryAddress';
import OrderSummary from '@/components/OrderSummary';

import { Elements } from '@stripe/react-stripe-js';
import Form from '../components/ui/Form';
import { loadStripe } from '@stripe/stripe-js';
import { unknown } from 'zod';

const medusa = new Medusa({ baseUrl: MEDUSA_BACKEND_URL, maxRetries: 3 });
const stripePromise = loadStripe(
  'pk_test_51NrxZwKjuX4Edlrbp2SVaajF5HrAqXnAwzVlk45AVaVeVpEOFqsPgxUMMGuuM3cIf6ZRT4qcM35PAbClwa3Yro9F00VLZ3MCVf'
);

const CheckoutPage: NextPageWithLayout = () => {
  const [step, setStep] = React.useState(1);
  const [cardAdded, setCardAdded] = React.useState(false);
  const [checkoutVisible, setCheckoutVisible] = React.useState(false);
  const [email, setEmail] = useState<string>();
  const [showBillingAddress, setShowBillingAddress] = React.useState(false);
  const account = useAccount();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [billingAddressData, setBillingAddressData] = useState({
    first_name: '',
    last_name: '',
    address_1: '',
    address_2: '',
    city: '',
    postal_code: '',
    phone: '',
    country: account.customer?.shipping_addresses[0].country_code,
  });

  const [showBillingForm, setShowBillingForm] = React.useState(false);

  const router = useRouter();
  const { cart, resetCart, countryCode, addEmail } = useStore();
  const { updateCart, setCart } = useCart();

  const [shippingOptions, setShippingOptions] = React.useState<
    PricedShippingOption[] | undefined
  >();
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const regions = useRegions();
  const allCountries = regions.regions?.flatMap((region) => region.countries);
  const filteredCountries = allCountries?.filter(
    (country) => country.region_id === cart?.region_id
  );
  const shippingMethodSelection = () => {
    medusa.shippingOptions
      .listCartOptions(cart?.id as string)
      .then(({ shipping_options }) => {
        setShippingOptions(shipping_options);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleMethodSelection = (optionId: string) => {
    setSelectedMethod(optionId);
  };

  const addShippingMethod = async () => {
    if (selectedMethod) {
      await medusa.carts
        .addShippingMethod(cart?.id as string, {
          option_id: selectedMethod,
        })
        .then(({ cart }) => {
          setCart(cart);
        })
        .catch((error) => {
          console.error('Error', error);
        });
    }
  };

  const [clientSecret, setClientSecret] = useState<string>();

  const createPaymentSession = (cartId: string) => {
    medusa.carts.createPaymentSessions(cart?.id!).then(({ cart }) => {
      const isStripeAvailable = cart.payment_sessions?.some(
        (session) => session.provider_id === 'stripe'
      );
      if (!isStripeAvailable) {
        return;
      }

      // select stripe payment session
      medusa.carts
        .setPaymentSession(cart.id, {
          provider_id: 'stripe',
        })
        .then(({ cart }) => {
          const clientSecret = cart?.payment_session?.data
            .client_secret as string;
          setClientSecret(clientSecret);
        });
    });
    // if (cartId) {
    //   medusa.carts
    //     .createPaymentSessions(cartId)
    //     .then(({ cart }) => {})
    //     .catch((error) => {
    //       console.error('Error', error);
    //     });
    // }
  };

  const onExpDateChange = (event: any) => {
    const value = event.currentTarget.value.replace(/\D/g, '');

    if (value.length > 2) {
      event.currentTarget.value = value.slice(0, 2) + '/' + value.slice(2);
    } else {
      event.currentTarget.value = value;
    }
  };

  useEffect(() => {
    if (step === 2 && !cart?.shipping_address_id) {
      copyShippingAddressToCart();
    }

    if (step === 3 && (cart?.shipping_methods || [])?.length > 0) {
      setSelectedMethod(cart?.shipping_methods[0].shipping_option?.id || '');
    }
    shippingMethodSelection();
  }, [step]);

  const copyBillingAddress = () => {
    const shippingAddress = account.customer?.shipping_addresses[0];
    if (shippingAddress) {
      const {
        company,
        first_name,
        last_name,
        address_1,
        address_2,
        city,
        country_code,
        province,
        postal_code,
        phone,
      } = shippingAddress;

      if (cart?.id) {
        updateCart.mutateAsync({
          billing_address: {
            company,
            first_name,
            last_name,
            address_1,
            address_2,
            city,
            country_code,
            province,
            postal_code,
            phone,
          } as AddressPayload,
        });
      }
    }
  };

  console.log(cart);

  const copyShippingAddressToCart = () => {
    // const shippingAddress = account.customer?.shipping_addresses?.filter(x => x.defulatAdddress === true)[0];
    const shippingAddress = account.customer?.shipping_addresses?.filter(
      (shipping_address) => shipping_address.country_code === countryCode
    )?.[0];
    if (shippingAddress) {
      const {
        company,
        first_name,
        last_name,
        address_1,
        address_2,
        city,
        country_code,
        province,
        postal_code,
        phone,
      } = shippingAddress;

      if (cart?.id) {
        updateCart.mutateAsync({
          shipping_address: {
            company,
            first_name,
            last_name,
            address_1,
            address_2,
            city,
            country_code,
            province,
            postal_code,
            phone,
          } as AddressPayload,
        });
      }
    }
  };

  const handleBillingAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof typeof billingAddressData
  ) => {
    const updatedBillingAddressData: typeof billingAddressData = {
      ...billingAddressData,
    };
    updatedBillingAddressData[field] = e.target?.value;
    setBillingAddressData(updatedBillingAddressData);
  };

  const updateCountry = async (payload: string) => {
    const selectedCountry = allCountries?.find(
      (country) => country.iso_2 === payload
    );

    if (selectedCountry && selectedCountry.region_id !== cart?.region_id) {
      setErrorMessage('Selected country does not match the region.');
      return;
    }
    setErrorMessage('');
    await updateCart.mutateAsync({
      shipping_address: {
        country_code: payload,
      } as AddressPayload,
      billing_address: {
        country_code: payload,
      } as AddressPayload,
    });
  };

  const renderAddressOrEmpty = () => {
    if (cart?.shipping_address) {
      return (
        <ul className="mt-8 [&>ul:last-child]:mb-0 [&>ul]:mb-8">
          <ul className="flex [&>li:first-child]:break-words">
            <li className="w-1/3 pr-6 text-gray-400 md:w-1/5">Name</li>

            <li className="w-2/3 text-gray-600 md:w-4/5">
              {cart?.shipping_address?.first_name}{' '}
              {cart?.shipping_address?.last_name}
            </li>
          </ul>

          <ul className="flex [&>li:first-child]:break-words">
            <li className="w-1/3 pr-6 text-gray-400 md:w-1/5">Ship to</li>

            <li className="w-2/3 text-gray-600 md:w-4/5">
              {cart?.shipping_address?.address_1},{' '}
              {cart?.shipping_address?.postal_code}{' '}
              {cart?.shipping_address?.city},{' '}
              {
                cart?.region?.countries.find(
                  (country: Country) =>
                    country?.iso_2 === cart?.shipping_address?.country_code
                )?.display_name
              }
            </li>
          </ul>

          <ul className="flex [&>li:first-child]:break-words">
            <li className="w-1/3 pr-6 text-gray-400 md:w-1/5">Phone</li>

            <li className="w-2/3 text-gray-600 md:w-4/5">
              {cart?.shipping_address?.phone}
            </li>
          </ul>
        </ul>
      );
    } else {
      return null;
    }
  };

  const copyBillingAddressToCustomer = async (billingAddressData: any) => {
    const customerId = account.customer?.id as string;
    // console.log(customerId);

    try {
      const customer = await medusa.customers.retrieve({ id: customerId });

      if (!customer) {
        console.error('Customer not found');
        return;
      }
      console.log(customer);

      const updatedCustomer = await medusa.customers.update({
        billing_address: {
          first_name: billingAddressData.first_name,
          last_name: billingAddressData.last_name,
          address_1: billingAddressData.address_1,
          address_2: billingAddressData.address_2,
          city: billingAddressData.city,
          country_code: billingAddressData.country_code,
          province: billingAddressData.province,
          postal_code: billingAddressData.postal_code,
          phone: billingAddressData.phone,
        },
      });

      console.log(
        'Billing address copied to customer:',
        updatedCustomer.customer
      );
    } catch (error) {
      console.error('Error copying billing address to customer:', error);
    }
  };

  const updateField = async (value: string, key: string) => {
    try {
      await updateCart.mutateAsync({
        shipping_address: {
          [key]: value,
        },
      });
    } catch (e) {
      console.log('ERROR', e);
    }
  };

  const handlePlaceOrder = async () => {
    // try {
    //   // const medusa = new Medusa({ baseUrl: MEDUSA_BACKEND_URL, maxRetries: 3 });

    //   // const { type, data } = await medusa.carts.complete(cart?.id || '');
    //   // console.log('Before router.push');
    //   // router.push({
    //   //   pathname: '/order-confirmation',
    //   //   query: { id: data.id },
    //   // });
    //   // console.log('After router.push');
    // } catch (error) {
    //   console.error('Error:', error);
    // }
    resetCart();
  };
  

  const getNewBillingAddress = async () => {
    try {
      await updateCart.mutateAsync({
        billing_address: {
          first_name: billingAddressData.first_name,
          last_name: billingAddressData.last_name,
          address_1: billingAddressData.address_1,
          address_2: billingAddressData.address_2,
          city: billingAddressData.city,
          postal_code: billingAddressData.postal_code,
          phone: billingAddressData.phone,
          country_code: billingAddressData.country || '',
        },
      });
    } catch (e) {
      console.error('ERROR', e);
    }
    setShowBillingAddress(false);
  };

  const form = useMemo(
    () => (
      <form>
        <DeliveryAddressFields
          cart={cart}
          updateField={updateField}
          errorMessage={errorMessage}
          updateCountry={updateCountry}
        />

        {/* <div className="my-10 flex items-start gap-1">
          <input
            onClick={() => setShowBillingAddress(!showBillingAddress)}
            type="checkbox"
            name="email"
            id="email"
            className="relative h-4 w-4 shrink-0 cursor-pointer appearance-none border border-gray-400 transition-all checked:border-gray-900 checked:bg-gray-900 checked:before:absolute checked:before:left-[0.1875rem] checked:before:top-[0.1875rem] checked:before:h-[0.3125rem] checked:before:w-2 checked:before:-rotate-45 checked:before:border-b-2 checked:before:border-l-2 checked:before:border-gray-10 checked:before:content-[''] hover:border-primary hover:checked:bg-primary focus-visible:outline-0"
          />
          <label
            htmlFor="email"
            className="cursor-pointer text-xs2 text-gray-400 lg:text-xs"
          >
            Use different billing address
          </label>
        </div> */}

        {/* {showBillingAddress && (
          <BillingAddressFormComponent
            cart={cart}
            billingAddressData={billingAddressData}
            errorMessage={errorMessage}
            handleBillingAddressChange={handleBillingAddressChange}
            setBillingAddressData={setBillingAddressData}
          />
        )} */}

        <Button
          size="lg"
          className="mt-10"
          onPress={() => {
            setStep(3);
            shippingMethodSelection();
            copyBillingAddress();

            // if (showBillingForm) {
            //   getNewBillingAddress();
            // } else {
            //   copyBillingAddress();
            // }
          }}
        >
          Next
        </Button>
      </form>
    ),
    [showBillingAddress, cart, updateField, errorMessage, updateCountry]
  );

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
      }}
    >
      <div className="flex h-full flex-col-reverse lg:flex-row">
        <div className="px-4 pb-10 pt-6 lg:w-1/2 lg:px-12 xl:w-[55%] xl:px-24">
          <Link href="/" className="mb-14 hidden lg:inline-block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="95"
              height="36"
              fill="none"
            >
              <g fill="#1E2DA0" clipPath="url(#a)">
                <path d="M58.596 36h-26.75L38.104.11h26.75L62.75 12.073H50.067l-.221 1.053h12.738l-1.661 9.415H48.24l-.222 1.108h12.683l-2.105 12.35ZM66.184.11h14.677c10.357 0 14.843 5.04 13.126 14.899l-1.218 6.923c-.554 3.157-1.385 5.705-2.603 7.865C87.84 33.95 83.74 36 76.264 36H59.926L66.184.11Zm12.351 11.52L76.43 24.036h.056c1.052 0 1.384-.276 1.717-2.27l1.384-8.031c.333-1.772.222-2.105-.941-2.105h-.111ZM35.502 7.089c-.388-2.437-1.717-4.32-4.265-5.539C30.13.997 28.745.61 27.084.387A31.326 31.326 0 0 0 22.93.11H6.536L.277 36h14.4l1.883-10.69c.887 0 1.219.111 1.053 1.607-.056.221-.056.498-.111.83l-1.052 5.871L16.062 36h14.4l.332-1.828 1.163-6.535.111-.499c.83-4.763.222-6.812-3.6-7.643 2.437-.554 4.32-1.662 5.594-3.877.61-1.108 1.108-2.492 1.385-4.154.221-1.606.276-3.101.055-4.375Zm-14.954 6.203c-.166.83-.443 1.385-.83 1.661a1.323 1.323 0 0 1-.776.277h-.665l.665-3.766h.61c.332 0 .553.111.72.277.332.277.442.886.276 1.55Z" />
              </g>
              <defs>
                <clipPath id="a">
                  <path fill="#fff" d="M0 0h94.708v36H0z" />
                </clipPath>
              </defs>
            </svg>
          </Link>
          <ul className="[&>li:first-child]:pt-0 [&>li:last-child]:border-0 [&>li:last-child]:pb-0 [&>li]:border-b [&>li]:py-8">
            <li>
              <ul className="flex items-start justify-between">
                <li
                  className={classNames({
                    'mb-7 font-black italic text-primary': step === 1,
                  })}
                >
                  1. Email
                </li>
                {step !== 1 && (
                  <li>
                    <button
                      className="relative transition-all before:absolute before:bottom-0 before:left-0 before:w-full before:border-b before:border-gray-900 before:content-[''] hover:font-black hover:before:border-b-2"
                      onClick={() => {
                        setStep(1);
                      }}
                    >
                      Change
                    </button>
                  </li>
                )}
              </ul>

              {step === 1 ? (
                <form>
                  <Input
                    type="email"
                    label="Email"
                    name="email"
                    wrapperClassName="[&>span]:static"
                    defaultValue={cart?.email}
                    disabled={!!account.customer}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      // addEmail(e.target.value)
                    }}
                  />

                  <div className="mt-3.5 flex items-start gap-1">
                    <input
                      type="checkbox"
                      name="email"
                      id="email"
                      className="relative h-4 w-4 shrink-0 cursor-pointer appearance-none border border-gray-400 transition-all checked:border-gray-900 checked:bg-gray-900 checked:before:absolute checked:before:left-[0.1875rem] checked:before:top-[0.1875rem] checked:before:h-[0.3125rem] checked:before:w-2 checked:before:-rotate-45 checked:before:border-b-2 checked:before:border-l-2 checked:before:border-gray-10 checked:before:content-[''] hover:border-primary hover:checked:bg-primary focus-visible:outline-0"
                    />
                    <label
                      htmlFor="email"
                      className="cursor-pointer text-xs2 text-gray-400 lg:text-xs"
                    >
                      Want to get news and offers? Ok, yes and some discounts.
                      But only if you subscribe.
                    </label>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="mt-10.5"
                    onPress={() => {
                      setStep(2);
                      createPaymentSession(cart?.id!);
                    }}
                  >
                    Next
                  </Button>
                </form>
              ) : (
                <ul className="mt-8 flex">
                  <li className="w-1/3 break-words pr-6 text-gray-400 md:w-1/5">
                    Email
                  </li>

                  <li className="w-2/3 break-words text-gray-600 md:w-4/5">
                    {account.customer ? account.customer.email : email}
                  </li>
                </ul>
              )}
            </li>

            <li>
              <ul className="flex items-start justify-between">
                <li
                  className={classNames({
                    'mb-7 font-black italic text-primary': step === 2,
                  })}
                >
                  2. Delivery details
                </li>
                {step !== 2 && (
                  <li>
                    <button
                      className="relative transition-all before:absolute before:bottom-0 before:left-0 before:w-full before:border-b before:border-gray-900 before:content-[''] hover:font-black hover:before:border-b-2"
                      onClick={() => {
                        setStep(2);
                      }}
                    >
                      Change
                    </button>
                  </li>
                )}
              </ul>

              {step === 2 ? <div>{form}</div> : renderAddressOrEmpty()}
            </li>

            <li>
              <ul className="flex items-start justify-between">
                <li
                  className={classNames({
                    'mb-7 font-black italic text-primary': step === 3,
                  })}
                >
                  3. Shipping method
                </li>
                {step !== 3 && (
                  <li>
                    <button
                      className="relative transition-all before:absolute before:bottom-0 before:left-0 before:w-full before:border-b before:border-gray-900 before:content-[''] hover:font-black hover:before:border-b-2"
                      onClick={() => {
                        {
                          setStep(3);
                        }
                      }}
                    >
                      Change
                    </button>
                  </li>
                )}
              </ul>

              {step === 3 ? (
                <form>
                  <ul className="[&>li:last-child]:mb-0 [&>li]:mb-2">
                    {shippingOptions?.map((option) => (
                      <li className="relative" key={option.id}>
                        <input
                          type="radio"
                          name="shippingMethod"
                          id={option.id}
                          className="peer hidden"
                          value={option.name}
                          onChange={() => handleMethodSelection(option.id!)}
                          checked={selectedMethod === option.id}
                        />
                        <label
                          htmlFor={option.id}
                          className={`group flex cursor-pointer justify-between rounded-sm border px-4 py-3 leading-none transition-all peer-hover:border-primary lg:py-5 ${
                            selectedMethod === option.id
                              ? 'border-red-700 hover:border-red-900'
                              : ''
                          }`}
                        >
                          <div className="flex items-center">
                            <span
                              className={`relative block h-4 w-4 rounded-full border transition-all group-hover:border-primary ${
                                selectedMethod === option.id
                                  ? 'border-red-700 '
                                  : 'border-gray-900'
                              }`}
                            />
                            <p className="ml-3">{option.name}</p>
                          </div>
                          <p>
                            {option?.amount
                              ? (option.amount / 100).toFixed(2)
                              : 'FREE'}{' '}
                            {cart?.region?.currency_code === 'eur' ? '€' : '£'}
                          </p>
                        </label>
                      </li>
                    ))}
                  </ul>

                  <Button
                    type="button"
                    size="lg"
                    className="mt-10"
                    onPress={() => {
                      setStep(4);
                      addShippingMethod();
                    }}
                  >
                    Next
                  </Button>
                </form>
              ) : (
                <ul className="mt-8 flex">
                  <li className="w-1/3 break-words pr-6 text-gray-400 md:w-1/5">
                    Shipping
                  </li>

                  <li className="w-2/3 text-gray-600 md:w-4/5">
                    {(cart?.shipping_methods || []).length > 0 &&
                      cart?.shipping_methods?.[0]?.shipping_option?.name}
                    {selectedMethod}
                  </li>
                </ul>
              )}
            </li>

            <li>
              <p
                className={classNames({
                  'mb-6 font-black italic text-primary': step === 4,
                })}
              >
                4. Payment
              </p>

              {step === 4 && (
                <div>
                  <ul className="mb-7 text-gray-600 [&>li:first-child]:mb-2 [&>li:first-child]:text-primary">
                    <li>
                      <ul className="flex justify-between">
                        <li>Billing address</li>
                        <li>
                          {!showBillingForm && (
                            <button
                              className="relative text-black transition-all before:absolute before:bottom-0 before:left-0 before:w-full before:border-b before:border-gray-900 before:content-[''] hover:font-black hover:before:border-b-2"
                              onClick={() => setShowBillingForm(true)}
                            >
                              Change
                            </button>
                          )}
                        </li>
                      </ul>
                    </li>

                    {showBillingForm ? (
                      <BillingAddressFormComponent
                        cart={cart}
                        billingAddressData={billingAddressData}
                        errorMessage={errorMessage}
                        handleBillingAddressChange={handleBillingAddressChange}
                        setBillingAddressData={setBillingAddressData}
                        setShowBillingForm={setShowBillingForm}
                        updateCartBillingAddress={getNewBillingAddress}
                        copyBillingAddressToCustomer={
                          copyBillingAddressToCustomer
                        }
                      />
                    ) : (
                      <ul>
                        <li>
                          {cart?.billing_address?.first_name}{' '}
                          {cart?.billing_address?.last_name}
                        </li>
                        <li>
                          {cart?.billing_address?.address_1},{' '}
                          {cart?.billing_address?.postal_code}{' '}
                          {cart?.billing_address?.city},{' '}
                          {
                            cart?.region?.countries.find(
                              (country: Country) =>
                                country?.iso_2 ===
                                cart?.shipping_address?.country_code
                            )?.display_name
                          }
                        </li>
                        <li>{cart?.billing_address?.phone}</li>
                      </ul>
                    )}
                  </ul>

                  <ul className="[&>li:last-child]:mb-0 [&>li]:mb-2">
                    <li>
                      <input
                        type="radio"
                        name="paymentMethod"
                        id="paymentCard"
                        className="peer hidden"
                        value="paymentCard"
                      />
                      <label
                        htmlFor="paymentCard"
                        className="group peer flex cursor-pointer justify-between rounded-sm rounded-b-none border px-4 py-4 transition-all peer-hover:border-primary"
                      >
                        <div className="flex items-center">
                          <span className="relative block h-4 w-4 rounded-full border border-gray-900 bg-gray-900 transition-all before:absolute before:left-[0.3125rem] before:top-[0.3125rem] before:h-1 before:w-1 before:rounded-full before:bg-gray-10 before:content-[''] group-hover:border-primary group-hover:bg-primary" />
                          <p className="ml-3">Cash</p>
                        </div>
                      </label>
                    </li>

                    <li>
                      <input
                        type="radio"
                        name="paymentMethod"
                        id="paymentManual"
                        className="peer hidden"
                        value="paymentManual"
                      />
                      <label
                        htmlFor="paymentManual"
                        className="group peer flex cursor-pointer justify-between rounded-sm rounded-b-none border px-4 py-4 transition-all peer-hover:border-primary"
                      >
                        <div className="flex items-center">
                          <span className="relative block h-4 w-4 rounded-full border border-gray-900 bg-gray-900 transition-all before:absolute before:left-[0.3125rem] before:top-[0.3125rem] before:h-1 before:w-1 before:rounded-full before:bg-gray-10 before:content-[''] group-hover:border-primary group-hover:bg-primary" />
                          <p className="ml-3">Card</p>
                        </div>
                      </label>
                    </li>
                  </ul>
                  <div>
                    <Form
                      clientSecret={clientSecret}
                      cartId={cart?.id}
                      handlePlaceOrder={handlePlaceOrder}
                    />
                  </div>
                </div>
              )}
            </li>
          </ul>
          <Button
            size="lg"
            className="mt-10 w-full"
            isDisabled={step !== 4}
            onPress={handlePlaceOrder}
          >
            Place an order
          </Button>
        </div>

        <ul className="top-0 bg-gray-50 lg:sticky lg:h-screen lg:w-1/2 xl:w-[45%]">
          <OrderSummary setCardAdded={setCardAdded} />
        </ul>
      </div>
    </Elements>
  );
};

export default CheckoutPage;