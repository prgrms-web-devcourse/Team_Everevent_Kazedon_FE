import {
  getFavoriteShops,
  getJoinedEvents,
  getLikeEvents,
  getMyReview,
} from '@axios/members';
import { Dispatch, useCallback } from 'react';
import {
  HISTORY_LOADING,
  INITIALIZE_HISTORY,
  GET_FAVORITE_SHOP,
  GET_JOINED_EVENT,
  GET_LIKE_EVENT,
  GET_MY_REVIEW,
} from './types';

const useHistoryProvider = (dispatch: Dispatch<any>) => {
  const dispatchLoading = useCallback(
    () => dispatch({ type: HISTORY_LOADING }),
    [dispatch]
  );

  const initializeHistory = useCallback(() => {
    dispatch({ type: INITIALIZE_HISTORY });
  }, [dispatch]);

  const dispatchFavoriteShops = useCallback(
    async (membersId) => {
      dispatchLoading();
      const res = await getFavoriteShops(membersId);
      dispatch({
        type: GET_FAVORITE_SHOP,
        payload: { favoriteShopList: res.data, historyError: res.error },
      });
    },
    [dispatch, dispatchLoading]
  );

  const dispatchLikeEvents = useCallback(
    async (membersId) => {
      dispatchLoading();
      const res = await getLikeEvents(membersId);
      dispatch({
        type: GET_LIKE_EVENT,
        payload: { likeEventList: res.data, historyError: res.error },
      });
    },
    [dispatch, dispatchLoading]
  );

  const dispatchJoinedEvents = useCallback(
    async (membersId) => {
      dispatchLoading();
      const res = await getJoinedEvents(membersId);
      dispatch({
        type: GET_JOINED_EVENT,
        payload: { joinedEventList: res.data, historyError: res.error },
      });
    },
    [dispatch, dispatchLoading]
  );

  const dispatchMyReview = useCallback(
    async (membersId) => {
      dispatchLoading();
      const res = await getMyReview(membersId);
      dispatch({
        type: GET_MY_REVIEW,
        payload: { myReviewList: res.data, historyError: res.error },
      });
    },
    [dispatch, dispatchLoading]
  );

  return {
    dispatchLoading,
    initializeHistory,
    dispatchFavoriteShops,
    dispatchLikeEvents,
    dispatchJoinedEvents,
    dispatchMyReview,
  };
};

export default useHistoryProvider;
