const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, enum: ["lost", "found"], required: true },
  img: { type: String, default: "placeholder.png" },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Item", itemSchema);
