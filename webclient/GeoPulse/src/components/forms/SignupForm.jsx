import React, { useState } from "react";
import { Form, Button, Card, Container, Alert, InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuthStore } from "../../assets/store/authStore";
import { Navigate, useNavigate, Link } from 'react-router-dom';


function SignUpForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const { signup, error, isLoading } = useAuthStore();

  const [formError, setFormError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate()


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isStrongPassword = (password) =>
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/.test(password);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setFormError("Name is required.");
    } else if (!isValidEmail(formData.email)) {
      setFormError("Please enter a valid email address.");
    } else if (!isStrongPassword(formData.password)) {
      setFormError(
        "Password must be at least 6 characters and include at least one letter and one number."
      );
    } else if (formData.password !== formData.confirmPassword) {
      setFormError("Passwords do not match.");
    } else if (!formData.acceptTerms) {
      setFormError("You must accept the Terms and Conditions.");
    } else {
      setFormError("");
      console.log("Form data ready to send:", formData);
      // Submit form data to server here

      const success = await signup(formData.email, formData.password, formData.name);

      if (success) {
        navigate("/verify-email"); // ✅ Navigate only on success
      }
    }
  };

  return (

    <Card className="shadow-lg p-4" style={{ width: "100%", maxWidth: "400px" }}>
      <h3 className="text-center mb-4 text-primary">GeoPulse Sign Up</h3>

      {error && <Alert variant="danger">{error}</Alert>}
      {formError && <Alert variant="danger">{formError}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName" className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

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
          <InputGroup>
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              isInvalid={formData.password && !isStrongPassword(formData.password)}
            />
            <Button
              variant="outline-secondary"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </Button>
            <Form.Control.Feedback type="invalid">
              Must be 6+ chars, with at least 1 letter and 1 number.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="formConfirmPassword" className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              isInvalid={
                formData.confirmPassword &&
                formData.password !== formData.confirmPassword
              }
            />
            <Button
              variant="outline-secondary"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </Button>
            <Form.Control.Feedback type="invalid">
              Passwords do not match.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="formTerms" className="mb-4">
          <Form.Check
            type="checkbox"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleChange}
            label="I accept the Terms and Conditions"
            required
            isInvalid={!formData.acceptTerms}
            feedback="You must accept the terms."
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100" disabled={isLoading}>
          {isLoading ? "Signing up..." : "Sign Up"}
        </Button>
      </Form>
    </Card>
  );
}

export default SignUpForm;
