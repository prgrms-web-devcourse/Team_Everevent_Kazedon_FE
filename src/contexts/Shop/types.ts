export interface Shop {
  marketName: string | null;
  description: string | null;
  eventCount: number | null;
  favoriteCount: number | null;
  reviewCount: number | null;
}

export interface ShopEvent {
  name: string | null;
  expiredAt: string | null;
  marketName: string | null;
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

// export type EventCreateFormData = Partial<Omit<ShopEventInfo, 'pictures'>>;
export type EventCreateFormData = Partial<ShopEventInfo>;
