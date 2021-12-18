import useReviewProvider from '@contexts/review/actions';
import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import { ContextType, InitialStateType } from '@contexts/review/types';
/* eslint-disable import/no-cycle */
import reviewReducer from '@contexts/review/reducer';

export const initialState: InitialStateType = {
  isLoading: false,
  reviewList: [],
  reviewListOptions: {
    last: true,
    totalPages: 0,
    totalElements: 0,
  },
  review: {
    reviewId: 0,
    description: null,
    pictureUrls: [],
    memberId: 0,
    memberNickname: null,
    createdAt: null,
  },
  reviewError: {
    code: null,
    message: null,
  },
};

const ReviewContext = createContext<ContextType>(initialState);
export const useReview = () => useContext(ReviewContext);

const ReviewProvider: React.FC<ReactNode> = ({ children }) => {
  const [{ isLoading, reviewList, review, reviewError }, dispatch] = useReducer(
    reviewReducer,
    initialState
  );

  const {
    dispatchLoading,
    dispatchGetReviewList,
    dispatchGetReview,
    dispatchChangeReviewContent,
    dispatchCreateReview,
    dispatchUpdateReview,
  } = useReviewProvider(dispatch);

  const contextValue = useMemo(
    () => ({
      isLoading,
      reviewList,
      review,
      reviewError,
      dispatchLoading,
      dispatchGetReviewList,
      dispatchGetReview,
      dispatchChangeReviewContent,
      dispatchCreateReview,
      dispatchUpdateReview,
    }),
    [
      isLoading,
      reviewList,
      review,
      reviewError,
      dispatchLoading,
      dispatchGetReviewList,
      dispatchGetReview,
      dispatchChangeReviewContent,
      dispatchCreateReview,
      dispatchUpdateReview,
    ]
  );

  return (
    <ReviewContext.Provider value={contextValue}>
      {children}
    </ReviewContext.Provider>
  );
};

export default ReviewProvider;
