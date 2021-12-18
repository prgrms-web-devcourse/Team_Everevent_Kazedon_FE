/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { IconContext } from 'react-icons';
import { MdFavorite } from 'react-icons/md';

export interface IconProps {
  children?: ReactNode;
  position?: string;
  size?: string | number;
  margin?: string | number;
  padding?: string | number;
  color?: string;
}

const StyledIcon = styled.div`
  ${({ position, size, margin, padding, color }: Partial<IconProps>) => css`
    position: ${position ? `${position}` : ''};
    padding: ${typeof padding === 'string' ? padding : `${size}px`};
    margin: ${typeof margin === 'string' ? margin : `${size}px`};
    color: ${color};
    size: ${typeof size === 'string' ? size : `${size}px`};
  `}
`;

const Icon: React.FC<IconProps> = ({
  children = <MdFavorite />,
  position = '',
  size = 16,
  margin = 0,
  padding = 0,
  color = 'black',
  ...props
}) => {
  return (
    <StyledIcon
      {...props}
      margin={margin}
      padding={padding}
      position={position}
    >
      <IconContext.Provider value={{ color: `${color}`, size: `${size}` }}>
        {children}
      </IconContext.Provider>
    </StyledIcon>
  );
};

export default Icon;
