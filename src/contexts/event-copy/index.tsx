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
    name: '',
    expiredAt: '',
    marketName: '',
    isLike: null,
    marketDescription: '',
    eventDescription: '',
    isFavorite: null,
    pictures: [],
    isParticipated: null,
  },
  eventError: {
    code: null,
    message: null,
  },
};

const EventContext = createContext<ContextType>(initialState);
export const useEvent = () => useContext(EventContext);

const EventListProvider: React.FC<ReactNode> = ({ children }) => {
  const [{ isLoading, eventList, event, eventError }, dispatch] = useReducer(
    eventReducer,
    initialState
  );

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
