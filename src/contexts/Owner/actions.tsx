import { Dispatch, useCallback } from 'react';
import { postOwnerInfo } from '@axios/owner';
import { ChangeOwnerInfo, CHANGE_OWNER } from './types';

const useOwnerProvider = (dispatch: Dispatch<any>) => {
  const handleChangeOwner = useCallback(
    async (ownerInfo: ChangeOwnerInfo) => {
      const res = await postOwnerInfo(ownerInfo);

      if (res.error.code) {
        throw new Error(`${res.error.code}`);
      }

      dispatch({
        type: CHANGE_OWNER,
      });
    },
    [dispatch]
  );

  return {
    handleChangeOwner,
  };
};

export default useOwnerProvider;
