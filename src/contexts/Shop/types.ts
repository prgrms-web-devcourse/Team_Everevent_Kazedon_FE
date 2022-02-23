export interface ShopInfo {
  marketId: string | null;
  name: string | null;
  description: string | null;
  eventCount: number | null;
  likeCount: number | null;
  reviewCount: number | null;
}

export interface Shop {
  shopId: string;
  name: string;
  shopName: string;
}

interface PicturesType {
  url: string;
}

// TODO: 일단 marketId, expiredAt, maxParticipants은 string으로 하고 추후 수정
// TODO: 네이밍 수정 예정
export interface ShopEventInfo {
  name: string | null;
  marketId: string | null;
  description: string | null;
  expiredAt: string | null;
  maxParticipants: string | null;
  pictures: PicturesType[] | [];
}

export interface ShopEvent {
  eventId: number | null;
  expiredAt: string | null;
  name: string | null;
  marketName: string | null;
  likeCount: number | null;
  reviewCount: number | null;
}

export interface ShopContextType {
  [dispatchEvent: string]: any;
}

export type EventCreateFormData = Partial<ShopEventInfo>;
export type ShopInfoData = Partial<ShopInfo>;

export type Action =
  | { type: 'GET_SHOP_INFO' }
  | { type: 'PUT_SHOP_INFO' }
  | { type: 'POST_EVENT_INFO' }
  | { type: 'GET_SHOP_EVENTS' }
  | {
      type: 'EVENT/CHANGE_CONTENT';
      payload: { name: string; value: File | string };
    };

export const GET_SHOP_INFO = 'GET_SHOP_INFO';
export const PUT_SHOP_INFO = 'PUT_SHOP_INFO';
export const POST_EVENT_INFO = 'POST_EVENT_INFO';
export const CHANGE_EVENT_CONTENT = 'EVENT/CHANGE_CONTENT';
export const GET_SHOP_EVENTS = 'GET_SHOP_EVENTS';
