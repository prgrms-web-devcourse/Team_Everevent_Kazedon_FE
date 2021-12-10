import React from 'react';
import EventListProvider from './eventList';

const ContextProvider: React.FC<React.ReactNode> = ({ children }) => {
  return <EventListProvider>{children}</EventListProvider>;
};

export default ContextProvider;
