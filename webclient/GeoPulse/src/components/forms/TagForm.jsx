import React, { useState } from 'react';

const TagForm = ({ onSubmit }) => {
  const [tagId, setId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tagId.trim()) return;
    onSubmit({ tagId });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="tagId" className="form-label">Tag Id</label>
        <input
          type="text"
          className="form-control"
          id="tagId"
          value={tagId}
          onChange={(e) => setId(e.target.value)}
          required
          placeholder="Enter the Tag Id"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Create Tag
      </button>
    </form>
  );
};

export default TagForm;
