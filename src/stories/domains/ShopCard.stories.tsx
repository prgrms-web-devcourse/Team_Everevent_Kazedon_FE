import React from 'react';
import ShopCard from '@components/domains/ShopCard';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import ShopInfo from '../../../fixtures/shopInfo';

export default {
  title: 'Component/domains/ShopCard',
  component: ShopCard,
  argTypes: {
    width: {
      name: 'width',
      defaultValue: 375,
      control: { type: 'range', min: 300, max: 600 },
    },
    idx: {
      name: 'idx',
      defaultValue: 0,
      control: { type: 'range', min: 0, max: 20 },
    },
  },
} as ComponentMeta<typeof ShopCard>;

export const Default: ComponentStory<typeof ShopCard> = (args) => {
  return <ShopCard {...args} shopData={ShopInfo} />;
};
