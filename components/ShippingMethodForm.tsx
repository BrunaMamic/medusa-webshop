import React from 'react';
import { Button } from './ui/Button';
import classNames from '@/utils/classNames';

const ShippingMethodForm = ({
  step,
  setStep,
  shippingOptions,
  selectedMethod,
  handleMethodSelection,
  addShippingMethod,
  cart,
  setCart,
}:any) => {

  return (
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
                setStep(3);
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
            {shippingOptions?.map((option:any) => (
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
  );
};

export default ShippingMethodForm;
