import { ErrorType } from '@axios/types';

export type ReviewList = Review[] | [];
export interface ReviewListOptions {
  last: boolean;
  totalPages: number;
  totalElements: number;
}

export interface Review {
  reviewId: number;
  description: string | null;
  pictureUrls: string[];
  memberId: number;
  memberNickname: string | null;
  createdAt: Date | string | null;
}

export interface InitialStateType {
  isLoading: boolean;
  reviewList: ReviewList;
  reviewListOptions: ReviewListOptions;
  review: Review;
  reviewError: ErrorType;
}

export interface ContextType {
  [dispatchEvent: string]: any;
}

export type Action =
  | { type: 'REVIEW/LOADING' }
  | {
      type: 'REVIEW/GET_REVIEW_LIST';
      payload: {
        reviewList: ReviewList;
        reviewOptions: ReviewListOptions;
        reviewError: ErrorType;
      };
    }
  | {
      type: 'REVIEW/GET_REVIEW';
      payload: { review: Review; reviewError: ErrorType };
    }
  | {
      type: 'REVIEW/CHANGE_CONTENT';
      payload: { name: string; value: File | string };
    }
  | { type: 'REVIEW/CREATE'; payload: { reviewError: ErrorType } }
  | { type: 'REVIEW/UPDATE'; payload: { reviewError: ErrorType } };

export interface GetReviewListParam {
  eventId: string;
  sort?: 'asc' | 'desc';
  page: number;
  size: number;
}

export const REVIEW_LOADING = 'REVIEW/LOADING';
export const GET_REVIEW_LIST = 'REVIEW/GET_REVIEW_LIST';
export const GET_REVIEW = 'REVIEW/GET_REVIEW';
export const CHANGE_REVIEW_CONTENT = 'REVIEW/CHANGE_CONTENT';
export const CREATE_REVIEW = 'REVIEW/CREATE';
export const UPDATE_REVIEW = 'REVIEW/UPDATE';
