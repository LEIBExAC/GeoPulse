import React from 'react';
import { useNavigate } from 'react-router-dom';

const TagLocationPreview = ({ tag }) => {
    const navigate = useNavigate();

    const coords = tag?.location?.coordinates;
    const hasLocation = coords && coords.length === 2 && coords[0] !== 0 && coords[1] !== 0;

    if (!hasLocation) {
        return (
            <div className="mt-4 alert alert-warning">
                No recent location data available for this tag.
            </div>
        );
    }

    const [lng, lat] = coords;

    return (
        <div className="card mt-4 shadow-sm">
            <div className="card-body">
                <h5 className="card-title">📍 Last Known Location</h5>
                <p><strong>Latitude:</strong> {lat.toFixed(6)}</p>
                <p><strong>Longitude:</strong> {lng.toFixed(6)}</p>
                <p className="text-muted"><small>Last seen: {new Date(tag.lastSeen).toLocaleString()}</small></p>
                <p className="text-muted"><small>Status: {tag.status}</small></p>
                <button
                    className="btn btn-outline-success mt-3"
                    onClick={() => navigate(`/tag/${tag._id}/track`)}
                >
                    🗺️ View on Map
                </button>
            </div>
        </div>
    );
};

export default TagLocationPreview;