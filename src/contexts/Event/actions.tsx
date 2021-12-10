import getEventList from '@axios/event/getEventList';
import { GET_EVENTLIST } from '@contexts/Event/types';
import { Dispatch, useCallback } from 'react';

const useEventProvider = (dispatchEvent: Dispatch<any>) => {
  const dispatchEventList = useCallback(async () => {
    const eventListData = await getEventList();
    dispatchEvent({ type: GET_EVENTLIST, payload: eventListData });
  }, [dispatchEvent]);

  return {
    dispatchEventList,
  };
};

export default useEventProvider;
