import express, { json, urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import deckRoutes from "./routes/deck.routes.js";
import llmRoutes from "./routes/llm.routes.js";
import cardRoutes from "./routes/card.routes.js";
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
  const { email, message } = req.body;
  console.log("Received contribution:", { email, message });
  res.json({ success: true, message: "Contribution received" });
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
