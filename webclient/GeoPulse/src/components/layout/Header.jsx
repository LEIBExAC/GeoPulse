import React, { useState } from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../assets/store/authStore";
import LogoutModal from "../modal/LogoutModal";
import "../../assets/styles/header.css";

function Header() {
    const { isAuthenticated, user, isAdmin } = useAuthStore();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    return (
        <>
            <Navbar expand="lg" bg="light" className="shadow-sm py-2">
                <Container fluid className="px-md-5">
                    <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2 text-dark text-decoration-none">
                        <img
                            src="/icon/markerBlue.png"  // <-- update path if needed
                            alt="GeoPulse Logo"
                            width="30"
                            height="30"
                        />
                        <span className="fw-bold fs-4 text-primary">GeoPulse</span>
                    </Navbar.Brand>


                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll" className="justify-content-between">
                        <Nav className="me-auto my-2 my-lg-0" navbarScroll>
                            <Nav.Link as={Link} to="/" className="fw-medium mx-lg-2">
                                Home
                            </Nav.Link>
                            <Nav.Link as={Link} to="/features" className="fw-medium mx-lg-2">
                                Features
                            </Nav.Link>
                            <Nav.Link as={Link} to="/services" className="fw-medium mx-lg-2">
                                Services
                            </Nav.Link>
                            <Nav.Link as={Link} to="/about-us" className="fw-medium mx-lg-2">
                                About Us
                            </Nav.Link>
                            <Nav.Link as={Link} to="/contact" className="fw-medium mx-lg-2">
                                Contact
                            </Nav.Link>
                        </Nav>

                        <div className="d-flex align-items-center gap-3">
                            {isAuthenticated && user?.isVerified ? (
                                <>
                                    <Button
                                        variant="outline-primary"
                                        className="rounded-pill fw-medium px-4"
                                        onClick={() => setShowLogoutModal(true)}
                                    >
                                        Logout
                                    </Button>

                                    <Link
                                        to={isAdmin ? "/admin-dashboard" : "/user-dashboard"}
                                        className="text-decoration-none"
                                    >
                                        <img
                                            src={user.profile || "/default-profile.jpg"}
                                            alt="Profile"
                                            className="profile-image"
                                        />
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <NavDropdown
                                        title={
                                            <span className="fw-medium px-3 py-1 border border-primary rounded-pill text-primary">
                                                Login
                                            </span>
                                        }
                                        align="end"
                                        id="login-dropdown"
                                        menuVariant="light"
                                    >
                                        <NavDropdown.Item as={Link} to="/signin">
                                            <FaUser className="me-2 text-primary" />
                                            User Login
                                        </NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/admin-signin">
                                            <FaLock className="me-2 text-danger" />
                                            Admin Login
                                        </NavDropdown.Item>
                                    </NavDropdown>

                                    <Link to="/signup">
                                        <Button variant="primary" className="rounded-pill fw-medium px-4">
                                            Sign Up
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <LogoutModal
                show={showLogoutModal}
                handleClose={() => setShowLogoutModal(false)}
            />
        </>
    );
}

export default Header;
