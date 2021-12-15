import React from 'react';
import EventListProvider from '@contexts/event';
import ReviewProvider from '@contexts/review';
import { UserProvider } from '@contexts/UserContext';

const ContextProvider: React.FC<React.ReactNode> = ({ children }) => {
  return (
    <UserProvider>
      <EventListProvider>
        <ReviewProvider>{children}</ReviewProvider>
      </EventListProvider>
    </UserProvider>
  );
};

export default ContextProvider;
