import React from "react";
import { useNavigate } from "react-router-dom";
import GeofenceMapPreview from "./GeofenceMapPreview";
import GeofenceToolbar from "./GeofenceToolbar";

const GeofenceCard = ({ geofence, tagId }) => {
    const navigate = useNavigate();

    const handleViewDetails = () => {
        navigate(`/geofence/${geofence._id}`);
    };

    return (
        <div>
            <div className="card shadow-sm border">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-capitalize">
                        {geofence.type} Geofence
                    </span>
                    <span
                        className={`badge ${geofence.active ? "bg-success" : "bg-secondary"}`}>
                        {geofence.active ? "Active" : "Inactive"}
                    </span>
                </div>
                <div className="card-body p-0">
                    <GeofenceMapPreview geofence={geofence} height="200px" />
                </div>

                <div className="card-footer d-flex justify-content-between align-items-center">
                    <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={handleViewDetails}
                    >
                        View Details
                    </button>

                    <GeofenceToolbar geofence={geofence} tagId={tagId} />
                </div>
            </div >
        </div >
    );
};

export default GeofenceCard;