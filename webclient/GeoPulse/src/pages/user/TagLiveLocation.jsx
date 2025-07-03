import React, { useState, useEffect } from 'react';
import SidebarUser from './SidebarUser';
import "../../assets/styles/user/dashboardRightContentCommon.css";
import { useAuthStore } from '../../assets/store/authStore';
import { FaBell } from "react-icons/fa";
import { getUserTags } from '../../assets/api/tagApi';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import { Card } from 'react-bootstrap';
import { formatLastLogin } from '../../utility/formatLastLogin';
import { getUserLocation } from '../../utility/getUserLocation';



export default function TagLiveLocation() {
    const DEFAULT_COORDINATES = { latitude: 22.681236053967947, longitude: 75.81711289414646 };
    const [userGeoCoordinates, setuserGeoCoordinates] = useState(null)
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTag, setSelectedTag] = useState(null);

    const { user } = useAuthStore();
    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const { latitude, longitude } = await getUserLocation();
                setuserGeoCoordinates({ latitude: latitude, longitude: longitude });
            } catch (err) {
                // setLocationError(err.message);
                setuserGeoCoordinates(DEFAULT_COORDINATES);
                // alert("Please allow Location to work website properly. Then refresf page")
            } finally {
                setLoading(false);
            }
        };

        fetchLocation();
    }, []);

    useEffect(() => {
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

        fetchTags();
    }, [user._id]);

    if (loading) return <div className="container mt-5">Loading tags...</div>;
    if (error) return <div className="container mt-5 alert alert-danger">❌ {error}</div>;

    return (
        <SelectTagForLiveLocation
            tags={tags}
            selectedTag={selectedTag}
            setSelectedTag={setSelectedTag}
            userGeoCoordinates={userGeoCoordinates}
            DEFAULT_COORDINATES={DEFAULT_COORDINATES}
        />
    );
}

function SelectTagForLiveLocation({ tags, selectedTag, setSelectedTag, userGeoCoordinates, DEFAULT_COORDINATES }) {
    // Get selected tag's full object
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

                {/* Main Content */}
                <div className="dashboard-main-content ms-4 mt-4 me-4">
                    {/* Tag Selection */}
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
                                    <option key={tag._id} value={tag._id}>
                                        {tag.name}
                                    </option>
                                ))}
                            </select>

                            <button className="btn btn-sm fw-semibold" style={{ backgroundColor: '#4DB8FF', color: 'white' }}>
                                Search on Map
                            </button>
                        </div>
                    </div>

                    {/* Static Image for Map */}

                    {!selectedTag && (
                        <>
                            <div className="d-flex justify-content-center mt-5 ">
                                <img src="/images/gpsMap.png" alt="GPS Map" className="img-fluid" />
                            </div>

                            {/* Title */}
                            <div className="text-center fw-bold px-2 mt-5 mt-sm-1">
                                <h2 className="fs-5 fs-sm-4 fs-md-3 fs-lg-2 fs-xl-1">
                                    Track Your Tag in Real Time with Precision
                                </h2>
                            </div>
                        </>
                    )}


                    {/* 👇 Tag Details (Shown only if tag is selected) */}
                    {selectedTagObject && (
                        <SelectedTag
                            selectedTagObject={selectedTagObject}
                            userGeoCoordinates={userGeoCoordinates}   // ✅ passed again
                            DEFAULT_COORDINATES={DEFAULT_COORDINATES}
                        />
                    )}

                </div>
            </div>
        </div>
    );
}



function SelectedTag({ selectedTagObject, userGeoCoordinates, DEFAULT_COORDINATES }) {
    return (
        <>
            {/* //Map of live Location  */}
            <div className='mt-5'>
                <MapContainer
                    center={[
                        userGeoCoordinates?.latitude ?? DEFAULT_COORDINATES.latitude,
                        userGeoCoordinates?.longitude ?? DEFAULT_COORDINATES.longitude,
                    ]}
                    zoom={
                        (userGeoCoordinates?.latitude === DEFAULT_COORDINATES.latitude &&
                            userGeoCoordinates?.longitude === DEFAULT_COORDINATES.longitude)
                            ? 5
                            : 13
                    }
                    style={{ height: '350px' }}
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                    {/* ✅ Only render if coordinates exist */}
                    {userGeoCoordinates && (
                        <Marker position={[userGeoCoordinates.latitude, userGeoCoordinates.longitude]}>
                            <Popup>This is your location</Popup>
                        </Marker>
                    )}

                    {/* ✅ Render tag marker if it exists and is valid */}
                    {selectedTagObject?.location?.coordinates?.length === 2 && (
                        <Marker
                            position={[
                                selectedTagObject.location.coordinates[1], // latitude
                                selectedTagObject.location.coordinates[0], // longitude
                            ]}
                        >
                            <Popup>{selectedTagObject.tagId}</Popup>
                        </Marker>
                    )}
                </MapContainer>

            </div>
            {/* card showing current selected tag details  */}
            <div className="d-flex gap-4 align-items-start flex-wrap mt-4">
                {/* === Left: Tag Info Card === */}
                <div style={{ flex: '0 0 auto' }}>
                    <div className="border-0 shadow-sm p-3 rounded" style={{ backgroundColor: '#fffbe6', width: '300px' }}>
                        <div className="d-flex justify-content-between align-items-start mb-3">
                            <div className="fw-bold fs-6">🛰️ Bike Tracker</div>
                            <div className="text-muted fs-5">⋯</div>
                        </div>
                        <div className="mb-2"><strong>Battery:</strong> 🔋 {selectedTagObject.battery} %</div>
                        <div className="mb-2"><strong>Status:</strong> ✅ {selectedTagObject.status}</div>
                        <div className="mb-2"><strong>Location:</strong> 📍 Indore</div>
                        <div className="mb-2"><strong>Speed:</strong> 🚗 {selectedTagObject.speed || "100"} km/h</div>
                        <div><strong>Updated:</strong> 🕒 {formatLastLogin(selectedTagObject.lastSeen)}</div>
                    </div>
                </div>

                {/* === Right: Tag Controls === */}
                <div className="flex-grow-1">
                    {/* Action Buttons */}
                    <div className="d-flex flex-wrap justify-content-start gap-4 mb-4">
                        <div className="fw-semibold cursor-pointer">🔔 Ring Tag</div>
                        <div className="fw-semibold cursor-pointer">📍 Track Tag</div>
                        <div className="fw-semibold cursor-pointer">✏️ Edit Tag</div>
                        <div className="fw-semibold cursor-pointer">🗑️ Delete Tag</div>
                        <div className="fw-semibold cursor-pointer">📤 Share Tag</div>
                    </div>

                    {/* Shared With Section */}
                    <div className="mb-4">
                        <div className="fw-bold mb-2">🔗 Shared With:</div>
                        <ul className="list-unstyled ps-3 mb-0">
                            <li>👤 Nidhi Agnihotri (<span className="text-muted">nidhi@example.com</span>)</li>
                            <li>👤 Yash Soni (<span className="text-muted">yash@example.com</span>)</li>
                        </ul>
                    </div>

                    {/* Auto Refresh Info */}
                    <div className="p-2 px-3 rounded shadow-sm fw-semibold d-inline-block" style={{ backgroundColor: '#fffde7' }}>
                        Auto refresh: <span className="ms-2 text-muted">Unabled ✅</span>
                    </div>
                </div>
            </div>


        </>
    )
}