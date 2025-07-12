import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Lottie from 'lottie-react';
import Error404 from "../../assets/animation/Error404.json"

export default function PageNotFound() {
  return (
    <>
      <Header />

      <div className="d-flex flex-column justify-content-center align-items-center text-center" style={{ minHeight: '80vh' }}>
        {/* Lottie Animation */}
        <div style={{ maxWidth: '500px', width: '100%' }}>
          <Lottie
            animationData={Error404}
            loop
            autoplay
            style={{ width: '100%', height: 'auto' }}
          />
        </div>

        {/* Text Message */}
        <div className="fs-1 mt-4 text-danger fw-bold">
          Page Not Found - Error 404
        </div>
        <p className="lead text-muted">Oops! The page you’re looking for doesn't exist or has been moved.</p>
      </div>

      <Footer />
    </>
  );
}
