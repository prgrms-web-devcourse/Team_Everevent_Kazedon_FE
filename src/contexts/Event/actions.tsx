import getEvent from '@axios/event/getEvent';
import getEventList from '@axios/event/getEventList';
import {
  GET_EVENT,
  GET_EVENTLIST,
  INITIALIZE_EVENT,
  INITIALIZE_EVENTLIST,
} from '@contexts/event/types';
import { Dispatch, useCallback } from 'react';

const useEventProvider = (dispatch: Dispatch<any>) => {
  const dispatchEventList = useCallback(async () => {
    const res = await getEventList();
    dispatch({
      type: GET_EVENTLIST,
      payload: { eventList: res.data, eventError: res.error },
    });
  }, [dispatch]);

  const initializeEventList = useCallback(async () => {
    dispatch({ type: INITIALIZE_EVENTLIST });
  }, [dispatch]);

  const dispatchEvent = useCallback(
    async ({ eventId }) => {
      const res = await getEvent({ eventId });
      dispatch({
        type: GET_EVENT,
        payload: { event: res.data, eventError: res.error },
      });
    },
    [dispatch]
  );

  const initializeEvent = useCallback(async () => {
    dispatch({ type: INITIALIZE_EVENT });
  }, [dispatch]);

  return {
    dispatchEventList,
    initializeEventList,
    dispatchEvent,
    initializeEvent,
  };
};

export default useEventProvider;
