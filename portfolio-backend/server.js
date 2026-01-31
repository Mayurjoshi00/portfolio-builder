const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = 5000;

// ---------- MIDDLEWARE ----------
app.use(cors());
app.use(express.json());

// ---------- MONGODB CONNECTION ----------
mongoose
  .connect("mongodb://mongo:27017/portfolioDB")
  .then(() => console.log("🟢 MongoDB connected"))
  .catch((err) => console.error("🔴 MongoDB connection error:", err));

// ---------- SCHEMA & MODEL ----------
const portfolioSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
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

  skills: [
    {
      name: String,
      level: Number
    }
  ],

  projects: [
    {
      title: String,
      desc: String
    }
  ],

  theme: String,
  profileImage: String,

  createdAt: {
    type: Date,
    default: Date.now
  }
});


const Portfolio = mongoose.model("Portfolio", portfolioSchema);

// ---------- ROUTES ----------

// Health check
app.get("/", (req, res) => {
  res.send("Backend is alive and judging your code silently 👀");
});

// CREATE / UPDATE portfolio
app.post("/portfolio", async (req, res) => {
  try {
    const savedPortfolio = await Portfolio.findOneAndUpdate(
      { username: req.body.username }, // find by username
      req.body,                         // update data
      { new: true, upsert: true }       // create if not exists
    );

    res.status(201).json({
      message: "Portfolio saved to MongoDB 🧠💾",
      data: savedPortfolio
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET portfolio by username
app.get("/portfolio/:username", async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({
      username: req.params.username
    });

    if (!portfolio) {
      return res.status(404).json({ error: "Portfolio not found" });
    }

    res.json(portfolio);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------- START SERVER ----------
app.listen(PORT, () => {
  console.log(`🔥 Backend running on http://localhost:${PORT}`);
});
