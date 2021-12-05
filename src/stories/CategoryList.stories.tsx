import React from 'react';
import CardList, { CardListProps } from '@components/atoms/CardList';
import styles from '@styles/index';
import CardContainer, {
  CardBgColorTypes,
} from '@components/atoms/CardContainer';

export default {
  title: 'Component/atoms/CardList',
  component: CardList,
  argTypes: {
    flexType: {
      name: 'flexType',
      defaultValue: 'default',
      options: ['default', 'column', 'none'],
      control: { type: 'radio' },
    },
    padding: {
      name: 'padding',
      defaultValue: 0,
      control: { type: 'range', min: 0, max: 100 },
    },
    width: {
      name: 'width',
      defaultValue: 375,
      control: { type: 'range', min: 320, max: 600 },
    },
    margin: {
      name: 'margin',
      defaultValue: 0,
      control: { type: 'range', min: 0, max: 100 },
    },
    overflowHeight: {
      name: 'overflowHeight',
      defaultValue: undefined,
      control: { type: 'number' },
    },
  },
};

export const Boxes = (args: CardListProps) => {
  const length = 10;
  const arr = Array.from({ length }, (_, idx) => idx);
  const cardBgColorKeys = Object.keys(styles.cardBackgroundColors);
  const colorLength = cardBgColorKeys.length;
  return (
    <CardList {...args}>
      {arr.map((_, idx) => (
        <CardContainer
          key={_}
          cardType="box"
          bgColorName={cardBgColorKeys[idx % colorLength] as CardBgColorTypes}
          padding={10}
          margin={10}
        />
      ))}
    </CardList>
  );
};

export const Cards = (args: CardListProps) => {
  const length = 10;
  const arr = Array.from({ length }, (_, idx) => idx);
  const cardBgColorKeys = Object.keys(styles.cardBackgroundColors);
  const colorLength = cardBgColorKeys.length;
  return (
    <CardList {...args}>
      {arr.map((_, idx) => (
        <CardContainer
          key={_}
          cardType="default"
          bgColorName={cardBgColorKeys[idx % colorLength] as CardBgColorTypes}
          padding={10}
          margin={10}
        />
      ))}
    </CardList>
  );
};
