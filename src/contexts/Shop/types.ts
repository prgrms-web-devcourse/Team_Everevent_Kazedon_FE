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

export interface ShopEventInfo {
  marketId: number | null;
  name: string | null;
  description: string | null;
  expiredAt: string | Date;
  maxParticipants: number | null;
  pictures: PicturesType[] | [];
}
