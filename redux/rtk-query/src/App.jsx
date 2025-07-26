import AllProducts from "./components/AllProducts";
import SingleProduct from "./components/SingleProduct";

const App = () => {
  return (
    <div>
      <h1>Products</h1>
      <SingleProduct />
      <AllProducts />
    </div>
  );
};

export default App;
