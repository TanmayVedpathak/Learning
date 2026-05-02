const Button = ({ text, size, color, ...props }) => {
  return (
    <>
      <button style={{ fontSize: size === "small" ? "12px" : "20px", backgroundColor: color }}>{text}</button>
    </>
  );
};

const Partial = (Component, partialProps) => {
  return (props) => {
    return <Component {...partialProps} {...props} />;
  };
};

const RedButton = Partial(Button, { color: "red" });
const SmallRedButton = Partial(RedButton, { size: "small" });

const PartialComponent = () => {
  return (
    <>
      <RedButton text="Red Button" />
      <SmallRedButton text="Small Red Button" />
    </>
  );
};

export default PartialComponent;
