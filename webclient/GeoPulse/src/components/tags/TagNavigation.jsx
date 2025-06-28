import React from 'react';
import { useNavigate } from 'react-router-dom';

const TagNavigation = ({ tagId }) => {
    const navigate = useNavigate();

    return (
        <div className="d-flex gap-3 mt-4 flex-wrap">
            <button
                className="btn btn-outline-primary"
                onClick={() => navigate(`/tag/${tagId}/geofence`)}
            >
                🛡️ Geofence
            </button>
            <button
                className="btn btn-outline-warning"
                onClick={() => navigate(`/tag/${tagId}/alerts`)}
            >
                🚨 Alerts
            </button>
            <button
                className="btn btn-outline-info"
                onClick={() => navigate(`/tag/${tagId}/history`)}
            >
                📜 History
            </button>
        </div>
    );
};

export default TagNavigation;
