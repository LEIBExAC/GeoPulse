import React from 'react';
import SidebarUser from './SidebarUser';
import "../../assets/styles/user/dashboardRightContentCommon.css";
import "../../assets/styles/user/HomeDashboard.css";
import { FaBell } from "react-icons/fa";

export default function MyTag() {
  return (
    <div className="d-flex align-items-start w-100">
      <SidebarUser />

      <div className="w-100">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center border-bottom bg-light dashboard-header pe-5">
          <div className="fw-semibold fs-5 ms-4 text-dark">GeoPulse</div>
          <div className="position-relative dashboard-bell">
            <FaBell className="fs-5 text-dark bell-hover" />
            {/* <span className="notification-dot"></span> */}
          </div>
        </div>

        {/* Main Content */}
        <div className="dashboard-main-content ms-4 mt-4 me-4">

         <div>My Tags List code here</div>

        </div>
      </div>
    </div>
  );
}
