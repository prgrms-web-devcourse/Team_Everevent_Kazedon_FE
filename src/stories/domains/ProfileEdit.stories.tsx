import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ProfileEdit } from '@components/domains';

export default {
  title: 'Component/domains/ProfileEdit',
  component: ProfileEdit,
} as ComponentMeta<typeof ProfileEdit>;

const Template: ComponentStory<typeof ProfileEdit> = (args) => (
  <ProfileEdit {...args} />
);

export const Default = Template.bind({});
Default.args = {
  email: '테스트 유저',
};
