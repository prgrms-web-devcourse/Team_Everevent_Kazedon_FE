import { css } from '@emotion/react';

export const marginBottom = (size: number | string) => css`
  margin-bottom: ${typeof size === 'number' ? `${size}px` : size};
`;
