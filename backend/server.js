import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

// Route Imports
import inquiryRoutes from './routes/inquiries.js';
import propertyRoutes from './routes/properties.js';
import authRoutes from './routes/auth.js';
import { connectDB } from './config/db.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", authRoutes);
app.use("/api/inquiries", inquiryRoutes); // This handles all /api/inquiries/... routes
app.use("/api/properties", propertyRoutes);

// Keep-Alive Route
app.get("/api/status", (req, res) => {
  res.status(200).send("System Operational");
});
// Database Connection
connectDB();

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});