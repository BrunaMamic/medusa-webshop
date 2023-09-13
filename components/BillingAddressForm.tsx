import React from 'react';
import { SelectCountry } from './SelectCountry';
import { Input } from './Input';
import { Country } from '@medusajs/medusa';

const BillingAddressFormComponent = ({
  cart,
  billingAddressData,
  errorMessage,
  handleBillingAddressChange,
  setBillingAddressData,
  showBillingAddress,
}: any) => {
  return (
    <>
      <p className="mb-7 font-black italic text-primary">Billing details</p>

      <fieldset className="relative flex flex-col flex-wrap gap-y-4 lg:gap-y-8">
        <SelectCountry
          selectedCountry={cart?.region.countries.find(
            (x: any) => x.iso_2 === billingAddressData?.country
          )}
          onCountryChange={(country: Country): void => {
            setBillingAddressData((prev: any) => ({
              ...prev,
              country: country.iso_2,
            }));
          }}
        />
        {errorMessage && <span className="text-red-700">{errorMessage}</span>}

        <div className="flex gap-x-4 lg:gap-x-12">
          <Input
            type="text"
            label="First name"
            wrapperClassName="w-full"
            name="firstName"
            value={billingAddressData?.first_name}
            onChange={(e) => handleBillingAddressChange(e, 'first_name')}
          />

          <Input
            type="text"
            label="Last name"
            wrapperClassName="w-full"
            name="lastName"
            value={billingAddressData?.last_name}
            onChange={(e) => handleBillingAddressChange(e, 'last_name')}
          />
        </div>

        <Input
          type="text"
          label="Address"
          name="address"
          value={billingAddressData?.address_1}
          onChange={(e) => handleBillingAddressChange(e, 'address_1')}
        />

        <Input
          type="text"
          label="Apartment, suite, etc. (Optional)"
          name="apartment"
          value={billingAddressData?.address_2}
          onChange={(e) => handleBillingAddressChange(e, 'address_2')}
        />

        <div className="flex gap-x-4 lg:gap-x-12">
          <Input
            type="number"
            label="Postal Code"
            wrapperClassName="w-full"
            name="postalCode"
            value={billingAddressData?.postal_code}
            onChange={(e) => handleBillingAddressChange(e, 'postal_code')}
          />

          <Input
            type="text"
            label="City"
            wrapperClassName="w-full"
            name="city"
            value={billingAddressData?.city}
            onChange={(e) => handleBillingAddressChange(e, 'city')}
          />
        </div>

        <Input
          type="phone"
          label="Phone"
          defaultValue="+385"
          name="phone"
          value={billingAddressData?.phone}
          onChange={(e) => handleBillingAddressChange(e, 'phone')}
        />
      </fieldset>
    </>
  );
};

export default BillingAddressFormComponent;
