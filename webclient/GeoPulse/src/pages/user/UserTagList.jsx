import React, { useEffect, useState } from 'react';
import { getUserTags } from '../../assets/api/tagApi';
import TagCard from '../../components/cards/TagCard';
import { useAuthStore } from '../../assets/store/authStore';

const UserTagListPage = () => {
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuthStore();

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const userTags = await getUserTags(user._id);
                setTags(userTags);
            } catch (err) {
                setError(err.message || 'Failed to load tags');
            } finally {
                setLoading(false);
            }
        };

        fetchTags();
    }, []);

    if (loading) return <div className="container mt-5">Loading tags...</div>;
    if (error) return <div className="container mt-5 alert alert-danger">❌ {error}</div>;

    return (
        <div className="container mt-5">
            <h3>Your Tags</h3>
            {tags.length === 0 ? (
                <div className="alert alert-info mt-3">No tags activated yet.</div>
            ) : (
                <div className="row">
                    {tags.map((tag) => (
                        <div className="col-md-4" key={tag.tagId}>
                            <TagCard tag={tag} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserTagListPage;
