import React, { createContext, useMemo, useReducer } from 'react';
import useShopProvider from './actions';
import { ShopInfoData, EventCreateFormData, ShopContextType } from './types';
import { shopContextreducer } from './reducer';

const initialState: ShopInfoData = {
  marketId: '',
  description: '',
  eventCount: 0,
  favoriteCount: 0,
  reviewCount: 0,
};

const eventInitialState: EventCreateFormData = {
  name: '',
  marketId: '',
  description: '',
  expiredAt: '',
  maxParticipants: '',
  pictures: [],
};

export const ShopContext = createContext<ShopContextType>(initialState);
export const EventContext = createContext<ShopContextType>(initialState);

export const ShopProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(shopContextreducer, initialState);
  const [eventState] = useReducer(shopContextreducer, eventInitialState);

  const { getShopInfo, createShopEvent, dispatchChangeEventContent } =
    useShopProvider(dispatch);

  const value = useMemo(
    () => ({
      state,
      eventState,
      getShopInfo,
      createShopEvent,
      dispatchChangeEventContent,
    }),
    [
      state,
      eventState,
      getShopInfo,
      createShopEvent,
      dispatchChangeEventContent,
    ]
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
