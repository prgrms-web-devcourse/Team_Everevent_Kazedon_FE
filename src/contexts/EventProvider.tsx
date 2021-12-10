import React, { createContext, ReactNode, useMemo, useReducer } from 'react';

export interface Event {
  name: string;
  expiredAt: string | Date;
  marketName: string;
  marketDescription: string;
  eventDescription: string;
  isLike: boolean | null;
  isFavorite: boolean | null;
  pictures: [];
  isParticipated: boolean | null;
}

export type eventListType = Event[] | [];

export interface InitialStateType {
  eventList: eventListType;
  event: Event;
}

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

export const GET_EVENTLIST = 'EVENT/GET_EVENTLIST';

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

  const contextValue = useMemo(
    () => ({ eventList, event, dispatchEvent }),
    [event, eventList]
  );

  return (
    <EventContext.Provider value={contextValue}>
      {children}
    </EventContext.Provider>
  );
};

export default EventListProvider;
