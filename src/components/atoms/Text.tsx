import '../../styles/Text.css';

export interface TextProps {
  children: string;
  size?: string | number;
  color: string;
  underline: boolean;
  block: boolean;
  paragraph: boolean;
}

const Text = ({
  children,
  size,
  color,
  underline,
  block,
  paragraph,
  ...props
}: TextProps) => {
  const Tag = block ? 'div' : paragraph ? 'p' : 'span';
  const fontStyle = {
    fontSize: typeof size === 'number' ? size : undefined,
    textDecoration: underline ? 'underline' : undefined,
    color,
  };

  return (
    <Tag
      className={typeof size === 'string' ? `Text--size-${size}` : undefined}
      style={{ ...props, ...fontStyle }}
    >
      {children}
    </Tag>
  );
};

export default Text;
