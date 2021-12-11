import { User, Action } from './types';

const reducer = (state: User, action: Action): User => {
  switch (action.type) {
    case 'LOG_IN':
      return { ...state, id: action.user.id, token: action.user.token };
    case 'REGISTER':
      return { ...state };
    case 'LOG_OUT':
      return { ...state, id: '', token: '' };
    default:
      return state;
  }
};

export default reducer;
