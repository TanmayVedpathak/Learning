type LoaderProps = {
  text?: string;
};

const Loader = ({ text = "Loading..." }: LoaderProps) => {
  return <p className="loading">{text}</p>;
};

export default Loader;
