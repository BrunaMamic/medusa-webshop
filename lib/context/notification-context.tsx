import { Icon } from '@/components/ui/Icon';
import React, { createContext, useContext, useState } from 'react';
import * as Dialog from '@/components/ui/Dialog';

// Define the shape of the notification context
interface NotificationContextType {
  showNotification: (
    message: string,
    type: 'success' | 'error' | 'info'
  ) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      'useNotification must be used within a NotificationProvider'
    );
  }
  return context.showNotification;
}

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
  } | null>(null);

  const showNotification = (
    message: string,
    type: 'success' | 'error' | 'info'
  ) => {
    setNotification({ message, type });

    setTimeout(() => {
      hideNotification();
    }, 3000);
  };

  const hideNotification = () => {
    setNotification(null);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && (
        <div>
          <Dialog.Root open={true}>
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
            <Dialog.Content className="fixed top-7% right-7%">
              <div className="shadow-md rounded-md bg-white p-4">
                <button
                  className="absolute right-2 top-2 text-gray-900"
                  onClick={() => hideNotification()}
                >
                  <Icon name="x" />
                </button>
                <h2 className="text-lg font-semibold">
                  {notification.type === 'success' && 'Success'}
                  {notification.type === 'error' && 'Error'}
                  {notification.type === 'info' && 'Info'}
                </h2>
                <p className="text-gray-500">{notification.message}</p>
              </div>
            </Dialog.Content>
          </Dialog.Root>
        </div>
      )}
    </NotificationContext.Provider>
  );
  
}
