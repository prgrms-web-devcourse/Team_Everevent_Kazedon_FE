import request from '@axios/index';
import { ResType } from '@axios/types';

export const getFavoriteShops = async (memberId: string) => {
  const res: ResType<any> = await request.get(
    `/members/${memberId}/favorites/markets`
  );
  return res;
};

export const getLikeEvents = async (memberId: string) => {
  const res: ResType<any> = await request.get(
    `/members/${memberId}/member/likes/events`
  );
  return res;
};

export const getJoinedEvents = async (memberId: string) => {
  const res: ResType<any> = await request.get(`/members/${memberId}/events`);
  return res;
};

export const getMyReview = async (memberId: string) => {
  const res: ResType<any> = await request.get(`/members/${memberId}/reviews`);
  return res;
};