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
  GET_USER_REVIEWS,
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
    async (memberId) => {
      if (!memberId) return;
      dispatchLoading();
      const res = await getFavoriteShops(memberId);
      dispatch({
        type: GET_FAVORITE_SHOP,
        payload: { favoriteShopList: res.data, historyError: res.error },
      });
    },
    [dispatch, dispatchLoading]
  );

  const dispatchLikeEvents = useCallback(
    async (memberId) => {
      if (!memberId) return;
      dispatchLoading();
      const res = await getLikeEvents(memberId);
      dispatch({
        type: GET_LIKE_EVENT,
        payload: { likeEventList: res.data, historyError: res.error },
      });
    },
    [dispatch, dispatchLoading]
  );

  const dispatchJoinedEvents = useCallback(
    async (memberId) => {
      if (!memberId) return;
      dispatchLoading();
      const res = await getJoinedEvents(memberId);
      dispatch({
        type: GET_JOINED_EVENT,
        payload: { joinedEventList: res.data, historyError: res.error },
      });
    },
    [dispatch, dispatchLoading]
  );

  const dispatchMyReviews = useCallback(
    async (memberId) => {
      if (!memberId) return;
      dispatchLoading();
      const res = await getMyReview(memberId);
      dispatch({
        type: GET_MY_REVIEW,
        payload: { myReviewList: res.data, historyError: res.error },
      });
    },
    [dispatch, dispatchLoading]
  );
  const dispatchUserReviews = useCallback(
    async (memberId) => {
      if (!memberId) return;
      dispatchLoading();
      const res = await getMyReview(memberId);
      dispatch({
        type: GET_USER_REVIEWS,
        payload: { userReviewList: res.data, historyError: res.error },
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
    dispatchMyReviews,
    dispatchUserReviews,
  };
};

export default useHistoryProvider;
