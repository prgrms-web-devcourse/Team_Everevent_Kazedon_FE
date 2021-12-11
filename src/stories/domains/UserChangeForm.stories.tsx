import UserChangeForm from '@components/domains/UserChangeForm';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Component/domains/UserChangeForm',
  component: UserChangeForm,
} as ComponentMeta<typeof UserChangeForm>;

const Template: ComponentStory<typeof UserChangeForm> = () => (
  <UserChangeForm />
);

export const Default = Template.bind({});
