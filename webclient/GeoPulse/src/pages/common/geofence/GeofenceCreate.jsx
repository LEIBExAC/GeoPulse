import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    MapContainer,
    TileLayer,
    Circle,
    Polygon,
    Marker,
    useMapEvents
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { createGeofenceAPI } from '../../../assets/api/geofenceApi';
import SidebarUser from '../../user/SidebarUser';

const GeofenceCreate = () => {
    const { tagId } = useParams();
    const navigate = useNavigate();

    const [type, setType] = useState('circular'); // default type
    const [center, setCenter] = useState(null);
    const [radius, setRadius] = useState(100); // meters
    const [vertices, setVertices] = useState([]);
    const [message, setMessage] = useState(null);

    const mapCenter = center || { lat: 28.6139, lng: 77.2090 }; // default to Delhi

    const MapClickHandler = () => {
        useMapEvents({
            click(e) {
                if (type === 'circular') {
                    setCenter(e.latlng);
                } else if (type === 'polygonal') {
                    setVertices((prev) => [...prev, e.latlng]);
                }
            }
        });
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let payload = { type };

        if (type === 'circular') {
            if (!center || !radius) {
                return setMessage('Please select a center and radius');
            }
            payload.center = center;
            payload.radius = radius;
        }

        if (type === 'polygonal') {
            if (vertices.length < 3) {
                return setMessage('Polygonal geofence must have at least 3 vertices');
            }
            payload.vertices = vertices;
        }

        try {
            const res = await createGeofenceAPI(tagId, payload);
            if (res.success) {
                navigate(`/tag/${tagId}/geofence/${res.geofence._id}`);
            } else {
                setMessage(res.message || 'Failed to create geofence');
            }
        } catch (err) {
            setMessage('Server error while creating geofence');
        }
    };

    return (

        <div className="d-flex">
            <SidebarUser />
            <div className='container flex-grow-1 mt-4' style={{ maxHeight: 'calc(100vh - 80px)', overflowY: 'auto' }}>
                <h3>Create Geofence</h3>

                {message && <div className="alert alert-warning">{message}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label>Geofence Type</label>
                        <select
                            className="form-select"
                            value={type}
                            onChange={(e) => {
                                setType(e.target.value);
                                setVertices([]);
                                setCenter(null);
                            }}
                        >
                            <option value="circular">Circular</option>
                            <option value="polygonal">Polygonal</option>
                        </select>
                    </div>

                    {type === 'circular' && center && (
                        <div className="mb-3">
                            <label>Radius (meters)</label>
                            <input
                                type="number"
                                className="form-control"
                                value={radius}
                                onChange={(e) => setRadius(Number(e.target.value))}
                            />
                        </div>
                    )}

                    <MapContainer
                        center={mapCenter}
                        zoom={13}
                        style={{ height: '400px', width: '100%' }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <MapClickHandler />
                        {type === 'circular' && center && (
                            <Circle center={center} radius={radius} />
                        )}
                        {type === 'polygonal' && vertices.length > 0 && (
                            <>
                                <Polygon positions={vertices} />
                                {vertices.map((v, i) => (
                                    <Marker key={i} position={v} />
                                ))}
                            </>
                        )}
                    </MapContainer>

                    <div className="mt-3">
                        <button type="submit" className="btn btn-primary">
                            Create Geofence
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary ms-2"
                            onClick={() => navigate(`/tag/${tagId}/geofence/${res.geofence._id}`)}
                        >
                            Cancel
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
};
export default GeofenceCreate;