import Inquiry from "../models/Inquiry.js";
import { Resend } from 'resend';

// DO NOT initialize it here globally if it's causing a crash
// Instead, we initialize it inside the function or check for the key first

export const createInquiry = async (req, res) => {
    try {
        // Initialize Resend INSIDE the function so it definitely has the key
        if (!process.env.RESEND_API_KEY) {
            throw new Error("RESEND_API_KEY is missing from environment variables");
        }
        
        const resend = new Resend(process.env.RESEND_API_KEY);
        const { type, name, email, message, subject, propertyId } = req.body;

        // 1. Save to MongoDB
        const newInquiry = await Inquiry.create({
            type, name, email, message, subject, propertyId
        });

        // 2. Send Email
        await resend.emails.send({
            from: 'Luxe Estates <onboarding@resend.dev>',
            to: email,
            subject: subject || 'Thank you for contacting Luxe Estates',
            html: `<h1>Hello ${name}</h1><p>We have received your inquiry regarding our property.</p>`
        });

        res.status(201).json({ success: true, data: newInquiry });
    } catch (error) {
        console.error("Controller Error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};