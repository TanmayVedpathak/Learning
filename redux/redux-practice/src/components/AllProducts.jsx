import { useGetAllProductsQuery } from "../app/service/dummyData";

const AllProducts = () => {
  const { data, isError, isLoading } = useGetAllProductsQuery();

  if (isError) {
    return <h1>Error</h1>;
  }

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <div>
      <h1>All Products</h1>
      {data?.products.map((product, index) => (
        <p key={index}>{product.title}</p>
      ))}
    </div>
  );
};

export default AllProducts;
