import React from 'react';
import Header from '../../components/layout/Header';

// You can use Bootstrap Icons CDN or install react-icons for icons. Here, I'll use react-icons.
import { FaCheckCircle, FaMapMarkedAlt, FaUsers, FaLock, FaSyncAlt, FaMobileAlt, FaDatabase, FaBell } from 'react-icons/fa';

export default function Feature() {
  const features = [
    {
      icon: <FaCheckCircle size={40} className="text-primary mb-3" />,
      title: 'Seamless Tag Registration & Activation',
      description:
        'Admins register new GPS tags and generate secure activation tokens for hassle-free activation and linking to user accounts. Prevent unauthorized access and simplify onboarding.',
    },
    {
      icon: <FaSyncAlt size={40} className="text-primary mb-3" />,
      title: 'Real-Time Location Tracking with WebSocket Streaming',
      description:
        'Get live, low-latency location updates via WebSocket streams, enabling instant monitoring, faster reactions, and reduced network overhead.',
    },
    {
      icon: <FaMapMarkedAlt size={40} className="text-primary mb-3" />,
      title: 'Customizable Geofencing & Instant Alerts',
      description:
        'Define virtual boundaries and get notified when tags enter or leave these zones — ideal for security, asset protection, and logistics.',
    },
    {
      icon: <FaLock size={40} className="text-primary mb-3" />,
      title: 'Role-Based Access Control for Enhanced Security',
      description:
        'Manage Admin, Regular, and Shared user roles to restrict access appropriately and ensure secure data handling across teams.',
    },
    {
      icon: <FaUsers size={40} className="text-primary mb-3" />,
      title: 'Shared User Management & Collaborative Tracking',
      description:
        'Share tag access safely with customized permissions for families, teams, or business clients while maintaining control.',
    },
    {
      icon: <FaLock size={40} className="text-primary mb-3" />,
      title: 'Robust Authentication & Account Security',
      description:
        'Secure accounts with JWT authentication, email verification, and OTP-based password resets for maximum data protection.',
    },
    {
      icon: <FaDatabase size={40} className="text-primary mb-3" />,
      title: 'Scalable & Flexible Database Design',
      description:
        'Efficient MongoDB schemas support growing fleets and users, enabling fast queries and smooth user experience even with large data.',
    },
    {
      icon: <FaMobileAlt size={40} className="text-primary mb-3" />,
      title: 'Responsive Web & Mobile-Friendly Interface',
      description:
        'Track assets and manage tags on any device with a clean, intuitive UI built using React and Bootstrap.',
    },
  ];

  return (
    <>
      <Header />
      <div className="container my-5">
        <h1 className="mb-4 text-center fw-bold">Discover the Powerful Features of GeoPulse</h1>
        <p className="text-center text-muted fs-5 mb-5">
          GeoPulse offers advanced and user-friendly tools to keep your assets safe, optimized, and connected in real time.
        </p>

        <div className="row g-4">
          {features.map(({ icon, title, description }, idx) => (
            <div key={idx} className="col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm border-0 rounded-4 p-4 hover-shadow transition">
                <div className="d-flex flex-column align-items-center text-center">
                  {icon}
                  <h5 className="mt-3 mb-3 fw-semibold">{title}</h5>
                  <p className="text-muted">{description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-5">
          <a href="/contact" className="btn btn-primary btn-lg px-5 shadow-sm">
            Contact Us to Learn More & Get Started
          </a>
        </div>
      </div>

      <style>{`
        .hover-shadow:hover {
          box-shadow: 0 10px 25px rgba(0,0,0,0.12);
          transform: translateY(-5px);
          transition: all 0.3s ease;
        }
        .transition {
          transition: all 0.3s ease;
        }
      `}</style>
    </>
  );
}
