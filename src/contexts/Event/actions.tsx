import getEvent from '@axios/event/getEvent';
import getEventList from '@axios/event/getEventList';
import {
  EVENT_LOADING,
  GET_EVENT,
  GET_EVENTLIST,
  INITIALIZE_EVENT,
  INITIALIZE_EVENTLIST,
  LIKE_EVENT,
} from '@contexts/event/types';
import { Dispatch, useCallback } from 'react';

const useEventProvider = (dispatch: Dispatch<any>) => {
  const dispatchLoading = useCallback(
    () => dispatch({ type: EVENT_LOADING }),
    [dispatch]
  );
  const dispatchEventList = useCallback(async () => {
    dispatchLoading();
    const res = await getEventList();
    dispatch({
      type: GET_EVENTLIST,
      payload: { eventList: res.data, eventError: res.error },
    });
  }, [dispatch, dispatchLoading]);

  const initializeEventList = useCallback(async () => {
    dispatch({ type: INITIALIZE_EVENTLIST });
  }, [dispatch]);

  const dispatchEvent = useCallback(
    async ({ eventId }) => {
      dispatchLoading();
      const res = await getEvent({ eventId });
      dispatch({
        type: GET_EVENT,
        payload: { event: res.data, eventError: res.error },
      });
    },
    [dispatch, dispatchLoading]
  );

  const dispatchEventLike = useCallback(async () => {
    dispatchLoading();
    /* eslint-disable no-console */
    await setTimeout(() => {
      dispatch({
        type: LIKE_EVENT,
      });
    }, 1000);
  }, [dispatch, dispatchLoading]);

  const initializeEvent = useCallback(async () => {
    dispatch({ type: INITIALIZE_EVENT });
  }, [dispatch]);

  return {
    dispatchLoading,
    dispatchEventList,
    initializeEventList,
    dispatchEvent,
    initializeEvent,
    dispatchEventLike,
  };
};

export default useEventProvider;
