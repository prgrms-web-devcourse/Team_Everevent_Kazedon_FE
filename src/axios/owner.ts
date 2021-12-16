import request from '@axios/index';
import { ResType } from '@axios/types';
import { ChangeOwnerInfo } from '@contexts/Owner/types';

export const onChangeOwner = async (ownerInfo: ChangeOwnerInfo) => {
  const res: ResType<any> = await request.post('markets', ownerInfo);

  return res;
};
