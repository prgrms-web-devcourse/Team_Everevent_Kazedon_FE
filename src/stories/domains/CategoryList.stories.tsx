import React from 'react';
import CategoryList, {
  CategoryListProps,
} from '@components/domains/CategoryList';
import CardContainer, {
  CardBgColorTypes,
} from '@components/atoms/CardContainer';
import styles from '@styles/index';

export default {
  title: 'Component/domains/CategoryList',
  component: CategoryList,
  argTypes: {
    flexType: {
      name: 'flexType',
      defaultValue: 'column',
      options: ['default', 'column', 'none'],
      control: { type: 'radio' },
    },
    headerLevel: {
      name: 'headerLevel',
      defaultValue: 2,
      options: [1, 2, 3, 4],
      control: { type: 'radio' },
    },
    headerMarginBottom: {
      name: 'headerMarginBottom',
      defaultValue: 0,
      control: { type: 'range', min: 0, max: 50 },
    },
    categoryName: {
      name: 'categoryName',
      defaultValue: '카테고리명',
      control: { type: 'text' },
    },
    width: {
      name: 'width',
      defaultValue: 320,
      control: { type: 'range', min: 200, max: 500 },
    },
    padding: {
      name: 'padding',
      defaultValue: 0,
      control: { type: 'range', min: 0, max: 50 },
    },
    margin: {
      name: 'margin',
      defaultValue: 0,
      control: { type: 'range', min: 0, max: 50 },
    },
  },
};

const Template = (args: CategoryListProps) => {
  const onClick = () => {};

  const length = 10;
  const arr = Array.from({ length }, (_, idx) => idx);
  const cardBgColorKeys = Object.keys(styles.cardBackgroundColors);
  const colorLength = cardBgColorKeys.length;

  return (
    <CategoryList {...args} onClick={onClick}>
      {arr.map((_, idx) => (
        <CardContainer
          key={_}
          cardType="default"
          bgColorName={cardBgColorKeys[idx % colorLength] as CardBgColorTypes}
          padding={10}
          margin="10px 0"
        >
          테스트용
        </CardContainer>
      ))}
    </CategoryList>
  );
};

export const Default = Template.bind({});
