import React, { useEffect, useState } from 'react';
import { getAllTags } from '../../assets/api/tagApi';
import TagCard from '../../components/cards/TagCard';
import { useAuthStore } from '../../assets/store/authStore';

const AdminTagListPage = () => {
    const [allTags, setAllTags] = useState([]);
    const [filteredTags, setFilteredTags] = useState([]);
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user, isAdmin } = useAuthStore();

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const tags = await getAllTags(user._id, isAdmin);
                setAllTags(tags);
                setFilteredTags(tags);
            } catch (err) {
                setError(err.message || 'Failed to fetch tags');
            } finally {
                setLoading(false);
            }
        };
        fetchTags();
    }, []);

    useEffect(() => {
        if (filter === 'all') {
            setFilteredTags(allTags);
        } else {
            setFilteredTags(
                allTags.filter(tag =>
                    filter === 'activated' ? tag.activationStatus : !tag.activationStatus
                )
            );
        }
    }, [filter, allTags]);

    if (loading) return <div className="container mt-5">Loading tags...</div>;
    if (error) return <div className="container mt-5 alert alert-danger">❌ {error}</div>;

    return (
        <div className="container mt-5">
            <h3>All Tags (Admin View)</h3>

            <div className="btn-group mb-4" role="group">
                <button
                    className={`btn btn-outline-primary ${filter === 'all' ? 'active' : ''}`}
                    onClick={() => setFilter('all')}
                >
                    All
                </button>
                <button
                    className={`btn btn-outline-success ${filter === 'activated' ? 'active' : ''}`}
                    onClick={() => setFilter('activated')}
                >
                    Activated
                </button>
                <button
                    className={`btn btn-outline-warning ${filter === 'notActivated' ? 'active' : ''}`}
                    onClick={() => setFilter('notActivated')}
                >
                    Not Activated
                </button>
            </div>

            {filteredTags.length === 0 ? (
                <div className="alert alert-info">No tags found.</div>
            ) : (
                <div className="row">
                    {filteredTags.map(tag => (
                        <div className="col-md-4" key={tag._id}>
                            <TagCard tag={tag} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminTagListPage;