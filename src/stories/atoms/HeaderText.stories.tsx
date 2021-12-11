import React from 'react';
import HeaderText, { HeaderTextProps } from '@components/atoms/HeaderText';

export default {
  title: 'Component/atoms/HeaderText',
  Component: HeaderText,
  argTypes: {
    level: {
      name: 'level',
      defaultValue: 1,
      options: [1, 2, 3, 4],
      control: {
        type: 'radio',
      },
    },
    children: {
      name: 'text',
      defaultValue: 'HeaderText!',
      type: { name: 'string', require: true },
      control: {
        type: 'text',
      },
    },
  },
};

const Template = (args: HeaderTextProps) => <HeaderText {...args} />;

export const Default = Template.bind({});
