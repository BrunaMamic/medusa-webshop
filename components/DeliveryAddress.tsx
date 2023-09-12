import React from 'react';
import { SelectCountry } from './SelectCountry';
import { Input } from './Input';

const AddressForm = ({ formData, updateField }:any) => {
  return (
    <>
      <SelectCountry
        selectedCountry={formData.country}
        onCountryChange={(country) => {
          updateField(country, 'country');
        }}
      />
      <Input
        type="text"
        label="First name"
        wrapperClassName="w-full"
        name="first_name"
        onChange={(event) => updateField(event.target.value, 'first_name')}
        value={formData.first_name || ''}
      />
      <Input
        type="text"
        label="Last name"
        wrapperClassName="w-full"
        name="last_name"
        onChange={(event) => updateField(event.target.value, 'last_name')}
        value={formData.last_name || ''}
      />
      <Input
        type="text"
        label="Address"
        wrapperClassName="w-full"
        name="address_1"
        onChange={(event) => updateField(event.target.value, 'address_1')}
        value={formData.last_name || ''}
      />
      <Input
        type="text"
        label="Address 2"
        wrapperClassName="w-full"
        name="address_2"
        onChange={(event) => updateField(event.target.value, 'address_2')}
        value={formData.last_name || ''}
      />
      <Input
        type="text"
        label="Postal code"
        wrapperClassName="w-full"
        name="postal_code"
        onChange={(event) => updateField(event.target.value, 'postal_code')}
        value={formData.last_name || ''}
      />
      <Input
        type="text"
        label="City"
        wrapperClassName="w-full"
        name="city"
        onChange={(event) => updateField(event.target.value, 'city')}
        value={formData.last_name || ''}
      />
    </>
  );
};

export default AddressForm;
