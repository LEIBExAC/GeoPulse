import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import { Spinner } from "react-bootstrap";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { backend_url } from "../../assets/store/keyStore";

// Fix default marker icon issue in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function TagLocationHistory({ tagId = "Tag01" }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!tagId) return;
      try {
        setLoading(true);
        const response = await fetch(`${backend_url}/location/${tagId}/history`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data);

        if (data.success && Array.isArray(data.data)) {
          // Sort by timestamp ascending (oldest first)
          const sorted = [...data.data].sort(
            (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
          );
          setHistory(sorted);
        } else {
          setHistory([]);
        }
      } catch (error) {
        console.error("Error fetching location history", error);
        setHistory([]);
      } finally {
        setLoading(false);
      }
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

  if (!history || history.length === 0) {
    return <div className="text-center py-5 text-muted">No history available.</div>;
  }

  // Get polyline for full path
  const polylinePositions = history.map((h) => [h.coordinates[1], h.coordinates[0]]);
  const centerPosition = polylinePositions.length > 0 ? polylinePositions[0] : [0, 0];

  // Filter for first-time arrival at each unique coordinate
  const seenCoords = new Set();
  const firstArrivalHistory = history.filter((loc) => {
    const key = `${loc.coordinates[0]},${loc.coordinates[1]}`;
    if (seenCoords.has(key)) return false;
    seenCoords.add(key);
    return true;
  });

  return (
    <div>
      <h5 className="mb-3">📍 Tag Movement History</h5>
      <MapContainer
        center={centerPosition}
        zoom={15}
        scrollWheelZoom={true}
        style={{ height: "500px", width: "100%" }}
        className="rounded shadow-sm"
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Full path */}
        <Polyline positions={polylinePositions} color="blue" />

        {/* First-time arrival markers */}
        {firstArrivalHistory.map((loc, index) => (
          <Marker key={index} position={[loc.coordinates[1], loc.coordinates[0]]}>
            <Popup>
              <div>
                <strong>First Arrival:</strong><br />
                {new Date(loc.timestamp).toLocaleString()}<br />
                <strong>Battery:</strong> {loc.battery}%<br />
                <strong>Speed:</strong> {loc.speed} km/h
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
