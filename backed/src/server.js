import express, { json, urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import deckRoutes from "./routes/deck.routes.js";
import llmRoutes from "./routes/llm.routes.js";
import cardRoutes from "./routes/card.routes.js";
import { sendEmail } from "./lib/sendEmail.js";
import { success } from "zod";

//Loading dotenv
dotenv.config();

const app = express();
const PORT = process.env.PORT;

//Built in middleware Setup
app.use(
  cors({
    origin: "http://localhost:3000", // Frontend URL
    credentials: true,
  }),
);
app.use(express.json());
app.use(urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/decks", deckRoutes);
app.use("/api/ai", llmRoutes);
app.use("/api/cards", cardRoutes);

// Temporary route to handle contributions from the frontend
app.post("/api/contributions", async (req, res) => {
  try {
    const { email, message } = req.body;

    // Input validation
    if (!email || !message) {
      return res.status(400).json({
        status: "error",
        message: "Email and message are required",
      });
    }

    if (typeof email !== "string" || typeof message !== "string") {
      return res.status(400).json({
        status: "error",
        message: "Email and message must be strings",
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        status: "error",
        message: "Please provide a valid email address",
      });
    }

    // Trim and limit message length
    const trimmedMessage = message.trim();
    if (trimmedMessage.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "Message cannot be empty",
      });
    }

    if (trimmedMessage.length > 1000) {
      return res.status(400).json({
        status: "error",
        message: "Message must be less than 1000 characters",
      });
    }

    const emailResult = await sendEmail(
      "shubhampatel0513@gmail.com",
      "New Contribution Received",
      `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Contribution Received</h2>
          <p><strong>From:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 10px 0;">
            ${trimmedMessage.replace(/\n/g, "<br>")}
          </div>
          <p style="color: #6b7280; font-size: 12px;">Sent via Study Flashcard App</p>
        </div>
      `,
    );

    console.log("Email sent successfully:", emailResult);

    res.json({
      success: true,
      message: "Contribution received and email sent!",
      emailId: emailResult.data?.id || "unknown",
    });
  } catch (error) {
    console.error("Error processing contribution:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send email. Please try again later.",
    });
  }
});

//Test Route
app.get("/health", (req, res) => {
  res.json({
    status: 200,
    message: "Server is running",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
