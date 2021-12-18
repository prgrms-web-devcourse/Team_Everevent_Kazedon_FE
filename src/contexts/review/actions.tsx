import createReview from '@axios/review/createReview';
import getReview from '@axios/review/getReview';
import getReviewList from '@axios/review/getReviewList';
import updateReview from '@axios/review/updateReview';
import {
  REVIEW_LOADING,
  GET_REVIEW_LIST,
  GET_REVIEW,
  CREATE_REVIEW,
  CHANGE_REVIEW_CONTENT,
  UPDATE_REVIEW,
  GetReviewListParam,
} from '@contexts/review/types';
import { Dispatch, useCallback } from 'react';

const useReviewProvider = (dispatch: Dispatch<any>) => {
  const dispatchLoading = useCallback(
    () => dispatch({ type: REVIEW_LOADING }),
    [dispatch]
  );

  const dispatchGetReviewList = useCallback(
    async ({ eventId, sort, page, size }: GetReviewListParam) => {
      if (!eventId) return;
      dispatchLoading();
      const res = await getReviewList({ eventId, sort, page, size });
      const simpleReviews = res.data?.simpleReviews ?? null;
      dispatch({
        type: GET_REVIEW_LIST,
        payload: {
          reviewList: simpleReviews?.content ?? [],
          reviewOptions: {
            last: simpleReviews?.last ?? false,
            totalPages: simpleReviews?.totalPages ?? 0,
            totalElements: simpleReviews?.totalElements ?? 0,
          },
          reviewError: res.error,
        },
      });
    },
    [dispatch, dispatchLoading]
  );

  const dispatchGetReview = useCallback(
    async (reviewId: string) => {
      dispatchLoading();
      const res = await getReview({ reviewId });
      dispatch({
        type: GET_REVIEW,
        payload: { review: res.data, reviewError: res.error },
      });
    },
    [dispatch, dispatchLoading]
  );

  const dispatchChangeReviewContent = useCallback(
    async ({ name, value }) => {
      dispatchLoading();
      dispatch({
        type: CHANGE_REVIEW_CONTENT,
        payload: {
          name,
          value,
        },
      });
    },
    [dispatch, dispatchLoading]
  );

  const dispatchCreateReview = useCallback(
    async ({ eventId, description, picture }) => {
      dispatchLoading();
      const res = await createReview({ eventId, description, picture });
      dispatch({
        type: CREATE_REVIEW,
        payload: {
          reviewError: res.error,
        },
      });
    },
    [dispatch, dispatchLoading]
  );

  const dispatchUpdateReview = useCallback(
    async ({ eventId, description, picture }) => {
      dispatchLoading();
      const res = await updateReview({ eventId, description, picture });
      dispatch({
        type: UPDATE_REVIEW,
        payload: {
          error: res.error,
        },
      });
    },
    [dispatch, dispatchLoading]
  );

  return {
    dispatchLoading,
    dispatchGetReviewList,
    dispatchGetReview,
    dispatchChangeReviewContent,
    dispatchCreateReview,
    dispatchUpdateReview,
  };
};

export default useReviewProvider;
