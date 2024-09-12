import React from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetLocationByIdQuery } from "./locationsSlice";
import "./locations.css";

const SingleLocation = () => {
  const { id } = useParams();
  const { data: location, isSuccess } = useGetLocationByIdQuery(id);
  
  return (
    <div className="location-details">
      <h1>{id}</h1>
      <ul>
        {isSuccess &&
          location.stock.map((stock) => (
            <li key={stock.id}>
              {stock.productId} QTY: {stock.masterAmount} Cases
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SingleLocation;
