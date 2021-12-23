import completeParticipateEvent from '@axios/event/completeParticipateEvent';
import getEvent from '@axios/event/getEvent';
import getEventList from '@axios/event/getEventList';
import likeEvent from '@axios/event/likeEvent';
import participateEvent from '@axios/event/participateEvent';
import unlikeEvent from '@axios/event/unlikeEvent';
import favoriteShop from '@axios/shop/favoriteShop';
import unfavoriteShop from '@axios/shop/unfavoriteShop';
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
  LIKE_EVENT_LIST,
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
      const events: typeof res.data.events = res.data?.events ?? null;

      dispatch({
        type: GET_EVENTLIST,
        payload: {
          eventList: events?.content || [],
          eventListOptions: {
            totalPages: events?.totalPages ?? null,
            totalElements: events?.totalElements ?? null,
            last: events?.last ?? null,
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

  const dispatchEventLike = useCallback(
    async (eventId, isLike) => {
      if (!eventId) return;
      dispatchLoading();
      const res = !isLike
        ? await likeEvent(eventId)
        : await unlikeEvent(eventId);
      dispatch({
        type: LIKE_EVENT,
        payload: {
          isLike: res?.data.isLike,
          eventError: res.error,
        },
      });
    },
    [dispatch, dispatchLoading]
  );

  // TODO: 추후 Shop Contexts가 완성되면 Shop으로 옮기도록 한다.
  const dispatchShopFavorite = useCallback(
    async (eventId, isFavorite) => {
      if (!eventId) return;
      dispatchLoading();
      const res = !isFavorite
        ? await favoriteShop(eventId)
        : await unfavoriteShop(eventId);
      dispatch({
        type: FAVORITE_EVENT,
        payload: {
          isFavorite: res?.data.isFavorite,
          eventError: res.error,
        },
      });
    },
    [dispatch, dispatchLoading]
  );

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

  const dispatchEventListLike = useCallback(
    async (eventId, isLike) => {
      if (!eventId) return;
      dispatchLoading();
      const res = !isLike
        ? await likeEvent(eventId)
        : await unlikeEvent(eventId);
      dispatch({
        type: LIKE_EVENT,
        payload: {
          isLike: res?.data.isLike,
          eventError: res.error,
          isLoading: true,
        },
      });
      dispatchLoading();
      dispatch({
        type: LIKE_EVENT_LIST,
        payload: {
          eventId,
          isLike,
        },
      });
    },
    [dispatch, dispatchLoading]
  );

  return {
    dispatchLoading,
    dispatchEventList,
    initializeEventList,
    dispatchEvent,
    initializeEvent,
    dispatchEventLike,
    dispatchShopFavorite,
    dispatchParticipateEvent,
    dispatchCompleteParticipateEvent,
    dispatchEventListLike,
  };
};

export default useEventProvider;
