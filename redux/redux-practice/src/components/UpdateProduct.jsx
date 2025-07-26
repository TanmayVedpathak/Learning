import { useUpdateProductMutation } from "../app/service/dummyData";

const UpdateProduct = () => {
  const [updateProduct, { data, error, isLoading }] =
    useUpdateProductMutation();

  const handleUpdateProduct = async () => {
    try {
      const updatedProduct = {
        title: "Nokia 3310",
      };
      await updateProduct({ id: 1, updatedProduct });
    } catch (error) {
      console.log("error adding product ", error);
    }
  };

  if (error) {
    return <h1>Error</h1>;
  }

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <div>
      <h1>UpdateProduct</h1>
      <p>{data?.id}</p>
      <button onClick={handleUpdateProduct} disabled={isLoading}>
        Update Product
      </button>
    </div>
  );
};

export default UpdateProduct;
