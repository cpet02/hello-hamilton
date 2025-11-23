import FilterPanel from './components/FilterPanel';
import MapView from './components/MapView';
import { useState, useEffect } from 'react';
import debounce from "lodash.debounce";

function buildQueryParams(filters) {
  const params = new URLSearchParams();

  if (filters.category) params.append("category", filters.category);
  if (filters.cost) params.append("cost", filters.cost);

  if (filters.indoor !== null) {
    params.append("indoor", filters.indoor);
  }

  if (filters.energy) params.append("energy", filters.energy);
  if (filters.seasonal) params.append("seasonal", filters.seasonal);

  if (filters.groupSize) {
    params.append("groupSize", filters.groupSize);
  }

  return params.toString();
}

function App() {
  const [filters, setFilters] = useState({
    category: null,
    cost: null,
    indoor: null,
    energy: null,
    seasonal: null,
    groupSize: null
  });

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = debounce(() => {
      setLoading(true);

      const query = buildQueryParams(filters);
      const url = query
        ? `http://localhost:3000/events?${query}`
        : "http://localhost:3000/events";

      fetch(url)
        .then(res => res.json())
        .then(data => {
          console.log("Filtered events from backend:", data);
          setEvents(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }, 300);

    fetchEvents();

    return () => fetchEvents.cancel();
  }, [filters]);

  return (
    <div style={{ display: 'flex' }}>
      <FilterPanel filters={filters} setFilters={setFilters} />

      <div style={{ flexGrow: 1 }}>
        {loading && (
          <p style={{ marginLeft: "20px", color: "#888" }}>
            Loading…
          </p>
        )}
        <MapView events={events} />
      </div>
    </div>
  );
}

export default App;