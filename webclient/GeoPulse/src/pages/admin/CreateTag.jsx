import React, { useState } from 'react';
import TagForm from '../../components/forms/TagForm';
import { createTag } from '../../assets/api/tagApi';

const CreateTagPage = () => {
  const [response, setResponse] = useState(null);

  const handleCreateTag = async (formData) => {
    try {
      const result = await createTag(formData);      
      setResponse({ success: true, data: result });
    } catch (err) {
      setResponse({ success: false, message: err?.response?.data?.message || 'Error creating tag' });
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4">Create New Tag</h3>

      <TagForm onSubmit={handleCreateTag} />

      {response?.success && (
        <div className="alert alert-success mt-4">
          ✅ Tag created successfully! <br />
          <strong>Activation Code:</strong> <code>{response.data.tag.activationCode}</code>
        </div>
      )}

      {response?.success === false && (
        <div className="alert alert-danger mt-4">
          ❌ {response.message}
        </div>
      )}
    </div>
  );
};

export default CreateTagPage;
