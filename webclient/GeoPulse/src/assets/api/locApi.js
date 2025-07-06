import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import { Spinner } from "react-bootstrap";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon issue in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const backend_url = "https://geopulse-165u.onrender.com";

export default function TagLocationHistory({ tagId }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTagLocationHistory = async ({tagId="Tag01"}) => {
    try {
      const res = await fetch(`${backend_url}/location/${tagId}/history`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ✅ Send cookie/JWT
      });

      if (res.status === 401) {
        console.error("Unauthorized - Please log in");
        return { success: false, data: [] };
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Fetch error:", error);
      return { success: false, data: [] };
    }
  };

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      const response = await getTagLocationHistory(tagId);
      if (response.success) {
        setHistory(response.data);
      } else {
        console.warn("No history or unauthorized access.");
        setHistory([]);
      }
      setLoading(false);
    };

    fetchHistory();
  }, [tagId]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading tag location history...</p>
      </div>
    );
  }

  if (history.length === 0) {
    return <div className="text-center py-5 text-muted">No history available.</div>;
  }

  const position = [history[0].coordinates[1], history[0].coordinates[0]];
  const polylinePositions = history.map((h) => [
    h.coordinates[1],
    h.coordinates[0],
  ]);

  return (
    <div>
      <h5 className="mb-3">📍 Location History</h5>
      <MapContainer
        center={position}
        zoom={15}
        scrollWheelZoom={true}
        style={{ height: "500px", width: "100%" }}
        className="rounded shadow-sm"
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Draw path */}
        <Polyline positions={polylinePositions} color="blue" />

        {/* Markers with popups */}
        {history.map((loc, index) => (
          <Marker
            key={index}
            position={[loc.coordinates[1], loc.coordinates[0]]}
          >
            <Popup>
              <div>
                <strong>Timestamp:</strong><br />
                {new Date(loc.timestamp).toLocaleString()} <br />
                <strong>Battery:</strong> {loc.battery}% <br />
                <strong>Speed:</strong> {loc.speed} km/h
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
