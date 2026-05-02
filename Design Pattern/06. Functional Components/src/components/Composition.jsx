const Button = ({ text, size, color, ...props }) => {
  return (
    <>
      <button style={{ fontSize: size === "small" ? "12px" : "20px", backgroundColor: color }}>{text}</button>
    </>
  );
};

const RedButton = (props) => {
  return (
    <>
      <Button {...props} color={"red"} />
    </>
  );
};

const GreenButton = (props) => {
  return (
    <>
      <Button {...props} color={"green"} size={"small"} />
    </>
  );
};

const PartialComponent = (Component, partialProps) => {
  return (props) => {
    return <Component {...partialProps} {...props} />;
  };
};

const Composition = () => {
  return (
    <>
      <RedButton text="Red button" />
      <GreenButton text="Green button" />
    </>
  );
};

export default Composition;
