import getEventList from '@axios/event/getEventList';
import { GET_EVENTLIST, INITIALIZE_EVENTLIST } from '@contexts/eventList/types';
import { Dispatch, useCallback } from 'react';

const useEventProvider = (dispatchEvent: Dispatch<any>) => {
  const dispatchEventList = useCallback(async () => {
    const res = await getEventList();
    dispatchEvent({
      type: GET_EVENTLIST,
      payload: { eventList: res.data, eventError: res.error },
    });
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
