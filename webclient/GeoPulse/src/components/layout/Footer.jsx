import React from "react";
import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import {
  BsLinkedin,
  BsGithub,
  BsInstagram,
  BsTwitter,
  BsGeoAltFill,
  BsEnvelopeFill,
  BsSendFill,
} from "react-icons/bs";

export default function Footer() {
  return (
    <footer className="bg-dark text-white pt-5 pb-4">
      <Container>
        <Row className="gy-4">
          {/* Left Column - Brand Info */}
          <Col md={4} className="text-center text-md-start">
            <h5 className="d-flex justify-content-center justify-content-md-start align-items-center mb-3 fw-semibold">
              <BsGeoAltFill className="me-2 text-primary fs-5" /> GeoPulse
            </h5>
            <p className="small text-white-50">
              Innovative IoT solutions for real-time tracking and monitoring, designed to keep you connected to what matters most.
            </p>
            <p className="small mb-0">
              <BsEnvelopeFill className="me-2" /> contact@geopulse.io
            </p>
          </Col>

          {/* Middle Column - Quick Links */}
          <Col md={4} className="text-center text-md-start">
            <h6 className="fw-semibold mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              {["Home", "Features", "Services", "About Us", "Privacy Policy", "Contact"].map((link, i) => (
                <li key={i}>
                  <a href="#" className="text-white-50 text-decoration-none small d-block">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </Col>

          {/* Right Column - Social + Newsletter */}
          <Col md={4} className="text-center text-md-start">
            <h6 className="fw-semibold mb-3">Connect With Us</h6>
            <div className="d-flex justify-content-center justify-content-md-start gap-3 mb-3">
              <a href="#" className="text-white-50 fs-5"><BsLinkedin /></a>
              <a href="#" className="text-white-50 fs-5"><BsGithub /></a>
              <a href="#" className="text-white-50 fs-5"><BsInstagram /></a>
              <a href="#" className="text-white-50 fs-5"><BsTwitter /></a>
            </div>

            <div className="bg-secondary bg-opacity-10 rounded-3 p-3">
              <p className="mb-2 small fw-semibold text-white">Subscribe to our newsletter</p>
              <InputGroup size="sm">
                <Form.Control
                  type="email"
                  placeholder="Your email"
                  className="bg-dark text-white border-0"
                />
                <Button variant="primary">
                  <BsSendFill />
                </Button>
              </InputGroup>
            </div>
          </Col>
        </Row>

        <hr className="border-secondary mt-5" />
        <p className="text-center small text-white-50 mb-0">
          &copy; {new Date().getFullYear()} GeoPulse. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
