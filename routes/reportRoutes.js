const express = require("express");
const Report = require("../models/Report");

const router = express.Router();

// POST report
router.post("/", async (req, res) => {
  try {
    const { name, email, issue } = req.body;
    const report = new Report({ name, email, issue });
    await report.save();
    res.status(201).json({ message: "Report submitted successfully!", report });
  } catch (error) {
    res.status(500).json({ error: "Error submitting report" });
  }
});

// GET all reports
router.get("/", async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: "Error fetching reports" });
  }
});

module.exports = router;
