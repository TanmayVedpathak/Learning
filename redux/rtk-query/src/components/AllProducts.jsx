import { useGetAllProductsQuery } from "../app/service/dummyData";

const AllProducts = () => {
  const { data, isLoading, isError } = useGetAllProductsQuery();

  return (
    <div>
      <h2>All Products</h2>
      {isLoading && "....loading"}
      {isError && "Error"}
      {data?.products.map((product) => (
        <h3 key={product.id}>{product.title}</h3>
      ))}
    </div>
  );
};

export default AllProducts;
