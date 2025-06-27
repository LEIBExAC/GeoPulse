import React from 'react';
import SidebarUser from './SidebarUser';
import "../../assets/styles/user/dashboardRightContentCommon.css";
import "../../assets/styles/user/HomeDashboard.css";
import { FaBell } from "react-icons/fa";

export default function UserDashboard() {
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
                <h4 className="fw-bold mb-2 text-primary">Welcome, Mohit Soni 👋</h4>
                <p className="mb-0 text-muted">
                  Track your smart tags in real-time, set GeoFences, and manage devices seamlessly.
                </p>
                <div className="mt-3 d-flex flex-wrap gap-4 text-muted">
                  <div><strong>Last Login:</strong> Today at 10:34 AM</div>
                  <div><strong>Role:</strong> User</div>
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
          <div className="w-100 mt-3 p-0">
            <div className="w-100 overflow-hidden rounded shadow-sm" style={{ height: '300px' }}>
              <img
                src="https://storage.googleapis.com/support-forums-api/attachment/thread-21292277-13674907007105193493.jpg"
                alt="Map Preview"
                className="w-100 h-100"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-light p-4 rounded shadow-sm mt-4">
            <h5 className="fw-bold text-primary mb-3 border-bottom pb-2">Quick Stats</h5>
            <div className="row g-3">

              <div className="col-12 col-sm-6 col-md-3">
                <div className="bg-white d-flex align-items-center justify-content-start p-3 rounded shadow-sm h-100">
                  <img src="/icon/tag.png" alt="Tags" width="24" height="24" className="me-3" />
                  <span className="fw-semibold text-dark">3 Tags</span>
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
