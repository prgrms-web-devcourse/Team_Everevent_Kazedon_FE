import completeParticipateEvent from '@axios/event/completeParticipateEvent';
import getEvent from '@axios/event/getEvent';
import getEventList from '@axios/event/getEventList';
import participateEvent from '@axios/event/participateEvent';
import {
  COMPLETE_PARTICIPATE_EVENT,
  EventListParam,
  EVENT_LOADING,
  FAVORITE_EVENT,
  GET_EVENT,
  GET_EVENTLIST,
  INITIALIZE_EVENT,
  INITIALIZE_EVENTLIST,
  LIKE_EVENT,
  PARTICIPATE_EVENT,
} from '@contexts/event/types';
import { Dispatch, useCallback } from 'react';

const useEventProvider = (dispatch: Dispatch<any>) => {
  const dispatchLoading = useCallback(
    () => dispatch({ type: EVENT_LOADING }),
    [dispatch]
  );
  const dispatchEventList = useCallback(
    async ({ location, sort, page, size }: EventListParam) => {
      dispatchLoading();
      const res = await getEventList({ location, sort, page, size });
      const simpleEvents: typeof res.data.simpleEvents =
        res.data?.simpleEvents ?? null;
      dispatch({
        type: GET_EVENTLIST,
        payload: {
          eventList: simpleEvents?.content || [],
          eventListOption: {
            totalPages: simpleEvents?.totalPages ?? null,
            totalElements: simpleEvents?.totalElements ?? null,
            last: simpleEvents?.last ?? null,
          },
          eventError: res.error,
        },
      });
    },
    [dispatch, dispatchLoading]
  );

  const initializeEventList = useCallback(async () => {
    dispatch({ type: INITIALIZE_EVENTLIST });
  }, [dispatch]);

  const dispatchEvent = useCallback(
    async ({ eventId }) => {
      if (!eventId) return;
      dispatchLoading();
      const res = await getEvent({ eventId });
      dispatch({
        type: GET_EVENT,
        payload: { event: res?.data, eventError: res?.error },
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
    }, 250);
  }, [dispatch, dispatchLoading]);

  const dispatchEventFavorite = useCallback(async () => {
    dispatchLoading();
    /* eslint-disable no-console */
    await setTimeout(() => {
      dispatch({
        type: FAVORITE_EVENT,
      });
    }, 250);
  }, [dispatch, dispatchLoading]);

  const dispatchParticipateEvent = useCallback(
    async ({ eventId }) => {
      if (!eventId) return;
      dispatchLoading();
      const res = await participateEvent({ eventId });
      dispatch({
        type: PARTICIPATE_EVENT,
        payload: {
          participated: res?.data.participated,
          eventError: res?.error,
        },
      });
      return res?.error.code;
    },
    [dispatch, dispatchLoading]
  );

  const dispatchCompleteParticipateEvent = useCallback(
    async ({ eventId }) => {
      if (!eventId) return;
      dispatchLoading();
      const res = await completeParticipateEvent({ eventId });
      console.log('res: ', res);
      dispatch({
        type: COMPLETE_PARTICIPATE_EVENT,
        payload: {
          completed: res?.data.completed || res?.error.code === 409,
          eventError: res?.error,
        },
      });
      return res?.error.code;
    },
    [dispatch, dispatchLoading]
  );

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
    dispatchEventFavorite,
    dispatchParticipateEvent,
    dispatchCompleteParticipateEvent,
  };
};

export default useEventProvider;
