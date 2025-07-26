import AddNewProduct from "./components/AddNewProduct";
import AllProducts from "./components/AllProducts";
import Counter from "./components/Counter";
import SingleProduct from "./components/SingleProduct";
import UpdateProduct from "./components/UpdateProduct";

const App = () => {
  return (
    <>
      <Counter />
      <UpdateProduct />
      <AddNewProduct />
      <SingleProduct />
      <AllProducts />
    </>
  );
};

export default App;
