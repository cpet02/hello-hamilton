import React from 'react';
import './FilterPanel.css';

function FilterPanel({ filters, setFilters }) {

  function updateFilter(key, value) {
    setFilters(prev => ({
      ...prev,
      [key]: value === "" ? null : value
    }));
  }

  return (
    <div className="filter-panel">
      <h2>Filters</h2>

      {/* CATEGORY */}
      <div className="filter-section">
        <label>Category</label>
        <select
          value={filters.category || ""}
          onChange={(e) => updateFilter("category", e.target.value)}
        >
          <option value="">All</option>
          <option value="music">Music</option>
          <option value="sports">Sports</option>
          <option value="food">Food</option>
          <option value="community">Community</option>
          <option value="attraction">Attractions</option>
        </select>
      </div>

      {/* COST */}
      <div className="filter-section">
        <label>Cost</label>
        <select
          value={filters.cost || ""}
          onChange={(e) => updateFilter("cost", e.target.value)}
        >
          <option value="">Any</option>
          <option value="free">Free</option>
          <option value="paid">Paid</option>
        </select>
      </div>

      {/* INDOOR / OUTDOOR */}
      <div className="filter-section">
        <label>Indoor / Outdoor</label>
        <select
          value={
            filters.indoor === null
              ? ""
              : filters.indoor
                ? "indoor"
                : "outdoor"
          }
          onChange={(e) => {
            const v = e.target.value;
            if (v === "") updateFilter("indoor", null);
            else updateFilter("indoor", v === "indoor");
          }}
        >
          <option value="">Any</option>
          <option value="indoor">Indoor</option>
          <option value="outdoor">Outdoor</option>
        </select>
      </div>

      {/* ENERGY */}
      <div className="filter-section">
        <label>Energy Level</label>
        <select
          value={filters.energy || ""}
          onChange={(e) => updateFilter("energy", e.target.value)}
        >
          <option value="">Any</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {/* SEASONAL */}
      <div className="filter-section">
        <label>Seasonal</label>
        <select
          value={filters.seasonal || ""}
          onChange={(e) => updateFilter("seasonal", e.target.value)}
        >
          <option value="">Any</option>
          <option value="winter">Winter</option>
          <option value="spring">Spring</option>
          <option value="summer">Summer</option>
          <option value="fall">Fall</option>
        </select>
      </div>

      {/* GROUP SIZE */}
      <div className="filter-section">
        <label>Group Size</label>
        <select
          value={filters.groupSize || ""}
          onChange={(e) => updateFilter("groupSize", e.target.value)}
        >
          <option value="">Any</option>
          <option value="solo">Solo</option>
          <option value="pair">Pair</option>
          <option value="small">Small Group</option>
          <option value="large">Large Group</option>
        </select>
      </div>

    </div>
  );
}

export default FilterPanel;