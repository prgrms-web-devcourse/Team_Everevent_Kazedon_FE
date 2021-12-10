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
};

const eventReducer = (state: InitialStateType, action: Action) => {
  switch (action.type) {
    case GET_EVENTLIST: {
      const { payload: eventList } = action;
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
  const [{ eventList, event }, dispatchEvent] = useReducer(
    eventReducer,
    initialState
  );

  const { dispatchEventList, initailizeEventList } =
    useEventProvider(dispatchEvent);

  const contextValue = useMemo(
    () => ({ eventList, event, dispatchEventList, initailizeEventList }),
    [event, eventList, dispatchEventList, initailizeEventList]
  );

  return (
    <EventContext.Provider value={contextValue}>
      {children}
    </EventContext.Provider>
  );
};

export default EventListProvider;
