// const express = require("express");
// const cors = require("cors");
// const nodemailer = require("nodemailer");
// const multer = require("multer");
// require("dotenv").config();

// const app = express();

// // Enable CORS for all routes
// app.use(cors());

// // Middleware to parse JSON and URL-encoded data
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Multer configuration for handling file uploads
// const upload = multer({ dest: "uploads/" });

// // Nodemailer configuration
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER, // Your email address
//     pass: process.env.EMAIL_PASS, // Your app password (not your regular email password)
//   },
// });

// // API route to handle contact form submission
// app.post("/send", upload.single("attachment"), async (req, res) => {
//   try {
//     const { firstName, email, phone, message } = req.body;
//     const attachment = req.file;

//     // Prepare the email options
//     const mailOptions = {
//       from: email,
//       to: "manishinteresting@gmail.com", // Recipient email address
//       subject: "New Contact Form Submission",
//       text: `Name: ${firstName}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
//       attachments: attachment
//         ? [
//             {
//               filename: attachment.originalname,
//               path: attachment.path,
//             },
//           ]
//         : [],
//     };

//     // Send the email
//     await transporter.sendMail(mailOptions);

//     // Send a success response to the frontend
//     res.status(200).json({ message: "Message sent successfully" });
//   } catch (error) {
//     console.error("Error sending message:", error);

//     // Send an error response to the frontend
//     res.status(500).json({ message: "Failed to send message" });
//   }
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const multer = require("multer");
require("dotenv").config();

const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Multer configuration for handling file uploads
const upload = multer({ dest: "uploads/" });

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your app password
  },
});

// API route to handle contact form submission
app.post("/send", upload.single("attachment"), async (req, res) => {
  try {
    const { firstName, email, phone, message } = req.body;
    const attachment = req.file;

    // Log received data
    console.log("Received data:", {
      firstName,
      email,
      phone,
      message,
      attachment,
    });

    const mailOptions = {
      from: email,
      to: "manishinteresting@gmail.com",
      subject: "New Contact Form Submission",
      text: `Name: ${firstName}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
      attachments: attachment
        ? [
            {
              filename: attachment.originalname,
              path: attachment.path,
            },
          ]
        : [],
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Send a success response
    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    // Log the error for debugging
    console.error("Error sending message:", error);

    // Send an error response
    res
      .status(500)
      .json({ message: "Failed to send message", error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
