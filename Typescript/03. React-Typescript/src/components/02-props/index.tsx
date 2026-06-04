type Props = {
  name: string;
  age: number;
  children?: React.ReactNode;
};

function PropsComponent({ name, age, children }: Props) {
  return (
    <div>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
      {children}
    </div>
  );
}
export default PropsComponent;
