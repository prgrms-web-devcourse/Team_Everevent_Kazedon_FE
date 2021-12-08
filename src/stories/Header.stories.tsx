import React from 'react';
import Header, { HeaderProps } from '@components/domains/Header';

export default {
  title: 'Component/domains/Header',
  Component: Header,
  argTypes: {
    isVisibleMenu: {
      name: 'isVisibleMenu',
      defaultValue: true,
      control: {
        type: 'boolean',
      },
    },
    children: {
      name: 'text',
      defaultValue: '뒤로',
      type: { name: 'string', require: true },
      control: {
        type: 'text',
      },
    },
  },
};

export const Default = (args: HeaderProps) => {
  return <Header {...args} />;
};
