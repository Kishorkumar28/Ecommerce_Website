import { useState, useLayoutEffect } from "react";
import "./App.css";
import NavBar from "./components/Header";
import Footer from "./components/Footer";
import ProductsContainer from "./components/ProductsContainer/ProductsContainer";
import Billboard from "./components/Billboard";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useLayoutEffect(() => {
    fetch("https://ecommercreactesample.netlify.app/products.json")
      .then((response) => response.json())
      .then((result) => {
        if (result.data.length > 0) {
          setProducts(result.data);
        }
      })
      .catch((error) => console.log(error));
    return () => {};
  }, []);

  function handleAddToCart(data = {}) {
    console.log(data.id,": is Add to cart")
    let cartCopy = [...cart];
    cartCopy.push(data);
    setCart(cartCopy);
    console.log(cartCopy);
  }

  function handleRemoveFromCart(product) {
    console.log("Product remove invoked")
    let updatedCart = cart.filter((item) => item.id !== product.id);
    setCart(updatedCart);
    console.log("Removed item is", product.id )
    console.log("Updated cart is: ",updatedCart);
  }
  return (
    <div>
      <NavBar quantity={cart.length} />
      <Billboard />
      <ProductsContainer
        products={products}
        handleAddToCart={handleAddToCart}
        handleRemoveFromCart={handleRemoveFromCart}
        cart={cart}
      />
      <Footer />
    </div>
  );
}

export default App;
