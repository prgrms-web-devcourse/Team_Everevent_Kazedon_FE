import { ErrorType } from '@axios/types';

interface PicturesType {
  url: string;
}
export interface EventDetail {
  eventId: number;
  eventName: string;
  expriedAt: string | Date;
  marketName: string;
  marketDescription: string;
  eventDescription: string;
  like: boolean | null;
  favorite: boolean | null;
  pictures: PicturesType[] | [];
  participated: boolean | null;
  completed: boolean | null;
}
export interface Event {
  eventId: string;
  eventName: string;
  expiredAt: string;
  marketName: string;
  pictureUrl: string;
  likeCount: number;
  reviewCount: number;
  like: boolean;
  remainingParticipants: number;
}

export interface EventListResponse {
  simpleEvents: {
    content: EventListType;
    totalPages: number;
    totalElements: number;
    last: boolean;
  };
}

export type EventListType = Array<Event> | [];
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

export type Action =
  | {
      type: 'EVENT/LOADING';
    }
  | {
      type: 'EVENTLIST/GET';
      payload: { eventList: EventListType; eventError: ErrorType };
    }
  | { type: 'EVENTLIST/INITIALIZE' }
  | {
      type: 'EVENT/GET';
      payload: { event: EventDetail; eventError: ErrorType };
    }
  | { type: 'EVENT/INITIALIZE' }
  | { type: 'EVENT/LIKE'; payload: { like: boolean; eventError: ErrorType } }
  | {
      type: 'EVENT/FAVORITE';
      payload: { favorite: boolean; eventError: ErrorType };
    }
  | {
      type: 'EVENT/PARTICIPATE';
      payload: { participated: boolean; eventError: ErrorType };
    }
  | {
      type: 'EVENT/COMPLETE_PARTICIPATE';
      payload: { completed: boolean; eventError: ErrorType };
    };
