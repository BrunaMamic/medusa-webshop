import React from 'react';
import { SelectCountry } from './SelectCountry';
import { Input } from './Input';

const BillingAddressFields = ({
  cart,
  billingAddressData,
  errorMessage,
  handleBillingAddressChange,
  setBillingAddressData,
}:any) => {
    console.log(billingAddressData);
    
  return (
    <>
      <p className="mb-7 font-black italic text-primary">Billing details</p>
      <fieldset className="relative flex flex-col flex-wrap gap-y-4 lg:gap-y-8">
        <SelectCountry
          selectedCountry={cart?.region?.countries.find(
            (x:any) => x.iso_2 === billingAddressData.countrys
          )}
          onCountryChange={(country) => {
            setBillingAddressData((prev:any) => ({
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
            onChange={(event) =>
              handleBillingAddressChange(event.target.value, 'first_name')
            }
          />

          <Input
            type="text"
            label="Last name"
            wrapperClassName="w-full"
            name="lastName"
            onChange={(event) =>
              handleBillingAddressChange(event.target.value, 'last_name')
            }
          />
        </div>

        <Input
          type="text"
          label="Address"
          name="address"
          onChange={(event) =>
            handleBillingAddressChange(event.target.value, 'address_1')
          }
        />

        <Input
          type="text"
          label="Apartment, suite, etc. (Optional)"
          name="apartment"
          onChange={(event) =>
            handleBillingAddressChange(event.target.value, 'address_2')
          }
        />

        <div className="flex gap-x-4 lg:gap-x-12">
          <Input
            type="number"
            label="Postal Code"
            wrapperClassName="w-full"
            name="postalCode"
            onChange={(event) =>
              handleBillingAddressChange(event.target.value, 'postal_code')
            }
          />

          <Input
            type="text"
            label="City"
            wrapperClassName="w-full"
            name="city"
            onChange={(event) =>
              handleBillingAddressChange(event.target.value, 'city')
            }
          />
        </div>

        <Input
          type="phone"
          label="Phone"
          defaultValue="+385"
          name="phone"
          onChange={(event) =>
            handleBillingAddressChange(event.target.value, 'phone')
          }
        />
      </fieldset>
    </>
  );
};

export default BillingAddressFields;
