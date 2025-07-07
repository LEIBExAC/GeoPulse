import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import "../../assets/styles/user/sidebarUser.css";
import LogoutModal from '../../components/modal/LogoutModal';
import { useAuthStore } from '../../assets/store/authStore';



export default function SidebarUser() {
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [visible, setVisible] = useState(true);
    const {user} = useAuthStore();
    const toggleSidebar = () => { 
        setVisible(!visible);
    };

    return (
        <>

            <div className="sidebar-user__toggle-btn" onClick={toggleSidebar}>
                <FaBars />
            </div>

            {visible && (
                <div className="sidebar-user d-flex flex-column " style={{zIndex:"1090"}}>
                    <div className="sidebar-user__section text-center mt-4">
                        
                        <Link to="/profile" className="sidebar-user__profile-link">
                        
                            <img
                                src={user.profile}
                                alt="Profile"
                                className="sidebar-user__profile-pic mb-2"
                            />
                        </Link>
                        <div className="sidebar-user__name">{user.name}</div>
                        <hr className="sidebar-user__divider" />
                    </div>


                    <Nav defaultActiveKey="/home" className="flex-column sidebar-user__nav">
                        <Nav.Link as={Link} to="/user-dashboard" className="sidebar-user__link">Home</Nav.Link>
                        <Nav.Link as={Link} to="/tag/live-location" className="sidebar-user__link">Live Location</Nav.Link>
                        <Nav.Link as={Link} to="/my-tags" className="sidebar-user__link">My Tags</Nav.Link>
                        <Nav.Link as={Link} to="/add-new-tag" className="sidebar-user__link">Add Tag</Nav.Link>
                        <Nav.Link as={Link} to="/geofence" className="sidebar-user__link">Geofence</Nav.Link>
                        <Nav.Link as={Link} to="/profile" className="sidebar-user__link">Profile</Nav.Link>
                        <Nav.Link as={Link} to="/tag/history-search" className="sidebar-user__link">History</Nav.Link>
                        <Nav.Link className="sidebar-user__link" onClick={() => setShowLogoutModal(true)}>Logout</Nav.Link>
                    </Nav>
                </div>
            )}
            <LogoutModal
                show={showLogoutModal}
                handleClose={() => setShowLogoutModal(false)}
            />

        </>

    );
}
