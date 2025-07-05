import React from 'react';
import { Dropdown } from 'react-bootstrap';
import {
  FaEllipsisV, FaClock, FaMapMarkerAlt, FaBatteryThreeQuarters,
  FaPencilAlt, FaTrashAlt
} from 'react-icons/fa';
import { BsFillGeoFill } from 'react-icons/bs';
import { MdSpeed, MdNotificationsActive } from 'react-icons/md';
import { BiHistory } from 'react-icons/bi';
import { IoMdLocate } from 'react-icons/io';
import { formatLastLogin } from '../../utility/formatLastLogin';

export default function TagCard({tag}) {
  return (
    <div className="card shadow-sm p-3 position-relative">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-2">
        <h6 className="fw-bold mb-0">🛰️{tag?.name} + {tag.tagId}</h6>

        <Dropdown align="end">
          <Dropdown.Toggle
            as="button"
            className="btn btn-sm btn-light border-0"
            style={{ boxShadow: 'none' }}
          >
            <FaEllipsisV />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item><FaPencilAlt className="me-2" />Edit</Dropdown.Item>
            <Dropdown.Item><FaTrashAlt className="me-2" />Delete</Dropdown.Item>
            <Dropdown.Item><MdNotificationsActive className="me-2" />Ring</Dropdown.Item>
            <Dropdown.Item><BsFillGeoFill className="me-2" />Track</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {/* Info */}
      {/* Info Section */}
      <div className="row row-cols-1 row-cols-md-2 small">
        {/* Left Info */}
        <div className="col mb-2">
          <div className="mb-1">
            <FaBatteryThreeQuarters className="me-2 text-success" />
            Battery: <strong>{tag.battery}%</strong>
          </div>
          <div className="mb-1">
            <span className="text-success">✅</span>
            Status: <strong>{tag.status}</strong>
          </div>
          <div>
            <FaMapMarkerAlt className="me-2 text-danger" />
            Location: <strong>Indore</strong>
          </div>
        </div>

        {/* Right Info */}
        <div className="col mb-2 border-start d-none d-md-block ps-md-3">
          <div className="mb-1">
            <MdSpeed className="me-2 text-danger" />
            Speed: <strong>2.3Km/hr</strong>
          </div>
          <div className="mb-1">
            <BsFillGeoFill className="me-2 text-secondary" />
            Geofence: <strong>Inside Zone-3</strong>
          </div>
          <div>
            <FaClock className="me-2 text-muted" />
            Updated: <strong>{formatLastLogin(tag.lastSeen)}</strong>
          </div>
        </div>

        {/* Same Right Info for Mobile (without border) */}
        <div className="col d-md-none">
          <div className="mb-1">
            <MdSpeed className="me-2 text-danger" />
            Speed: <strong>2.3 km/h</strong>
          </div>
          <div className="mb-1">
            <BsFillGeoFill className="me-2 text-secondary" />
            Geofence: <strong>Inside Zone-3</strong>
          </div>
          <div>
            <FaClock className="me-2 text-muted" />
            Updated: <strong>{formatLastLogin(tag.lastSeen)}</strong>
          </div>
        </div> 
      </div>


      {/* Bottom Actions with Icons */}
      <div className="border-top pt-2 mt-3 d-flex justify-content-around flex-wrap gap-2 small fw-semibold text-center">
        <button className="btn btn-link p-0 text-decoration-none d-flex align-items-center gap-1">
          <IoMdLocate size={16} /> Track
        </button>
        <button className="btn btn-link p-0 text-decoration-none d-flex align-items-center gap-1">
          <MdNotificationsActive size={16} /> Ring
        </button>
        <button className="btn btn-link p-0 text-decoration-none d-flex align-items-center gap-1">
          <BiHistory size={16} /> History
        </button>
        <button className="btn btn-link p-0 text-decoration-none d-flex align-items-center gap-1">
          <FaPencilAlt size={14} /> Edit
        </button>
        <button className="btn btn-link p-0 text-danger text-decoration-none d-flex align-items-center gap-1">
          <FaTrashAlt size={14} /> Delete
        </button>
      </div>
    </div>
  );
}
