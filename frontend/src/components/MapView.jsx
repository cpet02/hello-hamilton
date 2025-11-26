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
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* SAFE MARKERS — prevents crash when location=null */}
        {events
          ?.filter(
            (event) =>
              event.location &&
              typeof event.location.lat === "number" &&
              typeof event.location.lng === "number"
          )
          .map((event) => (
            <Marker
              key={event.id}
              position={[event.location.lat, event.location.lng]}
              icon={L.icon(defaultIcon.options)}
            >
              <Popup minWidth={250}>
                <div style={{ fontFamily: "system-ui, sans-serif" }}>
                  {/* Title */}
                  <h3 style={{ marginBottom: "4px" }}>{event.title}</h3>

                  {/* Category + Indoor/Outdoor */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "6px",
                      marginBottom: "8px",
                    }}
                  >
                    {event.category && (
                      <span
                        style={{
                          padding: "2px 6px",
                          background: "#ececec",
                          borderRadius: "4px",
                          fontSize: "0.75rem",
                        }}
                      >
                        {event.category}
                      </span>
                    )}

                    {event.indoor !== null && (
                      <span
                        style={{
                          padding: "2px 6px",
                          background: event.indoor ? "#d0f0d0" : "#d0e4f7",
                          borderRadius: "4px",
                          fontSize: "0.75rem",
                        }}
                      >
                        {event.indoor ? "Indoor" : "Outdoor"}
                      </span>
                    )}
                  </div>

                  {/* Image preview */}
                  {event.extra?.imageUrl && (
                    <img
                      src={event.extra.imageUrl}
                      alt={event.title}
                      style={{
                        width: "100%",
                        borderRadius: "6px",
                        marginBottom: "8px",
                        objectFit: "cover",
                      }}
                    />
                  )}

                  {/* Description */}
                  {event.description && (
                    <p style={{ marginBottom: "8px", fontSize: "0.9rem" }}>
                      {event.description}
                    </p>
                  )}

                  {/* Dates */}
                  {event.startDate && (
                    <p
                      style={{
                        marginBottom: "8px",
                        color: "#555",
                        fontSize: "0.85rem",
                      }}
                    >
                      📅{" "}
                      {new Date(event.startDate).toLocaleDateString()}
                      {event.endDate
                        ? ` → ${new Date(event.endDate).toLocaleDateString()}`
                        : ""}
                    </p>
                  )}

                  {/* External link */}
                  {event.extra?.url && (
                    <a
                      href={event.extra.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-block",
                        marginTop: "6px",
                        color: "#0077cc",
                        textDecoration: "underline",
                        fontSize: "0.9rem",
                      }}
                    >
                      View Event →
                    </a>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}