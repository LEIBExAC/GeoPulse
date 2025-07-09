import React from 'react'
import Header from '../../components/layout/Header'
import {
  BsGeoAltFill,
  BsBellFill,
  BsMapFill,
  BsBatteryHalf,
  BsPeopleFill,
  BsArrowRepeat,
  BsTagFill, BsBluetooth,BsLinkedin, BsGithub, BsGlobe
} from "react-icons/bs";
import Footer from '../../components/layout/Footer';



export default function Landing() {

  const features = [
    {
      icon: <BsGeoAltFill className="text-primary fs-5" />,
      title: "Real-Time Location Tracking",
      text: "Monitor your assets, vehicles, or loved ones with precise GPS tracking that updates in real-time."
    },
    {
      icon: <BsBellFill className="text-primary fs-5" />,
      title: "Ring Your Tag Remotely",
      text: "Locate misplaced items quickly by triggering an audible alert from your connected GeoPulse tags."
    },
    {
      icon: <BsMapFill className="text-primary fs-5" />,
      title: "Geofence Alerts",
      text: "Set virtual boundaries and receive instant notifications when your tracked objects enter or exit designated areas."
    },
    {
      icon: <BsBatteryHalf className="text-primary fs-5" />,
      title: "Battery & Speed Monitoring",
      text: "Keep track of device battery levels and movement speeds to ensure optimal performance of your trackers."
    },
    {
      icon: <BsPeopleFill className="text-primary fs-5" />,
      title: "User-Based Access Control",
      text: "Manage who can view and control your devices with customizable permission settings for family and team members."
    },
    {
      icon: <BsArrowRepeat className="text-primary fs-5" />,
      title: "Historical Data Analysis",
      text: "Access and analyze past location data to identify patterns, optimize routes, and improve efficiency."
    }
  ];

  const useCases = [
    {
      title: "Logistics Tracking",
      text: "Track assets across your supply chain in real-time and improve delivery precision. Monitor shipments from warehouse to customer doorstep with detailed analytics and ETA predictions.",
      img: "https://plus.unsplash.com/premium_photo-1664910349870-def6b8402912?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHRydWNrc3xlbnwwfHwwfHx8MA%3D%3D",
      reverse: false,
    },
    {
      title: "Vehicle Tracking",
      text: "Monitor your vehicles for location, speed, and safety from anywhere. Get insights on driving patterns, fuel efficiency, and receive alerts for unauthorized usage or maintenance needs.",
      img: "https://media.istockphoto.com/id/2191314207/photo/driver-using-navigation-app-on-smartphone-while-driving-car.jpg?s=612x612&w=0&k=20&c=JZbMSSeXh23zR5j4m_pe9I1im9Y4bZoGVukez06UI24=",
      reverse: true,
    },
    {
      title: "Share Location with Family & Friends",
      text: "Send your live location with a tap and stay connected with loved ones. Perfect for coordinating meetups or sharing your journey.",
      img: "https://images.unsplash.com/photo-1548345680-f5475ea5df84?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z29vZ2xlJTIwbWFwfGVufDB8fDB8fHww",
      reverse: false,
    },
    {
      title: "Child Tracking",
      text: "Keep your kids safe with smart GeoPulse tags in their school bags or pockets. Receive notifications when they arrive or return home.",
      img: "https://images.pexels.com/photos/4260325/pexels-photo-4260325.jpeg?auto=compress&cs=tinysrgb&w=800",
      reverse: true,
    },
    {
      title: "Retrace Your Steps",
      text: "Access your historical location logs to trace your path and activities. Useful for finding lost items, travel routes, or time management.",
      img: "https://media.istockphoto.com/id/488269650/photo/smartphone-with-gps.webp?a=1&s=612x612&w=0&k=20&c=TO6rhKmGFmSCdxZfsxldroMcFlnczn1PE62kh-sNs_E=",
      reverse: false,
    },
  ];
const team = [
    {
      name: "Mohit Soni",
      role: "Founder",
      img: "https://media.licdn.com/dms/image/v2/D4D03AQGHSM7hamqwuw/profile-displayphoto-shrink_200_200/B4DZVcDlWdHwAY-/0/1741006198742?e=1757548800&v=beta&t=44HOK1brQ8ATHKo70SC5k598SiJL9Dgym-YBWLaC29o", // Replace with actual image path
      desc: "I'm a passionate tech innovator building end-to-end IoT solutions for real-world problems. As the founder of GeoPulse, I aim to create smart, scalable systems that connect people and devices seamlessly.",
      socials: {
        linkedin: "#",
        github: "#",
        website: "#",
      },
    },
    {
      name: "Aditya Chaturvedi",
      role: "Founder",
      img: "/images/yash.jpg", // Replace with actual image path
      desc: "Driven by innovation and collaboration, I focus on bringing ideas to life with clean tech, efficient systems, and intuitive design. At GeoPulse, I ensure every tag and line of code solves real problems.",
      socials: {
        linkedin: "#",
        github: "#",
        website: "#",
      },
    },
  ];



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
        
        <section className="py-5" style={{ backgroundColor: "#E6F0FA" }}>
      <div className="container">
        <h2 className="text-center fw-bold mb-5">Meet the Minds Behind GeoPulse</h2>
        <div className="row g-4 justify-content-center">
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
