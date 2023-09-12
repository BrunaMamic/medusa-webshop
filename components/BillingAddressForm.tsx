import React from 'react';
import { SelectCountry } from './SelectCountry';
import { Input } from './Input';

const BillingAddressForm = ({ billingAddressData, handleBillingAddressChange }:any) => {
  return (
    <>
      <p className="mb-7 font-black italic text-primary">Billing details</p>
      <fieldset className="relative flex flex-col flex-wrap gap-y-4 lg:gap-y-8">
        {/* Input fields for billing address */}
        <SelectCountry
          selectedCountry={billingAddressData.country}
          onCountryChange={(country) => {
            handleBillingAddressChange(country, 'country');
          }}
        />
        <Input
          type="text"
          label="First name"
          wrapperClassName="w-full"
          name="firstName"
          onChange={(e) => handleBillingAddressChange(e, 'first_name')}
          value={billingAddressData.first_name || ''}
        />
        <Input
          type="text"
          label="Last name"
          wrapperClassName="w-full"
          name="lastName"
          onChange={(e) => handleBillingAddressChange(e, 'last_name')}
          value={billingAddressData.last_name || ''}
        />
        <Input
        type="text"
        label="Address"
        wrapperClassName="w-full"
        name="address_1"
        onChange={(event) => handleBillingAddressChange(event.target.value, 'address_1')}
        value={billingAddressData.last_name || ''}
      />
      <Input
        type="text"
        label="Address 2"
        wrapperClassName="w-full"
        name="address_2"
        onChange={(event) => handleBillingAddressChange(event.target.value, 'address_2')}
        value={billingAddressData.last_name || ''}
      />
      <Input
        type="text"
        label="Postal code"
        wrapperClassName="w-full"
        name="postal_code"
        onChange={(event) => handleBillingAddressChange(event.target.value, 'postal_code')}
        value={billingAddressData.last_name || ''}
      />
      <Input
        type="text"
        label="City"
        wrapperClassName="w-full"
        name="city"
        onChange={(event) => handleBillingAddressChange(event.target.value, 'city')}
        value={billingAddressData.last_name || ''}
      />
      </fieldset>
    </>
  );
};

export default BillingAddressForm;
