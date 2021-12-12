import useEventProvider from '@contexts/event/actions';
import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import {
  Action,
  ContextType,
  GET_EVENT,
  GET_EVENTLIST,
  INITIALIZE_EVENT,
  INITIALIZE_EVENTLIST,
  InitialStateType,
} from '@contexts/event/types';

const initialState: InitialStateType = {
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

const eventReducer = (state: InitialStateType, action: Action) => {
  switch (action.type) {
    case GET_EVENTLIST: {
      const { eventList } = action.payload;
      return {
        ...state,
        eventList,
      };
    }
    case INITIALIZE_EVENTLIST: {
      return {
        ...state,
        initialState,
      };
    }
    case GET_EVENT: {
      const { event } = action.payload;
      return {
        ...state,
        event,
      };
    }
    case INITIALIZE_EVENT: {
      return {
        ...state,
        initialState,
      };
    }
    default: {
      return state;
    }
  }
};

const EventContext = createContext<ContextType>(initialState);
export const useEvent = () => useContext(EventContext);

const EventListProvider: React.FC<ReactNode> = ({ children }) => {
  const [{ eventList, event, eventError }, dispatch] = useReducer(
    eventReducer,
    initialState
  );

  const {
    dispatchEventList,
    initializeEventList,
    dispatchEvent,
    initializeEvent,
  } = useEventProvider(dispatch);

  const contextValue = useMemo(
    () => ({
      eventList,
      event,
      eventError,
      dispatchEvent,
      dispatchEventList,
      initializeEvent,
      initializeEventList,
    }),
    [
      eventList,
      event,
      eventError,
      dispatchEvent,
      dispatchEventList,
      initializeEvent,
      initializeEventList,
    ]
  );

  return (
    <EventContext.Provider value={contextValue}>
      {children}
    </EventContext.Provider>
  );
};

export default EventListProvider;
