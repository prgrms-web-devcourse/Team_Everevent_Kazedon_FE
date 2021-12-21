import { Dispatch, useCallback } from 'react';
import showShopInfo from '@axios/shop/showShopInfo';
import updateShopInfo from '@axios/shop/updateShopInfo';
import postEventInfo from '@axios/event/createEvent';
import {
  GET_SHOP_INFO,
  PUT_SHOP_INFO,
  POST_EVENT_INFO,
  CHANGE_EVENT_CONTENT,
  EventCreateFormData,
} from './types';

const useShopProvider = (dispatch: Dispatch<any>) => {
  const getShopInfo = useCallback(async () => {
    const res = await showShopInfo();

    dispatch({
      type: GET_SHOP_INFO,
    });

    return res.data;
  }, [dispatch]);

  const putShopInfo = useCallback(
    async (marketId, description) => {
      await updateShopInfo(marketId, description);

      dispatch({
        type: PUT_SHOP_INFO,
      });
    },
    [dispatch]
  );

  // TODO: 추후에 삭제될 예정입니다.
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
    putShopInfo,
    dispatchChangeEventContent,
    createShopEvent,
  };
};

export default useShopProvider;
