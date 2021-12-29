/* eslint-disable import/no-cycle */
import { initialState } from '.';
import {
  Action,
  GET_FAVORITE_SHOP,
  GET_JOINED_EVENT,
  GET_LIKE_EVENT,
  GET_MY_REVIEW,
  GET_USER_REVIEWS,
  HISTORY_LOADING,
  INITIALIZE_HISTORY,
  InitialStateType,
} from './types';

const userHistoryReducer = (state: InitialStateType, action: Action) => {
  switch (action.type) {
    case HISTORY_LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case INITIALIZE_HISTORY: {
      return {
        ...state,
        ...initialState,
      };
    }

    case GET_FAVORITE_SHOP: {
      const { favoriteShopList, historyError } = action.payload;
      return {
        ...state,
        favoriteShopList,
        historyError,
        isLoading: false,
      };
    }

    case GET_LIKE_EVENT: {
      const { likeEventList, historyError } = action.payload;
      return {
        ...state,
        likeEventList,
        historyError,
        isLoading: false,
      };
    }

    case GET_JOINED_EVENT: {
      const { joinedEventList, historyError } = action.payload;
      return {
        ...state,
        joinedEventList,
        historyError,
        isLoading: false,
      };
    }

    case GET_MY_REVIEW: {
      const { myReviewList, historyError } = action.payload;
      return {
        ...state,
        myReviewList,
        historyError,
        isLoading: false,
      };
    }
    case GET_USER_REVIEWS: {
      const { userReviewList, historyError } = action.payload;
      return {
        ...state,
        userReviewList,
        historyError,
        isLoading: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default userHistoryReducer;
