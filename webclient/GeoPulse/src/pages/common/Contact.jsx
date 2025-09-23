import React, { useState } from 'react';
import Header from '../../components/layout/Header';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, message } = formData;

    if (!name || !email || !message) {
      setStatus('Please fill out all fields.');
      return;
    }

    try {
      setIsSubmitting(true);
      setStatus('Sending message...');

      const res = await fetch(`${backend_url}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.success) {
        setStatus('✅ Message sent! We’ll contact you soon.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus(`❌ ${data.error || 'Failed to send message.'}`);
      }

    } catch (error) {
      console.error('Error:', error);
      setStatus('❌ Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <div className="container my-5">
        <h2 className="text-center mb-4">Contact Us</h2>
        <p className="text-center text-muted mb-4">
          Have a question or suggestion? We'd love to hear from you.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto"
          style={{ maxWidth: '600px' }}
        >
          <div className="mb-3">
            <label className="form-label">Your Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Message</label>
            <textarea
              name="message"
              rows="5"
              className="form-control"
              placeholder="Write your message here..."
              value={formData.message}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>

          {status && (
            <div className="alert alert-info mt-3" role="alert">
              {status}
            </div>
          )}
        </form>
      </div>
    </>
  );
}
