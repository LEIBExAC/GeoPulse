import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import { Spinner } from "react-bootstrap";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useLocation } from "react-router-dom";
import { fetchTagLocationHistory } from "../../assets/api/locApi"; // ✅ imported cleanly

// Fix Leaflet marker issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function TagLocationHistory() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const tagId = params.get("tagId");
  const from = params.get("from");
  const to = params.get("to");

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHistory = async () => {
      if (!tagId) return;

      setLoading(true);
      const res = await fetchTagLocationHistory(tagId, from, to);

      if (res.success) {
        const sorted = [...res.data].sort(
          (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
        );
        setHistory(sorted);
      } else {
        console.error("History fetch failed:", res.message);
        setHistory([]);
      }

      setLoading(false);
    };

    loadHistory();
  }, [tagId, from, to]);

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

  const polylinePositions = history.map((h) => [h.coordinates[1], h.coordinates[0]]);
  const centerPosition = polylinePositions.length > 0 ? polylinePositions[0] : [0, 0];

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

        <Polyline positions={polylinePositions} color="blue" />

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
