import { ErrorType } from '@axios/types';

export type ReviewList = Review[] | [];

export interface Review {
  reviewId: string;
  description: string;
  picture: File | null;
}

export interface InitialStateType {
  isLoading: boolean;
  reviewList: ReviewList;
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
      payload: { reviewList: ReviewList; reviewError: ErrorType };
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

export const REVIEW_LOADING = 'REVIEW/LOADING';
export const GET_REVIEW_LIST = 'REVIEW/GET_REVIEW_LIST';
export const GET_REVIEW = 'REVIEW/GET_REVIEW';
export const CHANGE_REVIEW_CONTENT = 'REVIEW/CHANGE_CONTENT';
export const CREATE_REVIEW = 'REVIEW/CREATE';
export const UPDATE_REVIEW = 'REVIEW/UPDATE';
