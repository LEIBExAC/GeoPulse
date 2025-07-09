import React, { useEffect, useState } from 'react';
import { MapContainer,TileLayer,  Polyline,} from "react-leaflet";
import SidebarUser from './SidebarUser';
import "../../assets/styles/user/dashboardRightContentCommon.css";
import "../../assets/styles/user/HomeDashboard.css";
import { FaBell } from "react-icons/fa";


import { Spinner } from "react-bootstrap";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useLocation } from "react-router-dom";
import { fetchTagLocationHistory } from "../../assets/api/locApi";


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

  const centerPosition = [history[0].coordinates[1], history[0].coordinates[0]];

  const activeSegments = [];
  const inactiveSegments = [];
  const thresholdMinutes = 3;

  for (let i = 1; i < history.length; i++) {
    const prev = history[i - 1];
    const curr = history[i];
    const diff = (new Date(curr.timestamp) - new Date(prev.timestamp)) / 60000;

    const segment = [
      [prev.coordinates[1], prev.coordinates[0]],
      [curr.coordinates[1], curr.coordinates[0]],
    ];

    if (diff > thresholdMinutes) {
      inactiveSegments.push({ segment, data: curr });
    } else {
      activeSegments.push({ segment, data: curr });
    }
  }

  // Find nearest point from a click
  const getNearestLocation = (latlng) => {
    let minDist = Infinity;
    let nearest = null;

    for (const loc of history) {
      const d = Math.sqrt(
        Math.pow(latlng.lat - loc.coordinates[1], 2) +
        Math.pow(latlng.lng - loc.coordinates[0], 2)
      );
      if (d < minDist) {
        minDist = d;
        nearest = loc;
      }
    }
    return nearest;
  };

  const handleSegmentClick = (e) => {
    const nearest = getNearestLocation(e.latlng);
    if (!nearest) return;

    L.popup()
      .setLatLng(e.latlng)
      .setContent(`
        <div>
          <strong>Time:</strong><br />
          ${new Date(nearest.timestamp).toLocaleString()}<br />
          <strong>Battery:</strong> ${nearest.battery}%<br />
          <strong>Speed:</strong> ${nearest.speed} km/h
        </div>
      `)
      .openOn(e.target._map);
  };
  

  return (
    <div className="d-flex align-items-start w-100">
      {/* Sidebar */}
      <SidebarUser />

      {/* Right Panel */}
      <div className="w-100" style={{ height: '100vh', overflowY: 'auto' }}>

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center border-bottom bg-light dashboard-header pe-5">
          <div className="fw-semibold fs-5 ms-4 text-dark">GeoPulse</div>
          <div className="position-relative dashboard-bell">
            <FaBell className="fs-5 text-dark bell-hover" />
          </div>
        </div>

        {/* Main Content */}
        <div className="dashboard-main-content ms-4 mt-4 me-4">
           <div>
<h5 className="text-center mb-4 fw-semibold">
  📍 Tag Movement History
</h5>
      <MapContainer
        center={centerPosition}
        zoom={15}
        scrollWheelZoom={true}
        style={{ height: "calc(100vh - 200px)", width: "100%" }}
        className="rounded shadow-sm"
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Active segments - visible line */}
        {activeSegments.map((seg, idx) => (
          <Polyline
            key={`a-visible-${idx}`}
            positions={seg.segment}
            color="green"
            weight={4}
          />
        ))}
        {/* Active segments - wide invisible clickable overlay */}
        {activeSegments.map((seg, idx) => (
          <Polyline
            key={`a-click-${idx}`}
            positions={seg.segment}
            color="transparent"
            weight={20}
            eventHandlers={{ click: handleSegmentClick }}
          />
        ))}

        {/* Inactive segments - visible dashed line */}
        {inactiveSegments.map((seg, idx) => (
          <Polyline
            key={`i-visible-${idx}`}
            positions={seg.segment}
            color="red"
            dashArray="6,10"
            weight={4}
          />
        ))}
        {/* Inactive segments - wide invisible clickable overlay */}
        {inactiveSegments.map((seg, idx) => (
          <Polyline
            key={`i-click-${idx}`}
            positions={seg.segment}
            color="transparent"
            weight={20}
            eventHandlers={{ click: handleSegmentClick }}
          />
        ))}
      </MapContainer>
    </div>
        </div>
      </div>
    </div>
  );
}











// export default function TagLocationHistory() {
 
//   

//   return (
   
//   );
// }
