import { ErrorType } from '@axios/types';

interface PicturesType {
  url: string;
}
export interface EventDetail {
  eventId: string;
  name: string;
  expiredAt: string | Date;
  marketName: string;
  marketDescription: string;
  eventDescription: string;
  isLike: boolean | null;
  isFavorite: boolean | null;
  pictures: PicturesType[] | [];
  isParticipated: boolean | null;
}
export interface Event {
  eventId: string;
  name: string;
  expiredAt: string;
  marketName: string;
  likeCount: number;
  reviewCount: number;
  isLike: boolean;
  maxParticipants: number;
}

export type EventListType = Array<Event> | [];

export interface InitialStateType {
  isLoading: boolean;
  eventList: EventListType;
  event: EventDetail;
  eventError: ErrorType;
}

export interface ContextType extends InitialStateType {
  [dispatchEvent: string]: any;
}

export const EVENT_LOADING = 'EVENT/LOADING' as const;
export const GET_EVENTLIST = 'EVENTLIST/GET' as const;
export const INITIALIZE_EVENTLIST = 'EVENTLIST/INITIALIZE' as const;

export const GET_EVENT = 'EVENT/GET' as const;
export const INITIALIZE_EVENT = 'EVENT/INITIALIZE' as const;
export const LIKE_EVENT = 'EVENT/LIKE' as const;

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
  | { type: 'EVENT/LIKE' };
