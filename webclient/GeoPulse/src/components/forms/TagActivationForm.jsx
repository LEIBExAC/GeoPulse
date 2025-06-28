import React, { useState } from 'react';

const TagActivationForm = ({ onSubmit }) => {
    const [tagId, setTagId] = useState('');
    const [activationCode, setActivationCode] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!tagId.trim() || !activationCode.trim()) return;
        onSubmit({ tagId, activationCode });
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <div>
                <label htmlFor="tagId" className="form-label">
                    Tag ID
                </label>
                <input
                    type="text"
                    className="form-control mb-3"
                    id="tagId"
                    value={tagId}
                    onChange={(e) => setTagId(e.target.value)}
                    placeholder="Enter your Tag ID"
                    required
                />
            </div>

            <div className="mb-3">
                <label htmlFor="activationCode" className="form-label">
                    Activation Code
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="activationCode"
                    value={activationCode}
                    onChange={(e) => setActivationCode(e.target.value)}
                    placeholder="Enter your activation Code"
                    required
                />
            </div>
            <button type="submit" className="btn btn-success">Activate Tag</button>
        </form>
    );
};

export default TagActivationForm;
