import {
  getFavoriteShops,
  getJoinedEvents,
  getLikeEvents,
  getReviews,
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
} from '@contexts/userHistory/types';
/* eslint-disable import/no-cycle */
import { initialState } from '@contexts/userHistory/index';

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
      const res = await getReviews(memberId);
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
      const res = await getReviews(memberId);
      const { data, error } = res;
      let { userReviewList } = initialState;
      let { userReviewListOptions } = initialState;
      if (data?.reviews?.content) {
        const { reviewerEventCount, reviewerReviewCount } = data;
        const { content, totalPages, totalElements, last } = data.reviews;
        userReviewList = content;
        userReviewListOptions = {
          totalPages,
          totalElements,
          last,
          reviewerEventCount,
          reviewerReviewCount,
        };
      }
      dispatch({
        type: GET_USER_REVIEWS,
        payload: {
          userReviewList,
          userReviewListOptions,
          historyError: error,
        },
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
