import React, { useEffect, useState } from 'react';
import SidebarUser from './SidebarUser';
import "../../assets/styles/user/dashboardRightContentCommon.css";
import "../../assets/styles/user/HomeDashboard.css";
import { FaBell } from "react-icons/fa";
import { FaPlus } from 'react-icons/fa';
import TagCard from '../../components/cards/TagCard';
import { useAuthStore } from '../../assets/store/authStore';
import { getUserTags } from '../../assets/api/tagApi';
import { useNavigate } from 'react-router-dom';

export default function MyTag() {

  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuthStore();

  const navigate = useNavigate();
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
  }, []);

  if (loading) return <div className="container mt-5">Loading tags...</div>;
  if (error) return <div className="container mt-5 alert alert-danger">❌ {error}</div>;

  return (
    <div className="d-flex align-items-start w-100">
      <SidebarUser />

      <div className="w-100" style={{ height: '100vh', overflowY: 'auto' }}>
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

          {/* Fileter and search bar  */}

          <div className="container-fluid px-0">
            <div className="row align-items-center g-2">

              {/* Left: Inputs */}
              <div className="col-12 col-lg-9">
                <div className="d-flex flex-column flex-sm-row gap-2">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Tag Name"
                  />

                  <select className="form-select form-select-sm">
                    <option value="">Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Low Battery">Low Battery</option>
                  </select>

                  <button className="btn btn-sm btn-primary fw-semibold px-3">
                    Search
                  </button>
                </div>
              </div>

              {/* Right: Add Tag Button */}
              <div className="col-12 col-lg-3 text-lg-end d-none d-sm-block">
                <button className="btn btn-sm btn-outline-primary fw-semibold " onClick={()=>navigate("/add-new-tag")}>
                  <FaPlus className="me-1" /> Add Tag
                </button>
              </div>


            </div>
          </div>

          <div className="d-flex flex-wrap gap-5 justify-content-flex-start align-items-center mt-4 ">
            {tags.length > 0 ? (
              tags.map((tag) => (
                <div className="flex-grow-1" key = {tag._id} style={{ minWidth: '280px', maxWidth: '400px', flexBasis: '100%' }}>
                  <TagCard tag={tag} />
                </div>
              ))
            ) : (

              <div>No tag registered</div>   //NOTE PENDING : Image and Activate your tag now Button 
            )}



          </div>


        </div>
      </div>
    </div>
  );
}
