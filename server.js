const express = require("express");
const Razorpay = require("razorpay");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/send-data", async (req, res) => {
  const { paymentId, email, count } = req.body;

  // Dummy data to send
  const data = Array.from({ length: count }, (_, i) => ({ id: i + 1, value: "Sample Data " + (i + 1) }));

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Store email in environment variable
      pass: process.env.EMAIL_PASS  // Store app password in environment variable
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your Data Purchase",
    text: "Thank you for your purchase. Data is attached.",
    attachments: [
      {
        filename: "data.json",
        content: JSON.stringify(data, null, 2)
      }
    ]
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "Data sent to email successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send email." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
