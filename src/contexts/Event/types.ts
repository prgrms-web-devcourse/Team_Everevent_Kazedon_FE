export interface Event {
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

export type eventListType = Event[] | [];

export interface InitialStateType {
  eventList: eventListType;
  event: Event;
}

export const GET_EVENTLIST = 'EVENT/GET_EVENTLIST' as const;
