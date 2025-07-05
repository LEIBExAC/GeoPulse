import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthStore } from '../../../assets/store/authStore';
import { fetchTagById } from '../../../assets/api/tagApi';
import TagInfoCard from '../../../components/cards/TagInfoCard';
import TagActions from '../../../components/tags/TagActions';
import TagLocationPreview from '../../../components/tags/TagLocationPreview';
import TagNavigation from '../../../components/tags/TagNavigation';

const TagDetailsPage = () => {
    const { id } = useParams();
    const { user } = useAuthStore();
    const [tag, setTag] = useState(null);
    const [userRole, setUserRole] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const getTag = async () => {
            try {
                const tagData = await fetchTagById(id);
                setTag(tagData);
                console.log('Fetched tag data:', tagData);

                const isOwner = tagData.owner?._id === user._id;
                const isShared = tagData.sharedWith?.some((u) => u._id === user._id);
                const isAdmin = user.role === 'admin';

                if (isAdmin) setUserRole('admin');
                else if (isOwner) setUserRole('owner');
                else if (isShared) setUserRole('shared');
            } catch (err) {
                setError(err.message || 'Failed to fetch tag details');
            } finally {
                setLoading(false);
            }
        };
        getTag();
    }, [id, user]);

    if (loading) return <div className="container mt-5">Loading tag details...</div>;
    if (error) return <div className="container mt-5 alert alert-danger">{error}</div>;

    return (
        <div className="container mt-5">
            <h3>📍 Tag Details</h3>
            <TagInfoCard tag={tag} userRole={userRole} />
            <TagActions tag={tag} userRole={userRole} />
            <TagLocationPreview tag={tag} />
            <TagNavigation tagId={tag.tagId} />
        </div>
    );
};

export default TagDetailsPage;