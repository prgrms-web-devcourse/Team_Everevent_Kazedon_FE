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
  LIKE_EVENT_LIST,
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
      const { eventList, eventListOptions } = action.payload;
      return {
        ...state,
        isLoading: false,
        eventList: [...state.eventList, ...eventList],
        eventListOptions,
      };
    }
    case INITIALIZE_EVENTLIST: {
      return {
        ...state,
        ...initialState,
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
      const { isLike, eventError } = action.payload;
      return {
        ...state,
        isLoading: false,
        event: {
          ...state.event,
          isLike: !isLike,
        },
        eventError,
      };
    }
    case FAVORITE_EVENT: {
      const { isFavorite, eventError } = action.payload;
      return {
        ...state,
        isLoading: false,
        event: {
          ...state.event,
          isFavorite,
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
    case LIKE_EVENT_LIST: {
      const { eventId, isLike } = action.payload;
      return {
        ...state,
        eventList: state.eventList.map((event) =>
          event.eventId === eventId
            ? {
                ...event,
                isLike: !isLike,
                likeCount: event.likeCount + (isLike ? -1 : 1),
              }
            : event
        ),
      };
    }
    default: {
      return state;
    }
  }
};
export default eventReducer;
