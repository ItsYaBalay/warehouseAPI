import { useState } from "react";
import "./App.css";
import Home from "./components/main";
import Navigation from "./components/navigation";
import Products from "./components/products/products";
import SingleProduct from "./components/products/singleProduct";
import Locations from "./components/locations/locations";
import SingleLocation from "./components/locations/singleLocation"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/locations/:id" element={<SingleLocation />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
