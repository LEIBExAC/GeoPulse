import React, { useEffect, useState } from 'react';
import SidebarUser from './SidebarUser';
import "../../assets/styles/user/dashboardRightContentCommon.css";
import "../../assets/styles/user/HomeDashboard.css";
import { useAuthStore } from '../../assets/store/authStore';
import { FaBell } from "react-icons/fa";
import { getAllTags } from '../../assets/api/tagApi';



import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { backend_url } from '../../assets/store/keyStore'; // Adjust path if needed


export default function UserDashboard() {
    const { user, isAdmin } = useAuthStore();
    const [loading, setLoading] = useState(false);
    const [tags, setTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState('');
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const navigate = useNavigate();



    //fetches all user tags.
    useEffect(() => {
        const fetchMyTags = async () => {
            try {
                const tags = await getAllTags(user._id, isAdmin);
                setTags(tags); // example state update
            } catch (error) {
                console.error("Error fetching tags:", error.message);
            }
            finally {
                setLoading(false);
            }
        };

        fetchMyTags();
    }, []);


    const handleSearch = () => {
        if (!selectedTag) {
            alert("Please select a tag");
            return;
        }

        const params = new URLSearchParams({ tagId: selectedTag });
        if (from) params.append("from", from);
        if (to) params.append("to", to);

        navigate(`/tag/history?${params.toString()}`);
    };


    if (loading) {
        return (
            <div className="p-5 text-muted text-center">
                📍 loading... Getting your location
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

                    <Container className="text-center mt-5">
                        <Row className="justify-content-center mb-4">
                            <Col xs={12} md="auto" className="mb-2">
                                {loading ? (
                                    <Spinner animation="border" size="sm" />
                                ) : (
                                    <Form.Select
                                        value={selectedTag}
                                        onChange={(e) => setSelectedTag(e.target.value)}
                                    >
                                        <option value="">Select Tag</option>
                                        {tags.map(tag => (
                                            <option key={tag._id} value={tag.tagId}>
                                                {tag.name || tag.tagId}
                                            </option>
                                        ))}
                                    </Form.Select>
                                )}
                            </Col>

                            <Col xs={12} md="auto" className="mb-2">
                                <Form.Control
                                    type="datetime-local"
                                    value={from}
                                    onChange={(e) => setFrom(e.target.value)}
                                    placeholder="From"
                                />
                            </Col>

                            <Col xs={12} md="auto" className="mb-2">
                                <Form.Control
                                    type="datetime-local"
                                    value={to}
                                    onChange={(e) => setTo(e.target.value)}
                                    placeholder="To"
                                />
                            </Col>

                            <Col xs={12} md="auto">
                                <Button variant="primary" onClick={handleSearch}>
                                    Search on Map
                                </Button>
                            </Col>
                        </Row>

                        <img
                            src="/images/gpsMap.png" // replace with actual image path
                            alt="Map Graphic"
                            style={{ width: '500px', maxWidth: '100%' }}
                            className='mt-4'
                        />
                        <p className="mt-5 fs-4 fw-semibold">View Your Tag's Historical Movements with Real-Time Accuracy</p>
                    </Container>
                </div>
            </div>
        </div>
    );
}




