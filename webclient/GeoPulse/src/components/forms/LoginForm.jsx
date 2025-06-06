import React, { useState } from "react";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidEmail(formData.email)) {
      setError("Please enter a valid email address.");
    } else if (!formData.password) {
      setError("Password is required.");
    } else {
      setError("");
      console.log("Login Data:", formData);
      // Call login API here
    }
  };

  return (

      <Card className="shadow-lg p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h3 className="text-center mb-4 text-primary">GeoPulse Login</h3>

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
            <Form.Text className="text-muted">
              Forgot password?
            </Form.Text>
            <Form.Text className="text-muted">
              Don't have an account?
            </Form.Text>
          </div>

          <Button type="submit" variant="primary" className="w-100">
            Login
          </Button>
        </Form>
      </Card>
  );
}

export default LoginForm;
