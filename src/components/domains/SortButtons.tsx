import Button from '@components/atoms/Button';
import styled from '@emotion/styled';
import React from 'react';

export type widthType = string | number;
export type callbackType = () => void;

export type buttonArrType = (string | callbackType)[];

export interface SortButtonsProps {
  width: widthType;
  [prop: string]: any;
}

const StyledSortButtons: React.FC<SortButtonsProps> = styled.section`
  display: flex;
  justify-content: space-between;
  width: ${({ width }: { width: widthType }) =>
    typeof width === 'string' ? width : `${width}px`};
`;

const SortButtons = ({ width, buttonArr }: SortButtonsProps) => {
  if (!buttonArr.length) return null;
  return (
    <StyledSortButtons width={width}>
      {buttonArr.map(([name, cb]: buttonArrType) => (
        <Button
          key="name"
          display="flex"
          justifyContent="center"
          alignItems="center"
          buttonType="primary"
          fontSize={14}
          onClick={cb as callbackType}
          reversal
          bold={false}
          backgroundColor="white"
          border="none"
          color="black"
        >
          {name}
        </Button>
      ))}
    </StyledSortButtons>
  );
};

export default SortButtons;
