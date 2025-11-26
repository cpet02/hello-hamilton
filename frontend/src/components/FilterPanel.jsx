import React from "react";
import "./FilterPanel.css";

export default function FilterPanel({ filters, setFilters }) {
  function update(key, value) {
    setFilters((prev) => ({
      ...prev,
      [key]: value === "" ? null : value,
    }));
  }

  return (
    <div className="filter-panel">
      <h2>Find Activities</h2>

      {/* CATEGORY */}
      <div className="filter-section">
        <label>Category</label>
        <select
          value={filters.category || ""}
          onChange={(e) => update("category", e.target.value)}
        >
          <option value="">All</option>
          <option value="arts">Arts</option>
          <option value="culture">Culture</option>
          <option value="market">Markets</option>
          <option value="holiday">Holiday</option>
          <option value="sports">Sports</option>
          <option value="food">Food</option>
          <option value="community">Community</option>
        </select>
      </div>

      {/* COST */}
      <div className="filter-section">
        <label>Cost</label>
        <select
          value={filters.cost || ""}
          onChange={(e) => update("cost", e.target.value)}
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
            if (v === "") update("indoor", null);
            else update("indoor", v === "indoor");
          }}
        >
          <option value="">Any</option>
          <option value="indoor">Indoor</option>
          <option value="outdoor">Outdoor</option>
        </select>
      </div>

      {/* DATE RANGE */}
      <div className="filter-section">
        <label>Start After</label>
        <input
          type="date"
          value={filters.startAfter || ""}
          onChange={(e) => update("startAfter", e.target.value)}
        />

        <label style={{ marginTop: "8px" }}>End Before</label>
        <input
          type="date"
          value={filters.endBefore || ""}
          onChange={(e) => update("endBefore", e.target.value)}
        />
      </div>

      {/* ENERGY */}
      <div className="filter-section">
        <label>Energy Level</label>
        <select
          value={filters.energy || ""}
          onChange={(e) => update("energy", e.target.value)}
        >
          <option value="">Any</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {/* SEASONAL */}
      <div className="filter-section">
        <label>Season</label>
        <select
          value={filters.seasonal || ""}
          onChange={(e) => update("seasonal", e.target.value)}
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
          onChange={(e) => update("groupSize", e.target.value)}
        >
          <option value="">Any</option>
          <option value="solo">Solo</option>
          <option value="pair">Pair</option>
          <option value="small">Small Group</option>
          <option value="large">Large Group</option>
        </select>
      </div>

      {/* CLEAR BUTTON */}
      <button
        onClick={() =>
          setFilters({
            category: null,
            cost: null,
            indoor: null,
            energy: null,
            seasonal: null,
            groupSize: null,
            startAfter: null,
            endBefore: null,
          })
        }
        className="clear-button"
      >
        Clear Filters
      </button>
    </div>
  );
}