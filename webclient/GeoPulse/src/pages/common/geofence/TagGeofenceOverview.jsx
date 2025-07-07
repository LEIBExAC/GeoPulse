import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllTags } from "../../../assets/api/tagApi";
import { fetchGeofencesByTag } from "../../../assets/api/geofenceApi";
import { useAuthStore } from "../../../assets/store/authStore";
import SidebarUser from "../../user/SidebarUser";

const TagGeofenceOverview = () => {
    const [tagData, setTagData] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = document.cookie.split("; ").find(row => row.startsWith("token="))?.split("=")[1];
    const navigate = useNavigate();
    const { user, isAdmin } = useAuthStore();


    useEffect(() => {
        const loadAll = async () => {
            try {
                const tags = await getAllTags(user._id, isAdmin);
                if (!tags || tags.length === 0) {
                    setTagData([]);
                    setLoading(false);
                    return;
                }

                const tagsWithGeofences = await Promise.all(
                    tags.map(async (tag) => {
                        const geofences = await fetchGeofencesByTag(tag.tagId, token);
                        return {
                            ...tag,
                            geofences: geofences.sort((a, b) => (b.active ? 1 : 0) - (a.active ? 1 : 0)),
                        };
                    })
                );

                setTagData(tagsWithGeofences);
            } catch (err) {
                console.error("Failed loading geofences:", err.message);
            } finally {
                setLoading(false);
            }
        };

        loadAll();
    }, [token]);

    if (loading) return <div className="container mt-4">Loading...</div>;

    return (
        <div className="d-flex">
            <SidebarUser />
            <div className="container mt-4 flex-grow-1 max-h-100 overflow-hidden">

                <h3 className="mb-4">Tag Geofence Overview</h3>
                {
                    tagData.length === 0 ? (
                        <div className="alert alert-info">
                            No tags found. Please create a tag to manage geofences.
                            <button
                                className="btn btn-primary btn-sm ms-2"
                                onClick={() => navigate("/add-new-tag")}
                            > Add New Tag
                            </button>
                        </div>)
                        : null
                }

                <div className="row">
                    {tagData.map((tag) => (
                        <div className="col-md-6 mb-4" key={tag.tagId}>
                            <div className="card h-100 shadow-sm">
                                <div className="card-header bg-primary text-white">
                                    <h5 className="mb-0">{tag.name}</h5>
                                    <small>ID: {tag.tagId}</small>
                                </div>
                                <div className="card-body">
                                    {tag.geofences.length === 0 ? (
                                        <div className="text-center">
                                            <p className="text-muted">No geofences created yet.</p>
                                            <button
                                                className="btn btn-outline-primary btn-sm"
                                                onClick={() => navigate(`/tag/${tag.tagId}/geofence/create`)}
                                            >
                                                + Create Geofence
                                            </button>
                                        </div>
                                    ) : (
                                        <div
                                            className="d-flex overflow-auto"
                                            style={{ gap: "1rem", paddingBottom: "0.5rem" }}
                                        >
                                            {tag.geofences.map((gf, index) => (
                                                <div
                                                    key={gf._id}
                                                    className="border rounded p-2"
                                                    style={{ minWidth: "200px", maxWidth: "200px" }}
                                                >
                                                    <div className="d-flex justify-content-between align-items-center mb-1">
                                                        <strong>{gf.name || `Geofence ${index + 1}`}</strong>
                                                        {gf.active && (
                                                            <span className="badge bg-success">Active</span>
                                                        )}
                                                    </div>
                                                    <div className="btn-group btn-group-sm w-100">
                                                        <button
                                                            className="btn btn-outline-primary"
                                                            onClick={() =>
                                                                navigate(`/tag/${tag.tagId}/geofence/${gf._id}`)
                                                            }
                                                        >
                                                            View
                                                        </button>
                                                        <button
                                                            className={`btn ${gf.active ? "btn-warning" : "btn-success"
                                                                }`}
                                                            onClick={async () => {
                                                                // Logic to toggle enable/disable
                                                            }}
                                                        >
                                                            {gf.active ? "Disable" : "Enable"}
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="card-footer text-end">
                                    <button
                                        className="btn btn-sm btn-outline-secondary"
                                        onClick={() => navigate(`/tag/${tag.tagId}/geofences`)}
                                    >
                                        View All Geofences
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TagGeofenceOverview;
