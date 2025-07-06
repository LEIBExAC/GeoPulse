import React from 'react';
import { Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaEllipsisV, FaClock, FaMapMarkerAlt, FaBatteryThreeQuarters, FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { BsFillGeoFill } from 'react-icons/bs';
import { MdSpeed, MdNotificationsActive } from 'react-icons/md';
import { BiHistory } from 'react-icons/bi';
import { IoMdLocate } from 'react-icons/io';
import { formatLastLogin } from '../../utility/formatLastLogin';

export default function TagCard({ tag }) {
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

      <div className="tag-info-grid mb-2" style={gridStyle}>
        <div style={labelStyle}><FaBatteryThreeQuarters className="me-2 text-success" />Battery</div>
        <div style={valueStyle}>{tag.battery}%</div>

        <div style={labelStyle}><span className="text-success me-2">✅</span>Status</div>
        <div style={valueStyle}>{tag.status}</div>

        <OverlayTrigger
          placement="right"
          overlay={
            <Tooltip id={`tooltip-location-${tag.tagId}`}>
              <div className="bg-light text-dark p-1  border rounded shadow-sm">
                {tag.location?.address?.display_name || "Full address not available"}
              </div>
            </Tooltip>
          }
        >
          <div style={labelStyle}>
            <FaMapMarkerAlt className="me-2 text-danger" />Location
          </div>
        </OverlayTrigger>

        <div style={valueStyle}>
          {tag.location?.address?.colony || "Unknown Colony"},{" "}
          {tag.location?.address?.city || "Unknown City"}
        </div>


        <div style={labelStyle}><MdSpeed className="me-2 text-danger" />Speed</div>
        <div style={valueStyle}>2.3 Km/hr</div>

        <div style={labelStyle}><BsFillGeoFill className="me-2 text-secondary" />Geofence</div>
        <div style={valueStyle}>Inside Zone-3</div>

        <div style={labelStyle}><FaClock className="me-2 text-muted" />Updated</div>
        <div style={valueStyle}>{formatLastLogin(tag.lastSeen)}</div>
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
const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'max-content 1fr',
  columnGap: '1rem',
  rowGap: '0.5rem',
  fontSize: '0.875rem',
};

const labelStyle = {
  fontWeight: 600,
  whiteSpace: 'nowrap',
  display: 'flex',
  alignItems: 'center',
};

const valueStyle = {
  wordBreak: 'break-word',
};
