import React from 'react';
import CustomButton from '@components/atoms/CustomButton';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Component/atoms/CustomButton',
  component: CustomButton,
  argTypes: {
    visible: {
      name: 'visible',
      defaultValue: true,
      control: { type: 'boolean' },
    },
    isCenter: {
      name: 'isCenter',
      defaultValue: true,
      control: { type: 'boolean' },
    },
    borderRadius: {
      name: 'borderRadius',
      defaultValue: 0,
      control: { type: 'range', min: 0, max: 100 },
    },
    padding: {
      name: 'padding',
      defaultValue: 0,
      control: { type: 'range', min: 0, max: 100 },
    },
    width: {
      name: 'width',
      defaultValue: 0,
      control: { type: 'range', min: 0, max: 100 },
    },
    height: {
      name: 'height',
      defaultValue: 0,
      control: { type: 'range', min: 0, max: 100 },
    },
    margin: {
      name: 'margin',
      defaultValue: 0,
      control: { type: 'range', min: 0, max: 100 },
    },
    bgColor: {
      name: 'bgColor',
      defaultValue: 'transparent',
      control: { type: 'color' },
    },
    fontColor: {
      name: 'fontColor',
      defaultValue: '#000000',
      control: { type: 'color' },
    },
    fontSize: {
      name: 'fontSize',
      defaultValue: 16,
      control: { type: 'range', min: 0, max: 100 },
    },
    children: {
      name: 'children',
      defaultValue: 'TEST!',
      type: 'text',
    },
    border: {
      name: 'border',
      defaultValue: 'none',
      type: 'text',
    },
  },
} as ComponentMeta<typeof CustomButton>;

const Template: ComponentStory<typeof CustomButton> = (args) => (
  <CustomButton {...args} />
);

export const Default = Template.bind({});
