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
  event: Event;
}

export interface ContextType extends InitialStateType {
  [dispatchEvent: string]: any;
}

export const GET_EVENTLIST = 'EVENTLIST/GET' as const;
export const INITIALIZE_EVENTLIST = 'EVENTLIST/INITIALIZE' as const;

export type Action =
  | { type: 'EVENTLIST/GET'; payload: EventListType }
  | { type: 'EVENTLIST/INITIALIZE' };
