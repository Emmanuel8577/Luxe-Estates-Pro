import express from 'express';
import { createInquiry } from '../controllers/inquiryController.js';
import { protect, adminOnly } from '../middleware/auth.js'

const router = express.Router();

// This handles: POST http://localhost:5000/api/inquiries
router.post("/", createInquiry);
// Delete Inquiry (Admin Only)
router.delete("/:id", protect, adminOnly, async (req, res) => {
    try {
        await Inquiry.findByIdAndDelete(req.params.id);
        res.json({ message: "Inquiry deleted" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

export default router;