import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetLocationsQuery } from "./locationsSlice";
import "./locations.css";

const Locations = () => {
  const {
    data: locations = [],
    isSuccess,
    isLoading,
    error,
  } = useGetLocationsQuery();
  const [sortOption, setSortOption] = useState("name-asc");
  const [searchInput, setSearchInput] = useState("");

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
                {/* <p className="location-fullname">{location.name}</p> */}
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Locations;
