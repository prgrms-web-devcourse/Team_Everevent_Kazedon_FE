import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Common from '@styles/index';
import { ReactNode } from 'react';

type sizeTypes = 'micro' | 'small' | 'medium' | 'large';

export interface TextProps {
  children: string | ReactNode;
  size?: string | number;
  color?: string;
  underline?: boolean;
  block?: boolean;
  paragraph?: boolean;
  [prop: string]: any;
}

const StyledText = styled.div`
  ${({ size }: TextProps) => css`
    ${typeof size === 'string' && Common.fontStyle[size as sizeTypes]()}
  `}
`;

const Text = ({
  children,
  size,
  color,
  underline,
  block,
  paragraph,
  ...props
}: TextProps) => {
  const Tag = block ? 'div' : paragraph ? 'p' : 'span';
  const fontSizes = Common.fontSize;

  const fontStyle = {
    fontSize: typeof size === 'number' ? size : fontSizes[size as sizeTypes],
    textDecoration: underline ? 'underline' : undefined,
    color,
  };

  return (
    <StyledText
      as={Tag}
      size={size}
      style={{ ...props.fontStyle, ...fontStyle }}
      {...props}
    >
      {children}
    </StyledText>
  );
};

export default Text;
