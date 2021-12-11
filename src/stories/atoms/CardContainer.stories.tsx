import React from 'react';
import CardContainer, {
  CardContainerProps,
} from '@components/atoms/CardContainer';
import styles from '@styles/index';

export default {
  title: 'Component/atoms/CardContainer',
  component: CardContainer,
  argTypes: {
    cardType: {
      name: 'modalType',
      defaultValue: 'default',
      options: ['default', 'box'],
      control: { type: 'radio' },
    },
    width: {
      name: 'width',
      defaultValue: 320,
      control: { type: 'range', min: 200, max: 600 },
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
    bgColorName: {
      name: 'bgColorName',
      defaultValue: 'yellow',
      options: Object.keys(styles.cardBackgroundColors),
      control: { type: 'radio' },
    },
  },
};

const Template = (args: CardContainerProps) => <CardContainer {...args} />;

export const Default = Template.bind({});
