export interface EventListParam {
  location: string;
  sorting: string;
  page: number;
  size: number;
}

export interface GetEventParamTypes {
  eventId: string | undefined | string[];
}
