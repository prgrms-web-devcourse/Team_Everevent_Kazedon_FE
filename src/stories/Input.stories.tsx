import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Input from '@components/atoms/Input';

export default {
  title: 'Component/Input',
  component: Input,
  argTypes: {
    width: {
      defaultValue: '280',
      options: ['280', '310'],
      control: {
        type: 'inline-radio',
      },
    },
    placeholder: {
      defaultValue: '이메일',
      options: ['이메일', '비밀번호', '비밀번호 확인', '닉네임', '가게이름'],
      control: {
        type: 'radio',
      },
    },
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Default = Template.bind({});
