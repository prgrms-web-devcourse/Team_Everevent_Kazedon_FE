import React from 'react';
import EventListProvider from '@contexts/event';
import ReviewProvider from '@contexts/review';
import { UserProvider } from '@contexts/UserContext';
import { OwnerProvider } from './Owner';

const ContextProvider: React.FC<React.ReactNode> = ({ children }) => {
  return (
    <UserProvider>
      <EventListProvider>
        <ReviewProvider>
          <OwnerProvider>{children}</OwnerProvider>
        </ReviewProvider>
      </EventListProvider>
    </UserProvider>
  );
};

export default ContextProvider;
