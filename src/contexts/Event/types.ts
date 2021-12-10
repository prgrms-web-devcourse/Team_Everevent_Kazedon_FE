export interface Event {
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
