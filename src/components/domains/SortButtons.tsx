import { Icon } from '@components/atoms';
import Button from '@components/atoms/Button';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import styles from '@styles/index';
import React from 'react';
import { MdNorth, MdSouth } from 'react-icons/md';

export type SortOrder = 'asc' | 'desc';
export type SortType = 'likeCount' | 'expiredAt' | 'createdAt';
export type SortButtonName = '좋아요 순' | '종료일 순' | '최신 순';

export type WidthType = string | number;
export type CallbackType = () => void;
export type ButtonArrType = [SortButtonName, CallbackType];
export type buttonMarginType = string | number;

interface StyledSortButtonsProps {
  width: WidthType;
  buttonMargin?: buttonMarginType;
}
export interface SortButtonsProps extends StyledSortButtonsProps {
  buttonArr: ButtonArrType[];
  sortState: SortOrder;
  sortTypeState: SortType;
  onSortAscend: () => void;
  onSortDescend: () => void;
  [prop: string]: any;
}

const buttonColorCSS = css`
  height: auto;
  color: ${styles.colors.primary};
`;
const SortButtonCSS = (sortTypeState: SortType, name: SortButtonName) => css`
  ${buttonColorCSS}
  color: ${(sortTypeState === 'likeCount' && name === '좋아요 순') ||
  (sortTypeState === 'createdAt' && name === '최신 순') ||
  (sortTypeState === 'expiredAt' && name === '종료일 순')
    ? styles.colors.point
    : styles.colors.secondary};
`;

const StyledSortButtons: React.FC<StyledSortButtonsProps> = styled.section`
  display: flex;
  justify-content: center;
  width: ${({ width }: { width: WidthType }) =>
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

const SortButtons = ({
  width,
  buttonArr,
  buttonMargin,
  sortTypeState,
  sortState,
  onSortAscend,
  onSortDescend,
}: SortButtonsProps) => {
  if (!buttonArr.length) return null;
  return (
    <StyledSortButtons width={width} buttonMargin={buttonMargin}>
      <div css={{ marginRight: 'auto' }}>
        {buttonArr.map(([name, cb]: ButtonArrType) => (
          <Button
            key={name}
            buttonType="primary"
            width="auto"
            fontSize={14}
            onClick={cb}
            reversal
            padding={0}
            css={SortButtonCSS(sortTypeState, name)}
          >
            {name}
          </Button>
        ))}
      </div>
      <div
        css={{
          width: '40px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Button
          buttonType="primary"
          width="auto"
          fontSize={14}
          onClick={onSortAscend}
          reversal
          padding={0}
          css={buttonColorCSS}
        >
          <Icon
            size={14}
            color={
              sortState === 'asc'
                ? styles.colors.point
                : styles.colors.secondary
            }
          >
            <MdNorth />
          </Icon>
        </Button>
        <Button
          buttonType="primary"
          width="auto"
          fontSize={14}
          onClick={onSortDescend}
          reversal
          padding={0}
          css={buttonColorCSS}
        >
          <Icon
            size={14}
            color={
              sortState === 'desc'
                ? styles.colors.point
                : styles.colors.secondary
            }
          >
            <MdSouth />
          </Icon>
        </Button>
      </div>
    </StyledSortButtons>
  );
};

export default SortButtons;
