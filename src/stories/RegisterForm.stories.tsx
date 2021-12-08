import RegisterForm from '@components/domains/RegisterForm';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Component/domains/RegisterForm',
  component: RegisterForm,
} as ComponentMeta<typeof RegisterForm>;

const Template: ComponentStory<typeof RegisterForm> = () => <RegisterForm />;

export const Default = Template.bind({});
