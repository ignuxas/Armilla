import React, { useState } from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Dekoracijos from "./components/dekoracijos";
import AdminPage from "./components/AdminPage";
//import PreviewWindow from "./components/PreviewWindow";
import About from "./components/About";
import Success from "./components/Success";
import Contact from "./components/Contact";

import { CartContext } from "./components/Contexts/CartContext";

function App() {
  const [cartItems, setCartItems] = useState([]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <CartContext.Provider value={{ cartItems, setCartItems}}>
              <Navigation />
              <Home />
            </CartContext.Provider>
          }
        />
        <Route
          path="/produktai"
          element={
            <CartContext.Provider value={{ cartItems, setCartItems}}>
              <Navigation />
              <Dekoracijos />
            </CartContext.Provider>
          }
        />
        <Route
          path="/about"
          element={
            <CartContext.Provider value={{ cartItems, setCartItems}}>
              <Navigation />
              <About />
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
        <Route exact path="/admin" element={<AdminPage />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
}

//<Route exact path="/test" element={<PreviewWindow />} />

export default App;
