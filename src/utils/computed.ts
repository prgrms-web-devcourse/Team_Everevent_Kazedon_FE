import { css } from '@emotion/react';

export const marginBottom = (size: number | string) => css`
  margin-bottom: ${typeof size === 'number' ? `${size}px` : size};
`;

export const deleteProperty = <T>(obj: T, key: keyof T): T => {
  const res = JSON.parse(JSON.stringify(obj));
  delete res[key];

  return res;
};
