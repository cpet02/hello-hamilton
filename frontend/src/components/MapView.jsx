import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { MapContainer, TileLayer } from "react-leaflet";
import { Marker, Popup } from "react-leaflet";

import { useEffect, useState } from "react";
import { defaultIcon } from "../utils/mapIcons";

export default function MapView() {
  const hamiltonCenter = [43.2557, -79.8711];

  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/events")
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error("Error fetching events:", err));
  }, []);

  const [filters, setFilters] = useState({
    category: null,
    cost: null,
    indoorOutdoor: null,
    energyLevel: null,
    groupSize: null,
  });  

  const filteredEvents = events.filter(event => {
    if (filters.category && event.category !== filters.category) {
      return false;
    }
    return true;
  });
  
  

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <div style={{ position: "absolute", top: 10, left: 10, zIndex: 1000, background: "white", padding: "8px", borderRadius: "5px" }}>
        <select
          value={filters.category || ""}
          onChange={e => setFilters({ ...filters, category: e.target.value || null })}
        >
          <option value="">All Categories</option>
          <option value="active">Active</option>
          <option value="passive">Passive</option>
          <option value="market">Market</option>
          <option value="scenic">Scenic</option>
        </select>
      </div>

      <MapContainer
        center={hamiltonCenter}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <>
          {filteredEvents.map(event => (
            <Marker
              key={event.id}
              position={[event.location.lat, event.location.lng]}
              icon={L.icon(defaultIcon.options)}
            >
              <Popup>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
              </Popup>
            </Marker>
          ))}
        </>
      </MapContainer>
    </div>
  );
}