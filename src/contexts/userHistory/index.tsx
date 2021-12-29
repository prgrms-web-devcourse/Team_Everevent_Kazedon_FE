import { createContext, useContext, useMemo, useReducer } from 'react';
import {
  ContextType,
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
  userReviewList: [],
  userReviewListOptions: {
    last: null,
    totalPages: 0,
    totalElements: 0,
  },
  historyError: {
    code: null,
    message: null,
  },
};

const UserHistoryContext = createContext<ContextType>(initialState);
export const useUserHistory = () => useContext(UserHistoryContext);

const UserHistoryProvider = ({ children }: HistoryProviderProps) => {
  const [
    {
      isLoading,
      favoriteShopList,
      likeEventList,
      joinedEventList,
      myReviewList,
      userReviewList,
      historyError,
    },
    dispatch,
  ] = useReducer(userHistoryReducer, initialState);

  const {
    initializeHistory,
    dispatchFavoriteShops,
    dispatchLikeEvents,
    dispatchJoinedEvents,
    dispatchMyReviews,
    dispatchUserReviews,
  } = useHistoryProvider(dispatch);

  const contextValue = useMemo(
    () => ({
      isLoading,
      joinedEventList,
      favoriteShopList,
      likeEventList,
      myReviewList,
      userReviewList,
      historyError,
      initializeHistory,
      dispatchFavoriteShops,
      dispatchLikeEvents,
      dispatchJoinedEvents,
      dispatchMyReviews,
      dispatchUserReviews,
    }),
    [
      isLoading,
      joinedEventList,
      favoriteShopList,
      likeEventList,
      myReviewList,
      userReviewList,
      historyError,
      initializeHistory,
      dispatchFavoriteShops,
      dispatchLikeEvents,
      dispatchJoinedEvents,
      dispatchMyReviews,
      dispatchUserReviews,
    ]
  );

  return (
    <UserHistoryContext.Provider value={contextValue}>
      {children}
    </UserHistoryContext.Provider>
  );
};

export default UserHistoryProvider;
