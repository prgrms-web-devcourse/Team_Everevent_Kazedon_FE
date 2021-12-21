import { ShopInfoData, EventCreateFormData, Action } from './types';

export const shopContextreducer = (
  state: ShopInfoData | EventCreateFormData,
  action: Action
): ShopInfoData => {
  switch (action.type) {
    case 'GET_SHOP_INFO':
      return state;
    case 'PUT_SHOP_INFO':
      return state;
    case 'POST_EVENT_INFO':
      return state;
    case 'EVENT/CHANGE_CONTENT': {
      const { name, value } = action.payload;
      return {
        ...state,
        [name]: value,
      };
    }
    default:
      return state;
  }
};
