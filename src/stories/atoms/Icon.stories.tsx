import Icon, { IconProps } from '@components/atoms/Icon';
import {
  MdStarBorder,
  MdStar,
  MdFavoriteBorder,
  MdFavorite,
  MdOutlineMenu,
  MdOutlineArrowBackIosNew,
  MdAdd,
} from 'react-icons/md';
import styles from '@styles/index';

export default {
  title: 'Component/atoms/Icon',
  component: Icon,
  argTypes: {
    name: 'size',
    options: [8, 16, 24, 32],
    defaultValue: 16,
    control: { type: 'radio' },
  },
  color: {
    name: 'color',
    control: { type: 'color' },
  },
  children: {
    name: 'children',
    options: [
      <MdStarBorder />,
      <MdStar />,
      <MdFavoriteBorder />,
      <MdFavorite />,
      <MdOutlineMenu />,
      <MdOutlineArrowBackIosNew />,
      <MdAdd />,
    ],
    defaultValue: <MdStarBorder />,
    control: { type: 'radio' },
  },
};

export const Default = (args: IconProps) => {
  return <Icon {...args} />;
};

export const Size = (args: IconProps) => {
  return (
    <>
      <Icon {...args} size={8} />
      <Icon {...args} size={16} />
      <Icon {...args} size={24} />
      <Icon {...args} size={32} />
    </>
  );
};

export const Color = (args: IconProps) => {
  return (
    <>
      <Icon {...args} color={styles.colors.warning} />
      <Icon {...args} color={styles.colors.point} />
      <Icon {...args} color={styles.colors.confirm} />
    </>
  );
};

export const Type = (args: IconProps) => {
  return (
    <>
      <Icon {...args} size={16}>
        <MdStarBorder />
      </Icon>
      <Icon {...args} size={16}>
        <MdStar />
      </Icon>
      <Icon {...args} size={16}>
        <MdFavoriteBorder />
      </Icon>
      <Icon {...args} size={16}>
        <MdFavorite />
      </Icon>
      <Icon {...args} size={16}>
        <MdOutlineMenu />
      </Icon>
      <Icon {...args} size={16}>
        <MdOutlineArrowBackIosNew />
      </Icon>
      <Icon {...args} size={16}>
        <MdAdd />
      </Icon>
    </>
  );
};
