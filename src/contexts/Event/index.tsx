import useEventProvider from '@contexts/Event/actions';
import React, { createContext, ReactNode, useMemo, useReducer } from 'react';
import { GET_EVENTLIST, InitialStateType } from '@contexts/Event/types';

const initialState: InitialStateType = {
  eventList: [],
  event: {
    name: '',
    expiredAt: '',
    marketName: '',
    marketDescription: '',
    eventDescription: '',
    isLike: null,
    isFavorite: null,
    pictures: [],
    isParticipated: null,
  },
};

const eventReducer = (state: InitialStateType, action: any) => {
  switch (action.type) {
    case GET_EVENTLIST: {
      const { eventList } = action;
      return {
        ...state,
        eventList,
      };
    }
    default:
      return state;
  }
};

const EventContext = createContext<InitialStateType>(initialState);

const EventListProvider: React.FC<ReactNode> = ({ children }) => {
  const [{ eventList, event }, dispatchEvent] = useReducer(
    eventReducer,
    initialState
  );

  const { dispatchEventList } = useEventProvider(dispatchEvent);

  const contextValue = useMemo(
    () => ({ eventList, event, dispatchEventList }),
    [event, eventList, dispatchEventList]
  );

  return (
    <EventContext.Provider value={contextValue}>
      {children}
    </EventContext.Provider>
  );
};

export default EventListProvider;
