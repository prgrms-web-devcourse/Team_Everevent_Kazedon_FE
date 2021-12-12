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
  EVENT_LOADING,
  FAVORITE_EVENT,
  GET_EVENT,
  GET_EVENTLIST,
  INITIALIZE_EVENT,
  INITIALIZE_EVENTLIST,
  InitialStateType,
  LIKE_EVENT,
} from '@contexts/event/types';

const initialState: InitialStateType = {
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

const eventReducer = (state: InitialStateType, action: Action) => {
  switch (action.type) {
    case EVENT_LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_EVENTLIST: {
      const { eventList } = action.payload;
      return {
        ...state,
        isLoading: false,
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
        isLoading: false,
        event,
      };
    }
    case INITIALIZE_EVENT: {
      return {
        ...state,
        initialState,
      };
    }
    case LIKE_EVENT: {
      return {
        ...state,
        isLoading: false,
        event: {
          ...state.event,
          isLike: !state.event.isLike,
        },
      };
    }
    case FAVORITE_EVENT: {
      return {
        ...state,
        isLoading: false,
        event: {
          ...state.event,
          isFavorite: !state.event.isFavorite,
        },
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
