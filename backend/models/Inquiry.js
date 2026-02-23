import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String },
    subject: { type: String },    // Frontend sends this
    propertyId: { type: String }, // Frontend sends this
    type: { 
        type: String, 
        // IMPORTANT: Must include 'property_inquiry'
        enum: ['contact', 'tour', 'property_inquiry'], 
        default: 'contact' 
    },
    status: { type: String, default: 'pending' }
}, { timestamps: true });

const Inquiry = mongoose.model('Inquiry', inquirySchema);
export default Inquiry;