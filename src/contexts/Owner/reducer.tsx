import { ChangeOwnerInfo, Action } from './types';

export const ownerContextreducer = (
  state: ChangeOwnerInfo,
  action: Action
): ChangeOwnerInfo => {
  switch (action.type) {
    case 'CHANGE_OWNER':
      return {
        ...state,
      };
    default:
      return state;
  }
};
