import React, { useState } from 'react';
// This file logic and form is merged with ActivateTag.jsx 

const TagActivationForm = ({ onSubmit }) => {
    const [activationCode, setActivationCode] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!activationCode.trim()) return;
        onSubmit({  activationCode });
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            
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
