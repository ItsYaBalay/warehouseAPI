import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetProductsQuery, useGetProductsByIdQuery } from "./productsSlice";
import "./products.css";

const Products = () => {
  const [sortOption, setSortOption] = useState("name-asc");
  const {
    data: products = [],
    isSuccess,
    isLoading,
    error,
  } = useGetProductsQuery();
  const [searchInput, setSearchInput] = useState("");

  const filteredProducts = products.filter((item) =>
    item.sku.toLowerCase().includes(searchInput.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const nameComparison = a.sku.localeCompare(b.sku);
    return sortOption === "name-asc" ? nameComparison : -nameComparison;
  });

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  if (isLoading) {
    return (
      <div className="loading">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h2>Failed to load products.</h2>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="products">
      <h1>Products</h1>
      <div className="search-container">
        <p className="search">Search:</p>
        <input
          type="text"
          placeholder="Search products by SKU..."
          value={searchInput}
          onChange={handleChange}
          className="search-bar"
        />
      </div>

      <div className="sort-options">
        <label htmlFor="sort-select">Sort by:</label>
        <select id="sort-select" value={sortOption} onChange={handleSortChange}>
          <option value="name-asc">SKU Ascending</option>
          <option value="name-desc">SKU Descending</option>
        </select>
      </div>

      <div className="product-list">
        {isSuccess &&
          products.map((product) => (
            <div className="product-card" key={product.id}>
              <Link to={`/product/${product.sku}`} className="product-link">
                <h2 className="product-sku">{product.sku}</h2>
                <p className="product-name">{product.name}</p>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Products;
