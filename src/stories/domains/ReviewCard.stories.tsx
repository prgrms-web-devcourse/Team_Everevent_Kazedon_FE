import React from 'react';
import ReviewCard from '@components/domains/ReviewCard';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import CardList from '@components/atoms/CardList';

export default {
  title: 'Component/domains/ReviewCard',
  component: ReviewCard,
  argTypes: {
    cardType: {
      name: 'cardType',
      defaultValue: 'default',
      options: ['default', 'box'],
      control: { type: 'radio' },
    },
    marginWidth: {
      name: 'marginWidth',
      defaultValue: 4,
      control: { type: 'range', min: 0, max: 20 },
    },
    marginHeight: {
      name: 'marginHeight',
      defaultValue: 4,
      control: { type: 'range', min: 0, max: 20 },
    },
  },
} as ComponentMeta<typeof ReviewCard>;

export const Default: ComponentStory<typeof ReviewCard> = (args) => {
  const data = {
    description:
      '회덮밥이 너무나 맛있었어요~ 너무나 맛난 저녁에다 맥주 공짜로 먹어서 좋았어요!',
    marketName: '티모네 횟집',
    author: '젱영',
    pictureUrl: 'https://picsum.photos/200',
  };
  return (
    <CardList box flexType="default" width={320} padding={0} margin={0}>
      <ReviewCard {...args} reviewData={data} />
      <ReviewCard {...args} reviewData={data} />
      <ReviewCard {...args} reviewData={data} />
      <ReviewCard {...args} reviewData={data} />
    </CardList>
  );
};
