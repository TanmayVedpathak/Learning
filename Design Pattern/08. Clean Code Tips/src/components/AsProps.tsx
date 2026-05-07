import styles from "./button.module.css";

const style = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  alignItems: "center",
};

type ButtonProps = {
  As?: React.ElementType;
  size?: 's' | 'm' | 'l' | 'xl';
  className?: string;
} & React.HTMLAttributes<HTMLElement>;

const Button = ({ As = "button", size = "m", className = "", ...otherProps }: ButtonProps) => {
  return <As {...otherProps} className={`${styles.button} ${styles[size]} ${className}`} />;
};

const AsProps = () => {
  return (
    <div style={style}>
      <Button size="s">Small</Button>
      <Button size="m">Medium</Button>
      <Button size="l">Large</Button>
      <Button size="xl">xLarge</Button>
      <Button As="a" size="l" href="/">
        Link
      </Button>
    </div>
  );
};

export default AsProps;
