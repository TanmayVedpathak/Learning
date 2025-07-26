import { useGetProductByIdQuery } from "../app/service/dummyData";

const SingleProduct = () => {
  const { data, isError, isLoading } = useGetProductByIdQuery(1);
  console.log(data);

  if (isError) {
    return <h1>Error</h1>;
  }

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <div>
      <h1>Single Products</h1>
      <h3>{data?.title}</h3>
    </div>
  );
};

export default SingleProduct;
