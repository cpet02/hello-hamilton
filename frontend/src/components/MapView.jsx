import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { defaultIcon } from "../utils/mapIcons";

export default function MapView({ events }) {
  const hamiltonCenter = [43.2557, -79.8711];

  return (
    <div style={{ height: "100vh", width: "100%" }}>
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
          {events.map(event => (
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