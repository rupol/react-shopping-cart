import React, { useState } from "react";
import { Route } from "react-router-dom";
import data from "./data";

// Components
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";

// Contexts
import { ProductContext } from "./contexts/ProductContext";
import { CartContext } from "./contexts/CartContext";

// Hooks
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [products] = useState(data);
  const [cart, setCart] = useLocalStorage("storage", []);

  const addItem = item => {
    // add the given item to the cart
    if (cart.includes(item)) {
      console.log("error: item already added");
    } else {
      setCart([...cart, item]);
    }
  };

  const removeItem = item => {
    // delete the given item from the cart
    setCart(cart.filter(cart => cart.id !== item));
  };

  return (
    <ProductContext.Provider value={{ products, addItem }}>
      <CartContext.Provider value={{ cart, removeItem }}>
        <div className="App">
          <Navigation />

          {/* Routes */}
          <Route exact path="/" component={Products} />

          <Route path="/cart" component={ShoppingCart} />
        </div>
      </CartContext.Provider>
    </ProductContext.Provider>
  );
}

export default App;
