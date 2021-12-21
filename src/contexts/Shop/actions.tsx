import { Dispatch, useCallback } from 'react';
import showShopInfo from '@axios/shop/showShopInfo';
import updateShopInfo from '@axios/shop/updateShopInfo';
import showShopEvents from '@axios/shop/showShopEvents';
import postEventInfo from '@axios/event/createEvent';
import {
  GET_SHOP_INFO,
  PUT_SHOP_INFO,
  POST_EVENT_INFO,
  GET_SHOP_EVENTS,
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

  const getShopEvents = useCallback(
    async (marketId: number) => {
      const res = await showShopEvents(marketId);

      dispatch({
        type: GET_SHOP_EVENTS,
      });

      return res.data.events.content;
    },
    [dispatch]
  );

  return {
    getShopInfo,
    putShopInfo,
    dispatchChangeEventContent,
    createShopEvent,
    getShopEvents,
  };
};

export default useShopProvider;
