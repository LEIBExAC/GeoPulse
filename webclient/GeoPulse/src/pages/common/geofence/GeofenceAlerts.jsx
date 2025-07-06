import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getGeofenceAlertsAPI } from "../../../assets/api/geofenceApi";

const GeofenceAlertsPage = () => {
    const { tagId } = useParams();
    const navigate = useNavigate();

    const [alerts, setAlerts] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAlerts = async () => {
            const res = await getGeofenceAlertsAPI(tagId);
            if (res.success) {
                setAlerts(res.alerts);
            } else {
                setErrorMsg(res.message || "Failed to fetch alerts.");
            }
            setLoading(false);
        };

        fetchAlerts();

    }, [tagId]);

    if (loading) return <div className="container mt-4">Loading...</div>;

    if (errorMsg)
        return (
            <div className="container mt-4 alert alert-danger">{errorMsg}</div>
        );

    return (
        <div className="container mt-4">
            <h3>Geofence Alerts</h3>
            {alerts.length === 0 ? (
                <div className="alert alert-info">No alerts available.</div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Timestamp</th>
                                <th>Latitude</th>
                                <th>Longitude</th>
                                <th>Type</th>
                                <th>Geofence Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {alerts.map((alert, idx) => (
                                <tr key={idx}>
                                    <td>{new Date(alert.timestamp).toLocaleString()}</td>
                                    <td>{alert.location?.lat ?? "N/A"}</td>
                                    <td>{alert.location?.lng ?? "N/A"}</td>
                                    <td>{alert.alertType}</td>
                                    <td>{alert.geofenceId?.type || "Unknown"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <button
                className="btn btn-secondary mt-3"
                onClick={() => navigate(`/geofence/${tagId}`)}
            >
                Back to Geofences
            </button>
        </div>

    );
};

export default GeofenceAlertsPage;