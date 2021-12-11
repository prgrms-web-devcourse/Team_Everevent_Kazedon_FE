import React from 'react';
import EventListProvider from './eventList';
import { UserProvider } from './UserContext';

const ContextProvider: React.FC<React.ReactNode> = ({ children }) => {
  return (
    <UserProvider>
      <EventListProvider>{children}</EventListProvider>
    </UserProvider>
  );
};

export default ContextProvider;
