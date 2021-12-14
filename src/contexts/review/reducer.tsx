import { InitialStateType, Action } from '@contexts/review/types';

const reviewReducer = (state: InitialStateType, action: Action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};

export default reviewReducer;
