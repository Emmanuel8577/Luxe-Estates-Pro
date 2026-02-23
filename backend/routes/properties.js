import express from 'express';
import { protect, adminOnly } from '../middleware/auth.js';
import Property from '../models/Property.js'; // Make sure you have this model!

const router = express.Router();

// @route   POST /api/properties
// @desc    Create a new listing
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const newProperty = await Property.create(req.body);
    res.status(201).json(newProperty);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create property" });
  }
});

// @route   GET /api/properties
router.get("/", async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: "Error fetching properties" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: "Invalid ID format" });
  }
});

export default router;