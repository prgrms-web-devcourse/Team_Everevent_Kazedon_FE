import { ErrorType } from '@axios/types';
import { ReactNode } from 'react';

interface ReviewerCount {
  reviewerEventCount: number;
  reviewerReviewCount: number;
}
export interface ReviewListResponse extends ReviewerCount {
  reviews: {
    content: Array<UserReview>;
    pageable: {
      sort: {
        empty: boolean;
        unsorted: boolean;
        sorted: boolean;
      };
      offset: number;
      pageNumber: number;
      pageSize: number;
      unpaged: boolean;
      paged: boolean;
    };
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    sort: {
      empty: boolean;
      unsorted: boolean;
      sorted: boolean;
    };
    first: boolean;
    numberOfElements: number;
    empty: boolean;
  };
}

export interface FavoriteShop {
  marketId: number;
  name: string;
  favoriteCount: number;
}

export interface LikeEvent {
  eventId: number;
  expiredAt: Date;
  name: string;
  marketName: string;
  likeCount: number;
  reviewCount: number;
}

export interface JoinedEvent {
  eventId: number;
  expiredAt: Date;
  name: string;
  marketName: string;
  likeCount: number;
  reviewCount: number;
  isLike: boolean;
  isParticipated: boolean;
}
export interface MyReview extends ReviewerCount {
  reviewId: number;
  description: string;
  marketName: string;
  pictureUrl: string;
}

export interface UserReview {
  reviewId: number;
  description: string;
  marketName: string;
  pictureUrl: string;
}
export interface UserReviewListOptions extends ReviewerCount {
  last: boolean | null;
  totalPages: number;
  totalElements: number;
}

export const HISTORY_LOADING = 'HISTORY/LOADING' as const;
export const INITIALIZE_HISTORY = 'HISTORY/INITIALIZE_HISTORY' as const;
export const GET_JOINED_EVENT = 'HISTORY/GET_JOINED_EVENT' as const;
export const GET_FAVORITE_SHOP = 'HISTORY/GET_FAVORITE_SHOP' as const;
export const GET_LIKE_EVENT = 'HISTORY/GET_LIKE_EVENT' as const;
export const GET_MY_REVIEW = 'HISTORY/GET_MY_REVIEW' as const;
export const GET_USER_REVIEWS = 'HISTORY/GET_USER_REVIEWS';

export interface HistoryProviderProps {
  children: ReactNode;
}

export interface InitialStateType {
  isLoading: boolean;
  favoriteShopList: Array<FavoriteShop> | [];
  likeEventList: Array<LikeEvent> | [];
  joinedEventList: Array<JoinedEvent> | [];
  myReviewList: Array<MyReview> | [];
  userReviewList: Array<UserReview> | [];
  userReviewListOptions: UserReviewListOptions;
  historyError: ErrorType;
}
export interface ContextType extends InitialStateType {
  [dispatchEvent: string]: any;
}

export type Action =
  | { type: 'HISTORY/LOADING' }
  | { type: 'HISTORY/INITIALIZE_HISTORY' }
  | {
      type: 'HISTORY/GET_JOINED_EVENT';
      payload: { joinedEventList: JoinedEvent[]; historyError: ErrorType };
    }
  | {
      type: 'HISTORY/GET_FAVORITE_SHOP';
      payload: { favoriteShopList: FavoriteShop[]; historyError: ErrorType };
    }
  | {
      type: 'HISTORY/GET_LIKE_EVENT';
      payload: { likeEventList: LikeEvent[]; historyError: ErrorType };
    }
  | {
      type: 'HISTORY/GET_MY_REVIEW';
      payload: { myReviewList: MyReview[]; historyError: ErrorType };
    }
  | {
      type: 'HISTORY/GET_USER_REVIEWS';
      payload: {
        userReviewList: UserReview[];
        userReviewListOptions: UserReviewListOptions;
        historyError: ErrorType;
      };
    };
