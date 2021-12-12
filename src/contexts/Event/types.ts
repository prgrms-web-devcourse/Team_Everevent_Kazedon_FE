import { ErrorType } from '@axios/types';

export interface EventDetail {
  eventId: string;
  name: string;
  expiredAt: string | Date;
  marketName: string;
  marketDescription: string;
  eventDescription: string;
  isLike: boolean | null;
  isFavorite: boolean | null;
  pictures: [];
  isParticipated: boolean | null;
}
export interface Event {
  eventId: string | null;
  name: string;
  expiredAt: string | Date;
  marketName: string;
  likeCount: number | null;
  reviewCount: number | null;
  isLike: boolean | null;
  maxParticipants: number | null;
}

export type EventListType = Array<Event> | [];

export interface InitialStateType {
  eventList: EventListType;
  event: EventDetail;
  eventError: ErrorType;
}

export interface ContextType extends InitialStateType {
  [dispatchEvent: string]: any;
}

export const GET_EVENTLIST = 'EVENTLIST/GET' as const;
export const INITIALIZE_EVENTLIST = 'EVENTLIST/INITIALIZE' as const;

export const GET_EVENT = 'EVENT/GET' as const;
export const INITIALIZE_EVENT = 'EVENT/INITIALIZE' as const;

export type Action =
  | {
      type: 'EVENTLIST/GET';
      payload: { eventList: EventListType; eventError: ErrorType };
    }
  | { type: 'EVENTLIST/INITIALIZE' }
  | {
      type: 'EVENT/GET';
      payload: { event: EventDetail; eventError: ErrorType };
    }
  | { type: 'EVENT/INITIALIZE' };
