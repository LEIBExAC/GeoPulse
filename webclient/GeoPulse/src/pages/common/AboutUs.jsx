import React from 'react';
import Header from '../../components/layout/Header';
import { FaBullseye, FaGift, FaEnvelope } from 'react-icons/fa';

export default function AboutUs() {
  return (
    <>
      <Header />
      <div className="container my-5">
        <h1 className="mb-4 text-center fw-bold text-primary">About GeoPulse</h1>
        <p className="lead text-center text-secondary mb-5 fs-5">
          GeoPulse is your reliable location tracking solution, designed to keep you connected with what matters most.
        </p>

        <div className="row g-4">
          <div className="col-md-6">
            <div className="card shadow-sm border-0 rounded-4 p-4 h-100">
              <div className="d-flex align-items-center mb-3">
                <FaBullseye size={40} className="text-primary me-3" />
                <h3 className="mb-0">Our Mission</h3>
              </div>
              <p className="text-muted fs-5">
                At GeoPulse, our mission is to provide accurate, real-time location tracking that empowers individuals and businesses to monitor assets, ensure safety, and optimize operations seamlessly.
              </p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card shadow-sm border-0 rounded-4 p-4 h-100">
              <div className="d-flex align-items-center mb-3">
                <FaGift size={40} className="text-primary me-3" />
                <h3 className="mb-0">What We Offer</h3>
              </div>
              <ul className="list-group list-group-flush fs-5 text-muted">
                <li className="list-group-item border-0 ps-0">
                  Easy-to-use GPS tag registration and management.
                </li>
                <li className="list-group-item border-0 ps-0">
                  Real-time location updates via secure API and WebSocket streaming.
                </li>
                <li className="list-group-item border-0 ps-0">
                  Geofencing alerts to keep you informed instantly.
                </li>
                <li className="list-group-item border-0 ps-0">
                  Role-based access control for secure multi-user environments.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-5 text-center">
          <div className="card shadow-sm border-0 rounded-4 p-4 mx-auto" style={{ maxWidth: '600px' }}>
            <div className="d-flex justify-content-center align-items-center mb-3">
              <FaEnvelope size={40} className="text-primary me-3" />
              <h3 className="mb-0">Contact Us</h3>
            </div>
            <p className="fs-5 text-muted">
              Have questions or want to learn more? Feel free to{' '}
              <a href="/contact" className="text-primary fw-semibold text-decoration-none">
                contact us
              </a>.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
