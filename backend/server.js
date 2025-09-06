const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect("mongodb+srv://arshdeep62097:M8EiblkB6bJm3yEX@cluster0.whgrskn.mongodb.net/LOST-FOUND PORTAL?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

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
