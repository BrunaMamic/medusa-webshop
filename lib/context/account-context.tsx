'use client';

import { MEDUSA_BACKEND_URL, medusaClient } from '../config';
import { Customer, StorePostCustomersCustomerAddressesAddressReq } from '@medusajs/medusa';
import { useMutation } from '@tanstack/react-query';
import { useMeCustomer } from 'medusa-react';
import { useRouter } from 'next/navigation';
import React, { createContext, useCallback, useContext, useState } from 'react';
import Medusa from '@medusajs/medusa-js';

export enum LOGIN_VIEW {
  SIGN_IN = 'sign-in',
  REGISTER = 'register',
}

interface AccountContext {
  customer?: Omit<Customer, 'password_hash'>;
  retrievingCustomer: boolean;
  loginView: [LOGIN_VIEW, React.Dispatch<React.SetStateAction<LOGIN_VIEW>>];
  checkSession: () => void;
  refetchCustomer: () => void;
  handleLogout: () => void;
  handleLogin: (email: string, pass: string) => Promise<void>;
  updateCustomerInfo: (
    first_name: string,
    last_name: string,
    phone: any
  ) => Promise<any>;
  addAddress: (
    address: any,
  ) => Promise<any>;
  updateAddress: (
    address_id: any,
    address_1: any,
    city: any,
    postal_code: any,
  ) => Promise<any>
}

const AccountContext = createContext<AccountContext | null>(null);

interface AccountProviderProps {
  children?: React.ReactNode;
}

const medusa = new Medusa({ baseUrl: MEDUSA_BACKEND_URL, maxRetries: 3 });

export const handleRegistrationClick = async (
  first_name: string,
  last_name: string,
  email: string,
  password: any
) => {
  const response = await medusa.customers.create({
    first_name: first_name,
    last_name: last_name,
    email: email,
    password: password,
  });
  return response.customer;
};

export const checkIfCustomerExists = async (email: string) => {
  const { exists } = await medusaClient.auth.exists(email);
  return exists;
};

const handleDeleteSession = () => {
  return medusaClient.auth.deleteSession();
};

export const AccountProvider = ({ children }: AccountProviderProps) => {
  const {
    customer,
    isLoading: retrievingCustomer,
    refetch,
    remove,
  } = useMeCustomer({ onError: () => {} });

  const loginView = useState<LOGIN_VIEW>(LOGIN_VIEW.SIGN_IN);

  const router = useRouter();

  const handleLogin = useCallback(async (email: string, password: string) => {
    const response = await medusaClient.auth.authenticate({
      email: email,
      password: password,
    });

    if (response.customer) [refetch()];
  }, []);

  const updateCustomerInfo = async (
    first_name: string,
    last_name: string,
    phone: any
  ) => {
    const response = await medusaClient.customers.update({
      first_name: first_name,
      last_name: last_name,
      phone: phone.toString(),
    });

    if (response.customer) {
      refetch();
    }
  };


  const updateAddress = async (
    address_id: string,
    address_1: any,
    city: any,
    postal_code: any,
  ) => {
    const response = await medusaClient.customers.addresses.updateAddress(address_id,{
      address_1: address_1,
      city: city,
      postal_code: postal_code

    });
    if (response.customer){
      refetch()
    }

  }

  const addAddress = async (
    address: any,
  ) => {
    try {
      const response = await medusa.customers.addresses.addAddress({
        address: address,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  const checkSession = useCallback(() => {
    if (!customer && !retrievingCustomer) {
      router.push('/account/login');
    }
  }, [customer, retrievingCustomer, router]);

  const useDeleteSession = useMutation({
    mutationFn: handleDeleteSession,
    mutationKey: ['delete-session'],
  });

  const handleLogout = () => {
    useDeleteSession.mutate(undefined, {
      onSuccess: () => {
        remove();
        loginView[1](LOGIN_VIEW.SIGN_IN);
        router.push('/my-account/login');
      },
    });
  };

  return (
    <AccountContext.Provider
      value={{
        customer,
        retrievingCustomer,
        loginView,
        checkSession,
        refetchCustomer: refetch,
        handleLogout,
        handleLogin,
        updateCustomerInfo,
        addAddress,
        updateAddress,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => {
  const context = useContext(AccountContext);

  if (context === null) {
    throw new Error('useAccuont must be used within a AccountProvider');
  }
  return context;
};
