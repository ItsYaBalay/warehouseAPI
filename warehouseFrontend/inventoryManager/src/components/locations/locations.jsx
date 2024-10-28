import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useGetLocationsQuery,
  useCreateLocationMutation,
} from "./locationsSlice";
import "./locations.css";

const Locations = () => {
  const navigate = useNavigate();
  const {
    data: locations = [],
    isSuccess,
    isLoading,
    error,
  } = useGetLocationsQuery();
  const [sortOption, setSortOption] = useState("name-asc");
  const [searchInput, setSearchInput] = useState("");

  const [createLocation] = useCreateLocationMutation();
  const [form, setForm] = useState({
    id: "",
    aisle: "",
    side: "",
    top: "",
    position: "",
  });

  const filteredLocations = locations.filter((item) =>
    item.id.toLowerCase().includes(searchInput.toLowerCase())
  );

  const sortedLocations = [...filteredLocations].sort((a, b) => {
    const nameComparison = a.id.localeCompare(b.id);
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
        <h2>Failed to load Locations.</h2>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  const update = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      console.log(form);
      const response = await createLocation(form).unwrap();
      // const responseJson = JSON.parse(response);

      if (response) {
        alert("Location created!");
        navigate("/locations");
      }
    } catch (error) {
      console.log(error, "Create Location error");
      alert("Failed to create location.");
    }
  };

  return (
    <div className="allLocations">
      <h1>Locations</h1>

      <div className="search-container">
        <p className="search">Search:</p>
        <input
          type="text"
          placeholder="Search locations..."
          value={searchInput}
          onChange={handleChange}
          className="search-bar"
        />
      </div>

      <div className="sort-options">
        <label htmlFor="sort-select">Sort by:</label>
        <select id="sort-select" value={sortOption} onChange={handleSortChange}>
          <option value="name-asc">ID Ascending</option>
          <option value="name-desc">ID Descending</option>
        </select>
      </div>

      <div className="location-list">
        {isSuccess &&
          locations.map((location) => (
            <div className="location-card" key={location.id}>
              <Link to={`/locations/${location.id}`} className="location-link">
                <h2 className="location-name">{location.id}</h2>
                {location.stock[0] && (
                  <p className="location-fullname">
                    {location.stock[0].product.sku} QTY:{" "}
                    {location.stock[0].masterAmount}
                  </p>
                )}
              </Link>
            </div>
          ))}
      </div>

      <div className="add-location">
        <form onSubmit={submit} className="form">
          <div>
            <label>*Location ID:</label>
            <input
              name="id"
              value={form.id}
              onChange={update}
              type="text"
              className="input"
              placeholder="00LB00"
              required
            />
          </div>
          <div>
            <label>Aisle number:</label>
            <input
              name="aisle"
              value={form.aisle}
              onChange={update}
              type="number"
              className="input"
              placeholder="00"
            />
          </div>
          <div>
            <label>Which side?</label>
            <input
              id="left"
              name="side"
              onChange={update}
              type="radio"
              className="input"
              value="L"
            />
            <label htmlFor="left">Left</label>
            <input
              id="right"
              name="side"
              onChange={update}
              type="radio"
              className="input"
              value="R"
            />
            <label htmlFor="right">Right</label>
          </div>
          <div>
            <label>Top Location?</label>
            <input
              id="top"
              name="top"
              value={form.top}
              onChange={update}
              type="checkbox"
              className="input"
            />
          </div>
          <div>
            <label>Position:</label>
            <input
              name="position"
              value={form.position}
              onChange={update}
              type="number"
              className="input"
              placeholder="00"
            />
          </div>
          <p className="required-field">* Indicates a required field.</p>
          <button type="submit" className="button-confirm">
            Create Location
          </button>
        </form>
      </div>
    </div>
  );
};

export default Locations;
