import React from 'react'
import Header from '../../components/layout/Header'

export default function Landing() {
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
                  <a href="#" className="btn btn-primary btn-lg">Get Started</a>
                  <a href="#" className="btn btn-outline-primary btn-lg">Try Now</a>
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
      </div>
    </>
  )
}
