import * as React from 'react';
import NextImage from 'next/image';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export interface ImageContainerProps {
  loader?: string;
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  margin?: string | number;
  padding?: string | number;
  position?:
    | undefined
    | 'static'
    | 'relative'
    | 'absolute'
    | 'fixed'
    | 'sticky';
  placeholder?: 'blur' | 'empty';
  blurDataUrl?: string;
  sizes?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  layout?: 'intrinsic' | 'fixed' | 'fill' | 'responsive';
  isCircle?: boolean;
  [prop: string]: any;
}

const StyledImageContainer = styled.div`
  overflow: hidden;
  ${({
    width,
    height,
    margin,
    padding,
    position,
    isCircle,
  }: Partial<ImageContainerProps>) => css`
    flex-shrink: 0;
    ${position ? `position: ${position};` : ''}
    width: ${typeof width === 'string' ? width : `${width}px`};
    height: ${typeof height === 'string' ? height : `${height}px`};
    padding: ${typeof padding === 'string' ? padding : `${padding}px`};
    margin: ${typeof margin === 'string' ? margin : `${margin}px`};
    border-radius: ${isCircle ? '50%' : 0};
  `}
`;

const ImageContainer: React.FC<ImageContainerProps> = ({
  src,
  alt,
  width = 40,
  height = 40,
  margin = 0,
  padding = 0,
  position = undefined,
  placeholder = 'empty',
  isCircle = false,
  objectFit = 'cover',
  layout = 'intrinsic',
  sizes = '100vw',
  ...props
}) => {
  return (
    <StyledImageContainer
      {...props}
      width={width}
      height={height}
      margin={margin}
      padding={padding}
      isCircle={isCircle}
      position={position}
    >
      <NextImage
        src={src}
        alt={alt}
        width="100%"
        height="100%"
        placeholder={placeholder}
        layout={layout}
        sizes={layout === 'fill' || layout === 'responsive' ? sizes : undefined}
        objectFit={objectFit}
      />
    </StyledImageContainer>
  );
};

export default ImageContainer;
