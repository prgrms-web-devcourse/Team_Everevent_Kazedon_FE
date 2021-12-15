import Button from '@components/atoms/Button';
import CardList from '@components/atoms/CardList';
import HeaderText, { LevelTypes } from '@components/atoms/HeaderText';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { ReactNode } from 'react';

export interface StyledCategoryListProps {
  width: number | string;
  padding: number | string;
  margin: number | string;
}

export interface CategoryListProps extends StyledCategoryListProps {
  children: ReactNode;
  headerChildren?: ReactNode;
  headerLevel: LevelTypes;
  headerMarginBottom: string | number;
  categoryName: string;
  onHeaderOptionClick?: () => void;
  flexType: 'default' | 'column' | 'none';
  [prop: string]: any;
}

const CategoryHeaderOptionButtonCSS = css`
  margin-left: auto;
`;

const StyledCategoryList: React.FC<StyledCategoryListProps> = styled.article`
  ${({ width, padding, margin }: StyledCategoryListProps) => css`
    width: ${typeof width === 'string' ? width : `${width}px`};
    padding: ${typeof padding === 'string' ? padding : `${padding}px`};
    margin: ${typeof margin === 'string' ? margin : `${margin}px`};
  `}
`;

const HeaderCategoryTitle = styled.div`
  display: flex;
  margin-bottom: ${({
    headerMarginBottom,
  }: {
    headerMarginBottom: string | number;
  }) =>
    typeof headerMarginBottom === 'string'
      ? headerMarginBottom
      : `${headerMarginBottom}px`};
`;

const CategoryList = ({
  children,
  headerChildren,
  headerLevel = 2,
  headerMarginBottom = 0,
  categoryName,
  width = 320,
  padding = 0,
  margin = 0,
  onHeaderOptionClick,
  flexType = 'column',
  ...props
}: CategoryListProps) => {
  return (
    <StyledCategoryList
      width={width}
      padding={padding}
      margin={margin}
      {...props}
    >
      <header>
        <HeaderCategoryTitle headerMarginBottom={headerMarginBottom}>
          <HeaderText level={headerLevel}>{categoryName}</HeaderText>
          {!!onHeaderOptionClick && (
            <Button
              fontSize={14}
              bold
              buttonType="primary"
              reversal
              width={64}
              height={16}
              padding={0}
              onClick={onHeaderOptionClick}
              css={CategoryHeaderOptionButtonCSS}
            >
              전체 보기
            </Button>
          )}
        </HeaderCategoryTitle>
        {headerChildren && headerChildren}
      </header>
      <CardList flexType={flexType} width="100%" padding={0} margin={0}>
        {children}
      </CardList>
    </StyledCategoryList>
  );
};

export default CategoryList;
