export interface OwnerInfo {
  name: string;
  description: string;
  location: string;
  token: string;
}

export type ChangeOwnerInfo = Required<Omit<OwnerInfo, 'token'>>;
export type Owner = Required<OwnerInfo>;

export type Action = { type: 'CHANGE_OWNER' };
export interface OwnerContextType {
  [dispatchEvent: string]: any;
}

export const CHANGE_OWNER = 'CHANGE_OWNER';
