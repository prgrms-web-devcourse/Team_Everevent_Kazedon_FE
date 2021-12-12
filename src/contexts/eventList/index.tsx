import useEventProvider from '@contexts/eventList/actions';
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
  GET_EVENTLIST,
  INITIALIZE_EVENTLIST,
  InitialStateType,
} from '@contexts/eventList/types';

const initialState: InitialStateType = {
  eventList: [],
  event: {
    eventId: '',
    name: '',
    expiredAt: '',
    marketName: '',
    isLike: null,
    likeCount: null,
    reviewCount: null,
    maxParticipants: null,
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
    default:
      return state;
  }
};

const EventContext = createContext<ContextType>(initialState);
export const useEvent = () => useContext(EventContext);

const EventListProvider: React.FC<ReactNode> = ({ children }) => {
  const [{ eventList, event, eventError }, dispatchEvent] = useReducer(
    eventReducer,
    initialState
  );

  const { dispatchEventList, initailizeEventList } =
    useEventProvider(dispatchEvent);

  const contextValue = useMemo(
    () => ({
      eventList,
      event,
      eventError,
      dispatchEventList,
      initailizeEventList,
    }),
    [event, eventList, eventError, dispatchEventList, initailizeEventList]
  );

  return (
    <EventContext.Provider value={contextValue}>
      {children}
    </EventContext.Provider>
  );
};

export default EventListProvider;
