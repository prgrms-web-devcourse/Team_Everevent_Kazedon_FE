import { ShopInfoData, Action } from './types';

export const shopContextreducer = (
  state: ShopInfoData,
  action: Action
): ShopInfoData => {
  switch (action.type) {
    case 'GET_SHOP_INFO':
      return state;

    default:
      return state;
  }
};
