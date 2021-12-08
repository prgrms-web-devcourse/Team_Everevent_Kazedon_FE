import LoginForm from '@components/domains/LoginForm';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Component/domains/LoginForm',
  component: LoginForm,
} as ComponentMeta<typeof LoginForm>;

const Template: ComponentStory<typeof LoginForm> = () => <LoginForm />;

export const Default = Template.bind({});
