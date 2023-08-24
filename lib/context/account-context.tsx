'use client';

import { MEDUSA_BACKEND_URL, medusaClient } from '../config';
import { Customer } from '@medusajs/medusa';
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
    phone: number
  ) => Promise<any>;
}

const AccountContext = createContext<AccountContext | null>(null);

interface AccountProviderProps {
  children?: React.ReactNode;
}

const medusa = new Medusa({ baseUrl: MEDUSA_BACKEND_URL, maxRetries: 3 });
// export const addAddress = async (
//   first_name:string, last_name:string

// ) => {
//   const response = await medusa.customers.addresses.addAddress({
//   address: {
//     first_name: "Celia",
//     last_name: "Schumm",
//     address_1: "225 Bednar Curve",
//     city: "Danielville",
//     country_code: "US",
//     postal_code: "85137",
//     phone: "981-596-6748 x90188",
//     company: "Wyman LLC",
//     province: "Georgia",
//     metadata: undefined,
//     address_2: ''
//   }
// })
// }

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
    phone: number
  ) => {
    const response = await medusaClient.customers.update({
      first_name: first_name,
      last_name: last_name,
      phone: phone,
    });

    if (response.customer) {
      refetch();
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
