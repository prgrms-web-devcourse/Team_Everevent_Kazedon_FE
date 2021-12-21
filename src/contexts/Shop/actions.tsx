import { Dispatch, useCallback } from 'react';
import showShopInfo from '@axios/shop/showShopInfo';
import postEventInfo from '@axios/event/createEvent';
import {
  GET_SHOP_INFO,
  POST_EVENT_INFO,
  CHANGE_EVENT_CONTENT,
  EventCreateFormData,
} from './types';

const useShopProvider = (dispatch: Dispatch<any>) => {
  const getShopInfo = useCallback(async () => {
    const res = await showShopInfo();
    const shopInfo = await res.data.simpleMarkets.content[0];

    dispatch({
      type: GET_SHOP_INFO,
    });

    return shopInfo;
  }, [dispatch]);

  const dispatchChangeEventContent = useCallback(
    async ({ name, value }) => {
      dispatch({
        type: CHANGE_EVENT_CONTENT,
        payload: {
          name,
          value,
        },
      });
    },
    [dispatch]
  );

  const createShopEvent = useCallback(
    async (eventInfo: EventCreateFormData) => {
      const res = await postEventInfo(eventInfo);

      if (res.error.code) {
        throw new Error(`이벤트 생성 에러: ${res.error.code}`);
      }

      dispatch({
        type: POST_EVENT_INFO,
      });
    },
    [dispatch]
  );

  return {
    getShopInfo,
    dispatchChangeEventContent,
    createShopEvent,
  };
};

export default useShopProvider;
