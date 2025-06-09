import React, { useState, useRef } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { Navigate, useNavigate, Link } from 'react-router-dom';


import { useAuthStore } from "../../assets/store/authStore";

export default function VerifyOTP() {
  const navigate = useNavigate()

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [OTPerror, setOTPError] = useState("");
  const [info, setInfo] = useState(
    "We have sent a 6-digit OTP to your registered email or phone number."
  );
  const [resendDisabled, setResendDisabled] = useState(false);
  const inputsRef = useRef([]);

  const { verifyOtp, error, isLoading } = useAuthStore();

  const handleChange = (element, index) => {
    const val = element.value;

    if (/^\d?$/.test(val)) {
      const newOtp = [...otp];
      newOtp[index] = val;
      setOtp(newOtp);

      // Focus next input automatically
      if (val && index < 5) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (otp.some((digit) => digit === "")) {
      setOTPError("Please enter all 6 digits of the OTP.");
      return;
    }

    setOTPError("");
    const otpString = otp.join("");
    console.log("Entered OTP:", otpString);

    try {
      await verifyOtp(otp);

    }
    catch (error) {
      setOTPError(error)
    }

    const success = await login(otp)
    if (success) navigate("/signin")


    // TODO: Verify OTP with backend API here

    setInfo("Verifying OTP...");
  };

  const handleResend = () => {
    setResendDisabled(true);
    setInfo("Resending OTP...");

    // Simulate resend delay
    setTimeout(() => {
      setInfo("A new OTP has been sent to your email or phone.");
      setResendDisabled(false);
    }, 30000); // 30 seconds cooldown
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <Card className="shadow-lg p-4" style={{ width: "100%", maxWidth: "420px" }}>
        <h3 className="text-center mb-3 text-primary">Verify Your Account</h3>
        <p className="text-center text-muted mb-4" style={{ fontSize: "0.9rem" }}>
          {info}
        </p>

        {error && <Alert variant="danger">{error}</Alert>}
        {OTPerror && <Alert variant="danger">{OTPerror}</Alert>}

        <Form onSubmit={handleSubmit}>
          <div className="d-flex justify-content-between mb-4">
            {otp.map((data, index) => (
              <Form.Control
                key={index}
                type="text"
                maxLength="1"
                className="text-center"
                style={{ width: "3rem", height: "3rem", fontSize: "1.5rem" }}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputsRef.current[index] = el)}
                autoComplete="one-time-code"
              />
            ))}
          </div>

          <Button type="submit" variant="primary" className="w-100 mb-3">
            Verify OTP
          </Button>
        </Form>

        <div className="text-center">
          <Button
            variant="link"
            disabled={resendDisabled}
            onClick={handleResend}
            className="p-0"
            style={{ textDecoration: "underline" }}
          >
            Resend OTP
          </Button>
          <p className="mt-3 text-muted" style={{ fontSize: "0.85rem" }}>
            Didn't receive the OTP? Click "Resend OTP" after 30 seconds.
          </p>
        </div>
      </Card>
    </div>
  );
}
