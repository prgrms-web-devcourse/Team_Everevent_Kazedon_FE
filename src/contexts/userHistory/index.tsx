import { createContext, useContext, useMemo, useReducer } from 'react';
import {
  HistoryProviderProps,
  InitialStateType,
} from '@contexts/userHistory/types';
import useHistoryProvider from './actions';
/* eslint-disable import/no-cycle */
import userHistoryReducer from './reducer';

export const initialState: InitialStateType = {
  isLoading: false,
  joinedEventList: [],
  favoriteShopList: [],
  likeEventList: [],
  myReviewList: [],
  historyError: {
    code: null,
    message: null,
  },
};

const UserHistoryContext = createContext(initialState);
export const useHistory = () => useContext(UserHistoryContext);

const UserHistoryProvider = ({ children }: HistoryProviderProps) => {
  const [
    {
      isLoading,
      favoriteShopList,
      likeEventList,
      joinedEventList,
      myReviewList,
      historyError,
    },
    dispatch,
  ] = useReducer(userHistoryReducer, initialState);

  const {
    initializeHistory,
    dispatchFavoriteShops,
    dispatchLikeEvents,
    dispatchJoinedEvents,
    dispatchMyReview,
  } = useHistoryProvider(dispatch);

  const contextValue = useMemo(
    () => ({
      isLoading,
      joinedEventList,
      favoriteShopList,
      likeEventList,
      myReviewList,
      historyError,
      initializeHistory,
      dispatchFavoriteShops,
      dispatchLikeEvents,
      dispatchJoinedEvents,
      dispatchMyReview,
    }),
    [
      isLoading,
      joinedEventList,
      favoriteShopList,
      likeEventList,
      myReviewList,
      historyError,
      initializeHistory,
      dispatchFavoriteShops,
      dispatchLikeEvents,
      dispatchJoinedEvents,
      dispatchMyReview,
    ]
  );

  return (
    <UserHistoryContext.Provider value={contextValue}>
      {children}
    </UserHistoryContext.Provider>
  );
};

export default UserHistoryProvider;
