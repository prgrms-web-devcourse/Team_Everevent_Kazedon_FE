import React, { createContext, useMemo, useReducer } from 'react';
import useShopProvider from './actions';
import { ShopInfoData, ShopContextType } from './types';
import { shopContextreducer } from './reducer';

const initialState: ShopInfoData = {
  marketId: '',
  name: '',
  description: '',
  eventCount: 0,
  likeCount: 0,
  reviewCount: 0,
};

export const ShopContext = createContext<ShopContextType>(initialState);

export const ShopProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(shopContextreducer, initialState);

  const {
    getShopInfo,
    putShopInfo,
    createShopEvent,
    getShopEvents,
    dispatchChangeEventContent,
  } = useShopProvider(dispatch);

  const value = useMemo(
    () => ({
      state,
      getShopInfo,
      putShopInfo,
      createShopEvent,
      getShopEvents,
      dispatchChangeEventContent,
    }),
    [
      state,
      getShopInfo,
      putShopInfo,
      createShopEvent,
      getShopEvents,
      dispatchChangeEventContent,
    ]
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
