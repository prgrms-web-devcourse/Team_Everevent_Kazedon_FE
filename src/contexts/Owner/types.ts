export interface OwnerInfo {
  name: string;
  address: string;
  description: string;
}

export type ChangeOwnerInfo = Required<OwnerInfo>;

export type Action = { type: 'CHANGE_OWNER' };

export interface OwnerContextType {
  [dispatchEvent: string]: any;
}

export const CHANGE_OWNER = 'CHANGE_OWNER';
