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

export type Action = any;

export const REVIEW_LOADING = 'REVIEW/LOADING';
export const CREATE_REVIEW = 'REVIEW/CREATE';
export const EDIT_REVIEW = 'REVIEW/EDIT';
export const CHANGE_REVIEW_CONTENT = 'REVIEW/CHANGE_CONTENT';
