import FilterPanel from './components/FilterPanel';
import MapView from './components/MapView';
import { useState, useEffect } from 'react';

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

  useEffect(() => {
    fetch('http://localhost:3000/events')
      .then(res => res.json())
      .then(data => {
        console.log("Raw events from backend:", data);
        setEvents(data);
      })
      .catch(err => console.error(err));
  }, []);

  function applyFilters(events, filters) {
    return events.filter(event => {
      // CATEGORY
      if (filters.category && event.category !== filters.category) {
        return false;
      }

      // COST
      if (filters.cost && event.cost !== filters.cost) {
        return false;
      }

      // INDOOR / OUTDOOR
      if (filters.indoor !== null && event.indoor !== filters.indoor) {
        return false;
      }

      // ENERGY LEVEL
      if (filters.energy && event.energy !== filters.energy) {
        return false;
      }

      // SEASONAL
      if (filters.seasonal && event.seasonal !== filters.seasonal) {
        return false;
      }

      // GROUP SIZE
      if (filters.groupSize && !event.groupSize.includes(filters.groupSize)) {
        return false;
      }


      return true;
    });
  }

  const filteredEvents = applyFilters(events, filters);

  console.log(filters);
  console.log("Filtered:", filteredEvents);

  return (
    <div style={{ display: 'flex' }}>
      <FilterPanel filters={filters} setFilters={setFilters} />
      <MapView events={filteredEvents} />
    </div>
  );
}

export default App;


