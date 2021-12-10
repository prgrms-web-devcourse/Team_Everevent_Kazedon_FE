import getEventList from '@axios/event/getEventList';
import { GET_EVENTLIST, INITIALIZE_EVENTLIST } from '@contexts/eventList/types';
import { Dispatch, useCallback } from 'react';

const useEventProvider = (dispatchEvent: Dispatch<any>) => {
  const dispatchEventList = useCallback(async () => {
    const eventListData = await getEventList();
    dispatchEvent({ type: GET_EVENTLIST, payload: eventListData });
  }, [dispatchEvent]);

  const initailizeEventList = useCallback(async () => {
    dispatchEvent({ type: INITIALIZE_EVENTLIST });
  }, [dispatchEvent]);

  return {
    dispatchEventList,
    initailizeEventList,
  };
};

export default useEventProvider;
