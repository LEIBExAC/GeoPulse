import React, { useState } from "react";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from "../../assets/store/authStore";


function LoginForm() {
  const navigate = useNavigate()
  const { login, error, isLoading } = useAuthStore();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [FormError, setFormError] = useState("");


  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(formData.email)) {
      setFormError("Please enter a valid email address.");
    } else if (!formData.password) {
      setFormError("Password is required.");
    } else {
      setFormError("");
      console.log("Login Data:", formData);
      // Call login API here
      const success = await login(formData.email, formData.password);
      if (success) {
        navigate("/")
      }
    }
  };

  return (

    <Card className="shadow-lg p-4" style={{ width: "100%", maxWidth: "400px" }}>
      <h3 className="text-center mb-4 text-primary">GeoPulse Login</h3>

      {FormError && <Alert variant="danger">{FormError}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            autoFocus
            required
            isInvalid={formData.email && !isValidEmail(formData.email)}
          />
          <Form.Control.Feedback type="invalid">
            Invalid email format.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <div className="d-flex justify-content-between mb-3">
          <Link to="/forgot-password">Forgot password?</Link>
          <Link to="/signup">Don't have an account?</Link>
        </div>


        <Button type="submit" variant="primary" className="w-100" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </Button>

      </Form>
    </Card>
  );
}

export default LoginForm;
