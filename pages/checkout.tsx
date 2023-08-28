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
import { Country, ShippingMethod, ShippingOption } from '@medusajs/medusa';
import { useAccount } from '@/lib/context/account-context';
import { useStore } from '@/lib/context/store-context';
import { useCart } from 'medusa-react';
import { AddressPayload } from '@medusajs/types';
import { useEffect, useState } from 'react';

import { MEDUSA_BACKEND_URL, medusaClient } from '../lib/config';
import Medusa from '@medusajs/medusa-js';
import { PricedShippingOption } from '@medusajs/medusa/dist/types/pricing';

const medusa = new Medusa({ baseUrl: MEDUSA_BACKEND_URL, maxRetries: 3 });

const CheckoutPage: NextPageWithLayout = () => {
  const [step, setStep] = React.useState(1);
  const [cardAdded, setCardAdded] = React.useState(false);
  const [checkoutVisible, setCheckoutVisible] = React.useState(false);

  const account = useAccount();
  const { cart } = useStore();

  const [shippingOptions, setShippingOptions] = React.useState<
    PricedShippingOption[] | undefined
  >();
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [cartShippingMethods, setCartShippingMethods] = useState([]);

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

  const handleMethodSelection = (optionId: any) => {
    setSelectedMethod(optionId);
  };

  const addShippingMethod = () => {
    if (selectedMethod) {
      medusa.carts
        .addShippingMethod(cart?.id as string, {
          option_id: selectedMethod,
        })
        .then(({ cart }: any) => {
          setCartShippingMethods(cart?.shipping_methods);
        })
        .catch((error) => {
          console.error('Error', error);
        });
    }
  };

  const createPaymentSession = (cartId: any) => {
    if (cartId) {
      medusa.carts
        .createPaymentSessions(cartId)
        .then(({ cart }) => {
          console.log('Initialized', cart.payment_sessions);
        })
        .catch((error) => {
          console.error('Error', error);
        });
    }
  };
  console.log(cart);

  const onExpDateChange = (event: any) => {
    const value = event.currentTarget.value.replace(/\D/g, '');

    if (value.length > 2) {
      event.currentTarget.value = value.slice(0, 2) + '/' + value.slice(2);
    } else {
      event.currentTarget.value = value;
    }
  };

  useEffect(() => {
    if (step === 2 && cart?.shipping_address === null) {
      copyShippingAddressToCart();
      copyBillingAddress();
    }

    shippingMethodSelection();
  }, [step, cart]);

  const { updateCart } = useCart();

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
        updateCart
          .mutateAsync({
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
          })
          .then(({ cart }) => {
            console.log('billing UPDATE', cart.billing_address);
          });
      }
    }
  };

  const copyShippingAddressToCart = () => {
    // const shippingAddress = account.customer?.shipping_addresses?.filter(x => x.defulatAdddress === true)[0];
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
        updateCart
          .mutateAsync({
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
            // billing_address: {
            //   company,
            //   first_name,
            //   last_name,
            //   address_1,
            //   address_2,
            //   city,
            //   country_code,
            //   province,
            //   postal_code,
            //   phone,
            // } as AddressPayload
          })
          .then(({ cart }) => {
            console.log('CART UPDATE', cart.shipping_address);
          });
      }
    }
  };

  const updateCountry = async (payload: any) => {
    await updateCart
      .mutateAsync({
        shipping_address: {
          country_code: payload,
        } as AddressPayload,
      })
      .then(({ cart }) => {
        console.log('CART UPDATE', cart.shipping_address);
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
                  (country: any) =>
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

  return (
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
                    onClick={() => setStep(1)}
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
                  // errorMessage="You forgot your email"
                  wrapperClassName="[&>span]:static"
                  defaultValue={account.customer?.email}
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
                    Want to get news and offers? Ok, yes and some discounts. But
                    only if you subscribe.
                  </label>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="mt-10.5"
                  onPress={() => {
                    setStep(2);
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
                  {account.customer?.email}
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

            {step === 2 ? (
              <form>
                <fieldset className="relative flex flex-col flex-wrap gap-y-4 lg:gap-y-8">
                  <SelectCountry
                    selectedCountry={cart?.region.countries.find(
                      (x) => x.iso_2 === cart?.shipping_address?.country_code
                    )}
                    onCountryChange={(country: Country): void => {
                      updateCountry(country.iso_2);
                    }}
                  />
                  <div className="flex gap-x-4 lg:gap-x-12">
                    <Input
                      type="text"
                      label="First name"
                      wrapperClassName="w-full"
                      name="first_name"
                      onChange={(event) =>
                        updateField(event.target.value, 'first_name')
                      }
                      defaultValue={cart?.shipping_address?.first_name || ''}
                    />

                    <Input
                      type="text"
                      label="Last name"
                      wrapperClassName="w-full"
                      name="last_name"
                      onChange={(event) =>
                        updateField(event.target.value, 'last_name')
                      }
                      defaultValue={cart?.shipping_address?.last_name || ''}
                    />
                  </div>

                  <Input
                    type="text"
                    label="Address"
                    name="address_1"
                    onChange={(event) =>
                      updateField(event.target.value, 'address_1')
                    }
                    defaultValue={cart?.shipping_address?.address_1 || ''}
                  />

                  <Input
                    type="text"
                    label="Apartment, suite, etc. (Optional)"
                    name="address_2"
                    onChange={(event) =>
                      updateField(event.target.value, 'address_2')
                    }
                    defaultValue={cart?.shipping_address?.address_2 || ''}
                  />

                  <div className="flex gap-x-4 lg:gap-x-12">
                    <Input
                      type="number"
                      label="Postal Code"
                      wrapperClassName="w-full"
                      name="postal_code"
                      onChange={(event) =>
                        updateField(event.target.value, 'postal_code')
                      }
                      defaultValue={cart?.shipping_address?.postal_code || ''}
                    />

                    <Input
                      type="text"
                      label="City"
                      wrapperClassName="w-full"
                      name="city"
                      onChange={(event) =>
                        updateField(event.target.value, 'city')
                      }
                      defaultValue={cart?.shipping_address?.city || ''}
                    />
                  </div>

                  <Input
                    type="phone"
                    label="Phone"
                    name="phone"
                    onChange={(event) =>
                      updateField(event.target.value, 'phone')
                    }
                    defaultValue={cart?.shipping_address?.phone || ''}
                  />
                </fieldset>

                <Button
                  type="submit"
                  size="lg"
                  className="mt-10"
                  onPress={() => {
                    setStep(3), shippingMethodSelection();
                  }}
                >
                  Next
                </Button>
              </form>
            ) : (
              renderAddressOrEmpty()
            )}
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
                        setStep(3), createPaymentSession(cart?.id);
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
                        onChange={() => handleMethodSelection(option.id)}
                        checked={selectedMethod === option.id}
                      />
                      <p>{option.id}</p>
                      {selectedMethod}
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
                    setStep(4), addShippingMethod(), copyBillingAddress();
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
                  {/* {cart?.shipping_methods?.[0].shipping_option.name}  */}
                  {/* oov se prikaze tek nakon refreshas */}
                  {cartShippingMethods.length > 0 &&
                    cartShippingMethods?.[0]?.shipping_option?.name}
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
                        <button className="relative text-black transition-all before:absolute before:bottom-0 before:left-0 before:w-full before:border-b before:border-gray-900 before:content-[''] hover:font-black hover:before:border-b-2">
                          Change
                        </button>
                      </li>
                    </ul>
                  </li>
                  <li>
                    {cart?.billing_address.first_name}{' '}
                    {cart?.billing_address.last_name}
                  </li>
                  <li>
                    {cart?.billing_address?.address_1},{' '}
                    {cart?.billing_address?.postal_code}{' '}
                    {cart?.billing_address?.city},{' '}
                    {
                      cart?.region?.countries.find(
                        (country: any) =>
                          country?.iso_2 ===
                          cart?.shipping_address?.country_code
                      )?.display_name
                    }
                  </li>
                  <li>{cart?.billing_address?.phone}</li>
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
                        <p className="ml-3">Card</p>
                      </div>

                      <ul className="flex gap-1 lg:gap-4">
                        <li>
                          <Image
                            src={'/images/content/amex.png'}
                            height={24}
                            width={34}
                            alt="Amex"
                          />
                        </li>
                        <li>
                          <Image
                            src={'/images/content/dinersclub.png'}
                            height={24}
                            width={34}
                            alt="DinersClub"
                          />
                        </li>
                        <li>
                          <Image
                            src={'/images/content/mastercard.png'}
                            height={24}
                            width={34}
                            alt="Mastercard"
                          />
                        </li>
                        <li>
                          <Image
                            src={'/images/content/visa.png'}
                            height={24}
                            width={34}
                            alt="Visa"
                          />
                        </li>
                      </ul>
                    </label>

                    <div className="border border-t-0 border-gray-200 p-4 peer-hover:border-primary">
                      {cardAdded ? (
                        <div>
                          <div className="mb-8 flex items-start justify-between">
                            <ul className="w-full">
                              <li className="flex items-start border-b border-gray-200 pb-7 pt-8 first:pt-0 last:border-0 last:pb-0">
                                <input
                                  type="radio"
                                  name="credit-card"
                                  id="credit-card-1"
                                  className="peer hidden"
                                />
                                <label
                                  htmlFor="credit-card-1"
                                  className="group peer flex flex-1 cursor-pointer items-start"
                                >
                                  <span className="relative mr-3 mt-1 block h-4 w-4 rounded-full border border-gray-900 bg-gray-900 transition-all before:absolute before:left-[0.3125rem] before:top-[0.3125rem] before:h-1 before:w-1 before:rounded-full before:bg-gray-10 before:content-[''] group-hover:border-primary group-hover:bg-primary" />

                                  <Image
                                    src={'/images/content/visa.png'}
                                    height={24}
                                    width={34}
                                    alt="Visa"
                                  />

                                  <ul className="gray-600 ml-4 flex-1 lg:ml-14">
                                    <li>Jovana Jerimic</li>
                                    <li>**** **** **** 1111</li>
                                    <li>Exp: 05/26</li>
                                  </ul>

                                  <button
                                    className="relative text-xs transition-all before:absolute before:bottom-0 before:left-0 before:w-full before:border-b before:border-gray-900 before:content-[''] hover:font-black hover:before:border-b-2"
                                    onClick={() => setCardAdded(false)}
                                  >
                                    Change
                                  </button>
                                </label>
                              </li>
                              <li className="flex items-start border-b border-gray-200 pb-7 pt-8 first:pt-0 last:border-0 last:pb-0">
                                <input
                                  type="radio"
                                  name="credit-card"
                                  id="credit-card-2"
                                  className="peer hidden"
                                />
                                <label
                                  htmlFor="credit-card-2"
                                  className="group peer flex flex-1 cursor-pointer items-start"
                                >
                                  <span className="relative mr-3 mt-1 block h-4 w-4 rounded-full border border-gray-900 transition-all group-hover:border-primary" />

                                  <Image
                                    src={'/images/content/dinersClub.png'}
                                    height={24}
                                    width={34}
                                    alt="DinersClub"
                                  />

                                  <ul className="gray-600 ml-4 flex-1 lg:ml-14">
                                    <li>Jovana Jerimic</li>
                                    <li>**** **** **** 1111</li>
                                    <li>Exp: 05/26</li>
                                  </ul>

                                  <button
                                    className="relative text-xs transition-all before:absolute before:bottom-0 before:left-0 before:w-full before:border-b before:border-gray-900 before:content-[''] hover:font-black hover:before:border-b-2"
                                    onClick={() => setCardAdded(false)}
                                  >
                                    Change
                                  </button>
                                </label>
                              </li>
                            </ul>
                          </div>

                          <Button
                            variant="tertiary"
                            size="lg"
                            className="!px-9"
                          >
                            Add another card
                          </Button>
                        </div>
                      ) : (
                        <form>
                          <Input
                            type="text"
                            label="Name on card"
                            name="nameOnCard"
                            className="mb-4 lg:mb-8"
                          />
                          <Input
                            type="number"
                            label="Card number"
                            name="cardNumber"
                            className="mb-4 lg:mb-8"
                          />

                          <div className="mb-4 flex gap-x-4">
                            <Input
                              type="text"
                              label="MM/YY"
                              wrapperClassName="w-full"
                              name="expDate"
                              onChange={onExpDateChange}
                              maxLength={5}
                            />

                            <Input
                              type="number"
                              label="CVC"
                              wrapperClassName="w-full"
                              name="CVC"
                              // maxLength={3}
                            />
                          </div>

                          <div className="mb-8 flex items-start gap-1">
                            <input
                              type="checkbox"
                              name="saveCard"
                              id="saveCard"
                              className="relative h-4 w-4 shrink-0 cursor-pointer appearance-none border border-gray-400 transition-all checked:border-gray-900 checked:bg-gray-900 checked:before:absolute checked:before:left-[0.1875rem] checked:before:top-[0.1875rem] checked:before:h-[0.3125rem] checked:before:w-2 checked:before:-rotate-45 checked:before:border-b-2 checked:before:border-l-2 checked:before:border-gray-10 checked:before:content-[''] hover:border-primary hover:checked:bg-primary focus-visible:outline-0"
                            />
                            <label
                              htmlFor="saveCard"
                              className="cursor-pointer text-xs text-gray-400"
                            >
                              Save card details for next time
                            </label>
                          </div>

                          <Button
                            type="submit"
                            onPress={() => setCardAdded(true)}
                            size="lg"
                            className="!px-9"
                          >
                            Use card
                          </Button>
                        </form>
                      )}
                    </div>
                  </li>

                  <li>
                    <input
                      type="radio"
                      name="paymentMethod"
                      id="paymentGooglePay"
                      className="peer hidden"
                      value="paymentGooglePay"
                    />
                    <label
                      htmlFor="paymentGooglePay"
                      className="group flex cursor-pointer justify-between rounded-sm border px-4 py-4 transition-all peer-hover:border-primary"
                    >
                      <div className="flex items-center">
                        <span className="relative block h-4 w-4 rounded-full border border-gray-900 transition-all group-hover:border-primary" />
                        <p className="ml-3">Google Pay</p>
                      </div>

                      <Image
                        src={'/images/content/gpay.png'}
                        height={24}
                        width={34}
                        alt="Google Pay"
                      />
                    </label>
                  </li>

                  <li>
                    <input
                      type="radio"
                      name="paymentMethod"
                      id="paymentApplePay"
                      className="peer hidden"
                      value="paymentApplePay"
                    />
                    <label
                      htmlFor="paymentApplePay"
                      className="group flex cursor-pointer justify-between rounded-sm border px-4 py-4 transition-all peer-hover:border-primary"
                    >
                      <div className="flex items-center">
                        <span className="relative block h-4 w-4 rounded-full border border-gray-900 transition-all group-hover:border-primary" />
                        <p className="ml-3">Apple Pay</p>
                      </div>

                      <Image
                        src={'/images/content/apay.png'}
                        height={24}
                        width={34}
                        alt="Apple Pay"
                      />
                    </label>
                  </li>

                  <li>
                    <input
                      type="radio"
                      name="paymentMethod"
                      id="paymentPayPal"
                      className="peer hidden"
                      value="paymentPayPal"
                    />
                    <label
                      htmlFor="paymentPayPal"
                      className="group flex cursor-pointer justify-between rounded-sm border border-red-700 px-4 py-4 transition-all hover:!border-red-900"
                    >
                      <div className="flex items-center">
                        <span className="relative block h-4 w-4 rounded-full border border-red-700 transition-all group-hover:border-red-900" />
                        <p className="ml-3">Pay Pal</p>
                      </div>

                      <Image
                        src={'/images/content/paypal.png'}
                        height={24}
                        width={34}
                        alt="PayPal"
                      />
                    </label>
                  </li>
                </ul>
              </div>
            )}
          </li>
        </ul>
        <Link href="/order-confirmation">
          <Button size="lg" className="mt-10 w-full" isDisabled={step !== 4}>
            Place an order
          </Button>
        </Link>
      </div>

      <ul className="top-0 bg-gray-50 lg:sticky lg:h-screen lg:w-1/2 xl:w-[45%]">
        <li className="flex items-center justify-between bg-white px-4 pb-5 pt-4 lg:hidden">
          <Link href="/" className="inline-block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="95"
              height="36"
              viewBox="0 0 95 36"
              className="w-15.5 lg:w-auto"
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

          <div>
            <Heading size="md" className="text-primary">
              Checkout
            </Heading>
          </div>
        </li>
        <li
          className="flex cursor-pointer justify-between px-4 pb-7 pt-6 lg:hidden"
          onClick={() => setCheckoutVisible(!checkoutVisible)}
        >
          Order summary <span className="ml-auto mr-4 block">€45</span>{' '}
          <Icon
            name="chevron-down"
            className={classNames('transition-all', {
              'rotate-180': checkoutVisible,
            })}
          />
        </li>

        <li
          className={classNames(
            'hidden px-4 pb-8 lg:!block lg:px-12 lg:pt-31 xl:px-24',
            {
              '!block': checkoutVisible,
            }
          )}
        >
          <div className="mb-8 flex justify-between text-xs lg:mb-16 lg:text-sm">
            <span className="block">Order — {cart?.items.length} items</span>

            <button
              className="relative transition-all before:absolute before:bottom-0 before:left-0 before:w-full before:border-b before:border-gray-900 before:content-[''] hover:font-black hover:before:border-b-2"
              onClick={() => setCardAdded(false)}
            >
              Edit cart
            </button>
          </div>

          {cart?.items.map((item, index) => (
            <div
              key={index}
              className="group mb-8 flex gap-x-2 gap-y-4 lg:gap-x-4"
            >
              <Link href="/" className="relative block flex-shrink-0">
                <Image
                  src={item.thumbnail || ''}
                  height={144}
                  width={108}
                  className="min-w-[5.625rem] object-cover sm:w-auto"
                  alt={item.title || ''}
                />

                {/* <Tag variant="discount" className="absolute bottom-2 right-2">
        {`-${item.discountPercentage}%`}
      </Tag> */}
              </Link>

              <ul className="relative inline-flex h-full w-full flex-col">
                <li className="text-xs font-black italic lg:text-md">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-xs sm:text-md">{item.title}</p>
                    <ul className="relative items-center gap-2 text-xs sm:mt-0 sm:block sm:self-start">
                      <li className="font-bold text-red-700 sm:text-md">
                        {(item?.total! / 100).toFixed(2)}{' '}
                        {cart?.region?.currency_code === 'eur' ? '€' : '£'}
                      </li>
                      {/* <li className="absolute -bottom-6 right-0 font-light text-gray-400 line-through sm:text-sm">
              {item.originalPrice}
            </li> */}
                    </ul>
                  </div>
                </li>
                <li className="text-xs2 text-gray-400 lg:text-sm">
                  {item.variant.title}
                </li>
                <li className="text-xs2 text-gray-400 lg:text-sm">
                  {item.quantity}
                </li>
              </ul>
            </div>
          ))}

          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:gap-8">
            <Input
              type="text"
              visualSize="sm"
              label="Discount code"
              wrapperClassName="flex-1"
              className="rounded-sm"
            />

            <Button size="lg" variant="tertiary">
              Apply
            </Button>
          </div>

          <ul className="w-full [&>li:last-child]:mb-0 [&>li]:mb-2">
            <li>
              <ul className="flex justify-between pr-2 text-xs sm:text-sm">
                <li>Subtotal</li>
                <li>
                  {(cart?.subtotal! / 100).toFixed(2)}{' '}
                  {cart?.region?.currency_code === 'eur' ? '€' : '£'}
                </li>
              </ul>
            </li>
            <li className="!mb-6">
              <ul className="flex justify-between pr-2 text-xs sm:text-sm">
                <li>Shipping</li>
                <li>€15</li>
              </ul>
            </li>
            <li>
              <ul className="flex justify-between text-md lg:text-lg">
                <li>Total</li>
                <li>
                  {' '}
                  {(cart?.subtotal! / 100).toFixed(2)}{' '}
                  {cart?.region?.currency_code === 'eur' ? '€' : '£'}
                </li>
              </ul>
            </li>
            <li className="text-xs text-gray-400 sm:text-sm">
              Including 11.25 tax
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default CheckoutPage;
