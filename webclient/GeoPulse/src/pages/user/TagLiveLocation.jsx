import React, { useState, useEffect } from 'react';
import SidebarUser from './SidebarUser';
import "../../assets/styles/user/dashboardRightContentCommon.css";
import { useAuthStore } from '../../assets/store/authStore';
import { FaBell } from "react-icons/fa";
import { getUserTags } from '../../assets/api/tagApi';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { formatLastLogin } from '../../utility/formatLastLogin';
import { getUserLocation } from '../../utility/getUserLocation';
import { homeMarker, tagMarker } from '../../utility/MarkerOfMap';
import TagPopup from '../../utility/TagPopup';

export default function TagLiveLocation() {
    // const DEFAULT_COORDINATES = { latitude: 22.681236053967947, longitude: 75.81711289414646 };
    // const [userGeoCoordinates, setuserGeoCoordinates] = useState(null);
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTag, setSelectedTag] = useState(null);
    const [autoRefreshEnabled, setAutoRefreshEnabled] = useState(true);
    const autoRefreshInterval = 2000; //ms

    const { user } = useAuthStore();

    // useEffect(() => {
    //     const fetchLocation = async () => {
    //         try {
    //             const { latitude, longitude } = await getUserLocation();
    //             setuserGeoCoordinates({ latitude, longitude });
    //         } catch (err) {
    //             setuserGeoCoordinates(DEFAULT_COORDINATES);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     fetchLocation();
    // }, []);

    const fetchTags = async () => {
        try {
            const userTags = await getUserTags(user._id);
            setTags(userTags);
        } catch (err) {
            setError(err.message || 'Failed to load tags');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTags();
    }, [user._id]);

    // Auto Refresh Tag Data
    useEffect(() => {
        if (!autoRefreshEnabled || !selectedTag) return;

        const interval = setInterval(async () => {
            try {
                const updatedTags = await getUserTags(user._id);
                const matchedTag = updatedTags.find(tag => tag._id === selectedTag);
                if (matchedTag) {
                    setTags(prev =>
                        prev.map(tag => tag._id === matchedTag._id ? matchedTag : tag)
                    );
                    console.log("Tag Live location refreshed")
                }
            } catch (err) {
                console.error("Auto-refresh error:", err.message);
            }
        }, autoRefreshInterval); // Every 20 seconds

        return () => clearInterval(interval);
    }, [autoRefreshEnabled, selectedTag, user._id]);

    if (loading) return <div className="container mt-5">Loading tags...</div>;
    if (error) return <div className="container mt-5 alert alert-danger">❌ {error}</div>;

    const selectedTagObject = tags.find(tag => tag._id === selectedTag);

    return (
        <div className="d-flex align-items-start w-100">
            <SidebarUser />
            <div className="w-100" style={{ height: '100vh', overflowY: 'auto' }}>
                {/* Header */}
                <div className="d-flex justify-content-between align-items-center border-bottom bg-light dashboard-header pe-5">
                    <div className="fw-semibold fs-5 ms-4 text-dark">GeoPulse</div>
                    <div className="position-relative dashboard-bell">
                        <FaBell className="fs-5 text-dark bell-hover" />
                    </div>
                </div>

                <div className="dashboard-main-content ms-4 mt-4 me-4">
                    {/* Tag Selector */}
                    <div className="d-flex align-content-center justify-content-center ">
                        <div className="d-flex gap-2">
                            <select
                                className="form-select form-select-sm rounded shadow-sm fw-semibold bg-light text-dark"
                                style={{ width: '150px' }}
                                value={selectedTag || ''}
                                onChange={(e) => setSelectedTag(e.target.value)}
                            >
                                <option disabled value="">Select Tag</option>
                                {tags.map((tag) => (
                                    <option key={tag._id} value={tag._id}>{tag.name}</option>
                                ))}
                            </select>
                            <button className="btn btn-sm fw-semibold" style={{ backgroundColor: '#4DB8FF', color: 'white' }}>
                                Search on Map
                            </button>
                        </div>
                    </div>

                    {!selectedTag && (
                        <>
                            <div className="d-flex justify-content-center mt-5 ">
                                <img src="/images/gpsMap.png" alt="GPS Map" className="img-fluid" />
                            </div>
                            <div className="text-center fw-bold px-2 mt-5">
                                <h2 className="fs-5">Track Your Tag in Real Time with Precision</h2>
                            </div>
                        </>
                    )}

                    {selectedTagObject && (
                        <SelectedTag
                            selectedTagObject={selectedTagObject}
                            // userGeoCoordinates={userGeoCoordinates}
                            // DEFAULT_COORDINATES={DEFAULT_COORDINATES}
                            autoRefreshEnabled={autoRefreshEnabled}
                            setAutoRefreshEnabled={setAutoRefreshEnabled}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

function SelectedTag({ selectedTagObject, autoRefreshEnabled, setAutoRefreshEnabled }) {
    return (
        <>
            {/* Map */}
            <div className='mt-5'>
                <MapContainer
                    center={[
                        selectedTagObject.location.coordinates[1],
                        selectedTagObject.location.coordinates[0],
                    ]}
                    zoom={13}
                    style={{ height: '350px' }}
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />



                    {selectedTagObject?.location?.coordinates?.length === 2 && (
                        <Marker
                            position={[
                                selectedTagObject.location.coordinates[1],
                                selectedTagObject.location.coordinates[0],
                            ]}
                            icon={tagMarker}
                        >
                            <Popup><TagPopup tag={selectedTagObject} /></Popup>
                        </Marker>
                    )}
                </MapContainer>
            </div>

            {/* Tag Details */}
            <div className="d-flex gap-4 align-items-start flex-wrap mt-4">
                {/* Left Card */}
                <div style={{ flex: '0 0 auto' }}>
                    <div className="border-0 shadow-sm p-3 rounded" style={{ backgroundColor: '#fffbe6', width: '300px' }}>
                        <div className="d-flex justify-content-between align-items-start mb-3">
                            <div className="fw-bold fs-6">🛰️ {selectedTagObject.name}</div>
                            <div className="text-muted fs-5">⋯</div>
                        </div>
                        <div className="mb-2"><strong>Battery:</strong> 🔋 {selectedTagObject.battery} %</div>
                        <div className="mb-2"><strong>Status:</strong> ✅ {selectedTagObject.status}</div>
                        <div className="mb-2"><strong>Location:</strong> 📍 Indore</div>
                        <div className="mb-2"><strong>Speed:</strong> 🚗 {selectedTagObject.speed || "100"} km/h</div>
                        <div><strong>Updated:</strong> 🕒 {formatLastLogin(selectedTagObject.lastSeen)}</div>
                    </div>
                </div>

                {/* Controls & Auto Refresh */}
                <div className="flex-grow-1">
                    <div className="d-flex flex-wrap justify-content-start gap-4 mb-4">
                        <div className="fw-semibold cursor-pointer">🔔 Ring Tag</div>
                        <div className="fw-semibold cursor-pointer">📍 Track Tag</div>
                        <div className="fw-semibold cursor-pointer">✏️ Edit Tag</div>
                        <div className="fw-semibold cursor-pointer">🗑️ Delete Tag</div>
                        <div className="fw-semibold cursor-pointer">📤 Share Tag</div>
                    </div>

                    <div className="mb-4">
                        <div className="fw-bold mb-2">🔗 Shared With:</div>
                        <ul className="list-unstyled ps-3 mb-0">
                            <li>👤 Nidhi Agnihotri (<span className="text-muted">nidhi@example.com</span>)</li>
                            <li>👤 Yash Soni (<span className="text-muted">yash@example.com</span>)</li>
                        </ul>
                    </div>

                    <div className="d-inline-flex align-items-center gap-2 px-3 py-2 bg-warning bg-opacity-25 rounded shadow-sm">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="autoRefreshCheckbox"
                            checked={autoRefreshEnabled}
                            onChange={() => setAutoRefreshEnabled(!autoRefreshEnabled)}
                            style={{ cursor: 'pointer' }}
                        />
                        <label
                            className="form-check-label fw-semibold text-dark"
                            htmlFor="autoRefreshCheckbox"
                        >
                            Auto Refresh:{" "}
                            <span className="ms-1 text-muted">
                                {autoRefreshEnabled ? "Enabled ✅" : "Disabled ❌"}
                            </span>
                        </label>
                    </div>

                </div>
            </div>
        </>
    );
}
