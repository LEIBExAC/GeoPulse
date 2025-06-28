import React from 'react';

const TagInfoCard = ({ tag, userRole }) => {
    if (!tag) return null;

    const {
        tagId,
        name,
        status,
        activationDate,
        owner,
        activationStatus,
        sharedWith = [],
    } = tag;

    const isAdmin = userRole === 'admin';
    const isOwner = userRole === 'owner';

    return (
        <div className="card shadow-sm mt-4">
            <div className="card-body">
                <h5 className="card-title">{name || 'Unnamed Tag'}</h5>

                <ul className="list-group list-group-flush mt-3">
                    <li className="list-group-item"><strong>Tag ID:</strong> {tagId}</li>
                    <li className="list-group-item"><strong>Status:</strong> {status}</li>
                    <li className="list-group-item"><strong>Activated At:</strong> {new Date(activationDate).toLocaleString()}</li>

                    {(isAdmin || isOwner) && (
                        <li className="list-group-item">
                            <strong>Owner:</strong> {owner?.name} ({owner?.email})
                        </li>
                    )}

                    {isAdmin && (
                        <li className="list-group-item">
                            <strong>Activation Status:</strong> {activationStatus ? 'Active' : 'Inactive'}
                        </li>
                    )}

                    {(isAdmin || isOwner) && sharedWith.length > 0 && (
                        <li className="list-group-item">
                            <strong>Shared With:</strong>
                            <ul className="mt-1 ps-3">
                                {sharedWith.map(user => (
                                    <li key={user._id}>{user.name} ({user.email})</li>
                                ))}
                            </ul>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default TagInfoCard;