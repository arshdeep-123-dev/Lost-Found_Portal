const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000; // Render will use env PORT

const path = require("path");

// Serve static frontend
app.use(express.static(path.join(__dirname, "../frontend"))); // adjust path if needed

// Fallback for SPA
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});


// Middleware
app.use(cors());
app.use(bodyParser.json());


// MongoDB connection
// MongoDB Atlas connection
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://arshdeep62097:M8EiblkB6bJm3yEX@cluster0.whgrskn.mongodb.net/lost_found_portal";
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => {
    console.error("❌ MongoDB Error:", err);
    process.exit(1);
  });


app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

const Item = require("./models/Item");

// Add new item
app.post("/api/items", async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all items
app.get("/api/items", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// Get only lost items
app.get("/api/items/lost", async (req, res) => {
  const items = await Item.find({ type: "lost" });
  res.json(items);
});

// Get only found items
app.get("/api/items/found", async (req, res) => {
  const items = await Item.find({ type: "found" });
  res.json(items);
});

const path = require("path");

// Serve static frontend
app.use(express.static(path.join(__dirname, "frontend")));

// Send index.html on /
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));