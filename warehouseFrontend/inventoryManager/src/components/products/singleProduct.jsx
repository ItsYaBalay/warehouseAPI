import React from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetProductsByIdQuery } from "./productsSlice";
import "./products.css";

const SingleProduct = () => {
  const { id } = useParams();
  const { data: product, isSuccess } = useGetProductsByIdQuery(id);
  
  return (
    <div className="product-details">
      <h1>{id}</h1>
      <ul>
        {isSuccess &&
          product.stock.map((location) => (
            <li key={location.id}>
              {location.locationId} QTY: {location.masterAmount} Cases
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SingleProduct;
