const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const PORT = 5000;

// ---------- MIDDLEWARE ----------
app.use(cors());
app.use(express.json());

// ---------- SERVE FRONTEND ----------
app.use(express.static(path.join(__dirname, "../frontend")));

// ---------- MONGODB CONNECTION ----------
mongoose
  .connect("mongodb://mongo:27017/portfolioDB")
  .then(() => console.log("🟢 MongoDB connected"))
  .catch((err) => console.error("🔴 MongoDB connection error:", err));

// ---------- SCHEMA ----------
const portfolioSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: String,
  bio: String,
  education: {
    degree: String,
    college: String,
    year: String
  },
  experience: {
    role: String,
    company: String,
    description: String
  },
  socials: {
    github: String,
    linkedin: String
  },
  skills: [{ name: String, level: Number }],
  projects: [{ title: String, desc: String }],
  theme: String,
  profileImage: String,
  createdAt: { type: Date, default: Date.now }
});

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

// ---------- API ROUTES ----------
app.post("/portfolio", async (req, res) => {
  try {
    const saved = await Portfolio.findOneAndUpdate(
      { username: req.body.username },
      req.body,
      { new: true, upsert: true }
    );
    res.json({ message: "Saved 🧠💾", data: saved });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/portfolio/:username", async (req, res) => {
  const data = await Portfolio.findOne({ username: req.params.username });
  if (!data) return res.status(404).json({ error: "Not found" });
  res.json(data);
});

// ---------- FRONTEND FALLBACK ----------
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// ---------- START ----------
app.listen(PORT, () => {
  console.log(`🔥 App running on http://localhost:${PORT}`);
});
