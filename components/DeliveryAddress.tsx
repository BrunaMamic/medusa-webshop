import React, { useEffect } from 'react';
import { Input } from './Input'; 
import { SelectCountry } from './SelectCountry'; 

const DeliveryAddressFields = ({
  cart,
  updateField,
  errorMessage,
  updateCountry,
}:any) => {
  return (
    <fieldset className="relative flex flex-col flex-wrap gap-y-4 lg:gap-y-8">
      <SelectCountry
        selectedCountry={cart?.region.countries.find(
          (x:any) => x.iso_2 === cart?.shipping_address?.country_code
        )}
        onCountryChange={(country) => {
          updateCountry(country.iso_2);
        }}
      />
      {errorMessage && (
        <span className="text-red-700">{errorMessage}</span>
      )}

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
  );
};

export default DeliveryAddressFields;
