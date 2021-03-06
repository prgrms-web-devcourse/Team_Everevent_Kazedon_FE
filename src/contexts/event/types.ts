import { ErrorType } from '@axios/types';

export interface EventDetail {
  eventId: number;
  name: string;
  expiredAt?: string | Date;
  expriedAt?: string | Date;
  marketId: number;
  marketName: string;
  marketDescription: string;
  eventDescription: string;
  isLike: boolean | null;
  isFavorite: boolean | null;
  pictures: string[] | [];
  participateStatus: 'notParticipated' | 'participated' | 'completed';
}
export interface Event {
  eventId: string;
  name: string;
  expiredAt: string;
  marketName: string;
  pictureUrl: string;
  likeCount: number;
  reviewCount: number;
  isLike: boolean;
  remainingParticipants: number;
}

export interface EventListResponse {
  events: {
    content: EventListType;
    totalPages: number;
    totalElements: number;
    last: boolean;
  };
}

export type EventListType = Array<Event>;
export interface EventListOptions {
  totalPages: number;
  totalElements: number;
  last: boolean;
}
export interface InitialStateType {
  isLoading: boolean;
  eventList: EventListType;
  eventListOptions: EventListOptions;
  event: EventDetail;
  eventError: ErrorType;
}

export interface ContextType extends InitialStateType {
  [dispatchEvent: string]: any;
}

export interface EventListParam {
  location: string;
  sort: string;
  page: number;
  size: number;
}

export const EVENT_LOADING = 'EVENT/LOADING' as const;
export const GET_EVENTLIST = 'EVENTLIST/GET' as const;
export const INITIALIZE_EVENTLIST = 'EVENTLIST/INITIALIZE' as const;

export const GET_EVENT = 'EVENT/GET' as const;
export const INITIALIZE_EVENT = 'EVENT/INITIALIZE' as const;
export const LIKE_EVENT = 'EVENT/LIKE' as const;
export const FAVORITE_EVENT = 'EVENT/FAVORITE' as const;
export const PARTICIPATE_EVENT = 'EVENT/PARTICIPATE' as const;
export const COMPLETE_PARTICIPATE_EVENT = 'EVENT/COMPLETE_PARTICIPATE' as const;
export const LIKE_EVENT_LIST = 'EVENT/LIKE_LIST' as const;

export type Action =
  | {
      type: 'EVENT/LOADING';
    }
  | {
      type: 'EVENTLIST/GET';
      payload: {
        eventList: EventListType;
        eventListOptions: EventListOptions;
        eventError: ErrorType;
      };
    }
  | { type: 'EVENTLIST/INITIALIZE' }
  | {
      type: 'EVENT/GET';
      payload: { event: EventDetail; eventError: ErrorType };
    }
  | { type: 'EVENT/INITIALIZE' }
  | { type: 'EVENT/LIKE'; payload: { isLike: boolean; eventError: ErrorType } }
  | {
      type: 'EVENT/FAVORITE';
      payload: { isFavorite: boolean; eventError: ErrorType };
    }
  | {
      type: 'EVENT/PARTICIPATE';
      payload: { participated: boolean; eventError: ErrorType };
    }
  | {
      type: 'EVENT/COMPLETE_PARTICIPATE';
      payload: { completed: boolean; eventError: ErrorType };
    }
  | {
      type: 'EVENT/LIKE_LIST';
      payload: { eventId: string; isLike: boolean };
    };
