import React from 'react';
import EventListProvider from '@contexts/event';
import ReviewProvider from '@contexts/review';
import { UserProvider } from '@contexts/UserContext';
import { OwnerProvider } from '@contexts/Owner';
import { ShopProvider } from '@contexts/Shop';

const ContextProvider: React.FC<React.ReactNode> = ({ children }) => {
  return (
    <UserProvider>
      <EventListProvider>
        <ReviewProvider>
          <OwnerProvider>
            <ShopProvider>{children}</ShopProvider>
          </OwnerProvider>
        </ReviewProvider>
      </EventListProvider>
    </UserProvider>
  );
};

export default ContextProvider;
