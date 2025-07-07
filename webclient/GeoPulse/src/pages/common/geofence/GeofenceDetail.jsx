import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    MapContainer,
    TileLayer,
    Circle,
    Polygon,
    Marker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { getGeofenceByIdAPI, enableGeofence, disableGeofence } from "../../../assets/api/geofenceApi";
import SidebarUser from "../../user/SidebarUser";

const GeofenceDetailPage = () => {
    const { tagId, geofenceId } = useParams();
    const navigate = useNavigate();
    const [geofence, setGeofence] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        const fetchGeofence = async () => {
            const res = await getGeofenceByIdAPI(tagId, geofenceId);
            if (res.success) {
                setGeofence(res.geofence);
            } else {
                setErrorMsg(res.message || "Failed to fetch geofence.");
            }
            setLoading(false);
        };

        fetchGeofence();

    }, [tagId, geofenceId]);

    const handleToggleStatus = async () => {
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1];

        try {
            const updated = geofence.active
                ? await disableGeofence(tagId, geofence._id, token)
                : await enableGeofence(tagId, geofence._id, token);

            { updated.geofence && setGeofence(updated.geofence) };
            { !updated.success && setErrorMsg(updated.message || "Failed to update geofence status.") };
        } catch (err) {
            console.error("Error toggling geofence status:", err);
            setErrorMsg(err.message);
        }
    };

    if (loading) return <div className="container mt-4">Loading...</div>;

    if (errorMsg)
        return <div className="container mt-4 alert alert-danger">{errorMsg}</div>;

    const { type, center, radius, vertices, active, createdAt, updatedAt } = geofence;

    const defaultCenter = center || (vertices?.[0] ?? { lat: 28.61, lng: 77.21 });

    return (
        <div className="d-flex">
            <SidebarUser />
            <div className="container mt-4 flex-grow-1 overflow-y-hidden" style={{ maxHeight: "calc(100vh - 80px)",  overflowY: "hidden" }}>
                <h3>Geofence Details</h3>
                <div className="mb-3">
                    <strong>Type:</strong> {type}
                </div>
                <div className="mb-3 d-flex flex-column">
                    <div className="d-flex align-items-center">
                        <strong>Status:</strong>&nbsp;
                        <span className={active ? "text-success" : "text-danger"}>
                            {active ? "Active" : "Inactive"}
                        </span>
                        <button
                            className={`btn btn-sm ms-3 ${active ? "btn-warning" : "btn-success"}`}
                            onClick={handleToggleStatus}
                        >
                            {active ? "Disable" : "Enable"}
                        </button>
                    </div>
                    {errorMsg && (
                        <div className="text-danger mt-2" style={{ maxWidth: "400px" }}>
                            ⚠️ {errorMsg}
                        </div>
                    )}
                </div>


                <div className="mb-3">
                    <strong>Created:</strong> {new Date(createdAt).toLocaleString()}
                </div>
                <div className="mb-3">
                    <strong>Last Updated:</strong> {new Date(updatedAt).toLocaleString()}
                </div>

                {type === "circular" && center && (
                    <>
                        <div className="mb-3">
                            <strong>Center:</strong> ({center.lat}, {center.lng})
                        </div>
                        <div className="mb-3">
                            <strong>Radius:</strong> {radius} meters
                        </div>
                    </>
                )}

                {type === "polygonal" && vertices?.length > 0 && (
                    <div className="mb-3">
                        <strong>Vertices:</strong>
                        <ul>
                            {vertices.map((v, i) => (
                                <li key={i}>
                                    ({v.lat}, {v.lng})
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <MapContainer
                    center={defaultCenter}
                    zoom={15}
                    style={{ height: "400px", width: "100%", marginBottom: "1rem" }}
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {type === "circular" && center && (
                        <Circle center={center} radius={radius} />
                    )}
                    {type === "polygonal" && vertices?.length > 0 && (
                        <>
                            <Polygon positions={vertices} />
                            {vertices.map((v, i) => (
                                <Marker key={i} position={v} />
                            ))}
                        </>
                    )}
                </MapContainer>

                <button
                    className="btn btn-secondary"
                    onClick={() => navigate(`/tag/${tagId}/geofences/`)}
                >
                    Back to List
                </button>
            </div>
        </div>

    );
};

export default GeofenceDetailPage;