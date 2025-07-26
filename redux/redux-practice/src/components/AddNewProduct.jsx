import { useAddProductMutation } from "../app/service/dummyData";

const AddNewProduct = () => {
  const [addProduct, { data, error, isLoading }] = useAddProductMutation();

  const handleAddProduct = async () => {
    try {
      const newProduct = {
        title: "Amazing T-Shirt",
        description: "One of the best",
      };
      await addProduct(newProduct);
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
      <h1>AddNewProduct</h1>
      <p>{data?.id}</p>
      <p>{data?.title}</p>
      <p>{data?.description}</p>
      <button onClick={handleAddProduct} disabled={isLoading}>
        Add New Product
      </button>
    </div>
  );
};

export default AddNewProduct;
