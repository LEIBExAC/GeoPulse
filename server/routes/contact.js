const express = require("express");
const router = express.Router();
const { sendAlert } = require("../config/emailSender");

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ success: false, error: "All fields are required." });
  }

  try {
    const alertMessage = `
New Contact Form Submission:

👤 Name: ${name}
📧 Email: ${email}

💬 Message:
${message}
`;

    await sendAlert(process.env.CONTACT_EMAIL, alertMessage);

    return res
      .status(200)
      .json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Contact email error:", error);
    return res
      .status(500)
      .json({
        success: false,
        error: "Failed to send message. Please try again later.",
      });
  }
});

module.exports = router;
