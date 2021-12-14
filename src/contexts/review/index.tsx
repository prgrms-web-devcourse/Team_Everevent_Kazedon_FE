import useReviewProvider from '@contexts/review/actions';
import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import { ContextType, InitialStateType } from '@contexts/review/types';
/* eslint-disable import/no-cycle */
import reviewReducer from '@contexts/review/reducer';

export const initialState: InitialStateType = {
  isLoading: false,
  reviewList: [],
  review: {
    reviewId: '',
    description: '',
    picture: null,
  },
  reviewError: {
    code: null,
    message: null,
  },
};

const EventContext = createContext<ContextType>(initialState);
export const useEvent = () => useContext(EventContext);

const EventListProvider: React.FC<ReactNode> = ({ children }) => {
  const [{ isLoading, reviewList, review, reviewError }, dispatch] = useReducer(
    reviewReducer,
    initialState
  );

  const { dispatchLoading } = useReviewProvider(dispatch);

  const contextValue = useMemo(
    () => ({ isLoading, reviewList, review, reviewError, dispatchLoading }),
    [isLoading, reviewList, review, reviewError, dispatchLoading]
  );

  return (
    <EventContext.Provider value={contextValue}>
      {children}
    </EventContext.Provider>
  );
};

export default EventListProvider;
