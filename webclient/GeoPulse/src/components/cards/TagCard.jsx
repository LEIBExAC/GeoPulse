import React from 'react';

const TagCard = ({ tag }) => {
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{tag.tagId || 'Unnamed Tag'}</h5>
        <p className="card-text">
          <strong>Status:</strong> {tag.status || 'unknown'} <br />
          <strong>Activated:</strong>{' '}
          {tag.activationDate ? new Date(tag.activationDate).toLocaleString() : 'Inactive'} <br />
          <strong>Tag ID:</strong> {tag._id}
        </p>
        {/* Add link to tag details in the future */}
        <a href={`/tag/${tag._id}`} className="btn btn-outline-primary btn-sm">View Details</a>
      </div>
    </div>
  );
};

export default TagCard;
