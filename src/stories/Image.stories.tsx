import ImageContainer, {
  ImageContainerProps,
} from '@components/atoms/ImageContainer';

export default {
  title: 'Component/Image',
  component: Image,
  argTypes: {
    block: {
      defaultValue: true,
      control: { type: 'boolean' },
    },
    isCircle: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
    src: {
      name: 'src',
      type: { name: 'string', require: true },
      defaultValue: 'https://picsum.photos/200',
      control: { type: 'text' },
    },
    width: {
      name: 'width',
      defaultValue: 200,
      control: { type: 'range', min: 40, max: 600 },
    },
    height: {
      name: 'height',
      defaultValue: 200,
      control: { type: 'range', min: 40, max: 600 },
    },
    margin: {
      name: 'margin',
      defaultValue: 10,
      control: { type: 'range', min: 10, max: 600 },
    },
    padding: {
      name: 'padding',
      defaultValue: 10,
      control: { type: 'range', min: 10, max: 600 },
    },
    alt: {
      name: 'alt',
      type: 'string',
      defaultValue: 'Storybook Test Image',
    },
  },
};

const Template = (args: ImageContainerProps) => (
  <div>
    {Array.from(new Array(20), (_, k) => k).map((i) => (
      <ImageContainer key={i} {...args} />
    ))}
  </div>
);

export const Default = Template.bind({});
