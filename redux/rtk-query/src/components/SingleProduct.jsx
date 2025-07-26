import { useGetProductByIdQuery } from "../app/service/dummyData";

const SingleProduct = () => {
  const { data, isLoading, isError } = useGetProductByIdQuery(1);

  return (
    <div>
      <h2>Single Product</h2>
      {isLoading && "....loading"}
      {isError && "Error"}
      <h3>{data?.title}</h3>
    </div>
  );
};

export default SingleProduct;
