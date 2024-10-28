import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useGetProductsByIdQuery,
  useNewStockMutation,
  useUpdateStockMutation,
  useGetStockByProductIdQuery,
} from "./productsSlice";
import "./products.css";

const SingleProduct = () => {
  const { id } = useParams();
  const { data: product, isSuccess } = useGetProductsByIdQuery(id);
  const [newStock] = useNewStockMutation();
  const [updateStock] = useUpdateStockMutation();
  const [form, setForm] = useState({
    masterAmount: 0,
  });

  const update = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLocation = async (sID) => {
    try {
      console.log(form.masterAmount);
      const response = await updateStock(sID, form.masterAmount);
      console.log("sent");
      console.log(response);
      // if (response) {
      //   console.log(response);
      // }
    } catch (error) {
      console.log("Update Product error");
    }
  };

  return (
    <div className="product-details">
      <h1>{id}</h1>
      {isSuccess &&
        product.stock.map((location) => (
          <form
            onSubmit={(e) => {
              handleLocation(location.id);
              e.preventDefault();
            }}
            className="form"
            key={location.id}
            id={location.locationId}
          >
            <label>
              {location.locationId}
              {/* <p>Master amount: {location.masterAmount}</p> */}
              <input
                type="number"
                name="masterAmount"
                placeholder={location.masterAmount}
                onChange={update}
                className="input"
              />
            </label>
            <button type="submit" className="button-confirm">
              Edit
            </button>
          </form>
        ))}
    </div>
  );
};

export default SingleProduct;
