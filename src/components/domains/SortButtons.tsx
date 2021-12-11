import Button from '@components/atoms/Button';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import styles from '@styles/index';
import React from 'react';

export type widthType = string | number;
export type callbackType = () => void;
export type buttonArrType = [string, callbackType];
export type buttonMarginType = string | number;

interface StyledSortButtonsProps {
  width: widthType;
  buttonMargin?: buttonMarginType;
}
export interface SortButtonsProps extends StyledSortButtonsProps {
  buttonArr: buttonArrType[];
  [prop: string]: any;
}

const buttonColorCSS = css`
  color: ${styles.colors.primary};
`;
const StyledSortButtons: React.FC<StyledSortButtonsProps> = styled.section`
  display: flex;
  width: ${({ width }: { width: widthType }) =>
    typeof width === 'string' ? width : `${width}px`};
  ${({ buttonMargin }: Partial<StyledSortButtonsProps>) =>
    buttonMargin &&
    css`
      button {
        margin-right: ${typeof buttonMargin === 'string'
          ? buttonMargin
          : `${buttonMargin}px`};

        &:last-child {
          margin-right: 0;
        }
      }
    `}
`;

const SortButtons = ({ width, buttonArr, buttonMargin }: SortButtonsProps) => {
  if (!buttonArr.length) return null;
  return (
    <StyledSortButtons width={width} buttonMargin={buttonMargin}>
      {buttonArr.map(([name, cb]: buttonArrType) => (
        <Button
          key={name}
          buttonType="primary"
          width="auto"
          fontSize={14}
          onClick={cb}
          reversal
          padding={0}
          css={buttonColorCSS}
        >
          {name}
        </Button>
      ))}
    </StyledSortButtons>
  );
};

export default SortButtons;
