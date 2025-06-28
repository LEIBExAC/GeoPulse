import React, { useState } from 'react';
import TagActivationForm from '../../components/forms/TagActivationForm';
import { activateTag } from '../../assets/api/tagApi';

const ActivateTagPage = () => {
  const [response, setResponse] = useState(null);

  const handleActivate = async (tagData) => {
    try {
      const result = await activateTag(tagData);
      setResponse({ success: true, data: result });
    } catch (err) {
      setResponse({ success: false, message: err?.message || 'Activation failed' });
    }
  };

  return (
    <div className="container mt-5">
      <h3>Activate Your Tag</h3>
      <TagActivationForm onSubmit={handleActivate} />

      {response?.success && (
        <div className="alert alert-success mt-3">
          ✅ Tag activated successfully!<br />
          Tag Id: <strong>{response.data.tag.tagId}</strong>
        </div>
      )}

      {response?.success === false && (
        <div className="alert alert-danger mt-3">
          ❌ {response.message}
        </div>
      )}
    </div>
  );
};

export default ActivateTagPage;
