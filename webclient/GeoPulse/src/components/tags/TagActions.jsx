import React from 'react';
import { useNavigate } from 'react-router-dom';

const TagActions = ({ tag, userRole }) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        // Placeholder: replace with modal or redirect to edit page
        alert('Edit Tag feature coming soon!');
    };

    const handleDelete = () => {
        const confirmDelete = window.confirm(`Delete tag ${ tag.tagId } ? This action cannot be undone.`);
        if (confirmDelete) {
            // Placeholder: call delete API
            alert('Delete API not implemented yet');
        }
    };

    const handleShare = () => {
        navigate(`/tag/${ tag._id }/share`);
    };

    if (!tag || (userRole !== 'admin' && userRole !== 'owner')) return null;

    return (
        <div className="mt-4 d-flex gap-2 flex-wrap">
            <button className="btn btn-outline-primary" onClick={handleEdit}>
                ✏️ Edit
            </button>
            <button className="btn btn-outline-danger" onClick={handleDelete}>
                🗑️ Delete
            </button>
            <button className="btn btn-outline-secondary" onClick={handleShare}>
                🤝 Share
            </button>
        </div>
    );
};

export default TagActions;