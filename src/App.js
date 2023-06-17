import React, { useState } from "react";
import "./index.css";
import { HashRouter as Router, Route, Routes} from "react-router-dom";

//HashRouter

import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Products from "./components/Products";
import Success from "./components/Success";
import Contact from "./components/Contact";
import ProductPage from "./components/productPage";
import Footer from "./components/footer";
import Documents from "./components/Documents";

import { CartContext } from "./components/Contexts/CartContext";

function App() {
  const [cartItems, setCartItems] = useState([]);

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route
          path="/"
          element={
            <CartContext.Provider value={{ cartItems, setCartItems}}>
              <Navigation />
              <Home />
              <Footer />
            </CartContext.Provider>
          }
        />
        <Route
          path="/produktai"
          element={
            <CartContext.Provider value={{ cartItems, setCartItems}}>
              <Navigation />
              <Products />
              <Footer />
            </CartContext.Provider>
          }
        />
        <Route
          path="/contact"
          element={
            <CartContext.Provider value={{ cartItems, setCartItems}}>
              <Navigation />
              <Contact />
            </CartContext.Provider>
          }
        />
        <Route path="/products" element={            
          <CartContext.Provider value={{ cartItems, setCartItems}}>
              <Navigation />
              <ProductPage />
              <Footer />
            </CartContext.Provider>} 
        />
        <Route path="/documents" element={
          <>
            <Documents />
            <Footer />
          </>}
        />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
}

export default App;
