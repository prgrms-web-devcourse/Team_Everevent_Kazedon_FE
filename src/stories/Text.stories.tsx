import Text, { TextProps } from '@components/atoms/Text';

export default {
  title: 'Component/atoms/Text',
  component: Text,
  argTypes: {
    size: {
      name: 'size',
      defaultValue: 18,
      control: { type: 'number' },
    },
    color: {
      name: 'color',
      control: { type: 'color' },
    },
    underline: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
    block: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
    paragraph: {
      defaultValue: true,
      control: { type: 'boolean' },
    },
  },
};

export const Default = (args: TextProps) => {
  return <Text {...args}>Text</Text>;
};

export const Size = (args: TextProps) => {
  return (
    <>
      <Text {...args} size="micro">
        Micro
      </Text>
      <Text {...args} size="small">
        Small
      </Text>
      <Text {...args} size="medium">
        Medium
      </Text>
      <Text {...args} size="large">
        Large
      </Text>
      <Text {...args} size={12}>
        Custom
      </Text>
    </>
  );
};
