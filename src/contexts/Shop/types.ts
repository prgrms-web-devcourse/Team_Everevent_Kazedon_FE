export interface ShopInfo {
  marketId: string | null;
  name: string | null;
  description: string | null;
  eventCount: number | null;
  favoriteCount: number | null;
  reviewCount: number | null;
}

interface PicturesType {
  url: string;
}

// TODO: 일단 marketId, expiredAt, maxParticipants은 string으로 하고 추후 수정
export interface ShopEventInfo {
  name: string | null;
  marketId: string | null;
  description: string | null;
  expiredAt: string | null;
  maxParticipants: string | null;
  pictures: PicturesType[] | [];
}

export interface ShopContextType {
  [dispatchEvent: string]: any;
}

export type EventCreateFormData = Partial<ShopEventInfo>;

// TODO: API에 name이 추가된 후 리팩토링할 예정
export type ShopInfoData = Partial<Omit<ShopInfo, 'name'>>;

export type Action = { type: 'GET_SHOP_INFO' };

export const GET_SHOP_INFO = 'GET_SHOP_INFO';
