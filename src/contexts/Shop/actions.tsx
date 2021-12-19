import { Dispatch, useCallback } from 'react';
import showShopInfo from '@axios/shop/showShopInfo';
import { GET_SHOP_INFO } from './types';

const useShopProvider = (dispatch: Dispatch<any>) => {
  const getShopInfo = useCallback(async () => {
    const res = await showShopInfo();
    const shopInfo = await res.data.simpleMarkets.content[0];

    dispatch({
      type: GET_SHOP_INFO,
    });

    return shopInfo;
  }, [dispatch]);

  return {
    getShopInfo,
  };
};

export default useShopProvider;
