// src/components/Popup.jsx
import React from 'react';
import { formatLastLogin } from './formatLastLogin';
export default function TagPopup({ tag }) {
  if (!tag) return null;

  return (
    <div className="bg- bg-opacity-75 p-2 rounded shadow-sm" style={{ minWidth: '200px' }}>
      <div className="mb-1">
        <strong>Tag ID:</strong> <span className="text-dark">{tag.tagId}</span>
      </div>
      <div className="mb-1">
        <strong>Name:</strong> <span className="text-dark">{tag.name}</span>
      </div>
      <div className="mb-1">
        <strong>Battery:</strong> <span className="text-dark">{tag.battery}</span>
      </div>
      <div className="mb-1">
        <strong>Speed:</strong> <span className="text-dark">100Km/hr</span>
      </div>
      <div className="mb-0 text-muted" style={{ fontSize: '0.85rem' }}>
        Last updated {formatLastLogin(tag.lastSeen) || 'a moment ago'}
      </div>
    </div>
  );
}
