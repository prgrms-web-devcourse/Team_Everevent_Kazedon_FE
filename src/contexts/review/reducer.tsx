import {
  InitialStateType,
  Action,
  REVIEW_LOADING,
  GET_REVIEW_LIST,
  GET_REVIEW,
  CREATE_REVIEW,
  CHANGE_REVIEW_CONTENT,
  UPDATE_REVIEW,
} from '@contexts/review/types';

const reviewReducer = (state: InitialStateType, action: Action) => {
  switch (action.type) {
    case REVIEW_LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case CHANGE_REVIEW_CONTENT: {
      const { name, value } = action.payload;
      return {
        ...state,
        review: {
          ...state.review,
          [name]: value,
        },
        loading: false,
      };
    }
    case GET_REVIEW_LIST: {
      const { reviewList, reviewError } = action.payload;
      return {
        ...state,
        reviewList,
        reviewError,
        loading: false,
      };
    }
    case GET_REVIEW: {
      const { review, reviewError } = action.payload;
      return {
        ...state,
        review,
        reviewError,
        loading: false,
      };
    }
    case CREATE_REVIEW: {
      const { reviewError } = action.payload;
      return {
        ...state,
        reviewError,
        loading: false,
      };
    }
    case UPDATE_REVIEW: {
      const { reviewError } = action.payload;
      return {
        ...state,
        reviewError,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default reviewReducer;
