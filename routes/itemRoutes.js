import express from "express";
import Item from "../models/Item.js";

const router = express.Router();

// @desc    Get all items (lost/found)
// @route   GET /api/items
router.get("/", async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// @desc    Add new item
// @route   POST /api/items
router.post("/", async (req, res) => {
  try {
    const { title, desc, location, img, type } = req.body;

    if (!title || !desc || !location || !type) {
      return res.status(400).json({ error: "Please fill all required fields" });
    }

    const newItem = new Item({ title, desc, location, img, type });
    await newItem.save();

    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
