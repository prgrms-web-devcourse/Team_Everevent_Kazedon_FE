export interface CreateReviewParams {
  eventId: string;
  description: string;
  picture: File;
}

export interface UpdateReviewParams extends CreateReviewParams {
  [param: string]: any;
}
