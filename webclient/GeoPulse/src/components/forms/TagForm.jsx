import React, { useState } from 'react';

const TagForm = ({ onSubmit }) => {
  const [tagId, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tagId.trim()) return;
    onSubmit({ tagId });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="tagName" className="form-label">Tag Name</label>
        <input
          type="text"
          className="form-control"
          id="tagName"
          value={tagId}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Enter a tag name"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Create Tag
      </button>
    </form>
  );
};

export default TagForm;
