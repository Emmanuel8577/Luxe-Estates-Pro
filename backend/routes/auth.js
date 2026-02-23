import express from "express";
import User from "../models/User.js";
import { protect, adminOnly } from "../middleware/auth.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exist" });
    }

    const user = await User.create({ username, email, password });
    const token = generateToken(user._id);

    // ✅ Added 'role' to the response
    res.status(201).json({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (err) {
    console.error("DETAILED ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    // ✅ Added 'role' to the response
    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (err) {
    console.error("DETAILED ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find({}).select("-password"); // Don't send passwords!
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

// Delete user (Admin Only)
router.delete("/:id", protect, adminOnly, async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User removed" });
});
// Me (Profile)
router.get("/me", protect, async (req, res) => {
  // ✅ This returns req.user. Ensure your 'protect' middleware
  // attaches the full user object (including role) to req.user
  res.status(200).json(req.user);
});

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

router.post("/favorite/:propertyId", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const propertyId = req.params.propertyId;

    if (user.favorites.includes(propertyId)) {
      // Remove if already favorited
      user.favorites = user.favorites.filter(
        (id) => id.toString() !== propertyId,
      );
    } else {
      // Add if not favorited
      user.favorites.push(propertyId);
    }

    await user.save();
    res.json(user.favorites);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
