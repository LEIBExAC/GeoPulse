import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaUser, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import { useAuthStore } from '../../assets/store/authStore';

import "../../assets/styles/header.css"

function Header() {

    const { isAuthenticated, user, isAdmin } = useAuthStore();
    return (
        <Navbar expand="lg" style={{ backgroundColor: '#F9FAFB' }} className="shadow-sm py-2 ">
            <Container fluid>
                <Navbar.Brand className="mx-md-5 fs-3" href="#" style={{ color: '#3B82F6', fontWeight: '700' }}>
                    GeoPulse
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" navbarScroll>
                        <Nav.Link as={Link} to="/" className="text-dark fw-medium mx-lg-1 ">Home</Nav.Link>
                        <Nav.Link as={Link} to="/features" className="text-dark fw-medium mx-lg-1">Features</Nav.Link>
                        <Nav.Link as={Link} to="/services" className="text-dark fw-medium mx-lg-1">Services</Nav.Link>
                        <Nav.Link as={Link} to="/about-us" className="text-dark fw-medium mx-lg-1">About Us</Nav.Link>
                        <Nav.Link as={Link} to="/contact" className="text-dark fw-medium mx-lg-1">Contact</Nav.Link>
                    </Nav>

                    <div className="d-flex align-items-center gap-3 me-md-5">



                        {isAuthenticated && user?.isVerified ? (
                            <>
                                <Nav.Item>
                                    <Nav.Link as={Link} to="/" className="text-dark fw-medium mx-lg-1">Logout</Nav.Link>

                                </Nav.Item>
                                <Nav.Item>
                                    <Link to={isAdmin ? "admin-dashboard" : "user-dashboard"} className="nav-link">
                                        {/* <img src={user.profile} className="nav-profile-link-img" alt="" /> */}
                                        Dashboard
                                    </Link>
                                </Nav.Item>
                            </>

                        ) : (
                            <>
                                <Link to="/signup">
                                    <Button variant="outline-dark" className='fw-medium'>SignUp</Button>
                                </Link>

                                <NavDropdown
                                    title="Login"
                                    align="end"
                                    id="navbarScrollingDropdown"
                                    menuVariant="light"
                                    className="text-dark mx-md-3 fw-medium"
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
                            </>
                        )}

                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
