import React, { useEffect, useState } from 'react';
import SidebarUser from './SidebarUser';
import "../../assets/styles/user/dashboardRightContentCommon.css";
import "../../assets/styles/user/HomeDashboard.css";
import { useAuthStore } from '../../assets/store/authStore';
import { FaBell } from "react-icons/fa";
import { formatLastLogin } from '../../utility/formatLastLogin';
import { getUserLocation } from '../../utility/getUserLocation';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { getAllTags } from '../../assets/api/tagApi';
import 'leaflet/dist/leaflet.css';
import { homeMarker , tagMarker } from '../../utility/MarkerOfMap';
import TagPopup from '../../utility/TagPopup';


export default function UserDashboard() {
  const { user, isAdmin } = useAuthStore();
  const DEFAULT_COORDINATES = { latitude: 22.696970409094032, longitude: 76.12557707999811 }; 
  const [userGeoCoordinates, setuserGeoCoordinates] = useState(null)
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState([])


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
  //fetches all user tags.
  useEffect(() => {
    const fetchMyTags = async () => {
      try {
        const tags = await getAllTags(user._id, isAdmin);
        setTags(tags); // example state update
      } catch (error) {
        console.error("Error fetching tags:", error.message);
      }
    };

    fetchMyTags();
  }, []);



  if (loading) {
    return (
      <div className="p-5 text-muted text-center">
        📍 loading...
      </div>
    );
  }


  return (
    <div className="d-flex align-items-start w-100">
      {/* Sidebar */}
      <SidebarUser />

      {/* Right Panel */}
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

          {/* Welcome + Notifications */}
          <div className="row g-3 mb-4">
            {/* Welcome */}
            <div className="col-12 col-md-8">
              <div className="p-4 rounded shadow-sm bg-white h-100">
                <h4 className="fw-bold mb-2 text-primary">Welcome, {user.name} 👋</h4>
                <p className="mb-0 text-muted">
                  Track your smart tags in real-time, set GeoFences, and manage devices seamlessly.
                </p>
                <div className="mt-3 d-flex flex-wrap gap-4 text-muted">
                  <div><strong>Last Login:</strong> {formatLastLogin(user.lastLogin)}</div>
                  <div><strong>Role:</strong> {user.role.charAt(0).toUpperCase() + user.role.slice(1)}</div>
                  <div><strong>Device Connected:</strong> 3 Tags</div>
                </div>
                <div className="mt-3 d-flex flex-wrap gap-2">
                  <button className="btn btn-sm btn-outline-primary">Add New Tag</button>
                  <button className="btn btn-sm btn-outline-secondary">View Activity</button>
                </div>
                <p className="mt-3 fst-italic text-muted">"Smart tracking leads to smart decisions." 🚀</p>
              </div>
            </div>

            {/* Notifications */}
            <div className="col-12 col-md-4">
              <div className="bg-white p-4 rounded shadow-sm h-100">
                <h6 className="fw-bold text-dark mb-3 border-bottom pb-2">Recent Notifications</h6>
                <ul className="list-unstyled mb-0">
                  <li className="mb-2">
                    <span className="text-muted">🔋 <strong>Tag 1</strong> battery low</span>
                  </li>
                  <li className="mb-2">
                    <span className="text-muted">📍 <strong>Tag 2</strong> entered Geofence A</span>
                  </li>
                  <li className="mb-2">
                    <span className="text-muted">📡 <strong>Tag 3</strong> is moving</span>
                  </li>
                  <li>
                    <span className="text-muted">✅ No critical alerts</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="">
            <MapContainer center={[
              userGeoCoordinates?.latitude ?? DEFAULT_COORDINATES.latitude,
              userGeoCoordinates?.longitude ?? DEFAULT_COORDINATES.longitude,
            ]}
              zoom={userGeoCoordinates === DEFAULT_COORDINATES ? 5 : 13}
              style={{ height: '350px' }}>
              {console.log(userGeoCoordinates.latitude + "  ----" + userGeoCoordinates.longitude)}
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[
                userGeoCoordinates?.latitude ?? DEFAULT_COORDINATES.latitude,
                userGeoCoordinates?.longitude ?? DEFAULT_COORDINATES.longitude,
              ]}
                icon={homeMarker}
              >
                <Popup>You are here</Popup>
              </Marker>

              {tags.map((tag) => (
                tag?.location?.coordinates?.length === 2 && (
                  <Marker
                    key={tag._id}
                    position={[tag.location.coordinates[1], tag.location.coordinates[0]]}
                    icon={tagMarker}

                  >
                    <Popup><TagPopup tag = {tag}></TagPopup></Popup>
                  </Marker>
                )
              ))}
              {console.log(tags)
              }



            </MapContainer>
          </div>

          {/* Quick Stats */}
          <div className="bg-light p-4 rounded shadow-sm mt-4">
            <h5 className="fw-bold text-primary mb-3 border-bottom pb-2">Quick Stats</h5>
            <div className="row g-3">

              <div className="col-12 col-sm-6 col-md-3">
                <div className="bg-white d-flex align-items-center justify-content-start p-3 rounded shadow-sm h-100">
                  <img src="/icon/tag.png" alt="Tags" width="24" height="24" className="me-3" />
                  <span className="fw-semibold text-dark">{tags.length + " "}Tags</span>
                </div>
              </div>

              <div className="col-12 col-sm-6 col-md-3">
                <div className="bg-white d-flex align-items-center justify-content-start p-3 rounded shadow-sm h-100">
                  <img src="/icon/moving.png" alt="Moving" width="24" height="24" className="me-3" />
                  <span className="fw-semibold text-dark">2 Moving</span>
                </div>
              </div>

              <div className="col-12 col-sm-6 col-md-3">
                <div className="bg-white d-flex align-items-center justify-content-start p-3 rounded shadow-sm h-100">
                  <img src="/icon/caution.png" alt="Alerts" width="24" height="24" className="me-3" />
                  <span className="fw-semibold text-dark">0 Alerts</span>
                </div>
              </div>

              <div className="col-12 col-sm-6 col-md-3">
                <div className="bg-white d-flex align-items-center justify-content-start p-3 rounded shadow-sm h-100">
                  <img src="/icon/lowBattery.png" alt="Low Battery" width="24" height="24" className="me-3" />
                  <span className="fw-semibold text-dark">1 LowBattery</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
