import React from 'react'
import Header from '../../components/layout/Header'
import { BsGeoAltFill, BsBellFill, BsMapFill, BsBatteryHalf, BsPeopleFill, BsArrowRepeat, BsTagFill, BsBluetooth, BsLinkedin, BsGithub, BsGlobe } from "react-icons/bs";
import Footer from '../../components/layout/Footer';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import { useCases, team, features, geopulseFeatures } from '../../utility/landingPageData.jsx';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../assets/store/authStore.js';
import { FaMapMarkerAlt, FaDrawPolygon, FaHistory, FaUser } from 'react-icons/fa';



export default function Landing() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore;
  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/user-dashboard')
    }
    else {
      navigate('/signin')
    }
  }
  const handleTryNow = () => {
    if (isAuthenticated) {
      navigate('/user-dashboard')
    }
    else {
      navigate('/signup')
    }
  }

  return (
    <>
      <div>
        <Header />
        {/* Bootstrap 5 Hero Section */}
        <section className="py-5 bg-light position-relative">
          <div className="container">
            <div className="row align-items-center flex-column-reverse flex-md-row">

              {/* Left Column: Text */}
              <div className="col-md-6 text-center text-md-start">
                <h1 className="display-5 fw-bold">
                  Track Anything, Anytime, Anywhere <br />
                  with <span className="text-primary">GeoPulse</span>
                </h1>
                <p className="lead text-muted mt-3">
                  Real-time tracking, geofencing, ringing alerts, and IoT control in one app.
                </p>
                <div className="mt-4 d-flex flex-column flex-sm-row justify-content-center justify-content-md-start gap-3">
                  <a  onClick={handleGetStarted} className="btn btn-primary btn-lg">Get Started</a>
                  <a onClick={handleTryNow} className="btn btn-outline-primary btn-lg">Try Now</a>
                </div>
              </div>

              {/* Right Column: Image */}
              <div className="col-md-6 text-center position-relative mb-5 mb-md-0">

                {/* Main image */}
                <img
                  src="/landingPage/herokuSection1.png"
                  alt="Hero"
                  className="img-fluid position-relative"
                  style={{
                    zIndex: 1,
                    maxHeight: "500px", // Limits height
                    width: "100%",       // Ensures responsiveness
                    objectFit: "contain" // Maintains aspect ratio
                  }}
                />

              </div>
            </div>
          </div>
        </section>

        {/* What GeoPulse Offers Section */}
        <section className="py-5 bg-white">
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="fw-bold">What GeoPulse Offers</h2>
              <div className="mx-auto mt-2" style={{ width: '60px', height: '4px', backgroundColor: '#3B82F6', borderRadius: '10px' }}></div>
            </div>

            <div className="row g-4">
              {features.map((item, index) => (
                <div key={index} className="col-md-6 col-lg-4">
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body">
                      <div className="d-flex align-items-center mb-3">
                        <div className="rounded-circle bg-light d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                          {item.icon}
                        </div>
                      </div>
                      <h5 className="card-title fw-semibold">{item.title}</h5>
                      <p className="card-text text-muted small">{item.text}</p>
                    </div>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </section>
        {/* Use Cases Section */}
        <section className="py-5" style={{ backgroundColor: "#F1F5F9" }}>
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="fw-bold">Where You Can Use GeoPulse</h2>
              <div className="mx-auto mt-2" style={{ width: '60px', height: '4px', backgroundColor: '#3B82F6', borderRadius: '10px' }}></div>
            </div>

            <div className="row gy-4">
              {useCases.map((card, index) => (
                <div className="col-12" key={index}>
                  <div className={`d-flex flex-column flex-md-row ${card.reverse ? 'flex-md-row-reverse' : ''} align-items-center bg-white rounded-4 shadow-sm overflow-hidden`}>

                    {/* Text */}
                    <div className="col-md-6 p-4">
                      <h5 className="fw-bold mb-2">{card.title}</h5>
                      <p className="text-muted mb-0 small">{card.text}</p>
                    </div>

                    {/* Image */}
                    <div className="col-md-6">
                      <div className="ratio ratio-16x9">
                        <img
                          src={card.img}
                          alt={card.title}
                          className="img-fluid object-fit-cover rounded-0"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover"
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-5 bg-white">
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="fw-bold">How It Works</h2>
              <div
                className="mx-auto mt-2"
                style={{
                  width: "60px",
                  height: "4px",
                  backgroundColor: "#3B82F6",
                  borderRadius: "10px",
                }}
              ></div>
            </div>

            <div className="row text-center g-4 justify-content-center">
              {[
                {
                  step: 1,
                  icon: <BsTagFill className="text-primary fs-3" />,
                  title: "Attach the Tag",
                  text: "Attach the GeoPulse tag to any object you want to track",
                },
                {
                  step: 2,
                  icon: <BsBluetooth className="text-primary fs-3" />,
                  title: "Connect to App",
                  text: "Connect to GeoPulse app via Bluetooth or WiFi",
                },
                {
                  step: 3,
                  icon: <BsMapFill className="text-primary fs-3" />,
                  title: "Track & Ring",
                  text: "Track & Ring from the dashboard whenever needed",
                },
                {
                  step: 4,
                  icon: <BsBellFill className="text-primary fs-3" />,
                  title: "Receive Alerts",
                  text: "Get notifications from geofencing or movement triggers",
                },
              ].map((item, index) => (
                <div key={index} className="col-6 col-md-3">
                  <div className="d-flex flex-column align-items-center">
                    <div className="position-relative mb-3">
                      <div
                        className="rounded-circle  d-flex align-items-center justify-content-center"
                        style={{ width: "70px", height: "70px", backgroundColor: "#E8F1FA" }}
                      >
                        {item.icon}
                      </div>
                      <span
                        className="badge bg-primary rounded-circle position-absolute top-0 start-100 translate-middle"
                        style={{
                          width: "24px",
                          height: "24px",
                          fontSize: "12px",
                        }}
                      >
                        {item.step}
                      </span>
                    </div>
                    <h6 className="fw-semibold mb-1">{item.title}</h6>
                    <p className="text-muted small">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* glimpse of app  */}
        <section style={{ backgroundColor: "#f8fafd", padding: "60px 0" }}>
          <Container>
            <div className="text-center mb-5">
              <h2 className="fw-bold">What GeoPulse Offers</h2>
              <div
                className="mx-auto mt-2"
                style={{
                  width: "60px",
                  height: "4px",
                  backgroundColor: "#3B82F6",
                  borderRadius: "10px",
                }}
              ></div>
            </div>

            {/* Features Section */}
            <Row className="g-4">
              {geopulseFeatures.map((feature, index) => (
                <Col md={6} lg={3} key={index}>
                  <Card className="h-100 shadow-sm border-0">
                    <Card.Body>
                      <div className="d-flex align-items-center mb-3">
                        {feature.icon}
                        <strong>{feature.title}</strong>
                      </div>
                      <div
                        className="mb-3"
                        style={{
                          height: "160px",
                          backgroundColor: "#f0f2f5",
                          borderRadius: "10px",
                        }}
                      >
                        <div className="d-flex justify-content-center align-items-center h-100 text-muted small">
                          Image Placeholder
                        </div>
                      </div>
                      <p className="text-muted small mb-0">{feature.desc}</p>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        {/* developers profile  */}
        <section className="py-5" style={{ backgroundColor: "#E6F0FA" }}>
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="fw-bold">Meet The Mind Behind GeoPulse</h2>
              <div className="mx-auto mt-2" style={{ width: '60px', height: '4px', backgroundColor: '#3B82F6', borderRadius: '10px' }}></div>
            </div>            <div className="row g-4 justify-content-center">
              {team.map((member, idx) => (
                <div className="col-md-10 col-lg-6" key={idx}>
                  <div className="d-flex flex-column flex-md-row bg-white shadow rounded-4 overflow-hidden">

                    {/* Left image side */}
                    <div className="bg-primary d-flex align-items-center justify-content-center p-4" style={{ width: "100%", maxWidth: "220px" }}>
                      <img
                        src={member.img}
                        alt={member.name}
                        className="rounded-circle border border-3 border-white"
                        style={{ width: "150px", height: "150px", objectFit: "cover" }}
                      />
                    </div>

                    {/* Right text side */}
                    <div className="p-4 text-center text-md-start flex-grow-1">
                      <h5 className="fw-bold mb-1">{member.name}</h5>
                      <p className="text-primary fw-semibold mb-2">{member.role}</p>
                      <p className="text-muted small">{member.desc}</p>

                      <div className="d-flex gap-3 justify-content-center justify-content-md-start mb-3">
                        <a href={member.socials.linkedin} className="text-dark fs-5"><BsLinkedin /></a>
                        <a href={member.socials.github} className="text-dark fs-5"><BsGithub /></a>
                        <a href={member.socials.website} className="text-dark fs-5"><BsGlobe /></a>
                      </div>

                      <button className="btn btn-primary btn-sm">Contact Me</button>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer  */}
        <Footer></Footer>

      </div>
    </>
  )
}
