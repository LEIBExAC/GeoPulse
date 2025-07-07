import React, { useEffect, useState } from 'react';
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
import {
    getGeofenceByIdAPI,
    updateGeofenceAPI
} from '../../../assets/api/geofenceApi';
import SidebarUser from '../../user/SidebarUser';

const GeofenceEdit = () => {
    const { tagId, geofenceId } = useParams();
    const navigate = useNavigate();

    const [type, setType] = useState('');
    const [center, setCenter] = useState(null);
    const [radius, setRadius] = useState(100);
    const [vertices, setVertices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);

    const mapCenter = center || { lat: 28.6139, lng: 77.2090 };

    useEffect(() => {
        const fetchGeofence = async () => {
            const res = await getGeofenceByIdAPI(tagId, geofenceId);
            if (res.success) {
                const geo = res.geofence;
                setType(geo.type);
                if (geo.type === 'circular') {
                    setCenter(geo.center);
                    setRadius(geo.radius);
                } else {
                    setVertices(geo.vertices);
                }
            } else {
                setMessage('Failed to load geofence');
            }
            setLoading(false);
        };

        fetchGeofence();
    }, [tagId, geofenceId]);

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
                return setMessage('Polygonal geofence must have at least 3 points');
            }
            payload.vertices = vertices;
        }

        const res = await updateGeofenceAPI(tagId, geofenceId, payload);
        if (res.success) {
            navigate(`/geofence/${geofenceId}`);
        } else {
            setMessage(res.message || 'Failed to update geofence');
        }
    };

    if (loading) return <div className="container mt-4">Loading...</div>;

    return (

        <div className="d-flex">

            <SidebarUser />
            <div className='container mt-4 flex-grow-1 max-h-100 overflow-hidden'>
                <h3>Edit Geofence</h3>
                {message && <div className="alert alert-danger">{message}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label>Geofence Type</label>
                        <select
                            className="form-select"
                            value={type}
                            onChange={(e) => {
                                setType(e.target.value);
                                setCenter(null);
                                setVertices([]);
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
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
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
                            Update Geofence
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary ms-2"
                            onClick={() => navigate(`/geofence/${geofenceId}`)}
                        >
                            Cancel
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default GeofenceEdit;