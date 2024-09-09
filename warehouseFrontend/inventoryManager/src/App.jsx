import { useState } from 'react'
import './App.css'
import Home from "./components/main";
import Navigation from './components/navigation';
import Products from "./components/products/products";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
