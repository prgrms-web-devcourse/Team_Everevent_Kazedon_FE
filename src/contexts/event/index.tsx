import useEventProvider from '@contexts/event/actions';
import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import { ContextType, InitialStateType } from '@contexts/event/types';
/* eslint-disable import/no-cycle */
import eventReducer from './reducer';

export const initialState: InitialStateType = {
  isLoading: false,
  eventList: [],
  event: {
    eventId: '',
    eventName: '',
    expriedAt: '',
    marketName: '',
    like: null,
    marketDescription: '',
    eventDescription: '',
    favorite: null,
    pictures: [],
    participated: null,
  },
  eventListOptions: {
    totalPages: 0,
    totalElements: 0,
    last: true,
  },
  eventError: {
    code: null,
    message: null,
  },
};

const EventContext = createContext<ContextType>(initialState);
export const useEvent = () => useContext(EventContext);

const EventListProvider: React.FC<ReactNode> = ({ children }) => {
  const [
    { isLoading, eventList, eventListOptions, event, eventError },
    dispatch,
  ] = useReducer(eventReducer, initialState);

  const {
    dispatchEventList,
    initializeEventList,
    dispatchEvent,
    initializeEvent,
    dispatchEventLike,
    dispatchEventFavorite,
  } = useEventProvider(dispatch);

  const contextValue = useMemo(
    () => ({
      isLoading,
      eventList,
      eventListOptions,
      event,
      eventError,
      dispatchEvent,
      dispatchEventList,
      initializeEvent,
      initializeEventList,
      dispatchEventLike,
      dispatchEventFavorite,
    }),
    [
      isLoading,
      eventList,
      eventListOptions,
      event,
      eventError,
      dispatchEvent,
      dispatchEventList,
      initializeEvent,
      initializeEventList,
      dispatchEventLike,
      dispatchEventFavorite,
    ]
  );

  return (
    <EventContext.Provider value={contextValue}>
      {children}
    </EventContext.Provider>
  );
};

export default EventListProvider;
