/* eslint-disable import/no-cycle */
import { initialState } from '.';
import {
  Action,
  COMPLETE_PARTICIPATE_EVENT,
  EVENT_LOADING,
  FAVORITE_EVENT,
  GET_EVENT,
  GET_EVENTLIST,
  INITIALIZE_EVENT,
  INITIALIZE_EVENTLIST,
  InitialStateType,
  LIKE_EVENT,
  PARTICIPATE_EVENT,
} from './types';

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
      const { like, eventError } = action.payload;
      return {
        ...state,
        isLoading: false,
        event: {
          ...state.event,
          like,
        },
        eventError,
      };
    }
    case FAVORITE_EVENT: {
      const { favorite, eventError } = action.payload;
      return {
        ...state,
        isLoading: false,
        event: {
          ...state.event,
          favorite,
        },
        eventError,
      };
    }
    case PARTICIPATE_EVENT: {
      const { participated, eventError } = action.payload;
      return {
        ...state,
        isLoading: false,
        event: {
          ...state.event,
          participated,
        },
        eventError,
      };
    }
    case COMPLETE_PARTICIPATE_EVENT: {
      const { completed, eventError } = action.payload;
      return {
        ...state,
        isLoading: false,
        event: {
          ...state.event,
          completed,
        },
        eventError,
      };
    }
    default: {
      return state;
    }
  }
};
export default eventReducer;
