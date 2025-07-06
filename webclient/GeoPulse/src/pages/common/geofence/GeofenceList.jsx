import React, { useEffect, useState } from "react";
import { fetchGeofencesByTag, deleteGeofence, enableGeofence, disableGeofence } from "../../../assets/api/geofenceApi";
import { useNavigate, useParams } from "react-router-dom";
import "../../../assets/styles/geofence.css";

const GeofenceList = () => {
    const { tagId } = useParams();
    const navigate = useNavigate();
    const [geofences, setGeofences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);

    const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

    useEffect(() => {
        const loadGeofences = async () => {
            try {
                const data = await fetchGeofencesByTag(tagId, token);
                setGeofences(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadGeofences();
    }, [tagId, token, geofences]);

    const handleDelete = async () => {
        try {
            await deleteGeofence(confirmDeleteId, token);
            setGeofences((prev) => prev.filter((gf) => gf._id !== confirmDeleteId));
        } catch (err) {
            setError(err.message);
        } finally {
            setConfirmDeleteId(null);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Geofences for Tag: {tagId}</h2>

            {loading && <div className="alert alert-info">Loading geofences...</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            {!loading && geofences.length === 0 && (
                <div className="alert alert-warning">No geofences found for this tag.</div>
            )}

            <div className="row">
                {geofences.map((gf) => (
                    <div className="col-md-4 mb-4" key={gf._id}>
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title text-primary">{gf.type.toUpperCase()}</h5>
                                <p
                                    className={`badge ${gf.active ? "bg-success" : "bg-secondary"
                                        } mb-2`}
                                >
                                    {gf.active ? "Active" : "Inactive"}
                                </p>

                                {gf.type === "circular" ? (
                                    <>
                                        <p>
                                            <strong>Center:</strong>
                                            <br />
                                            Lat: {gf.center?.lat}, Lng: {gf.center?.lng}
                                        </p>
                                        <p>
                                            <strong>Radius:</strong> {gf.radius} m
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <p><strong>Vertices:</strong></p>
                                        <ul className="list-unstyled mb-2">
                                            {gf.vertices.slice(0, 3).map((v, i) => (
                                                <li key={i}>Lat: {v.lat}, Lng: {v.lng}</li>
                                            ))}
                                            {gf.vertices.length > 3 && (
                                                <li className="text-muted">
                                                    +{gf.vertices.length - 3} more…
                                                </li>
                                            )}
                                        </ul>
                                    </>
                                )}

                                <p className="text-muted small">
                                    <strong>Created:</strong>{" "}
                                    {new Date(gf.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="card-footer d-flex justify-content-between">
                                <button
                                    className="btn btn-sm btn-outline-primary"
                                    onClick={() => navigate(`/tag/${tagId}/geofence/${gf._id}`)}
                                >
                                    View
                                </button>
                                <button
                                    className="btn btn-sm btn-outline-warning"
                                    onClick={() => navigate(`/tag/${tagId}/geofence/${gf._id}/edit`)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => setConfirmDeleteId(gf._id)}
                                >
                                    Delete
                                </button>

                                <button
                                    className={`btn btn-sm ${gf.active ? "btn-warning" : "btn-success"}`}
                                    onClick={async () => {
                                        try {
                                            const updated = gf.active
                                                ? await disableGeofence(tagId, gf._id, token)
                                                : await enableGeofence(tagId, gf._id, token);

                                            setGeofences((prevGeofences) =>
                                                prevGeofences.map((item) =>
                                                    item._id === updated._id ? { ...item, ...updated } : item
                                                )
                                            );
                                        } catch (err) {
                                            console.error(err);
                                            setError(err.message || "Failed to toggle geofence status");
                                        }
                                    }}
                                >
                                    {gf.active ? "Disable" : "Enable"}
                                </button>

                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {confirmDeleteId && (
                <div
                    className="modal fade show d-block"
                    tabIndex="-1"
                    role="dialog"
                    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Delete</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setConfirmDeleteId(null)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                Are you sure you want to delete this geofence?
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-danger" onClick={handleDelete}>
                                    Yes, Delete
                                </button>
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setConfirmDeleteId(null)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GeofenceList;
