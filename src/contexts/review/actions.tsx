import { EVENT_LOADING } from '@contexts/event/types';
import { Dispatch, useCallback } from 'react';

const useReviewProvider = (dispatch: Dispatch<any>) => {
  const dispatchLoading = useCallback(
    () => dispatch({ type: EVENT_LOADING }),
    [dispatch]
  );
  return { dispatchLoading };
};

export default useReviewProvider;
