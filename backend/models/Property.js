import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true }, // URL to the image
    beds: { type: Number, required: true },
    baths: { type: Number, required: true },
    area: { type: String, required: true },
    garage: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("Property", propertySchema);