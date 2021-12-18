/* eslint-disable import/no-cycle */
import { initialState } from '.';
import {
  Action,
  EVENT_LOADING,
  FAVORITE_EVENT,
  GET_EVENT,
  GET_EVENTLIST,
  INITIALIZE_EVENT,
  INITIALIZE_EVENTLIST,
  InitialStateType,
  LIKE_EVENT,
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
      return {
        ...state,
        isLoading: false,
        event: {
          ...state.event,
          like: !state.event.like,
        },
      };
    }
    case FAVORITE_EVENT: {
      return {
        ...state,
        isLoading: false,
        event: {
          ...state.event,
          favorite: !state.event.favorite,
        },
      };
    }
    default: {
      return state;
    }
  }
};
export default eventReducer;
